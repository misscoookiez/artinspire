import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const classFields=new Set(["title_en","title_lv","starts_at","ends_at","capacity","price_cents","status"]);
const privateFields=new Set(["starts_at","ends_at","price_cents","status"]);
const validClassStatus=new Set(["draft","open","closed","cancelled"]);
const validPrivateStatus=new Set(["open","held","booked","closed"]);

function pick(source,allowed) { return Object.fromEntries(Object.entries(source||{}).filter(([key,value])=>allowed.has(key)&&value!==undefined)); }
function validTimes(row) { return !row.starts_at || !row.ends_at || new Date(row.starts_at).getTime()<new Date(row.ends_at).getTime(); }

export async function GET(request) {
  const auth=await requireOwner(request);
  if(auth.error) return NextResponse.json({error:auth.error},{status:auth.status});
  const [classes,slots,bookings]=await Promise.all([
    supabaseAdmin.from("class_sessions").select("*").order("starts_at"),
    supabaseAdmin.from("private_slots").select("*").order("starts_at"),
    supabaseAdmin.from("bookings").select("id,kind,class_session_id,private_slot_id,customer_name,email,status,amount_cents,created_at").order("created_at",{ascending:false}).limit(100)
  ]);
  const error=[classes,slots,bookings].find(result=>result.error)?.error;
  if(error) return NextResponse.json({error:"Schedule is temporarily unavailable."},{status:503});
  return NextResponse.json({classes:classes.data||[],privateSlots:slots.data||[],bookings:bookings.data||[]});
}

export async function POST(request) {
  const auth=await requireOwner(request);
  if(auth.error) return NextResponse.json({error:auth.error},{status:auth.status});
  try {
    const {kind,values}=await request.json();
    const isClass=kind==="class";
    const row=pick(values,isClass?classFields:privateFields);
    if(!validTimes(row) || !row.starts_at || !row.ends_at || !Number.isInteger(row.price_cents) || row.price_cents<1 || (isClass&&(!Number.isInteger(row.capacity)||row.capacity<1))) throw new Error("Please provide a valid date, time, capacity and price.");
    if(isClass&&(!row.title_en||!row.title_lv||!validClassStatus.has(row.status||"open"))) throw new Error("A class needs both titles and a valid status.");
    if(!isClass&&!validPrivateStatus.has(row.status||"open")) throw new Error("Invalid private-slot status.");
    const {data,error}=await supabaseAdmin.from(isClass?"class_sessions":"private_slots").insert({...row,status:row.status||(isClass?"open":"open")}).select().single();
    if(error) throw error;
    return NextResponse.json({item:data},{status:201});
  } catch(error) { return NextResponse.json({error:error.message||"Could not create this slot."},{status:400}); }
}

export async function PATCH(request) {
  const auth=await requireOwner(request);
  if(auth.error) return NextResponse.json({error:auth.error},{status:auth.status});
  try {
    const {kind,id,values}=await request.json();
    const isClass=kind==="class";
    if(typeof id!=="string"||!id) throw new Error("Missing schedule item.");
    const row=pick(values,isClass?classFields:privateFields);
    if(!Object.keys(row).length || !validTimes(row)) throw new Error("Invalid schedule update.");
    if(row.status && !(isClass?validClassStatus:validPrivateStatus).has(row.status)) throw new Error("Invalid schedule status.");
    if(row.capacity!==undefined&&(!Number.isInteger(row.capacity)||row.capacity<1)) throw new Error("Capacity must be at least one.");
    if(row.price_cents!==undefined&&(!Number.isInteger(row.price_cents)||row.price_cents<1)) throw new Error("Price must be positive.");
    const {data,error}=await supabaseAdmin.from(isClass?"class_sessions":"private_slots").update(row).eq("id",id).select().single();
    if(error) throw error;
    return NextResponse.json({item:data});
  } catch(error) { return NextResponse.json({error:error.message||"Could not update this slot."},{status:400}); }
}
