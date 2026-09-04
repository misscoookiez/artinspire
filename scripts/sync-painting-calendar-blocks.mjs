import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const calendarBlocks=JSON.parse(await readFile(new URL("./calendar-painting-blocks.json",import.meta.url),"utf8"));
const database=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
let closed=0;
for(const block of calendarBlocks){
  if(/tattoo/i.test(block.title)) continue;
  const {data,error}=await database.from("private_slots").update({status:"closed"}).eq("status","open").lt("starts_at",block.end).gt("ends_at",block.start).select("id");
  if(error) throw error;
  closed+=data?.length||0;
}
console.log(JSON.stringify({calendarBlocks:calendarBlocks.length,closedSlots:closed}));
