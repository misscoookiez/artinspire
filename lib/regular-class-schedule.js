import { createHash } from "node:crypto";

const TIME_ZONE = "Europe/Riga";
// The event planner offers dates six months ahead, so its group-class
// conflicts must be generated through the same horizon.
const HORIZON_DAYS = 184;

// This is the studio's regular rhythm. One-off classes remain editable from
// the owner dashboard; these are only the repeating open groups.
const weeklyTemplate = [
  { day: 4, start: "16:00", end: "18:00", title_en: "Youth group (ages 8–16)", title_lv: "Jauniešu grupa (8–16 gadi)" },
  { day: 4, start: "18:30", end: "20:30", title_en: "Adult group", title_lv: "Pieaugušo grupa" },
  { day: 6, start: "11:00", end: "13:00", title_en: "Youth group (ages 8–16)", title_lv: "Jauniešu grupa (8–16 gadi)" },
  { day: 6, start: "14:00", end: "16:00", title_en: "Adult group", title_lv: "Pieaugušo grupa" },
  { day: 0, start: "11:00", end: "13:00", title_en: "Mixed group", title_lv: "Jaukta grupa" },
  { day: 0, start: "14:00", end: "16:00", title_en: "Mixed group", title_lv: "Jaukta grupa" },
];

// Shared studio-work windows use the same capacity-safe booking model as a
// group class. They are not private appointments: each confirmed customer
// takes one place, leaving the rest of the studio available.
const studioWorkTemplate = [
  { start: "10:00", end: "12:00" },
  { start: "12:00", end: "14:00" },
  { start: "14:00", end: "16:00" },
  { start: "16:00", end: "18:00" },
  { start: "18:00", end: "20:00" },
];

const rigaParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function partsFor(date) {
  return Object.fromEntries(
    rigaParts
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function rigaDate(date) {
  const parts = partsFor(date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function rigaKey(date) {
  const parts = partsFor(date);
  return `${parts.year}-${parts.month}-${parts.day}|${parts.hour}:${parts.minute}`;
}

function offsetForRiga(dateString, time) {
  const probe = new Date(`${dateString}T${time}:00Z`);
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    timeZoneName: "shortOffset",
  })
    .formatToParts(probe)
    .find((part) => part.type === "timeZoneName")?.value;
  const raw = (offset || "GMT+3").replace("GMT", "");
  const match = raw.match(/^([+-])(\d{1,2})(?::?(\d{2}))?$/);
  if (!match) return "+03:00";
  return `${match[1]}${match[2].padStart(2, "0")}:${match[3] || "00"}`;
}

function localIso(dateString, time) {
  return `${dateString}T${time}:00${offsetForRiga(dateString, time)}`;
}

// Recurring sessions need a stable primary key.  The availability endpoint can
// be called simultaneously by several visitors, so generated UUIDs would let
// competing requests create visually identical classes.
function recurringSessionId(kind, date, time) {
  const digest = createHash("sha256")
    .update(`art-studio-inspire:${kind}:${date}:${time}`)
    .digest("hex");
  return `${digest.slice(0, 8)}-${digest.slice(8, 12)}-4${digest.slice(13, 16)}-${((Number.parseInt(digest[16], 16) & 0x3) | 0x8).toString(16)}${digest.slice(17, 20)}-${digest.slice(20, 32)}`;
}

function isRegularWeeklySession(session) {
  const startsAt = new Date(session.starts_at);
  const date = rigaDate(startsAt);
  const time = rigaKey(startsAt).split("|")[1];
  const weekday = rigaMiddayDate(date).getUTCDay();
  const template = weeklyTemplate.find((entry) => entry.day === weekday && entry.start === time);
  if (!template) return false;

  // A manually-created or legacy class can share the same time as a regular
  // group. Only a matching group title is allowed to suppress the recurring
  // session; a closed old workshop must never erase the weekly timetable.
  const title = `${session.title_en || ""} ${session.title_lv || ""}`.toLowerCase();
  if (template.title_en.startsWith("Youth")) return /youth|jauniešu/.test(title);
  if (template.title_en.startsWith("Adult")) return /adult|pieaugušo/.test(title);
  return /mixed|jaukta/.test(title);
}

function rigaMiddayDate(dateString) {
  return new Date(`${dateString}T12:00:00Z`);
}

export async function ensureRollingClassSessions(supabase) {
  const now = new Date();
  const firstDate = rigaDate(now);
  const first = rigaMiddayDate(firstDate);
  const last = new Date(first);
  last.setUTCDate(last.getUTCDate() + HORIZON_DAYS);
  const lastDate = last.toISOString().slice(0, 10);

  // Fetching broadly then comparing in Riga keeps this correct through the
  // daylight-saving change, while retaining any manually closed dates.
  const { data: sessions, error } = await supabase
    .from("class_sessions")
    .select("starts_at,ends_at,status,title_en,title_lv")
    .gte("starts_at", `${firstDate}T00:00:00Z`)
    .lte("starts_at", `${lastDate}T23:59:59Z`);
  if (error) throw error;

  const present = new Set(
    (sessions || [])
      .filter((session) => {
        const date = rigaDate(new Date(session.starts_at));
        return date >= firstDate && date <= lastDate && isRegularWeeklySession(session);
      })
      .map((session) => rigaKey(new Date(session.starts_at))),
  );
  const rows = [];
  const occupied = (sessions || [])
    .filter((session) => session.status !== "cancelled")
    .map((session) => ({ start: new Date(session.starts_at).getTime(), end: new Date(session.ends_at).getTime() }));
  for (let offset = 0; offset <= HORIZON_DAYS; offset += 1) {
    const day = new Date(first);
    day.setUTCDate(first.getUTCDate() + offset);
    const date = day.toISOString().slice(0, 10);
    weeklyTemplate
      .filter((entry) => entry.day === day.getUTCDay())
      .forEach((entry) => {
        const starts_at = localIso(date, entry.start);
        if (new Date(starts_at) <= now || present.has(`${date}|${entry.start}`)) return;
        rows.push({
          id: recurringSessionId("group", date, entry.start),
          title_en: entry.title_en,
          title_lv: entry.title_lv,
          starts_at,
          ends_at: localIso(date, entry.end),
          capacity: 7,
          price_cents: 2500,
          status: "open",
        });
        occupied.push({ start: new Date(starts_at).getTime(), end: new Date(localIso(date, entry.end)).getTime() });
      });
    studioWorkTemplate.forEach((entry) => {
      const starts_at = localIso(date, entry.start);
      const ends_at = localIso(date, entry.end);
      const startTime = new Date(starts_at).getTime();
      const endTime = new Date(ends_at).getTime();
      const clashes = occupied.some((session) => startTime < session.end && endTime > session.start);
      if (new Date(starts_at) <= now || present.has(`${date}|${entry.start}`) || clashes) return;
      rows.push({ id: recurringSessionId("studio-work", date, entry.start), title_en: "Studio work session", title_lv: "Patstāvīgs darbs studijā", starts_at, ends_at, capacity: 6, price_cents: 1000, status: "open" });
      occupied.push({ start: startTime, end: endTime });
    });
  }
  if (!rows.length) return { created: 0 };
  const { error: insertError } = await supabase
    .from("class_sessions")
    .upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  if (insertError) throw insertError;
  return { created: rows.length };
}

export function rigaDateFromTimestamp(timestamp) {
  return rigaDate(new Date(timestamp));
}
