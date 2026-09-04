import { NextResponse } from "next/server";
import { requireOwner } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const fields=new Set(["title_en","title_lv","description_en","description_lv","medium","dimensions","price_cents","image_path","status"]);
const statuses=new Set(["available","held","sold"]);
const pick=(source)=>Object.fromEntries(Object.entries(source||{}).filter(([key,value])=>fields.has(key)&&value!==undefined));

export async function GET(request){
  const auth=await requireOwner(request); if(auth.error)return NextResponse.json({error:auth.error},{status:auth.status});
  const {data,error}=await supabaseAdmin.from("artworks").select("*").order("created_at",{ascending:false});
  if(error)return NextResponse.json({error:"Artwork inventory is temporarily unavailable."},{status:503});
  return NextResponse.json({artworks:data||[]});
}

export async function PATCH(request){
  const auth=await requireOwner(request); if(auth.error)return NextResponse.json({error:auth.error},{status:auth.status});
  try{
    const {id,values}=await request.json(); const row=pick(values);
    if(typeof id!=="string"||!id||!Object.keys(row).length)throw new Error("Choose an artwork and at least one value to update.");
    if(row.status&&!statuses.has(row.status))throw new Error("Invalid artwork status.");
    if(row.price_cents!==undefined&&(!Number.isInteger(row.price_cents)||row.price_cents<1))throw new Error("Price must be a positive whole number of cents.");
    const {data,error}=await supabaseAdmin.from("artworks").update(row).eq("id",id).select().single();
    if(error)throw error; return NextResponse.json({artwork:data});
  }catch(error){return NextResponse.json({error:error.message||"Could not update artwork."},{status:400});}
}
