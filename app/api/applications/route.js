import { NextResponse } from "next/server";
import { sendGroupApplication } from "@/lib/booking-email";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { rateLimit } from "@/lib/rate-limit";
import { isTrustedBrowserRequest } from "@/lib/request-security";

const weeklyGroupKeys = new Set([
  "thu-youth",
  "thu-adult",
  "sat-youth",
  "sat-adult",
  "sun-mixed-am",
  "sun-mixed-pm",
]);

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "weekly-signup", { limit: 5, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": String(throttle.retryAfter) } });
  try {
    const { name, email, group, groupKey } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanGroup = String(group || "").trim();
    const cleanGroupKey = String(groupKey || "").trim();
    if (!cleanName || !cleanGroup || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
    }
    if (cleanName.length > 120 || cleanEmail.length > 254 || cleanGroup.length > 160) {
      return NextResponse.json({ error: "Please shorten the application details." }, { status: 400 });
    }
    if (!weeklyGroupKeys.has(cleanGroupKey)) {
      return NextResponse.json({ error: "Please choose one of the weekly groups." }, { status: 400 });
    }
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Weekly sign-ups are temporarily unavailable. Please try again shortly." }, { status: 503 });
    }
    const { data: reservationId, error: reservationError } = await supabaseAdmin.rpc(
      "reserve_weekly_group_place",
      {
        p_group_key: cleanGroupKey,
        p_group_label: cleanGroup,
        p_customer_name: cleanName,
        p_email: cleanEmail,
      },
    );
    if (reservationError) {
      const full = /currently full/i.test(reservationError.message || "");
      return NextResponse.json(
        { error: full ? "This weekly group is currently full. Please choose another time." : "Could not reserve this weekly place. Please try again." },
        { status: full ? 409 : 500 },
      );
    }
    try {
      await sendGroupApplication({ name: cleanName, email: cleanEmail, group: cleanGroup });
    } catch (emailError) {
      console.error("Weekly sign-up email could not be sent", emailError);
    }
    return NextResponse.json({ ok: true, reservationId });
  } catch (error) {
    console.error("Group application failed", error);
    return NextResponse.json({ error: "Could not send the application. Please try again." }, { status: 500 });
  }
}
