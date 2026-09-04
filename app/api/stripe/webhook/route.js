import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { confirmBookingHold, refundBookingPayment, releaseBookingHold } from "@/lib/bookings";
import { claimStripeEvent, completeArtworkOrder, releaseArtworkHold } from "@/lib/fulfillment";
import { sendBookingConfirmation, sendClassPassConfirmation, sendGiftCardConfirmation } from "@/lib/booking-email";

export const runtime = "nodejs";

export async function POST(request) {
  if (!stripe || !supabaseAdmin || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({error:"Webhook is not configured."},{status:503});
  const signature=request.headers.get("stripe-signature");
  let event;
  try { event=stripe.webhooks.constructEvent(await request.text(),signature,process.env.STRIPE_WEBHOOK_SECRET); }
  catch(error) { return NextResponse.json({error:`Invalid webhook: ${error.message}`},{status:400}); }
  let claimed=false;
  try {
    // Claim first so duplicate deliveries never run their side effects twice.
    // If processing fails, the catch block releases this claim for a retry.
    claimed=await claimStripeEvent(event.id);
    if (!claimed) return NextResponse.json({received:true,duplicate:true});
    switch(event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session=event.data.object;
        // Cards are paid when Checkout completes. SEPA debit can complete Checkout
        // before funds settle, then emits async_payment_succeeded later.
        if (event.type === "checkout.session.completed" && session.payment_status !== "paid") break;
        const metadata=session.metadata || {};
        const email=session.customer_details?.email || session.customer_email || "";
        if (metadata.type === "art_order") {
          await completeArtworkOrder({checkoutSessionId:session.id,paymentIntentId:session.payment_intent,email,amountCents:session.amount_total || 0,artworkIds:(metadata.artwork_ids || "").split(",").filter(Boolean),artworkHoldId:metadata.artwork_hold_id});
        } else if ((metadata.type === "class_booking" || metadata.type === "private_booking") && metadata.booking_hold_id) {
          const bookingId=await confirmBookingHold({holdId:metadata.booking_hold_id,checkoutSessionId:session.id,paymentIntentId:session.payment_intent,customerName:metadata.customer_name,email,amountCents:session.amount_total || 0});
          const {data:booking}=await supabaseAdmin.from("bookings").select("manage_token,kind,class_session_id,private_slot_id").eq("id",bookingId).maybeSingle();
          if(booking){const table=booking.kind==="private"?"private_slots":"class_sessions";const id=booking.kind==="private"?booking.private_slot_id:booking.class_session_id;const {data:slot}=await supabaseAdmin.from(table).select(booking.kind==="private"?"starts_at,ends_at":"starts_at,ends_at,title_en").eq("id",id).maybeSingle();if(slot){try{await sendBookingConfirmation({email,name:metadata.customer_name,title:booking.kind==="private"?"Art Studio Inspire session":slot.title_en,startsAt:slot.starts_at,endsAt:slot.ends_at,token:booking.manage_token});}catch(emailError){console.error("Booking confirmation email failed",emailError);}}}
        } else if (metadata.type === "class_pass") {
          const classes=Number.parseInt(metadata.pass_classes,10);
          if(![4,6,8].includes(classes)) throw new Error("Invalid class-pass size.");
          const passEmail=email||metadata.customer_email||"";
          if(!passEmail) throw new Error("A class-pass purchase needs an email address.");
          const {data:existingPass,error:existingPassError}=await supabaseAdmin.from("class_passes").select("id").eq("stripe_checkout_session_id",session.id).maybeSingle();
          if(existingPassError) throw new Error(existingPassError.message);
          if(!existingPass){const {error}=await supabaseAdmin.from("class_passes").insert({email:passEmail.toLowerCase(),customer_name:metadata.customer_name||null,total_uses:classes,stripe_checkout_session_id:session.id,stripe_payment_intent_id:session.payment_intent||null});if(error) throw new Error(error.message);}
          try{await sendClassPassConfirmation({email:email||metadata.customer_email||"",name:metadata.customer_name,classes});}catch(emailError){console.error("Class-pass confirmation email failed",emailError);}
        } else if (metadata.type === "gift_card") {
          const classes=Number.parseInt(metadata.gift_classes,10);
          if(!Number.isInteger(classes)||classes<1||classes>40) throw new Error("Invalid gift-card size.");
          const giftEmail=email||metadata.customer_email||"";
          if(!giftEmail) throw new Error("A gift-card purchase needs an email address.");
          const {data:existingCard,error:existingCardError}=await supabaseAdmin.from("gift_cards").select("id,code").eq("stripe_checkout_session_id",session.id).maybeSingle();
          if(existingCardError) throw new Error(existingCardError.message);
          let code=existingCard?.code;
          if(!existingCard){
            code=`INSPIRE-${randomUUID().replace(/-/g,"").slice(0,10).toUpperCase()}`;
            const {error}=await supabaseAdmin.from("gift_cards").insert({code,email:giftEmail.toLowerCase(),customer_name:metadata.customer_name||null,total_uses:classes,remaining_uses:classes,amount_cents:session.amount_total||0,status:"active",stripe_checkout_session_id:session.id,stripe_payment_intent_id:session.payment_intent||null});
            if(error) throw new Error(error.message);
          }
          try{await sendGiftCardConfirmation({email:giftEmail,name:metadata.customer_name,classes,code});}catch(emailError){console.error("Gift-card confirmation email failed",emailError);}
        }
        break;
      }
      case "checkout.session.expired":
        await releaseBookingHold(event.data.object.id);
        await releaseArtworkHold(event.data.object.id);
        break;
      case "charge.refunded":
        await refundBookingPayment(event.data.object.payment_intent);
        break;
      default: break;
    }
  } catch (error) {
    console.error("Stripe webhook processing failed", error);
    if (claimed) await supabaseAdmin.from("stripe_events").delete().eq("id",event.id);
    return NextResponse.json({error:"Webhook processing failed."},{status:500});
  }
  return NextResponse.json({received:true});
}
