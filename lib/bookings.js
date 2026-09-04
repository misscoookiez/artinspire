import { supabaseAdmin } from "@/lib/supabase-admin";

export async function createBookingHold({ kind, resourceId, email }) {
  if (!supabaseAdmin) return null;
  const fn = kind === "class" ? "hold_class_place" : "hold_private_slot";
  const arg = kind === "class" ? { p_session:resourceId, p_email:email } : { p_slot:resourceId, p_email:email };
  const { data, error } = await supabaseAdmin.rpc(fn, arg);
  if (error) throw new Error(error.message);
  return data;
}

export async function attachStripeSession(holdId, stripeSessionId) {
  if (!supabaseAdmin || !holdId) return;
  const { error } = await supabaseAdmin.from("booking_holds").update({stripe_session_id:stripeSessionId}).eq("id",holdId);
  if (error) throw new Error(error.message);
}

export async function confirmBookingHold({ holdId, checkoutSessionId, paymentIntentId, customerName, email, amountCents }) {
  if (!supabaseAdmin || !holdId) return null;
  const { data, error } = await supabaseAdmin.rpc("confirm_booking_hold", {
    p_hold: holdId,
    p_checkout_session: checkoutSessionId,
    p_payment_intent: paymentIntentId || null,
    p_customer_name: customerName || "",
    p_email: email || "",
    p_amount_cents: amountCents
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function releaseBookingHold(checkoutSessionId) {
  if (!supabaseAdmin || !checkoutSessionId) return;
  const { error } = await supabaseAdmin.rpc("release_booking_hold", { p_checkout_session: checkoutSessionId });
  if (error) throw new Error(error.message);
}

export async function refundBookingPayment(paymentIntentId) {
  if (!supabaseAdmin || !paymentIntentId) return;
  const { error } = await supabaseAdmin.rpc("refund_booking_payment", { p_payment_intent: paymentIntentId });
  if (error) throw new Error(error.message);
}
