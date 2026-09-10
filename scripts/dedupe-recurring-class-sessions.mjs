import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Supabase server credentials are required.");

const apply = process.argv.includes("--apply");
const database = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const timeZone = "Europe/Riga";
const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function rigaParts(value) {
  return Object.fromEntries(
    formatter
      .formatToParts(new Date(value))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function groupType(session) {
  const parts = rigaParts(session.starts_at);
  const weekday = new Date(`${parts.year}-${parts.month}-${parts.day}T12:00:00Z`).getUTCDay();
  const time = `${parts.hour}:${parts.minute}`;
  const title = `${session.title_en || ""} ${session.title_lv || ""}`.toLowerCase();
  if ([4, 6].includes(weekday) && ["16:00", "11:00"].includes(time) && /youth|jauniešu/.test(title)) return "youth";
  if ([4, 6].includes(weekday) && ["18:30", "14:00"].includes(time) && /adult|pieaugušo/.test(title)) return "adult";
  if (weekday === 0 && ["11:00", "14:00"].includes(time) && /mixed|jaukta/.test(title)) return "mixed";
  return null;
}

function offsetForRiga(dateString, time) {
  const probe = new Date(`${dateString}T${time}:00Z`);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(probe)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = (offset || "GMT+3").replace("GMT", "").match(/^([+-])(\d{1,2})(?::?(\d{2}))?$/);
  return `${match[1]}${match[2].padStart(2, "0")}:${match[3] || "00"}`;
}

function localIso(dateString, time) {
  return `${dateString}T${time}:00${offsetForRiga(dateString, time)}`;
}

const todayParts = rigaParts(new Date());
const today = `${todayParts.year}-${todayParts.month}-${todayParts.day}`;
const firstDay = new Date(`${today}T12:00:00Z`);
const weeklyTemplate = [
  { day: 4, start: "16:00", title: "Youth group (ages 8–16)" },
  { day: 4, start: "18:30", title: "Adult group" },
  { day: 6, start: "11:00", title: "Youth group (ages 8–16)" },
  { day: 6, start: "14:00", title: "Adult group" },
  { day: 0, start: "11:00", title: "Mixed group" },
  { day: 0, start: "14:00", title: "Mixed group" },
];
const recurringSlots = [];
for (let offset = 0; offset <= 184; offset += 1) {
  const date = new Date(firstDay);
  date.setUTCDate(firstDay.getUTCDate() + offset);
  const dateString = date.toISOString().slice(0, 10);
  for (const entry of weeklyTemplate.filter((item) => item.day === date.getUTCDay())) {
    recurringSlots.push({ startsAt: localIso(dateString, entry.start), type: entry.title });
  }
}

const [bookingsResult, holdsResult] = await Promise.all([
  database.from("bookings").select("class_session_id").eq("status", "confirmed").not("class_session_id", "is", null),
  database.from("booking_holds").select("class_session_id").gt("expires_at", new Date().toISOString()).not("class_session_id", "is", null),
]);
const error = [bookingsResult, holdsResult].find((result) => result.error)?.error;
if (error) throw error;

const protectedIds = new Set([
  ...(bookingsResult.data || []).map((row) => row.class_session_id),
  ...(holdsResult.data || []).map((row) => row.class_session_id),
]);
const summary = { mode: apply ? "apply" : "dry-run", regularSessionGroups: recurringSlots.length, duplicateGroups: 0, protectedConflicts: [], recordsToDelete: 0, deleted: 0 };
async function inspectSlot(slot) {
  const { data, error: slotError } = await database
    .from("class_sessions")
    .select("id,title_en,title_lv,starts_at,created_at")
    .eq("starts_at", slot.startsAt)
    .order("created_at")
    .order("id");
  if (slotError) throw slotError;
  const sessions = (data || []).filter((session) => groupType(session));
  if (sessions.length < 2) return;
  summary.duplicateGroups += 1;
  const protectedSessions = sessions.filter((session) => protectedIds.has(session.id));
  if (protectedSessions.length > 1) {
    summary.protectedConflicts.push({ startsAt: slot.startsAt, ids: protectedSessions.map((session) => session.id) });
    return;
  }
  const keep = protectedSessions[0] || sessions[0];
  const deletable = sessions.filter((session) => session.id !== keep.id).map((session) => session.id);
  summary.recordsToDelete += deletable.length;
  if (!apply) return;
  for (let index = 0; index < deletable.length; index += 100) {
    const ids = deletable.slice(index, index + 100);
    const { data: deletedRows, error: deleteError } = await database.from("class_sessions").delete().in("id", ids).select("id");
    if (deleteError) throw deleteError;
    if ((deletedRows?.length || 0) !== ids.length) throw new Error(`Could not remove every duplicate for ${slot.startsAt}.`);
    summary.deleted += deletedRows.length;
  }
}
for (let index = 0; index < recurringSlots.length; index += 12) {
  await Promise.all(recurringSlots.slice(index, index + 12).map(inspectSlot));
}
if (summary.protectedConflicts.length) throw new Error("Refusing to remove duplicate sessions that both have active bookings or holds.");
console.log(JSON.stringify(summary, null, 2));
