import { supabaseAdmin } from "@/lib/supabase-admin";

export async function claimStripeEvent(eventId) {
  if (!supabaseAdmin) return false;
  const { error } = await supabaseAdmin.from("stripe_events").insert({ id:eventId });
  if (!error) return true;
  if (error.code === "23505") return false;
  throw new Error(error.message);
}

export async function completeArtworkOrder({ checkoutSessionId, paymentIntentId, email, amountCents, artworkIds, artworkHoldId }) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin.rpc("complete_artwork_order", {
    p_checkout_session: checkoutSessionId,
    p_payment_intent: paymentIntentId || null,
    p_email: email || null,
    p_amount_cents: amountCents,
    p_artwork_ids: artworkIds,
    p_artwork_hold: artworkHoldId
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function createArtworkHold({ artworkIds, email }) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin.rpc("hold_artworks", { p_artwork_ids:artworkIds, p_email:email || "" });
  if (error) throw new Error(error.message);
  return data;
}

export async function attachArtworkCheckoutSession(holdId, checkoutSessionId) {
  if (!supabaseAdmin || !holdId) return;
  const { error } = await supabaseAdmin.rpc("attach_artwork_checkout_session", { p_hold:holdId, p_checkout_session:checkoutSessionId });
  if (error) throw new Error(error.message);
}

export async function releaseArtworkHold(checkoutSessionId) {
  if (!supabaseAdmin || !checkoutSessionId) return;
  const { error } = await supabaseAdmin.rpc("release_artwork_hold", { p_checkout_session:checkoutSessionId });
  if (error) throw new Error(error.message);
}
