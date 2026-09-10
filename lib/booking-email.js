const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const STUDIO_NAME = "Art Studio Inspire";
const STUDIO_ADDRESS = "Miera iela 17, Rīga";
const STUDIO_PHONE = "+371 2880 9550";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character]);
}

function escapeIcs(value = "") {
  return String(value).replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

const button = (href, label, muted = false) => `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;margin:0 0 10px"><tr><td style="border:${muted ? "1px solid #9edfe6" : "1px solid #11263a"};background:${muted ? "#ffffff" : "#11263a"};border-radius:4px"><a href="${href}" style="display:inline-block;padding:13px 18px;color:${muted ? "#11263a" : "#ffffff"};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:1.1px;text-decoration:none;text-transform:uppercase">${label}</a></td></tr></table>`;
const detailRow = (label, value) => `<tr><td style="width:104px;padding:10px 0;border-bottom:1px solid #d7e7e9;color:#647681;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.25px;text-transform:uppercase;vertical-align:top">${label}</td><td style="padding:10px 0;border-bottom:1px solid #d7e7e9;color:#18273a;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45">${value}</td></tr>`;

function emailShell({ eyebrow = "ART STUDIO INSPIRE", title, intro = "", content, footer = true }) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#eef6f7"><div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(title)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eef6f7"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;margin:0 auto;border-collapse:separate;background:#ffffff"><tr><td style="height:5px;background:#55dce7;font-size:0;line-height:0">&nbsp;</td></tr><tr><td style="padding:32px 34px 12px"><p style="margin:0 0 16px;color:#357f8a;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase">${eyebrow}</p><h1 style="margin:0;color:#101e30;font-family:Arial,Helvetica,sans-serif;font-size:31px;font-weight:400;letter-spacing:-1px;line-height:1.05">${title}</h1>${intro ? `<p style="margin:16px 0 0;color:#4f6271;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55">${intro}</p>` : ""}</td></tr><tr><td style="padding:16px 34px 32px">${content}</td></tr>${footer ? `<tr><td style="padding:22px 34px;background:#102238;color:#dceff2"><p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700">${STUDIO_NAME}</p><p style="margin:0;color:#b8d2d7;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55">${STUDIO_ADDRESS} · <a href="tel:+37128809550" style="color:#b8f5f8;text-decoration:none">${STUDIO_PHONE}</a><br><a href="https://wa.me/37128809550" style="color:#b8f5f8;text-decoration:none">WhatsApp</a> · <a href="https://www.instagram.com/artstudio.inspire/" style="color:#b8f5f8;text-decoration:none">Instagram</a></p></td></tr>` : ""}</table></td></tr></table></body></html>`;
}

function bookingDateTime(startsAt, endsAt) {
  const date = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(startsAt));
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${date} · ${time.format(new Date(startsAt))}–${time.format(new Date(endsAt))}`;
}

function eventDateTime(dateKey, startHour, duration) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey || "")) return "Your selected studio time";
  const date = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${dateKey}T12:00:00Z`));
  return `${date} · ${String(startHour).padStart(2, "0")}:00–${String(startHour + duration).padStart(2, "0")}:00`;
}

async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: Array.isArray(to) ? to : [to], reply_to: replyTo, subject, html, text }),
  });
  if (!response.ok) throw new Error("Email could not be sent.");
  return true;
}

export function bookingCalendar({ title, startsAt, endsAt, token }) {
  const stamp = (date) => new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const url = `${SITE_URL}/manage/${token}`;
  return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Art Studio Inspire//Bookings//EN\r\nBEGIN:VEVENT\r\nUID:${token}@artstudioinspire\r\nDTSTAMP:${stamp(Date.now())}\r\nDTSTART:${stamp(startsAt)}\r\nDTEND:${stamp(endsAt)}\r\nSUMMARY:${escapeIcs(title)}\r\nDESCRIPTION:${escapeIcs(`${STUDIO_NAME} · ${STUDIO_ADDRESS}. Entrance is beside M50; go down the stairs to the studio door. Door code: 2043a. Manage this booking: ${url}`)}\r\nLOCATION:${STUDIO_ADDRESS}\r\nURL:${url}\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
}

export async function sendBookingConfirmation({ email, name, title, startsAt, endsAt, token }) {
  const safeName = escapeHtml(name || "there");
  const safeTitle = escapeHtml(title || "Art Studio Inspire booking");
  const when = bookingDateTime(startsAt, endsAt);
  const manageUrl = `${SITE_URL}/manage/${token}`;
  const calendarUrl = `${SITE_URL}/api/bookings/${token}/calendar`;
  return sendEmail({ to: email, subject: `Booking confirmed — ${title}`, html: emailShell({ eyebrow: "BOOKING CONFIRMED", title: "See you at the studio.", intro: `Hi ${safeName}, your place is confirmed.`, content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin:0 0 24px">${detailRow("Your booking", safeTitle)}${detailRow("When", escapeHtml(when))}${detailRow("Where", `${STUDIO_ADDRESS}<br><span style="color:#5b6f7c;font-size:13px">Beside the M50 shop. Go down the stairs to the studio door.</span>`)}</table><div style="margin:0 0 24px;padding:15px 17px;border-left:3px solid #62ddea;background:#f2fbff;color:#304856;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55"><strong style="color:#142b3a">Door code: 2043a</strong><br>Save the booking below, then you have everything in one place.</div>${button(calendarUrl, "Add to calendar")}${button(manageUrl, "Manage booking", true)}<p style="margin:17px 0 0;color:#5d6c76;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6">Plans changed? You can cancel online and receive an automatic refund until 24 hours before the start time.</p>` }), text: `Hi ${name || "there"},\n\nYour booking is confirmed.\n${title}\n${when}\n${STUDIO_ADDRESS}\nEntrance is beside the M50 shop; go down the stairs to the studio door. Door code: 2043a.\n\nAdd to calendar: ${calendarUrl}\nManage booking: ${manageUrl}` });
}

export async function sendClassPassConfirmation({ email, name, classes }) {
  return sendEmail({ to: email, subject: `Your ${classes}-class Art Studio Inspire pass is ready`, html: emailShell({ eyebrow: "CLASS PASS", title: "Your pass is ready.", intro: `Hi ${escapeHtml(name || "there")}, your ${classes}-class pass is ready to use.`, content: `<div style="margin:0 0 24px;padding:20px;border:1px solid #b7e4e8;background:#f2fbfc"><p style="margin:0 0 8px;color:#397c86;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">${classes} classes</p><p style="margin:0;color:#172739;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.5">The pass becomes valid for four weeks from your first class.</p></div><p style="margin:0 0 18px;color:#4f6271;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">Reply to this email, or contact the studio with the group and date that suit you for your first visit.</p>${button("mailto:misscoookiez@gmail.com?subject=Class%20pass%20first%20visit", "Choose your first class")}` }), text: `Hi ${name || "there"},\n\nYour ${classes}-class Art Studio Inspire pass is ready. It becomes valid for four weeks from your first class. Reply to this email with the group and date that suit you for your first visit.` });
}

export async function sendGiftCardConfirmation({ email, name, classes, code }) {
  const safeCode = escapeHtml(code);
  return sendEmail({ to: email, subject: "Your Art Studio Inspire gift card is ready", html: emailShell({ eyebrow: "GIFT CARD", title: "A creative gift, ready to give.", intro: `Hi ${escapeHtml(name || "there")}, thank you for choosing a studio gift.`, content: `<div style="margin:0 0 24px;padding:22px;border:1px solid #c29bea;background:#fbf8ff;text-align:center"><p style="margin:0 0 9px;color:#7b4ca5;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Gift card code</p><p style="margin:0;color:#18263b;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:700;letter-spacing:1.4px">${safeCode}</p><p style="margin:13px 0 0;color:#556875;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55">${classes} painting class${classes === 1 ? "" : "es"}</p></div><p style="margin:0 0 18px;color:#4f6271;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">When the recipient is ready, reply to this email or contact the studio with their preferred group and date.</p>${button("mailto:misscoookiez@gmail.com?subject=Gift%20card%20booking", "Book a first class")}` }), text: `Hi ${name || "there"},\n\nYour Art Studio Inspire gift card is ready.\nCode: ${code}\n${classes} painting class${classes === 1 ? "" : "es"}.\n\nReply to this email to choose the recipient's first class.` });
}

export async function sendGroupApplication({ name, email, group }) {
  const inbox = process.env.STUDIO_INBOX_EMAIL || "misscoookiez@gmail.com";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeGroup = escapeHtml(group);
  await sendEmail({ to: inbox, replyTo: email, subject: `New group application — ${group}`, html: emailShell({ eyebrow: "NEW GROUP APPLICATION", title: safeGroup, intro: "A new applicant is waiting for your reply.", content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">${detailRow("Name", safeName)}${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:#1f7d89">${safeEmail}</a>`)}</table>`, footer: false }), text: `New group application\nGroup: ${group}\nName: ${name}\nEmail: ${email}` });
  return sendEmail({ to: email, subject: "Your Art Studio Inspire place is reserved", html: emailShell({ eyebrow: "GROUP APPLICATION", title: "Your place is reserved.", intro: `Hi ${safeName}, we have saved your place in ${safeGroup}.`, content: `<p style="margin:0;color:#4f6271;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">We will be in touch with the first date and practical details. We look forward to seeing what you make.</p>` }), text: `Hi ${name || "there"},\n\nYour place in ${group} is reserved. We will be in touch with the first date and practical details.` });
}

export async function sendReservationNotification({ name, email, label, kind }) {
  const inbox = process.env.STUDIO_INBOX_EMAIL || "misscoookiez@gmail.com";
  return sendEmail({ to: inbox, replyTo: email, subject: `New ${kind === "private" ? "private" : "class"} reservation — ${label}`, html: emailShell({ eyebrow: "NEW RESERVATION", title: kind === "private" ? "Private studio session" : "Group class", intro: "The place is now reserved in the live schedule.", content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">${detailRow("Time", escapeHtml(label))}${detailRow("Name", escapeHtml(name))}${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#1f7d89">${escapeHtml(email)}</a>`)}</table>`, footer: false }), text: `New ${kind} reservation\nTime: ${label}\nName: ${name}\nEmail: ${email}` });
}

export async function sendInquiry({ name, email, topic, message }) {
  const inbox = process.env.STUDIO_INBOX_EMAIL || "misscoookiez@gmail.com";
  return sendEmail({ to: inbox, replyTo: email, subject: `Studio inquiry — ${topic}`, html: emailShell({ eyebrow: "NEW MESSAGE", title: escapeHtml(topic), intro: `From ${escapeHtml(name)} · <a href="mailto:${escapeHtml(email)}" style="color:#1f7d89">${escapeHtml(email)}</a>`, content: `<div style="padding:18px;border-left:3px solid #62ddea;background:#f4fafb;color:#263b49;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65">${escapeHtml(message).replace(/\n/g, "<br>")}</div>`, footer: false }), text: `New studio inquiry\nTopic: ${topic}\nName: ${name}\nEmail: ${email}\n\n${message}` });
}

export async function sendEventInquiryConfirmation({ name, email, dateKey, startHour, duration }) {
  const when = eventDateTime(dateKey, Number(startHour), Number(duration));
  return sendEmail({ to: email, subject: "We received your Art Studio Inspire event request", html: emailShell({ eyebrow: "EVENT REQUEST RECEIVED", title: "Your idea is with us.", intro: `Hi ${escapeHtml(name || "there")}, thank you for your request.`, content: `<div style="margin:0 0 24px;padding:18px;border:1px solid #b7e4e8;background:#f2fbfc"><p style="margin:0 0 7px;color:#397c86;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">Requested studio time</p><p style="margin:0;color:#172739;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.5">${escapeHtml(when)}</p></div><p style="margin:0;color:#4f6271;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">We will be in touch soon to confirm the details, availability and final price. This request is not a confirmed reservation yet.</p>` }), text: `Hi ${name || "there"},\n\nWe received your Art Studio Inspire event request for ${when}. We will be in touch soon to confirm the details, availability and final price. This request is not a confirmed reservation yet.` });
}
