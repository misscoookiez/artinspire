import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendEventAnnouncement } from "@/lib/booking-email";

const fields = new Set(["slug","status","starts_at","ends_at","capacity","price_cents","image_url","video_url","title_lv","title_en","title_ru","summary_lv","summary_en","summary_ru","description_lv","description_en","description_ru","host_lv","host_en","host_ru","location_lv","location_en","location_ru"]);
const statuses = new Set(["draft","published","cancelled"]);
const pick = (source) => Object.fromEntries(Object.entries(source || {}).filter(([key,value]) => fields.has(key) && value !== undefined));
function validate(values, creating = false) {
  if (values.status && !statuses.has(values.status)) throw new Error("Invalid event status.");
  if (values.capacity !== undefined && (!Number.isInteger(values.capacity) || values.capacity < 1 || values.capacity > 35)) throw new Error("Ticket capacity must be between 1 and 35.");
  if (values.price_cents !== undefined && values.price_cents !== null && (!Number.isInteger(values.price_cents) || values.price_cents < 0)) throw new Error("Price must be a whole number of cents.");
  if (values.starts_at && values.ends_at && new Date(values.starts_at).getTime() >= new Date(values.ends_at).getTime()) throw new Error("The event must end after it starts.");
  if (creating && (![values.slug,values.starts_at,values.ends_at,values.title_lv,values.title_en,values.title_ru].every(Boolean))) throw new Error("Add a slug, start and end time, and all three titles.");
}
async function notifySubscribers(event) {
  if (event.status !== "published") return 0;
  const { data:subscribers, error } = await supabaseAdmin.from("event_subscribers").select("email,locale").is("unsubscribed_at", null);
  if (error) throw error;
  let sent = 0;
  for (const subscriber of subscribers || []) {
    const { data:existing, error:logError } = await supabaseAdmin.from("event_email_log").select("id").eq("event_id",event.id).eq("email",subscriber.email).eq("email_type","published").maybeSingle();
    if (logError) throw logError;
    if (existing) continue;
    await sendEventAnnouncement({ email:subscriber.email, event, locale:subscriber.locale });
    const { error:insertError } = await supabaseAdmin.from("event_email_log").insert({ event_id:event.id, email:subscriber.email, email_type:"published" });
    if (insertError) throw insertError;
    sent++;
  }
  return sent;
}

export async function GET(request) {
  const auth = await requireOwner(request); if (auth.error) return NextResponse.json({ error:auth.error }, { status:auth.status });
  const [events,tickets,waitlist,subscribers] = await Promise.all([
    supabaseAdmin.from("studio_events").select("*").order("starts_at"),
    supabaseAdmin.from("event_tickets").select("id,event_id,customer_name,email,locale,status,amount_cents,created_at").order("created_at", { ascending:false }),
    supabaseAdmin.from("event_waitlist").select("id,event_id,customer_name,email,locale,status,created_at").order("created_at", { ascending:false }),
    supabaseAdmin.from("event_subscribers").select("id,email,locale,created_at,unsubscribed_at").order("created_at", { ascending:false }),
  ]);
  const error = [events,tickets,waitlist,subscribers].find((result) => result.error)?.error;
  if (error) return NextResponse.json({ error:"Events are temporarily unavailable. Run the ticketed-events database migration first." }, { status:503 });
  return NextResponse.json({ events:events.data || [], tickets:tickets.data || [], waitlist:waitlist.data || [], subscribers:subscribers.data || [] });
}

export async function POST(request) {
  const auth = await requireOwner(request); if (auth.error) return NextResponse.json({ error:auth.error }, { status:auth.status });
  try {
    const body = await request.json(); const values = pick(body.values); const notify = Boolean(body.notifySubscribers);
    validate(values, true);
    const { data, error } = await supabaseAdmin.from("studio_events").insert({ ...values, capacity:values.capacity || 14, status:values.status || "draft" }).select().single();
    if (error) throw error;
    const announced = notify ? await notifySubscribers(data) : 0;
    return NextResponse.json({ event:data, announced }, { status:201 });
  } catch (error) { return NextResponse.json({ error:error.message || "Could not create the event." }, { status:400 }); }
}

export async function PATCH(request) {
  const auth = await requireOwner(request); if (auth.error) return NextResponse.json({ error:auth.error }, { status:auth.status });
  try {
    const { id, values:raw, notifySubscribers:notify } = await request.json(); const values = pick(raw);
    if (!/^[0-9a-f-]{36}$/i.test(String(id || "")) || !Object.keys(values).length) throw new Error("Choose an event and a change to save.");
    validate(values);
    values.updated_at = new Date().toISOString();
    const { data, error } = await supabaseAdmin.from("studio_events").update(values).eq("id", id).select().single();
    if (error) throw error;
    const announced = notify ? await notifySubscribers(data) : 0;
    return NextResponse.json({ event:data, announced });
  } catch (error) { return NextResponse.json({ error:error.message || "Could not update the event." }, { status:400 }); }
}
