-- Weekly-group places are reserved without checkout. They are intentionally
-- separate from dated paid bookings so a regular place can be held first.
create table if not exists public.weekly_group_signups (
  id uuid primary key default uuid_generate_v4(),
  group_key text not null check (group_key in (
    'thu-youth', 'thu-adult', 'sat-youth', 'sat-adult', 'sun-mixed-am', 'sun-mixed-pm'
  )),
  group_label text not null,
  customer_name text not null,
  email text not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (group_key, email)
);

alter table public.weekly_group_signups enable row level security;

-- This lock makes the no-payment reservation safe when several people submit
-- for the same group at once. Seven is deliberately operational only: it is
-- not shown as public marketing copy.
create or replace function public.reserve_weekly_group_place(
  p_group_key text,
  p_group_label text,
  p_customer_name text,
  p_email text
) returns uuid language plpgsql security definer as $$
declare signup_id uuid; confirmed_count integer;
begin
  perform pg_advisory_xact_lock(hashtext(p_group_key));

  select id into signup_id
  from public.weekly_group_signups
  where group_key = p_group_key
    and email = lower(trim(p_email))
    and status = 'confirmed'
  for update;
  if signup_id is not null then return signup_id; end if;

  select count(*) into confirmed_count
  from public.weekly_group_signups
  where group_key = p_group_key and status = 'confirmed';
  if confirmed_count >= 7 then
    raise exception 'This weekly group is currently full';
  end if;

  insert into public.weekly_group_signups (group_key, group_label, customer_name, email)
  values (p_group_key, p_group_label, trim(p_customer_name), lower(trim(p_email)))
  returning id into signup_id;
  return signup_id;
end $$;

revoke all on public.weekly_group_signups from public, anon, authenticated;
revoke all on function public.reserve_weekly_group_place(text,text,text,text) from public, anon, authenticated;
grant all privileges on public.weekly_group_signups to service_role;
grant execute on function public.reserve_weekly_group_place(text,text,text,text) to service_role;
