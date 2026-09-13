import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendEventReminder } from "@/lib/booking-email";

const HOUR=60*60*1000;
async function sendWindow(label,hoursAhead){
  const target=new Date(Date.now()+hoursAhead*HOUR); const from=new Date(target.getTime()-35*60*1000).toISOString(); const to=new Date(target.getTime()+35*60*1000).toISOString();
  const {data:events,error}=await supabaseAdmin.from("studio_events").select("*").eq("status","published").gte("starts_at",from).lte("starts_at",to);
  if(error)throw error; let sent=0;
  for(const event of events||[]){const {data:tickets,error:ticketError}=await supabaseAdmin.from("event_tickets").select("id,customer_name,email,locale,manage_token").eq("event_id",event.id).in("status",["reserved","paid"]);if(ticketError)throw ticketError;for(const ticket of tickets||[]){const {data:existing,error:logError}=await supabaseAdmin.from("event_email_log").select("id").eq("ticket_id",ticket.id).eq("email_type",label).maybeSingle();if(logError)throw logError;if(existing)continue;await sendEventReminder({email:ticket.email,name:ticket.customer_name,event,ticketToken:ticket.manage_token,locale:ticket.locale});const {error:insertError}=await supabaseAdmin.from("event_email_log").insert({event_id:event.id,ticket_id:ticket.id,email_type:label,email:ticket.email});if(insertError)throw insertError;sent++;}}
  return sent;
}
export async function POST(request){const secret=process.env.EVENT_REMINDER_SECRET;if(!secret||request.headers.get("authorization")!==`Bearer ${secret}`)return NextResponse.json({error:"Unauthorized."},{status:401});if(!supabaseAdmin)return NextResponse.json({error:"Events are not configured yet."},{status:503});try{const [threeDays,oneDay]=await Promise.all([sendWindow("reminder_3d",72),sendWindow("reminder_24h",24)]);return NextResponse.json({ok:true,threeDays,oneDay});}catch(error){console.error("Event reminders failed",error);return NextResponse.json({error:"Could not send event reminders."},{status:500});}}
