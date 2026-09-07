import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const statuses = new Set(["confirmed", "cancelled", "refunded"]);

async function rescheduleBooking(booking, resourceId) {
  if (typeof resourceId !== "string" || !resourceId)
    throw new Error("Choose a new session or studio time.");
  const table = booking.kind === "private" ? "private_slots" : "class_sessions";
  const { data: target, error: targetError } = await supabaseAdmin
    .from(table)
    .select("id,starts_at,ends_at,capacity,status")
    .eq("id", resourceId)
    .single();
  if (targetError || !target || target.status !== "open")
    throw new Error("That time is no longer available.");
  if (new Date(target.starts_at).getTime() <= Date.now())
    throw new Error("Choose a future time.");

  if (booking.kind === "class") {
    const [{ count: booked, error: bookedError }, { count: held, error: heldError }] = await Promise.all([
      supabaseAdmin.from("bookings").select("id", { count: "exact", head: true }).eq("class_session_id", resourceId).eq("status", "confirmed"),
      supabaseAdmin.from("booking_holds").select("id", { count: "exact", head: true }).eq("class_session_id", resourceId).gt("expires_at", new Date().toISOString()),
    ]);
    if (bookedError || heldError) throw new Error("Could not check class capacity.");
    if ((booked || 0) + (held || 0) >= target.capacity)
      throw new Error("That class is already full.");
  } else {
    const { error: reserveError } = await supabaseAdmin
      .from("private_slots")
      .update({ status: "booked" })
      .eq("id", resourceId)
      .eq("status", "open");
    if (reserveError) throw reserveError;
  }

  const update = booking.kind === "private"
    ? { private_slot_id: resourceId, cancelled_at: null, status: "confirmed" }
    : { class_session_id: resourceId, cancelled_at: null, status: "confirmed" };
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .update(update)
    .eq("id", booking.id)
    .select("id,status,class_session_id,private_slot_id,cancelled_at")
    .single();
  if (error) {
    if (booking.kind === "private")
      await supabaseAdmin.from("private_slots").update({ status: "open" }).eq("id", resourceId);
    throw error;
  }
  if (booking.kind === "private" && booking.private_slot_id && booking.private_slot_id !== resourceId)
    await supabaseAdmin.from("private_slots").update({ status: "open" }).eq("id", booking.private_slot_id);
  return data;
}

export async function PATCH(request) {
  const auth = await requireOwner(request);
  if (auth.error)
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { id, status, type = "paid", action, resourceId } = await request.json();
    if (typeof id !== "string") throw new Error("Choose a valid booking.");
    if (type === "weekly") {
      if (!new Set(["confirmed", "cancelled"]).has(status))
        throw new Error("Choose a valid weekly application status.");
      const { data, error } = await supabaseAdmin
        .from("weekly_group_signups")
        .update({ status })
        .eq("id", id)
        .select("id,status")
        .single();
      if (error) throw error;
      return NextResponse.json({ booking: data });
    }
    const { data: existing, error: existingError } = await supabaseAdmin
      .from("bookings")
      .select("id,kind,status,class_session_id,private_slot_id")
      .eq("id", id)
      .single();
    if (existingError || !existing) throw new Error("Booking not found.");
    if (action === "reschedule") {
      const booking = await rescheduleBooking(existing, resourceId);
      return NextResponse.json({ booking });
    }
    if (!statuses.has(status))
      throw new Error("Choose a valid booking status.");
    const update = { status };
    if (status === "cancelled" || status === "refunded") update.cancelled_at = new Date().toISOString();
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .update(update)
      .eq("id", id)
      .select("id,status,cancelled_at")
      .single();
    if (error) throw error;
    if ((status === "cancelled" || status === "refunded") && existing.kind === "private" && existing.private_slot_id)
      await supabaseAdmin.from("private_slots").update({ status: "open" }).eq("id", existing.private_slot_id);
    return NextResponse.json({ booking: data });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not update this booking." },
      { status: 400 },
    );
  }
}
