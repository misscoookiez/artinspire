import { createClient } from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key) throw new Error("Supabase server credentials are required.");
const supabase=createClient(url,key,{auth:{persistSession:false}});
const rows=[];
const cursor=new Date("2026-09-04T00:00:00Z");
const end=new Date("2026-10-30T00:00:00Z");
while(cursor<end){
  const weekday=cursor.getUTCDay(); // 0 Sun … 6 Sat
  const date=cursor.toISOString().slice(0,10);
  for(let hour=12;hour<24;hour++){
    const inPrivateWindow=[2,3,4].includes(weekday)&&hour<16;
    const inThursdayGroup=weekday===4&&hour>=16&&hour<21;
    const inWeekendGroup=[0,6].includes(weekday)&&hour<16;
    if(inPrivateWindow||inThursdayGroup||inWeekendGroup) continue;
    const nextHour=hour===23?"00":String(hour+1).padStart(2,"0");
    const nextDate=hour===23?new Date(cursor.getTime()+86400000).toISOString().slice(0,10):date;
    rows.push({starts_at:`${date}T${String(hour).padStart(2,"0")}:00:00+03:00`,ends_at:`${nextDate}T${nextHour}:00:00+03:00`,price_cents:1000,status:"open"});
  }
  cursor.setUTCDate(cursor.getUTCDate()+1);
}
const {error}=await supabase.from("private_slots").upsert(rows,{onConflict:"starts_at",ignoreDuplicates:true});
if(error) throw error;
const {error:legacyError}=await supabase.from("private_slots").update({price_cents:1000}).eq("price_cents",1500);
if(legacyError) throw legacyError;
console.log(`Created or retained ${rows.length} one-hour studio-rental slots.`);
