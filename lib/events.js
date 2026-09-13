import { supabaseAdmin } from "@/lib/supabase-admin";

export const eventTicketStatuses = ["reserved", "paid"];

export async function createEventTicketHold({ eventId, email, locale }) {
  if (!supabaseAdmin) throw new Error("Events are not configured yet.");
  const { data, error } = await supabaseAdmin.rpc("hold_event_ticket", { p_event: eventId, p_email: email, p_locale: locale });
  if (error) throw new Error(error.message);
  return data;
}

export async function attachEventCheckoutSession(holdId, sessionId) {
  const { error } = await supabaseAdmin.from("event_ticket_holds").update({ stripe_session_id: sessionId }).eq("id", holdId);
  if (error) throw new Error(error.message);
}

export async function confirmEventTicketHold({ holdId, checkoutSessionId, paymentIntentId, customerName, email, amountCents }) {
  const { data, error } = await supabaseAdmin.rpc("confirm_event_ticket_hold", {
    p_hold: holdId, p_checkout_session: checkoutSessionId, p_payment_intent: paymentIntentId || null,
    p_customer_name: customerName || "", p_email: email || "", p_amount_cents: amountCents,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function releaseEventTicketHold(checkoutSessionId) {
  if (!supabaseAdmin || !checkoutSessionId) return;
  const { error } = await supabaseAdmin.rpc("release_event_ticket_hold", { p_checkout_session: checkoutSessionId });
  if (error) throw new Error(error.message);
}

export async function reserveEventTicket({ eventId, name, email, locale }) {
  if (!supabaseAdmin) throw new Error("Events are not configured yet.");
  const { data, error } = await supabaseAdmin.rpc("reserve_event_ticket", { p_event: eventId, p_name: name, p_email: email, p_locale: locale });
  if (error) throw new Error(error.message);
  return data;
}

export async function eventWithAvailability(eventId) {
  if (!supabaseAdmin) return null;
  const now = new Date().toISOString();
  const [{ data: event, error: eventError }, { count: tickets, error: ticketError }, { count: holds, error: holdError }] = await Promise.all([
    supabaseAdmin.from("studio_events").select("*").eq("id", eventId).maybeSingle(),
    supabaseAdmin.from("event_tickets").select("id", { count: "exact", head: true }).eq("event_id", eventId).in("status", eventTicketStatuses),
    supabaseAdmin.from("event_ticket_holds").select("id", { count: "exact", head: true }).eq("event_id", eventId).gt("expires_at", now),
  ]);
  if (eventError || ticketError || holdError) throw new Error("Could not load event availability.");
  return event ? { ...event, taken: (tickets || 0) + (holds || 0), available: Math.max(0, event.capacity - (tickets || 0) - (holds || 0)) } : null;
}
