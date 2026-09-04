-- Enable owner-managed Russian copy alongside Latvian and English.
alter table public.site_content
  drop constraint if exists site_content_locale_check;

alter table public.site_content
  add constraint site_content_locale_check
  check (locale in ('lv', 'en', 'ru'));
