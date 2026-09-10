const TIME_ZONE = "Europe/Riga";
const EVENT_OPEN_HOUR = 10;
const EVENT_CLOSE_HOUR = 24;
const CLASS_CHANGEOVER_MINUTES = 60;

const rigaDateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const rigaTimeParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const partsAsObject = (parts) =>
  Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));

export const rigaDateKey = (dateValue) => {
  if (!dateValue) return "";
  const value = partsAsObject(rigaDateParts.formatToParts(new Date(dateValue)));
  return `${value.year}-${value.month}-${value.day}`;
};

const rigaMinuteOfDay = (dateValue) => {
  const value = partsAsObject(rigaTimeParts.formatToParts(new Date(dateValue)));
  return Number(value.hour) * 60 + Number(value.minute);
};

export const isStudioWorkSession = (session) =>
  session.title_en === "Studio work session" || session.title_lv === "Patstāvīgs darbs studijā";

export const eventHoursForDuration = (duration) => {
  const safeDuration = Number(duration);
  if (!Number.isInteger(safeDuration) || safeDuration < 1 || safeDuration > 10) return [];
  return Array.from(
    { length: Math.max(0, EVENT_CLOSE_HOUR - safeDuration - EVENT_OPEN_HOUR + 1) },
    (_, index) => EVENT_OPEN_HOUR + index,
  );
};

export const eventSlotOverlapsBusyTime = (dateKey, hour, duration, busyTime) => {
  const busyStartDay = rigaDateKey(busyTime.starts_at);
  const busyEndDay = rigaDateKey(busyTime.ends_at);
  if (dateKey < busyStartDay || dateKey > busyEndDay) return false;

  const busyStart = busyStartDay === dateKey ? rigaMinuteOfDay(busyTime.starts_at) : 0;
  const busyEnd = busyEndDay === dateKey
    ? Math.min(
      EVENT_CLOSE_HOUR * 60,
      rigaMinuteOfDay(busyTime.ends_at) + (busyTime.source === "class" ? CLASS_CHANGEOVER_MINUTES : 0),
    )
    : EVENT_CLOSE_HOUR * 60;
  const eventStart = hour * 60;
  const eventEnd = (hour + duration) * 60;
  return eventStart < busyEnd && eventEnd > busyStart;
};

export const availableEventHours = (dateKey, duration, busyTimes) =>
  eventHoursForDuration(duration).filter(
    (hour) => !busyTimes.some((busyTime) => eventSlotOverlapsBusyTime(dateKey, hour, Number(duration), busyTime)),
  );

export const hasLiveEventAvailability = (availability) =>
  availability?.mode === "live" && Array.isArray(availability.eventBusyTimes);
