-- Flexible passes are sold in 4-, 6- and 8-class versions. Their four-week
-- validity starts on the first redeemed class, not on the purchase date.
create or replace function public.confirm_class_pass(
  p_checkout_session text,
  p_payment_intent text,
  p_email text,
  p_customer_name text,
  p_total_uses integer
) returns uuid language plpgsql security definer as $$
declare pass_id uuid;
begin
  if p_total_uses not in (4, 6, 8) then
    raise exception 'A class pass must contain 4, 6 or 8 uses';
  end if;
  select id into pass_id from public.class_passes where stripe_checkout_session_id=p_checkout_session;
  if pass_id is not null then return pass_id; end if;
  insert into public.class_passes(email,customer_name,total_uses,stripe_checkout_session_id,stripe_payment_intent_id)
  values(coalesce(nullif(lower(p_email),''),'unknown@example.invalid'),nullif(p_customer_name,''),p_total_uses,p_checkout_session,p_payment_intent)
  returning id into pass_id;
  return pass_id;
end $$;

create or replace function public.redeem_class_pass_place(p_pass uuid, p_session uuid, p_email text)
returns uuid language plpgsql security definer as $$
declare pass_row public.class_passes; hold_id uuid; booked_count integer; class_capacity integer;
begin
  delete from public.booking_holds where expires_at < now();
  select * into pass_row from public.class_passes where id=p_pass and email=lower(p_email) for update;
  if pass_row.id is null or pass_row.status <> 'active' or pass_row.used_uses >= pass_row.total_uses then raise exception 'This class pass is unavailable'; end if;
  if pass_row.expires_at is not null and pass_row.expires_at <= now() then raise exception 'This class pass has expired'; end if;
  select capacity into class_capacity from public.class_sessions where id=p_session and status='open' for update;
  if class_capacity is null then raise exception 'Class is unavailable'; end if;
  select count(*) into booked_count from public.bookings where class_session_id=p_session and status='confirmed';
  booked_count := booked_count + (select count(*) from public.booking_holds where class_session_id=p_session and expires_at > now());
  if booked_count >= class_capacity then raise exception 'Class is full'; end if;
  update public.class_passes
    set used_uses=used_uses+1,
        expires_at=coalesce(expires_at,now()+interval '4 weeks'),
        status=case when used_uses+1>=total_uses then 'exhausted' else 'active' end
    where id=pass_row.id;
  insert into public.booking_holds(kind,class_session_id,email,expires_at)
    values('class',p_session,lower(p_email),now()+interval '15 minutes')
    returning id into hold_id;
  return hold_id;
end $$;

revoke all on function public.confirm_class_pass(text,text,text,text,integer) from public, anon, authenticated;
grant execute on function public.confirm_class_pass(text,text,text,text,integer) to service_role;
