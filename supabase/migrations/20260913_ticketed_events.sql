-- Public ticketed events. Run this migration once in the Supabase SQL editor.
-- Events are deliberately independent of class sessions and tattoo-room slots.
create table if not exists public.studio_events (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  status text not null default 'draft' check(status in ('draft','published','cancelled')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer not null default 14 check(capacity between 1 and 35),
  price_cents integer check(price_cents is null or price_cents >= 0),
  image_url text,
  video_url text,
  title_lv text not null,
  title_en text not null,
  title_ru text not null,
  summary_lv text,
  summary_en text,
  summary_ru text,
  description_lv text,
  description_en text,
  description_ru text,
  host_lv text,
  host_en text,
  host_ru text,
  location_lv text default 'Art Studio Inspire, Miera iela 17, Rīga, Latvija',
  location_en text default 'Art Studio Inspire, Miera iela 17, Riga, Latvia',
  location_ru text default 'Art Studio Inspire, Миера 17, Рига, Латвия',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check(ends_at > starts_at)
);

create table if not exists public.event_ticket_holds (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.studio_events(id) on delete cascade,
  email text not null,
  locale text not null default 'en' check(locale in ('lv','en','ru')),
  expires_at timestamptz not null,
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.event_tickets (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.studio_events(id) on delete cascade,
  customer_name text not null,
  email text not null,
  locale text not null default 'en' check(locale in ('lv','en','ru')),
  amount_cents integer not null default 0 check(amount_cents >= 0),
  status text not null default 'reserved' check(status in ('reserved','paid','cancelled','refunded')),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  manage_token uuid not null default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  cancelled_at timestamptz
);

create table if not exists public.event_waitlist (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.studio_events(id) on delete cascade,
  customer_name text not null,
  email text not null,
  locale text not null default 'en' check(locale in ('lv','en','ru')),
  status text not null default 'waiting' check(status in ('waiting','offered','removed')),
  created_at timestamptz not null default now(),
  unique(event_id,email)
);

create table if not exists public.event_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  locale text not null default 'en' check(locale in ('lv','en','ru')),
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table if not exists public.event_email_log (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.studio_events(id) on delete cascade,
  ticket_id uuid references public.event_tickets(id) on delete cascade,
  email_type text not null check(email_type in ('published','confirmation','reminder_3d','reminder_24h','cancelled','waitlist')),
  email text not null,
  sent_at timestamptz not null default now(),
  unique(ticket_id,email_type),
  unique(event_id,email,email_type)
);

-- Initial public programme. The owner dashboard can edit every field later.
insert into public.studio_events (
  slug,status,starts_at,ends_at,capacity,price_cents,image_url,
  title_lv,title_en,title_ru,summary_lv,summary_en,summary_ru,
  description_lv,description_en,description_ru,host_lv,host_en,host_ru
) values
(
  'flow-art-2026-10-11','published','2026-10-11 15:00:00+03','2026-10-11 17:30:00+03',14,3000,'/art/studio-slide-room.webp',
  'Flow Art','Flow Art','Flow Art',
  'Intuitīva mākslas pieredze ar dzīvo mūziku.','An intuitive art experience with live music.','Интуитивная арт-практика с живой музыкой.',
  'Meditatīva ambienta elektriskā ģitāra pavadīs intuitīvu gleznošanu. Sāksim ar mākslas terapeites un koučes Jevgeņijas Marsalovas praksi, pēc tam sekos brīva mākslas sesija. Visi materiāli ir iekļauti. Ilgums — apmēram 2,5 stundas.','Meditative ambient electric guitar accompanies intuitive painting. We begin with a mind-opening practice led by art therapist and coach Jevgenija Marsalova, followed by an open art session. All materials are included. Around 2.5 hours.','Медитативная эмбиент-электрогитара сопровождает интуитивное рисование. Начнём с открывающей практики от арт-терапевта и коуча Евгении Марсаловой, затем — свободная арт-сессия. Все материалы включены. Продолжительность — около 2,5 часов.',
  'Kopā ar mākslas terapeiti un kouči Jevgeņiju Marsalovu (@marsalovaa).','With art therapist and coach Jevgenija Marsalova (@marsalovaa).','Вместе с арт-терапевтом и коучем Евгенией Марсаловой (@marsalovaa).'
),
(
  'symbolic-art-2026-11-01','published','2026-11-01 15:00:00+02','2026-11-01 19:00:00+02',14,null,'/art/studio-slide-garden.webp',
  'Simboliskā māksla','Symbolic art','Символическое искусство',
  'Nākamā tikšanās ar Jevgeņiju Marsalovu. Tēma drīzumā.','The next gathering with Jevgenija Marsalova. Theme to be announced.','Следующая встреча с Евгенией Марсаловой. Тема будет объявлена.',
  'Šis pasākums turpinās darbu ar simboliem, sajūtām un personisku tēlu valodu. Pilna programma un biļešu cena tiks paziņota drīzumā.','This event continues the work with symbols, feelings and a personal visual language. The full programme and ticket price will be announced soon.','Эта встреча продолжит работу с символами, чувствами и личным визуальным языком. Полная программа и цена билета будут объявлены позже.',
  'Ar mākslas terapeiti un kouči Jevgeņiju Marsalovu (@marsalovaa).','With art therapist and coach Jevgenija Marsalova (@marsalovaa).','С арт-терапевтом и коучем Евгенией Марсаловой (@marsalovaa).'
),
(
  'watercolor-evening-2026-09-27','published','2026-09-27 18:00:00+03','2026-09-27 20:30:00+03',14,null,'/art/inspire-studio.webp',
  'Akvareļa vakars','Watercolor evening','Вечер акварели',
  'Kluss svētdienas vakars ar akvareli. Drīzumā.','A quiet Sunday evening with watercolor. Coming soon.','Тихий воскресный вечер с акварелью. Скоро.',
  'Datums ir rezervēts. Formāts, laiks un biļešu cena tiks apstiprināti drīzumā.','The date is reserved. Format, time and ticket price will be confirmed soon.','Дата зарезервирована. Формат, время и цена билета будут подтверждены позже.',
  'Art Studio Inspire','Art Studio Inspire','Art Studio Inspire'
)
on conflict (slug) do nothing;

alter table public.studio_events enable row level security;
alter table public.event_ticket_holds enable row level security;
alter table public.event_tickets enable row level security;
alter table public.event_waitlist enable row level security;
alter table public.event_subscribers enable row level security;
alter table public.event_email_log enable row level security;

drop policy if exists "public published studio events" on public.studio_events;
create policy "public published studio events" on public.studio_events for select using(status='published' and ends_at > now());

create or replace function public.hold_event_ticket(p_event uuid, p_email text, p_locale text)
returns uuid language plpgsql security definer as $$
declare hold_id uuid; used_count integer; event_capacity integer;
begin
  delete from public.event_ticket_holds where expires_at < now();
  select capacity into event_capacity from public.studio_events where id=p_event and status='published' and starts_at > now() for update;
  if event_capacity is null then raise exception 'Event is unavailable'; end if;
  select count(*) into used_count from public.event_tickets where event_id=p_event and status in ('reserved','paid');
  used_count := used_count + (select count(*) from public.event_ticket_holds where event_id=p_event and expires_at > now());
  if used_count >= event_capacity then raise exception 'Event is full'; end if;
  insert into public.event_ticket_holds(event_id,email,locale,expires_at) values(p_event,lower(p_email),p_locale,now()+interval '15 minutes') returning id into hold_id;
  return hold_id;
end $$;

create or replace function public.confirm_event_ticket_hold(
  p_hold uuid, p_checkout_session text, p_payment_intent text, p_customer_name text, p_email text, p_amount_cents integer
) returns uuid language plpgsql security definer as $$
declare h public.event_ticket_holds; ticket_id uuid;
begin
  select id into ticket_id from public.event_tickets where stripe_checkout_session_id=p_checkout_session;
  if ticket_id is not null then return ticket_id; end if;
  select * into h from public.event_ticket_holds where id=p_hold for update;
  if h.id is null or h.expires_at < now() then raise exception 'Event ticket hold was not found'; end if;
  insert into public.event_tickets(event_id,customer_name,email,locale,amount_cents,status,stripe_checkout_session_id,stripe_payment_intent_id)
  values(h.event_id,coalesce(nullif(p_customer_name,''),'Guest'),coalesce(nullif(lower(p_email),''),h.email),h.locale,p_amount_cents,'paid',p_checkout_session,p_payment_intent)
  returning id into ticket_id;
  delete from public.event_ticket_holds where id=h.id;
  return ticket_id;
end $$;

create or replace function public.reserve_event_ticket(p_event uuid, p_name text, p_email text, p_locale text)
returns uuid language plpgsql security definer as $$
declare ticket_id uuid; used_count integer; event_capacity integer;
begin
  delete from public.event_ticket_holds where expires_at < now();
  select capacity into event_capacity from public.studio_events where id=p_event and status='published' and starts_at > now() for update;
  if event_capacity is null then raise exception 'Event is unavailable'; end if;
  select count(*) into used_count from public.event_tickets where event_id=p_event and status in ('reserved','paid');
  used_count := used_count + (select count(*) from public.event_ticket_holds where event_id=p_event and expires_at > now());
  if used_count >= event_capacity then raise exception 'Event is full'; end if;
  insert into public.event_tickets(event_id,customer_name,email,locale,status)
  values(p_event,coalesce(nullif(p_name,''),'Guest'),lower(p_email),p_locale,'reserved') returning id into ticket_id;
  return ticket_id;
end $$;

create or replace function public.release_event_ticket_hold(p_checkout_session text)
returns void language plpgsql security definer as $$
begin
  delete from public.event_ticket_holds where stripe_session_id=p_checkout_session;
end $$;

grant usage on schema public to service_role;
grant all privileges on public.studio_events, public.event_ticket_holds, public.event_tickets, public.event_waitlist, public.event_subscribers, public.event_email_log to service_role;
revoke all on function public.hold_event_ticket(uuid,text,text) from public, anon, authenticated;
revoke all on function public.confirm_event_ticket_hold(uuid,text,text,text,text,integer) from public, anon, authenticated;
revoke all on function public.reserve_event_ticket(uuid,text,text,text) from public, anon, authenticated;
revoke all on function public.release_event_ticket_hold(text) from public, anon, authenticated;
grant execute on function public.hold_event_ticket(uuid,text,text) to service_role;
grant execute on function public.confirm_event_ticket_hold(uuid,text,text,text,text,integer) to service_role;
grant execute on function public.reserve_event_ticket(uuid,text,text,text) to service_role;
grant execute on function public.release_event_ticket_hold(text) to service_role;
