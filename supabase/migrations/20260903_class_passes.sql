-- Four-class passes are deliberately separate from a booking. A purchase does
-- not consume a place until the holder chooses a dated class, which prevents a
-- pass sale from silently reserving an arbitrary session.
create table if not exists public.class_passes (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  customer_name text,
  total_uses integer not null default 4 check(total_uses > 0),
  used_uses integer not null default 0 check(used_uses >= 0 and used_uses <= total_uses),
  status text not null default 'active' check(status in ('active','exhausted','cancelled','refunded')),
  stripe_checkout_session_id text unique not null,
  stripe_payment_intent_id text unique,
  manage_token uuid not null default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

alter table public.class_passes enable row level security;

-- Server-side only: creates an entitlement after a confirmed Stripe webhook.
create or replace function public.confirm_class_pass(
  p_checkout_session text, p_payment_intent text, p_email text, p_customer_name text
) returns uuid language plpgsql security definer as $$
declare pass_id uuid;
begin
  select id into pass_id from public.class_passes where stripe_checkout_session_id=p_checkout_session;
  if pass_id is not null then return pass_id; end if;
  insert into public.class_passes(email,customer_name,stripe_checkout_session_id,stripe_payment_intent_id)
  values(coalesce(nullif(p_email,''),'unknown@example.invalid'),nullif(p_customer_name,''),p_checkout_session,p_payment_intent)
  returning id into pass_id;
  return pass_id;
end $$;

-- The class is locked before both the capacity calculation and pass use, so one
-- pass cannot reserve two last places through concurrent requests.
create or replace function public.redeem_class_pass_place(p_pass uuid, p_session uuid, p_email text)
returns uuid language plpgsql security definer as $$
declare pass_row public.class_passes; hold_id uuid; booked_count integer; class_capacity integer;
begin
  delete from public.booking_holds where expires_at < now();
  select * into pass_row from public.class_passes where id=p_pass and email=lower(p_email) for update;
  if pass_row.id is null or pass_row.status <> 'active' or pass_row.used_uses >= pass_row.total_uses then raise exception 'This class pass is unavailable'; end if;
  select capacity into class_capacity from public.class_sessions where id=p_session and status='open' for update;
  if class_capacity is null then raise exception 'Class is unavailable'; end if;
  select count(*) into booked_count from public.bookings where class_session_id=p_session and status='confirmed';
  booked_count := booked_count + (select count(*) from public.booking_holds where class_session_id=p_session and expires_at > now());
  if booked_count >= class_capacity then raise exception 'Class is full'; end if;
  update public.class_passes set used_uses=used_uses+1,status=case when used_uses+1>=total_uses then 'exhausted' else 'active' end where id=pass_row.id;
  insert into public.booking_holds(kind,class_session_id,email,expires_at) values('class',p_session,lower(p_email),now()+interval '15 minutes') returning id into hold_id;
  return hold_id;
end $$;

grant all privileges on public.class_passes to service_role;
revoke all on function public.confirm_class_pass(text,text,text,text) from public, anon, authenticated;
revoke all on function public.redeem_class_pass_place(uuid,uuid,text) from public, anon, authenticated;
grant execute on function public.confirm_class_pass(text,text,text,text) to service_role;
grant execute on function public.redeem_class_pass_place(uuid,uuid,text) to service_role;
