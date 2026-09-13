import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { isTrustedBrowserRequest } from "@/lib/request-security";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "event-waitlist", { limit: 5, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429 });
  try {
    const { eventId, name, email, locale: requestedLocale } = await request.json();
    const locale = ["lv", "en", "ru"].includes(requestedLocale) ? requestedLocale : "en";
    const cleanName = String(name || "").trim(); const cleanEmail = String(email || "").trim().toLowerCase();
    if (!/^[0-9a-f-]{36}$/i.test(String(eventId)) || !cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error("Please enter your name and email address.");
    const { error } = await supabaseAdmin.from("event_waitlist").upsert({ event_id:eventId, customer_name:cleanName, email:cleanEmail, locale, status:"waiting" }, { onConflict:"event_id,email" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) { return NextResponse.json({ error: error.message || "Could not join the waitlist." }, { status:400 }); }
}
