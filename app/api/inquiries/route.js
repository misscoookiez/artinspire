import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendEventInquiryConfirmation, sendInquiry } from "@/lib/booking-email";
import { isTrustedBrowserRequest } from "@/lib/request-security";

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "inquiry", { limit: 5, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": String(throttle.retryAfter) } });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return NextResponse.json({ error: "Messaging is temporarily unavailable. Please use email or WhatsApp instead." }, { status: 503 });
  }
  try {
    const { name, email, topic, message, kind } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanTopic = String(topic || "Studio inquiry").trim();
    const cleanMessage = String(message || "").trim();
    if (!cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail) || !cleanMessage) return NextResponse.json({ error: "Please enter your name, email and message." }, { status: 400 });
    if (cleanName.length > 120 || cleanEmail.length > 254 || cleanTopic.length > 140 || cleanMessage.length > 4000) return NextResponse.json({ error: "Please shorten your message." }, { status: 400 });
    await sendInquiry({ name: cleanName, email: cleanEmail, topic: cleanTopic, message: cleanMessage });
    let confirmationSent = false;
    if (kind === "event") {
      try {
        await sendEventInquiryConfirmation({ name: cleanName, email: cleanEmail });
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
