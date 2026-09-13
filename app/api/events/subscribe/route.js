import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { isTrustedBrowserRequest } from "@/lib/request-security";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "event-subscribe", { limit: 3, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status:429 });
  try {
    const { email, locale: requestedLocale } = await request.json();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const locale = ["lv", "en", "ru"].includes(requestedLocale) ? requestedLocale : "en";
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) throw new Error("Please enter a valid email address.");
    const { error } = await supabaseAdmin.from("event_subscribers").upsert({ email:cleanEmail, locale, unsubscribed_at:null }, { onConflict:"email" });
    if (error) throw error;
    return NextResponse.json({ ok:true });
  } catch (error) { return NextResponse.json({ error:error.message || "Could not save your email." }, { status:400 }); }
}
