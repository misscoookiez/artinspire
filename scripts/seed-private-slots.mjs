import { createClient } from "@supabase/supabase-js";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key) throw new Error("Supabase server credentials are required.");

const supabase=createClient(url,key,{auth:{persistSession:false}});
const weekdays=new Set([2,3,4]); // Tuesday, Wednesday, Thursday
const rows=[];
const cursor=new Date("2026-09-04T00:00:00Z");
const end=new Date("2026-10-30T00:00:00Z");
while(cursor<end){
  if(weekdays.has(cursor.getUTCDay())){
    const date=cursor.toISOString().slice(0,10);
    for(const [start,endTime] of [["12:00","14:00"],["14:00","16:00"]]) rows.push({starts_at:`${date}T${start}:00+03:00`,ends_at:`${date}T${endTime}:00+03:00`,price_cents:4500,status:"open"});
  }
  cursor.setUTCDate(cursor.getUTCDate()+1);
}
const {error}=await supabase.from("private_slots").upsert(rows,{onConflict:"starts_at",ignoreDuplicates:true});
if(error) throw error;
console.log(`Created or retained ${rows.length} private-session slots.`);
