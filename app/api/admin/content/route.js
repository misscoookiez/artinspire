import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const validLocales = new Set(["lv", "en", "ru"]);

export async function PATCH(request) {
  const auth = await requireOwner(request);
  if (auth.error) return NextResponse.json({ error:auth.error }, { status:auth.status });
  try {
    const { page, locale, entries } = await request.json();
    if (typeof page !== "string" || !validLocales.has(locale) || !Array.isArray(entries) || !entries.length) {
      return NextResponse.json({ error:"Invalid content update." }, { status:400 });
    }
    const rows = entries.map(({ id, value }) => ({ id, page, locale, value, updated_by:auth.user.id }));
    if (rows.some(row => typeof row.id !== "string" || !row.id || typeof row.value !== "string")) {
      return NextResponse.json({ error:"Every content entry needs an id and text value." }, { status:400 });
    }
    const { error } = await supabaseAdmin.from("site_content").upsert(rows, { onConflict:"page,locale,id" });
    if (error) throw error;
    return NextResponse.json({ saved:rows.length });
  } catch (error) {
    console.error("Owner content update failed", error);
    return NextResponse.json({ error:"Could not save the content update." }, { status:500 });
  }
}
