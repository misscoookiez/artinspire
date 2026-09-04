-- One-time follow-up for an already-created project.
-- Keep the service role server-only: it receives table access so API routes can
-- write booking holds, orders and content while browser clients remain RLS-bound.
grant usage on schema public to service_role;
grant all privileges on all tables in schema public to service_role;

-- Serialize reservations for a class session. The row lock prevents two
-- customers from taking a final seat at the same moment.
create or replace function public.hold_class_place(p_session uuid, p_email text)
returns uuid language plpgsql security definer as $$
declare hold_id uuid; booked_count integer; session_capacity integer;
begin
  delete from public.booking_holds where expires_at < now();
  select capacity into session_capacity from public.class_sessions
  where id=p_session and status='open' for update;
  if session_capacity is null then raise exception 'Class is unavailable'; end if;
  select count(*) into booked_count from public.bookings where class_session_id=p_session and status='confirmed';
  booked_count := booked_count + (select count(*) from public.booking_holds where class_session_id=p_session and expires_at > now());
  if booked_count >= session_capacity then raise exception 'Class is full'; end if;
  insert into public.booking_holds(kind,class_session_id,email,expires_at)
  values ('class',p_session,p_email,now()+interval '15 minutes') returning id into hold_id;
  return hold_id;
end $$;

revoke all on function public.hold_class_place(uuid,text) from public, anon, authenticated;
grant execute on function public.hold_class_place(uuid,text) to service_role;
