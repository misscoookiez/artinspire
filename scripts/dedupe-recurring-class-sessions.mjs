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

const todayParts = rigaParts(new Date());
const today = `${todayParts.year}-${todayParts.month}-${todayParts.day}`;
const [sessionsResult, bookingsResult, holdsResult] = await Promise.all([
  database.from("class_sessions").select("id,title_en,title_lv,starts_at,created_at").gte("starts_at", `${today}T00:00:00Z`).order("created_at"),
  database.from("bookings").select("class_session_id").eq("status", "confirmed").not("class_session_id", "is", null),
  database.from("booking_holds").select("class_session_id").gt("expires_at", new Date().toISOString()).not("class_session_id", "is", null),
]);
const error = [sessionsResult, bookingsResult, holdsResult].find((result) => result.error)?.error;
if (error) throw error;

const protectedIds = new Set([
  ...(bookingsResult.data || []).map((row) => row.class_session_id),
  ...(holdsResult.data || []).map((row) => row.class_session_id),
]);
const groups = new Map();
for (const session of sessionsResult.data || []) {
  const type = groupType(session);
  if (!type) continue;
  const parts = rigaParts(session.starts_at);
  const key = `${parts.year}-${parts.month}-${parts.day}|${parts.hour}:${parts.minute}|${type}`;
  groups.set(key, [...(groups.get(key) || []), session]);
}

const duplicateGroups = [...groups.entries()].filter(([, sessions]) => sessions.length > 1);
const deletable = [];
const protectedConflicts = [];
for (const [group, sessions] of duplicateGroups) {
  const protectedSessions = sessions.filter((session) => protectedIds.has(session.id));
  if (protectedSessions.length > 1) {
    protectedConflicts.push({ group, ids: protectedSessions.map((session) => session.id) });
    continue;
  }
  const keep = protectedSessions[0] || sessions[0];
  deletable.push(...sessions.filter((session) => session.id !== keep.id).map((session) => session.id));
}

const summary = {
  mode: apply ? "apply" : "dry-run",
  regularSessionGroups: groups.size,
  duplicateGroups: duplicateGroups.length,
  protectedConflicts,
  recordsToDelete: deletable.length,
};
if (!apply) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(protectedConflicts.length ? 1 : 0);
}
if (protectedConflicts.length) throw new Error("Refusing to remove duplicate sessions that both have active bookings or holds.");
let deleted = 0;
if (deletable.length) {
  const { data: deletedRows, error: deleteError } = await database
    .from("class_sessions")
    .delete()
    .in("id", deletable)
    .select("id");
  if (deleteError) throw deleteError;
  deleted = deletedRows?.length || 0;
  if (deleted !== deletable.length) throw new Error(`Expected to delete ${deletable.length} duplicate sessions, deleted ${deleted}.`);
}
console.log(JSON.stringify({ ...summary, deleted }, null, 2));
