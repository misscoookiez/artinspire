-- Run this in the Supabase SQL editor. Enable email auth for the owner account afterwards.
create extension if not exists "uuid-ossp";

create table public.artworks (
  id text primary key, title_en text not null, title_lv text not null,
  description_en text, description_lv text, medium text, dimensions text,
  price_cents integer not null check(price_cents > 0), image_path text, status text not null default 'available' check(status in ('available','held','sold')), created_at timestamptz not null default now()
);
create table public.class_sessions (
  id uuid primary key default uuid_generate_v4(), title_en text not null, title_lv text not null, starts_at timestamptz not null, ends_at timestamptz not null, capacity integer not null check(capacity > 0), price_cents integer not null, status text not null default 'open' check(status in ('draft','open','closed','cancelled')), created_at timestamptz not null default now()
);
create table public.private_slots (
  id uuid primary key default uuid_generate_v4(), starts_at timestamptz not null unique, ends_at timestamptz not null, price_cents integer not null, status text not null default 'open' check(status in ('open','held','booked','closed'))
);
create table public.booking_holds (
  id uuid primary key default uuid_generate_v4(), kind text not null check(kind in ('class','private')), class_session_id uuid references public.class_sessions(id), private_slot_id uuid references public.private_slots(id), email text not null, expires_at timestamptz not null, stripe_session_id text unique, created_at timestamptz not null default now()
);
create table public.bookings (
  id uuid primary key default uuid_generate_v4(), kind text not null check(kind in ('class','private')), class_session_id uuid references public.class_sessions(id), private_slot_id uuid references public.private_slots(id), customer_name text not null, email text not null, stripe_payment_intent_id text unique, stripe_checkout_session_id text unique, amount_cents integer not null, status text not null default 'confirmed' check(status in ('confirmed','cancelled','refunded')), manage_token uuid not null default uuid_generate_v4(), created_at timestamptz not null default now(), cancelled_at timestamptz
);
create table public.orders (
  id uuid primary key default uuid_generate_v4(), stripe_checkout_session_id text unique not null, stripe_payment_intent_id text unique, email text, amount_cents integer not null, status text not null default 'paid' check(status in ('paid','refunded','fulfilled')), created_at timestamptz not null default now()
);
create table public.order_artworks (order_id uuid references public.orders(id) on delete cascade, artwork_id text references public.artworks(id), primary key(order_id,artwork_id));
create table public.stripe_events (id text primary key, received_at timestamptz not null default now());
create table public.class_passes (
  id uuid primary key default uuid_generate_v4(), email text not null, customer_name text,
  total_uses integer not null check(total_uses in (4,6,8)),
  used_uses integer not null default 0 check(used_uses >= 0 and used_uses <= total_uses),
  status text not null default 'active' check(status in ('active','exhausted','cancelled','refunded')),
  stripe_checkout_session_id text unique not null, stripe_payment_intent_id text unique,
  manage_token uuid not null default uuid_generate_v4(), created_at timestamptz not null default now(), expires_at timestamptz
);
create table public.gift_cards (
  id uuid primary key default uuid_generate_v4(), code text not null unique, email text not null,
  customer_name text, total_uses integer not null check(total_uses between 1 and 40),
  remaining_uses integer not null check(remaining_uses between 0 and 40),
  amount_cents integer not null check(amount_cents > 0),
  status text not null default 'active' check(status in ('active','redeemed','cancelled')),
  stripe_checkout_session_id text not null unique, stripe_payment_intent_id text unique,
  created_at timestamptz not null default now(), redeemed_at timestamptz,
  check(remaining_uses <= total_uses)
);
create table public.artwork_checkout_holds (
  id uuid primary key default uuid_generate_v4(), email text not null,
  expires_at timestamptz not null, stripe_session_id text unique, created_at timestamptz not null default now()
);
create table public.artwork_hold_items (
  hold_id uuid references public.artwork_checkout_holds(id) on delete cascade,
  artwork_id text unique references public.artworks(id), primary key(hold_id,artwork_id)
);

-- Owner-editable page content. A value may be plain text, an ordered list,
-- or a structured block such as an FAQ item. The dashboard edits these
-- records instead of requiring code changes or redeploys for copy updates.
create table public.site_content (
  id text not null,
  page text not null,
  locale text not null check(locale in ('lv','en','ru')),
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  primary key(page, locale, id)
);
create table public.site_media (
  id uuid primary key default uuid_generate_v4(),
  page text not null,
  alt_en text, alt_lv text,
  storage_path text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- The site reads public catalog data; bookings/orders remain private to the service role and owner dashboard.
alter table public.artworks enable row level security; alter table public.class_sessions enable row level security; alter table public.private_slots enable row level security; alter table public.booking_holds enable row level security; alter table public.bookings enable row level security; alter table public.orders enable row level security; alter table public.order_artworks enable row level security; alter table public.stripe_events enable row level security; alter table public.class_passes enable row level security; alter table public.gift_cards enable row level security; alter table public.artwork_checkout_holds enable row level security; alter table public.artwork_hold_items enable row level security; alter table public.site_content enable row level security; alter table public.site_media enable row level security;
create policy "public artwork catalog" on public.artworks for select using(status = 'available');
create policy "public class catalog" on public.class_sessions for select using(status = 'open');
create policy "public private slots" on public.private_slots for select using(status = 'open');
create policy "public page content" on public.site_content for select using(true);
create policy "public page media" on public.site_media for select using(true);

-- Atomically reserve a class place for 15 minutes. Call this from the server checkout endpoint.
create or replace function public.hold_class_place(p_session uuid, p_email text)
returns uuid language plpgsql security definer as $$
declare hold_id uuid; booked_count integer; session_capacity integer;
begin
  delete from public.booking_holds where expires_at < now();
  -- Lock the session row before counting. Without this, two simultaneous
  -- checkouts could both see the final place as free and oversell a class.
  select capacity into session_capacity from public.class_sessions
  where id=p_session and status='open' for update;
  if session_capacity is null then raise exception 'Class is unavailable'; end if;
  select count(*) into booked_count from public.bookings where class_session_id=p_session and status='confirmed';
  booked_count := booked_count + (select count(*) from public.booking_holds where class_session_id=p_session and expires_at > now());
  if booked_count >= session_capacity then raise exception 'Class is full'; end if;
  insert into public.booking_holds(kind,class_session_id,email,expires_at) values ('class',p_session,p_email,now()+interval '15 minutes') returning id into hold_id;
  return hold_id;
end $$;

-- Atomically reserve a private session for 15 minutes. This uses the same hold
-- table as classes so abandoned Stripe Checkout sessions can be released safely.
create or replace function public.hold_private_slot(p_slot uuid, p_email text)
returns uuid language plpgsql security definer as $$
declare hold_id uuid; slot_status text;
begin
  delete from public.booking_holds where expires_at < now();
  select status into slot_status from public.private_slots where id=p_slot for update;
  if slot_status is null then raise exception 'Private session is unavailable'; end if;
  if slot_status <> 'open' then raise exception 'Private session is no longer available'; end if;
  if exists(select 1 from public.booking_holds where private_slot_id=p_slot and expires_at > now()) then
    raise exception 'Private session is being reserved by another customer';
  end if;
  insert into public.booking_holds(kind,private_slot_id,email,expires_at)
  values ('private',p_slot,p_email,now()+interval '15 minutes') returning id into hold_id;
  return hold_id;
end $$;

-- The Stripe webhook, not the browser return URL, turns a hold into a booking.
-- It is idempotent because Stripe can retry the same event.
create or replace function public.confirm_booking_hold(
  p_hold uuid, p_checkout_session text, p_payment_intent text,
  p_customer_name text, p_email text, p_amount_cents integer
) returns uuid language plpgsql security definer as $$
declare h public.booking_holds; booking_id uuid;
begin
  select id into booking_id from public.bookings where stripe_checkout_session_id=p_checkout_session;
  if booking_id is not null then return booking_id; end if;
  select * into h from public.booking_holds where id=p_hold for update;
  if h.id is null then raise exception 'Booking hold was not found'; end if;
  if h.expires_at < now() then raise exception 'Booking hold has expired'; end if;
  insert into public.bookings(kind,class_session_id,private_slot_id,customer_name,email,stripe_payment_intent_id,stripe_checkout_session_id,amount_cents)
  values (h.kind,h.class_session_id,h.private_slot_id,coalesce(nullif(p_customer_name,''),'Guest'),coalesce(nullif(p_email,''),h.email),p_payment_intent,p_checkout_session,p_amount_cents)
  returning id into booking_id;
  if h.kind='private' then update public.private_slots set status='booked' where id=h.private_slot_id; end if;
  delete from public.booking_holds where id=h.id;
  return booking_id;
end $$;

create or replace function public.release_booking_hold(p_checkout_session text)
returns void language plpgsql security definer as $$
begin
  delete from public.booking_holds where stripe_session_id=p_checkout_session;
end $$;

-- Original artworks are held while a Stripe Checkout session is open. This
-- prevents two customers from paying for the same one-of-one work.
create or replace function public.hold_artworks(p_artwork_ids text[], p_email text)
returns uuid language plpgsql security definer as $$
declare hold_id uuid; v_artwork_id text;
begin
  update public.artworks set status='available'
  where status='held' and id in (
    select i.artwork_id from public.artwork_hold_items i
    join public.artwork_checkout_holds h on h.id=i.hold_id where h.expires_at < now()
  );
  delete from public.artwork_checkout_holds where expires_at < now();
  foreach v_artwork_id in array p_artwork_ids loop
    perform 1 from public.artworks where id=v_artwork_id and status='available' for update;
    if not found then raise exception 'Artwork % is no longer available', v_artwork_id; end if;
  end loop;
  insert into public.artwork_checkout_holds(email,expires_at) values(p_email,now()+interval '15 minutes') returning id into hold_id;
  foreach v_artwork_id in array p_artwork_ids loop
    insert into public.artwork_hold_items(hold_id,artwork_id) values(hold_id,v_artwork_id);
    update public.artworks set status='held' where id=v_artwork_id;
  end loop;
  return hold_id;
end $$;

create or replace function public.attach_artwork_checkout_session(p_hold uuid, p_checkout_session text)
returns void language plpgsql security definer as $$
begin
  update public.artwork_checkout_holds set stripe_session_id=p_checkout_session where id=p_hold;
end $$;

create or replace function public.release_artwork_hold(p_checkout_session text)
returns void language plpgsql security definer as $$
begin
  update public.artworks set status='available' where id in (
    select artwork_id from public.artwork_hold_items where hold_id=(select id from public.artwork_checkout_holds where stripe_session_id=p_checkout_session)
  ) and status='held';
  delete from public.artwork_checkout_holds where stripe_session_id=p_checkout_session;
end $$;

-- Lock every requested artwork before recording a paid order so one original
-- cannot be sold twice if two customers reach Stripe at the same time.
drop function if exists public.complete_artwork_order(text,text,text,integer,text[]);
create or replace function public.complete_artwork_order(
  p_checkout_session text, p_payment_intent text, p_email text,
  p_amount_cents integer, p_artwork_ids text[], p_artwork_hold uuid
) returns uuid language plpgsql security definer as $$
declare order_id uuid; v_artwork_id text;
begin
  select id into order_id from public.orders where stripe_checkout_session_id=p_checkout_session;
  if order_id is not null then return order_id; end if;
  perform 1 from public.artwork_checkout_holds where id=p_artwork_hold and expires_at > now() for update;
  if not found then raise exception 'Artwork checkout hold was not found'; end if;
  foreach v_artwork_id in array p_artwork_ids loop
    perform 1 from public.artwork_hold_items where hold_id=p_artwork_hold and artwork_id=v_artwork_id;
    if not found then raise exception 'Artwork is not part of this checkout hold'; end if;
    perform 1 from public.artworks where id=v_artwork_id and status='held' for update;
    if not found then raise exception 'Artwork % is no longer held', v_artwork_id; end if;
  end loop;
  insert into public.orders(stripe_checkout_session_id,stripe_payment_intent_id,email,amount_cents)
  values (p_checkout_session,p_payment_intent,p_email,p_amount_cents) returning id into order_id;
  foreach v_artwork_id in array p_artwork_ids loop
    update public.artworks set status='sold' where id=v_artwork_id;
    insert into public.order_artworks(order_id,artwork_id) values (order_id,v_artwork_id);
  end loop;
  delete from public.artwork_checkout_holds where id=p_artwork_hold;
  return order_id;
end $$;

-- Refunds for bookings reopen a private slot (group capacity is derived from
-- confirmed bookings, so no counter needs to be changed).
create or replace function public.refund_booking_payment(p_payment_intent text)
returns void language plpgsql security definer as $$
declare slot_id uuid;
begin
  select private_slot_id into slot_id from public.bookings where stripe_payment_intent_id=p_payment_intent and status='confirmed';
  update public.bookings set status='refunded', cancelled_at=now() where stripe_payment_intent_id=p_payment_intent and status='confirmed';
  if slot_id is not null then update public.private_slots set status='open' where id=slot_id; end if;
end $$;

-- Booking and fulfilment RPCs are server-only. The browser receives no direct
-- write access to capacity, orders, holds, or customer information.
-- The service role runs only on the Next.js server. It needs ordinary table
-- privileges as well as the RLS bypass that its server-only key provides.
grant usage on schema public to service_role;
grant all privileges on all tables in schema public to service_role;
revoke all on function public.hold_class_place(uuid,text) from public, anon, authenticated;
revoke all on function public.hold_private_slot(uuid,text) from public, anon, authenticated;
revoke all on function public.confirm_booking_hold(uuid,text,text,text,text,integer) from public, anon, authenticated;
revoke all on function public.release_booking_hold(text) from public, anon, authenticated;
revoke all on function public.hold_artworks(text[],text) from public, anon, authenticated;
revoke all on function public.attach_artwork_checkout_session(uuid,text) from public, anon, authenticated;
revoke all on function public.release_artwork_hold(text) from public, anon, authenticated;
revoke all on function public.complete_artwork_order(text,text,text,integer,text[],uuid) from public, anon, authenticated;
revoke all on function public.refund_booking_payment(text) from public, anon, authenticated;
grant execute on function public.hold_class_place(uuid,text) to service_role;
grant execute on function public.hold_private_slot(uuid,text) to service_role;
grant execute on function public.confirm_booking_hold(uuid,text,text,text,text,integer) to service_role;
grant execute on function public.release_booking_hold(text) to service_role;
grant execute on function public.hold_artworks(text[],text) to service_role;
grant execute on function public.attach_artwork_checkout_session(uuid,text) to service_role;
grant execute on function public.release_artwork_hold(text) to service_role;
grant execute on function public.complete_artwork_order(text,text,text,integer,text[],uuid) to service_role;
grant execute on function public.refund_booking_payment(text) to service_role;
