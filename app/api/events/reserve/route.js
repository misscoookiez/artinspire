import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { reserveEventTicket } from "@/lib/events";
import { sendEventTicketConfirmation } from "@/lib/booking-email";
import { isTrustedBrowserRequest } from "@/lib/request-security";
import { rateLimit } from "@/lib/rate-limit";

const validLocale = (value) => ["lv", "en", "ru"].includes(value) ? value : "en";

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "event-reserve", { limit: 5, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429 });
  try {
    const { eventId, name, email, locale: requestedLocale } = await request.json();
    const locale = validLocale(requestedLocale);
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!/^[0-9a-f-]{36}$/i.test(String(eventId)) || !cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error("Please enter your name and email address.");
    const ticketId = await reserveEventTicket({ eventId, name: cleanName, email: cleanEmail, locale });
    const [{ data: ticket, error: ticketError }, { data: event, error: eventError }] = await Promise.all([
      supabaseAdmin.from("event_tickets").select("manage_token").eq("id", ticketId).single(),
      supabaseAdmin.from("studio_events").select("*").eq("id", eventId).single(),
    ]);
    if (ticketError || eventError) throw new Error("Your place was reserved, but the confirmation could not be prepared.");
    try { await sendEventTicketConfirmation({ email: cleanEmail, name: cleanName, event, ticketToken: ticket.manage_token, locale, paid: false }); }
    catch (error) { console.error("Event reservation confirmation failed", error); }
    return NextResponse.json({ ok: true, ticketId });
  } catch (error) {
    const full = /full/i.test(error.message || "");
    return NextResponse.json({ error: full ? "This event is full. You can join the waitlist instead." : error.message || "Could not reserve this place." }, { status: full ? 409 : 400 });
  }
}
