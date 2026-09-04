import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const statuses = new Set(["confirmed", "cancelled", "refunded"]);

export async function PATCH(request) {
  const auth = await requireOwner(request);
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { id, status, type = "paid" } = await request.json();
    if (typeof id !== "string") throw new Error("Choose a valid booking.");
    if (type === "weekly") {
      if (!new Set(["confirmed", "cancelled"]).has(status)) throw new Error("Choose a valid weekly application status.");
      const { data, error } = await supabaseAdmin.from("weekly_group_signups").update({ status }).eq("id", id).select("id,status").single();
      if (error) throw error;
      return NextResponse.json({ booking: data });
    }
    if (!statuses.has(status)) throw new Error("Choose a valid booking status.");
    const update = { status };
    if (status === "cancelled") update.cancelled_at = new Date().toISOString();
    const { data, error } = await supabaseAdmin.from("bookings").update(update).eq("id", id).select("id,status,cancelled_at").single();
    if (error) throw error;
    return NextResponse.json({ booking: data });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not update this booking." }, { status: 400 });
  }
}
