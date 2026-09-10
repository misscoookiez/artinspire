import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendEventInquiryConfirmation, sendInquiry } from "@/lib/booking-email";
import { isTrustedBrowserRequest } from "@/lib/request-security";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { availableEventHours, isStudioWorkSession, rigaDateKey } from "@/lib/event-availability";
import { ensureRollingClassSessions } from "@/lib/regular-class-schedule";

const eventRequestIsValid = (dateKey, hour, duration) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey || "")) return false;
  const selectedDate = new Date(`${dateKey}T12:00:00Z`);
  const today = new Date(`${rigaDateKey(new Date())}T12:00:00Z`);
  const finalDate = new Date(today);
  finalDate.setUTCDate(finalDate.getUTCDate() + 184);
  return selectedDate >= today && selectedDate <= finalDate && Number.isInteger(hour) && Number.isInteger(duration);
};

async function eventTimeIsAvailable({ dateKey, hour, duration }) {
  if (!supabaseAdmin || !eventRequestIsValid(dateKey, hour, duration)) return false;
  await ensureRollingClassSessions(supabaseAdmin);
  const now = new Date().toISOString();
  const [classesResult, holdsResult, busyPrivateSlotsResult] = await Promise.all([
    supabaseAdmin.from("class_sessions").select("starts_at,ends_at,title_en,title_lv").eq("status", "open").gte("ends_at", now),
    supabaseAdmin.from("booking_holds").select("private_slot_id").gt("expires_at", now).not("private_slot_id", "is", null),
    supabaseAdmin.from("private_slots").select("starts_at,ends_at,price_cents").in("status", ["held", "booked"]).gte("ends_at", now),
  ]);
  const error = [classesResult, holdsResult, busyPrivateSlotsResult].find((result) => result.error)?.error;
  if (error) throw error;
  const heldIds = (holdsResult.data || []).map((row) => row.private_slot_id).filter(Boolean);
  const heldOpenSlotsResult = heldIds.length
    ? await supabaseAdmin.from("private_slots").select("starts_at,ends_at,price_cents").in("id", heldIds)
    : { data: [], error: null };
  if (heldOpenSlotsResult.error) throw heldOpenSlotsResult.error;
  const busyTimes = [
    ...(classesResult.data || [])
      .filter((session) => !isStudioWorkSession(session))
      .map((session) => ({ starts_at: session.starts_at, ends_at: session.ends_at, source: "class" })),
    ...(busyPrivateSlotsResult.data || []),
    ...(heldOpenSlotsResult.data || []),
  ]
    .filter((slot) => slot.source === "class" || slot.price_cents !== 2000)
    .map((slot) => slot.source === "class" ? slot : ({ starts_at: slot.starts_at, ends_at: slot.ends_at, source: "booking" }));
  return availableEventHours(dateKey, duration, busyTimes).includes(hour);
}

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "inquiry", { limit: 5, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": String(throttle.retryAfter) } });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json({ error: "Messaging is temporarily unavailable. Please use email or WhatsApp instead." }, { status: 503 });
  }
  try {
    const { name, email, topic, message, kind, eventDate, eventStartHour, eventDuration } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanTopic = String(topic || "Studio inquiry").trim();
    const cleanMessage = String(message || "").trim();
    if (!cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail) || !cleanMessage) return NextResponse.json({ error: "Please enter your name, email and message." }, { status: 400 });
    if (cleanName.length > 120 || cleanEmail.length > 254 || cleanTopic.length > 140 || cleanMessage.length > 4000) return NextResponse.json({ error: "Please shorten your message." }, { status: 400 });
    if (kind === "event") {
      const isAvailable = await eventTimeIsAvailable({
        dateKey: String(eventDate || ""),
        hour: Number(eventStartHour),
        duration: Number(eventDuration),
      });
      if (!isAvailable) return NextResponse.json({ error: "That time is no longer available. Please choose another time." }, { status: 409 });
    }
    await sendInquiry({ name: cleanName, email: cleanEmail, topic: cleanTopic, message: cleanMessage });
    let confirmationSent = false;
    if (kind === "event") {
      try {
        await sendEventInquiryConfirmation({
          name: cleanName,
          email: cleanEmail,
          dateKey: String(eventDate || ""),
          startHour: Number(eventStartHour),
          duration: Number(eventDuration),
        });
        confirmationSent = true;
      } catch (confirmationError) {
        // The studio still receives the request if a customer-mail provider is
        // temporarily unavailable; do not lose a genuine enquiry.
        console.error("Event inquiry confirmation failed", confirmationError);
      }
    }
    return NextResponse.json({ ok: true, confirmationSent });
  } catch (error) {
    console.error("Inquiry failed", error);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
