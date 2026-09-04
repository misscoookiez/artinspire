-- Run after schema.sql in a NEW Supabase project. These records mirror the
-- visible demo catalogue so Stripe/Supabase can be tested end-to-end.
-- Replace titles, dimensions, prices and dates with final approved details
-- before enabling live payments.

insert into public.artworks (id,title_en,title_lv,description_en,description_lv,medium,dimensions,price_cents,image_path)
values
  ('twilight','Twilight','Krēsla','A nocturnal landscape in oil.','Naksnīga ainava eļļā.','Oil on canvas','Details to be confirmed',85000,'/art/twilight.jpg'),
  ('crow','Crow','Vārna','An original blue-black study.','Oriģināls zili melns pētījums.','Oil on canvas','Details to be confirmed',72000,'/art/crow.jpg'),
  ('still-life-horse','Still Life with Horse','Klusā daba ar zirgu','An original still life.','Oriģināla klusā daba.','Oil on canvas','Details to be confirmed',48000,'/art/still-life-horse.jpg')
on conflict (id) do nothing;

insert into public.class_sessions (id,title_en,title_lv,starts_at,ends_at,capacity,price_cents,status)
values
  ('00000000-0000-4000-8000-000000000101','Still life in oils','Klusā daba eļļā','2026-09-20 11:00:00+03','2026-09-20 14:00:00+03',6,5500,'open'),
  ('00000000-0000-4000-8000-000000000102','Portrait drawing','Portretu zīmēšana','2026-09-24 18:30:00+03','2026-09-24 21:00:00+03',8,4200,'open'),
  ('00000000-0000-4000-8000-000000000103','Colour & atmosphere','Krāsa un atmosfēra','2026-10-04 11:00:00+03','2026-10-04 15:00:00+03',4,7000,'open')
on conflict (id) do nothing;

insert into public.private_slots (id,starts_at,ends_at,price_cents,status)
values
  ('00000000-0000-4000-8000-000000000201','2026-09-21 17:00:00+03','2026-09-21 18:30:00+03',7500,'open'),
  ('00000000-0000-4000-8000-000000000202','2026-09-23 11:00:00+03','2026-09-23 12:30:00+03',7500,'open'),
  ('00000000-0000-4000-8000-000000000203','2026-09-26 15:00:00+03','2026-09-26 16:30:00+03',7500,'open')
on conflict (id) do nothing;
