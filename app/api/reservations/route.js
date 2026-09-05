import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";
import { sendBookingConfirmation, sendReservationNotification } from "@/lib/booking-email";
import { reserveBookingNow } from "@/lib/bookings";
import { isTrustedBrowserRequest } from "@/lib/request-security";

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "reservation", { limit: 6, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": String(throttle.retryAfter) } });
  try {
    const { kind, itemId, name, email, label } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanLabel = String(label || "").trim();
    if (!["class", "private"].includes(kind) || !itemId || !cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Please enter your name, email and a valid time." }, { status: 400 });
    }
    if (cleanName.length > 120 || cleanEmail.length > 254 || cleanLabel.length > 180) {
      return NextResponse.json({ error: "Please shorten the reservation details." }, { status: 400 });
    }
    if (!supabaseAdmin) return NextResponse.json({ error: "Reservations are temporarily unavailable. Please try again shortly." }, { status: 503 });
    let reservationId;
    try { reservationId = await reserveBookingNow({ kind, resourceId: itemId, customerName: cleanName, email: cleanEmail }); }
    catch (error) {
      const unavailable = /unavailable|full|reserved/i.test(error.message || "");
      return NextResponse.json({ error: unavailable ? "That place has just become unavailable." : "Could not reserve this place. Please try again." }, { status: unavailable ? 409 : 500 });
    }
    try { await sendReservationNotification({ name: cleanName, email: cleanEmail, label: cleanLabel, kind }); }
    catch (emailError) { console.error("Reservation notification email failed", emailError); }
    let confirmationSent = false;
    try {
      const { data: confirmedBooking, error: bookingError } = await supabaseAdmin
        .from("bookings")
        .select("kind,manage_token,class_session_id,private_slot_id")
        .eq("id", reservationId)
        .maybeSingle();
      if (bookingError) throw bookingError;
      if (confirmedBooking) {
        const table = confirmedBooking.kind === "private" ? "private_slots" : "class_sessions";
        const resourceId = confirmedBooking.kind === "private" ? confirmedBooking.private_slot_id : confirmedBooking.class_session_id;
        const fields = confirmedBooking.kind === "private" ? "starts_at,ends_at" : "starts_at,ends_at,title_en";
        const { data: session, error: sessionError } = await supabaseAdmin.from(table).select(fields).eq("id", resourceId).maybeSingle();
        if (sessionError) throw sessionError;
        if (session) {
          confirmationSent = await sendBookingConfirmation({
            email: cleanEmail,
            name: cleanName,
            title: confirmedBooking.kind === "private" ? "Art Studio Inspire session" : session.title_en,
            startsAt: session.starts_at,
            endsAt: session.ends_at,
            token: confirmedBooking.manage_token,
          });
        }
      }
    } catch (emailError) { console.error("Reservation confirmation email failed", emailError); }
    return NextResponse.json({ ok: true, reservationId, confirmationSent });
  } catch (error) {
    console.error("Reservation failed", error);
    return NextResponse.json({ error: "Could not reserve this place. Please try again." }, { status: 500 });
  }
}
