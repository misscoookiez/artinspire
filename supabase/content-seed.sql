-- Optional starting copy for the owner dashboard. Import after schema.sql.
-- The dashboard can change every value later without changing site code.
insert into public.site_content (id,page,locale,value) values
  ('inspire.statement.title','inspire','lv','"MĒS SĀKAM NEVIS AR TO, KO TU PROTI, BET AR TO, KO VĒLIES RADĪT."'),
  ('inspire.statement.title','inspire','en','"WE START NOT WITH WHAT YOU CAN DO, BUT WITH WHAT YOU WANT TO CREATE."'),
  ('inspire.statement.title','inspire','ru','"МЫ НАЧИНАЕМ НЕ С ТОГО, ЧТО ТЫ УМЕЕШЬ, А С ТОГО, ЧТО ХОЧЕШЬ СОЗДАТЬ."'),
  ('inspire.statement.quote','inspire','lv','"Tavai idejai nav jābūt vienkāršai tikai tāpēc, ka Tu vēl nezini, kā to realizēt."'),
  ('inspire.statement.quote','inspire','en','"Your idea does not have to be simple just because you do not yet know how to make it real."'),
  ('inspire.statement.quote','inspire','ru','"Идея не обязана быть простой только потому, что ты пока не знаешь, как её воплотить."'),
  ('about.hero.title','about','en','"A painter who stays in the work."'),
  ('about.hero.kicker','about','en','"ABOUT THE ARTIST"')
on conflict (page, locale, id) do update set value=excluded.value, updated_at=now();
