-- Replace the original sample workshops with the public weekly Inspire groups.
-- The owner dashboard remains the source of truth for later changes.
update public.class_sessions
set status = 'closed'
where id in (
  '00000000-0000-4000-8000-000000000101',
  '00000000-0000-4000-8000-000000000102',
  '00000000-0000-4000-8000-000000000103'
);

insert into public.class_sessions (id, title_en, title_lv, starts_at, ends_at, capacity, price_cents, status)
values
  ('00000000-0000-4000-8001-000000000001','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-05 11:00:00+03','2026-09-05 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000002','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-05 14:00:00+03','2026-09-05 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000003','Mixed painting group','Jaukta gleznošanas grupa','2026-09-06 11:00:00+03','2026-09-06 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000004','Mixed painting group','Jaukta gleznošanas grupa','2026-09-06 14:00:00+03','2026-09-06 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000005','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-10 16:00:00+03','2026-09-10 18:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000006','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-10 18:30:00+03','2026-09-10 20:30:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000007','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-12 11:00:00+03','2026-09-12 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000008','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-12 14:00:00+03','2026-09-12 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000009','Mixed painting group','Jaukta gleznošanas grupa','2026-09-13 11:00:00+03','2026-09-13 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000010','Mixed painting group','Jaukta gleznošanas grupa','2026-09-13 14:00:00+03','2026-09-13 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000011','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-17 16:00:00+03','2026-09-17 18:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000012','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-17 18:30:00+03','2026-09-17 20:30:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000013','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-19 11:00:00+03','2026-09-19 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000014','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-19 14:00:00+03','2026-09-19 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000015','Mixed painting group','Jaukta gleznošanas grupa','2026-09-20 11:00:00+03','2026-09-20 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000016','Mixed painting group','Jaukta gleznošanas grupa','2026-09-20 14:00:00+03','2026-09-20 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000017','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-24 16:00:00+03','2026-09-24 18:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000018','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-24 18:30:00+03','2026-09-24 20:30:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000019','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-09-26 11:00:00+03','2026-09-26 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000020','Adult painting group','Pieaugušo gleznošanas grupa','2026-09-26 14:00:00+03','2026-09-26 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000021','Mixed painting group','Jaukta gleznošanas grupa','2026-09-27 11:00:00+03','2026-09-27 13:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000022','Mixed painting group','Jaukta gleznošanas grupa','2026-09-27 14:00:00+03','2026-09-27 16:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000023','Youth painting group (ages 8–16)','Jauniešu gleznošanas grupa (8–16 gadi)','2026-10-01 16:00:00+03','2026-10-01 18:00:00+03',7,2500,'open'),
  ('00000000-0000-4000-8001-000000000024','Adult painting group','Pieaugušo gleznošanas grupa','2026-10-01 18:30:00+03','2026-10-01 20:30:00+03',7,2500,'open')
on conflict (id) do update set
  title_en = excluded.title_en,
  title_lv = excluded.title_lv,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  capacity = excluded.capacity,
  price_cents = excluded.price_cents,
  status = excluded.status;
