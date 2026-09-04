import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { bookingCalendar } from "@/lib/booking-email";

export async function GET(_request,{params}){
  const {token}=await params;
  if(!supabaseAdmin||!/^[0-9a-f-]{36}$/i.test(token))return new NextResponse("Not found",{status:404});
  const {data:booking}=await supabaseAdmin.from("bookings").select("kind,manage_token,class_session_id,private_slot_id").eq("manage_token",token).maybeSingle();
  if(!booking)return new NextResponse("Not found",{status:404});
  const table=booking.kind==="private"?"private_slots":"class_sessions";
  const id=booking.kind==="private"?booking.private_slot_id:booking.class_session_id;
  const {data:session}=await supabaseAdmin.from(table).select(booking.kind==="private"?"starts_at,ends_at":"starts_at,ends_at,title_en").eq("id",id).maybeSingle();
  if(!session)return new NextResponse("Not found",{status:404});
  const calendar=bookingCalendar({title:booking.kind==="private"?"Art Studio Inspire session":session.title_en,startsAt:session.starts_at,endsAt:session.ends_at,token});
  return new NextResponse(calendar,{headers:{"Content-Type":"text/calendar; charset=utf-8","Content-Disposition":"attachment; filename=art-studio-inspire.ics"}});
}
