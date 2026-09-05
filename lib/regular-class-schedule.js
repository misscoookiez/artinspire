const TIME_ZONE = "Europe/Riga";
const HORIZON_DAYS = 92;

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
    .select("starts_at,status")
    .gte("starts_at", `${firstDate}T00:00:00Z`)
    .lte("starts_at", `${lastDate}T23:59:59Z`);
  if (error) throw error;

  const present = new Set(
    (sessions || [])
      .filter((session) => {
        const date = rigaDate(new Date(session.starts_at));
        return date >= firstDate && date <= lastDate;
      })
      .map((session) => rigaKey(new Date(session.starts_at))),
  );
  const rows = [];
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
          title_en: entry.title_en,
          title_lv: entry.title_lv,
          starts_at,
          ends_at: localIso(date, entry.end),
          capacity: 7,
          price_cents: 2500,
          status: "open",
        });
      });
  }
  if (!rows.length) return { created: 0 };
  const { error: insertError } = await supabase.from("class_sessions").insert(rows);
  if (insertError) throw insertError;
  return { created: rows.length };
}

export function rigaDateFromTimestamp(timestamp) {
  return rigaDate(new Date(timestamp));
}
