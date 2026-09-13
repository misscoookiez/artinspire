import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ events: [] });
  const now = new Date().toISOString();
  const [{ data: events, error: eventsError }, { data: tickets, error: ticketsError }, { data: holds, error: holdsError }] = await Promise.all([
    supabaseAdmin.from("studio_events").select("*").eq("status", "published").gte("ends_at", now).order("starts_at"),
    supabaseAdmin.from("event_tickets").select("event_id,status").in("status", ["reserved", "paid"]),
    supabaseAdmin.from("event_ticket_holds").select("event_id").gt("expires_at", now),
  ]);
  if (eventsError || ticketsError || holdsError) return NextResponse.json({ error: "Events are temporarily unavailable." }, { status: 503 });
  const counts = new Map();
  for (const item of [...(tickets || []), ...(holds || [])]) counts.set(item.event_id, (counts.get(item.event_id) || 0) + 1);
  return NextResponse.json({ events: (events || []).map((event) => ({ ...event, available: Math.max(0, event.capacity - (counts.get(event.id) || 0)) })) });
}
