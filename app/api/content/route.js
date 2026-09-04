import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Public pages request only published, non-sensitive copy. When Supabase has
// not been connected yet, callers receive an empty object and keep their
// carefully authored local fallback copy.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const locale = searchParams.get("locale") || "lv";
  if (!page || !["lv", "en", "ru"].includes(locale)) return NextResponse.json({ error:"Invalid content request." }, { status:400 });
  if (!supabaseAdmin) return NextResponse.json({ content:{}, source:"fallback" });
  const { data, error } = await supabaseAdmin.from("site_content").select("id,value,updated_at").eq("page", page).eq("locale", locale);
  if (error) return NextResponse.json({ error:"Content is temporarily unavailable." }, { status:503 });
  return NextResponse.json({ content:Object.fromEntries((data || []).map(record => [record.id, record.value])), source:"database" });
}
