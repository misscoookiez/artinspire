import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { refundBookingPayment } from "@/lib/bookings";

export async function POST(request, { params }) {
  const { token }=await params;
  if (!stripe || !supabaseAdmin) return NextResponse.json({error:"Booking management is not configured yet."},{status:503});
  if (!/^[0-9a-f-]{36}$/i.test(token)) return NextResponse.json({error:"This management link is invalid."},{status:400});
  const { data:booking, error }=await supabaseAdmin.from("bookings").select("id,kind,status,class_session_id,private_slot_id,stripe_payment_intent_id").eq("manage_token",token).maybeSingle();
  if (error || !booking) return NextResponse.json({error:"This management link is unavailable."},{status:404});
  if (booking.status !== "confirmed") return NextResponse.json({error:"This booking has already been changed."},{status:409});
  const table=booking.kind === "private" ? "private_slots" : "class_sessions";
  const id=booking.kind === "private" ? booking.private_slot_id : booking.class_session_id;
  const { data:session }=await supabaseAdmin.from(table).select("starts_at").eq("id",id).maybeSingle();
  if (!session || new Date(session.starts_at).getTime()-Date.now() < 24*60*60*1000) return NextResponse.json({error:"Online cancellation closes 24 hours before the session."},{status:400});
  if (!booking.stripe_payment_intent_id) {
    const { error: cancelError } = await supabaseAdmin
      .from("bookings")
      .update({ status:"cancelled", cancelled_at:new Date().toISOString() })
      .eq("id", booking.id)
      .eq("status", "confirmed");
    if (cancelError) return NextResponse.json({error:"We could not cancel this reservation. Please contact the studio."},{status:500});
    if (booking.kind === "private") {
      const { error: slotError } = await supabaseAdmin.from("private_slots").update({ status:"open" }).eq("id", booking.private_slot_id);
      if (slotError) return NextResponse.json({error:"Your reservation was cancelled, but the time could not be reopened yet. Please contact the studio."},{status:500});
    }
    return NextResponse.json({message:"Your reservation has been cancelled and the place is available again."});
  }
  try {
    await stripe.refunds.create({payment_intent:booking.stripe_payment_intent_id});
    await refundBookingPayment(booking.stripe_payment_intent_id);
    return NextResponse.json({message:"Your booking has been cancelled. Stripe will return the payment to the original method."});
  } catch (refundError) {
    console.error("Booking refund failed",refundError);
    return NextResponse.json({error:"We could not process the refund. Please contact the studio."},{status:500});
  }
}
