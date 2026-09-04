-- Gift cards are paid products with a code the purchaser can forward to the recipient.
-- Apply this migration before enabling live gift-card sales.
create table if not exists public.gift_cards (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  email text not null,
  customer_name text,
  total_uses integer not null check (total_uses between 1 and 40),
  remaining_uses integer not null check (remaining_uses between 0 and 40),
  amount_cents integer not null check (amount_cents > 0),
  status text not null default 'active' check (status in ('active','redeemed','cancelled')),
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text unique,
  created_at timestamptz not null default now(),
  redeemed_at timestamptz,
  check (remaining_uses <= total_uses)
);

alter table public.gift_cards enable row level security;

-- Service role handles creation and redemption; gift-card data is never public.
grant all privileges on public.gift_cards to service_role;
