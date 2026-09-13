const RIGA_TIME_ZONE = "Europe/Riga";
const OPENING_HOUR = 10;
const CLOSING_HOUR = 24;
const DAYS_AHEAD = 120;

const rigaParts = (date) => Object.fromEntries(
  new Intl.DateTimeFormat("en-GB", {
    timeZone: RIGA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, Number(value)]),
);

// Convert a local Riga wall-clock time to UTC without depending on the server
// time zone. The two passes cover daylight-saving transitions too.
const rigaDateTime = (year, month, day, hour) => {
  const target = Date.UTC(year, month - 1, day, hour, 0, 1);
  let timestamp = target;
  for (let pass = 0; pass < 2; pass += 1) {
    const actual = rigaParts(new Date(timestamp));
    timestamp += target - Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute, actual.second);
  }
  return new Date(timestamp).toISOString();
};

export async function ensureTattooRoomSlots(supabase) {
  const now = new Date();
  const today = rigaParts(now);
  const start = new Date(Date.UTC(today.year, today.month - 1, today.day));
  const end = new Date(start.getTime() + (DAYS_AHEAD - 1) * 86_400_000);
  const finalStart = rigaDateTime(end.getUTCFullYear(), end.getUTCMonth() + 1, end.getUTCDate(), CLOSING_HOUR - 1);
  const { data: latest, error: latestError } = await supabase
    .from("private_slots")
    .select("starts_at")
    .eq("price_cents", 2000)
    .eq("status", "open")
    .gte("starts_at", now.toISOString())
    .order("starts_at", { ascending: false })
    .limit(1);
  if (latestError) throw latestError;
  if (latest?.[0]?.starts_at && new Date(latest[0].starts_at) >= new Date(finalStart)) return 0;
  const rows = [];
  for (let offset = 0; offset < DAYS_AHEAD; offset += 1) {
    const day = new Date(start.getTime() + offset * 86_400_000);
    const year = day.getUTCFullYear();
    const month = day.getUTCMonth() + 1;
    const date = day.getUTCDate();
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour += 1) {
      // The existing legacy table uses starts_at as a globally unique key for
      // every room. The one-second marker lets tattoo-room inventory coexist
      // with main-studio slots at the same visible hour until the planned
      // resource-column migration. Visitors still see whole-hour slots.
      rows.push({
        starts_at: rigaDateTime(year, month, date, hour),
        ends_at: rigaDateTime(year, month, date + (hour === 23 ? 1 : 0), hour === 23 ? 0 : hour + 1),
        price_cents: 2000,
        status: "open",
      });
    }
  }
  const { error } = await supabase.from("private_slots").upsert(rows, { onConflict: "starts_at", ignoreDuplicates: true });
  if (error) throw error;
  return rows.length;
}
