import { NextResponse } from "next/server";
import { artwork } from "@/lib/catalog";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { ensureRollingClassSessions } from "@/lib/regular-class-schedule";

const emptyResult = { data: [], error: null };
const isStudioWorkSession = (session) =>
  session.title_en === "Studio work session" || session.title_lv === "Patstāvīgs darbs studijā";

export async function GET(request) {
  const scope = new URL(request.url).searchParams.get("scope") || "legacy";
  const eventOnly = scope === "events";
  const bookingOnly = scope === "booking";
  const shopOnly = scope === "shop";

  if (!supabaseAdmin) {
    if (eventOnly) return NextResponse.json({ eventBusyTimes: [], mode: "demo" });
    if (bookingOnly) return NextResponse.json({ classAvailability: [], classSessions: [], privateAvailableIds: [], privateSlots: [], mode: "demo" });
    return NextResponse.json({ availableIds: artwork.map((item) => item.id), artworks: shopOnly ? artwork : undefined, mode: "demo" });
  }

  try {
    await ensureRollingClassSessions(supabaseAdmin);
  } catch (error) {
    console.error("Could not extend recurring class sessions", error);
  }

  const now = new Date().toISOString();
  const recentHistory = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  if (eventOnly) {
    // The planner needs anonymous occupied intervals only, not the full
    // booking catalogue (titles, prices and every open slot).
    const [classesResult, holdsResult, busyPrivateSlotsResult] = await Promise.all([
      supabaseAdmin.from("class_sessions").select("starts_at,ends_at,title_en,title_lv").eq("status", "open").gte("ends_at", now).order("starts_at"),
      supabaseAdmin.from("booking_holds").select("private_slot_id").gt("expires_at", now).not("private_slot_id", "is", null),
      supabaseAdmin.from("private_slots").select("starts_at,ends_at").in("status", ["held", "booked"]).gte("ends_at", now).order("starts_at"),
    ]);
    const error = [classesResult, holdsResult, busyPrivateSlotsResult].find((result) => result.error)?.error;
    if (error) return NextResponse.json({ error: "Catalogue is unavailable." }, { status: 503 });
    const heldIds = (holdsResult.data || []).map((row) => row.private_slot_id).filter(Boolean);
    const heldOpenSlotsResult = heldIds.length
      ? await supabaseAdmin.from("private_slots").select("starts_at,ends_at").in("id", heldIds)
      : emptyResult;
    if (heldOpenSlotsResult.error) return NextResponse.json({ error: "Catalogue is unavailable." }, { status: 503 });
    return NextResponse.json({
      // A self-directed studio-work window is intentionally lower priority
      // than an event. Group classes and every confirmed/held private booking
      // remain unavailable in the event planner.
      eventBusyTimes: [...(classesResult.data || []).filter((session) => !isStudioWorkSession(session)), ...(busyPrivateSlotsResult.data || []), ...(heldOpenSlotsResult.data || [])],
      mode: "live",
    });
  }

  if (shopOnly) {
    const artworkResult = await supabaseAdmin.from("artworks").select("id,title_en,title_lv,description_en,description_lv,medium,dimensions,price_cents,image_path").eq("status", "available").order("created_at", { ascending: false });
    if (artworkResult.error) return NextResponse.json({ error: "Catalogue is unavailable." }, { status: 503 });
    const artworks = (artworkResult.data || []).map((item) => ({ id: item.id, title: item.title_en, titleLv: item.title_lv, description: item.description_en, descriptionLv: item.description_lv, medium: item.medium, size: item.dimensions, price: item.price_cents / 100, image: item.image_path }));
    return NextResponse.json({ availableIds: artworks.map((item) => item.id), artworks, mode: "live" });
  }

  const [artworkResult, classesResult, bookingsResult, holdsResult, slotsResult, busyPrivateSlotsResult] = await Promise.all([
    bookingOnly ? Promise.resolve(emptyResult) : supabaseAdmin.from("artworks").select("id,title_en,title_lv,description_en,description_lv,medium,dimensions,price_cents,image_path").eq("status", "available").order("created_at", { ascending: false }),
    supabaseAdmin.from("class_sessions").select("id,title_en,title_lv,starts_at,ends_at,capacity,price_cents,status").eq("status", "open").gte("ends_at", recentHistory).order("starts_at"),
    supabaseAdmin.from("bookings").select("class_session_id").eq("status", "confirmed").not("class_session_id", "is", null),
    supabaseAdmin.from("booking_holds").select("class_session_id,private_slot_id").gt("expires_at", now),
    supabaseAdmin.from("private_slots").select("id,starts_at,ends_at,price_cents").eq("status", "open").gte("ends_at", now).order("starts_at"),
    supabaseAdmin.from("private_slots").select("id,starts_at,ends_at").in("status", ["held", "booked"]).gte("ends_at", now).order("starts_at"),
  ]);
  const error = [artworkResult, classesResult, bookingsResult, holdsResult, slotsResult, busyPrivateSlotsResult].find((result) => result.error)?.error;
  if (error) return NextResponse.json({ error: "Catalogue is unavailable." }, { status: 503 });

  const countBy = (rows, key) => rows.reduce((counts, row) => {
    if (row[key]) counts[row[key]] = (counts[row[key]] || 0) + 1;
    return counts;
  }, {});
  const booked = countBy(bookingsResult.data || [], "class_session_id");
  const held = countBy(holdsResult.data || [], "class_session_id");
  const withAvailability = (session) => ({ ...session, past: new Date(session.ends_at) < new Date(now), available: new Date(session.ends_at) >= new Date(now) && Math.max(0, session.capacity - (booked[session.id] || 0) - (held[session.id] || 0)) > 0 });
  const heldPrivate = new Set((holdsResult.data || []).map((row) => row.private_slot_id).filter(Boolean));
  const heldPrivateTimes = (slotsResult.data || []).filter((slot) => heldPrivate.has(slot.id));
  const eventBusyTimes = [...(classesResult.data || []).filter((session) => !isStudioWorkSession(session)), ...(busyPrivateSlotsResult.data || []), ...heldPrivateTimes].map((slot) => ({ starts_at: slot.starts_at, ends_at: slot.ends_at }));
  const response = {
    classAvailability: (classesResult.data || []).map((session) => ({ id: session.id, available: withAvailability(session).available })),
    classSessions: (classesResult.data || []).map((session) => {
      const live = withAvailability(session);
      return { id: live.id, title_en: live.title_en, title_lv: live.title_lv, starts_at: live.starts_at, ends_at: live.ends_at, price_cents: live.price_cents, status: live.status, available: live.available, past: live.past };
    }),
    privateAvailableIds: (slotsResult.data || []).map((slot) => slot.id).filter((id) => !heldPrivate.has(id)),
    privateSlots: (slotsResult.data || []).filter((slot) => !heldPrivate.has(slot.id)),
    eventBusyTimes,
    mode: "live",
  };
  if (!bookingOnly) {
    const artworks = (artworkResult.data || []).map((item) => ({ id: item.id, title: item.title_en, titleLv: item.title_lv, description: item.description_en, descriptionLv: item.description_lv, medium: item.medium, size: item.dimensions, price: item.price_cents / 100, image: item.image_path }));
    response.availableIds = artworks.map((item) => item.id);
    response.artworks = artworks;
  }
  return NextResponse.json(response);
}
