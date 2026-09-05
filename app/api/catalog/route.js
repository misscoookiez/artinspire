import { NextResponse } from "next/server";
import { artwork } from "@/lib/catalog";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ availableIds:artwork.map(item=>item.id), mode:"demo" });
  const now = new Date().toISOString();
  const [artworkResult, classesResult, bookingsResult, holdsResult, slotsResult] = await Promise.all([
    supabaseAdmin.from("artworks").select("id,title_en,title_lv,description_en,description_lv,medium,dimensions,price_cents,image_path").eq("status","available").order("created_at",{ascending:false}),
    supabaseAdmin.from("class_sessions").select("id,title_en,title_lv,starts_at,ends_at,capacity,price_cents,status").eq("status","open").gte("ends_at",now).order("starts_at"),
    supabaseAdmin.from("bookings").select("class_session_id").eq("status","confirmed").not("class_session_id","is",null),
    supabaseAdmin.from("booking_holds").select("class_session_id,private_slot_id").gt("expires_at",now),
    supabaseAdmin.from("private_slots").select("id,starts_at,ends_at,price_cents").eq("status","open").gte("ends_at",now).order("starts_at")
  ]);
  const error=[artworkResult,classesResult,bookingsResult,holdsResult,slotsResult].find(result=>result.error)?.error;
  if (error) return NextResponse.json({error:"Catalogue is unavailable."},{status:503});
  const countBy=(rows,key)=>rows.reduce((counts,row)=>{if(row[key]) counts[row[key]]=(counts[row[key]]||0)+1;return counts;},{});
  const booked=countBy(bookingsResult.data||[],"class_session_id");
  const held=countBy(holdsResult.data||[],"class_session_id");
  const withAvailability=(session)=>({...session,available:Math.max(0,session.capacity-(booked[session.id]||0)-(held[session.id]||0))>0});
  const heldPrivate=new Set((holdsResult.data||[]).map(row=>row.private_slot_id).filter(Boolean));
  return NextResponse.json({
    availableIds:(artworkResult.data||[]).map(item=>item.id),
    artworks:(artworkResult.data||[]).map(item=>({id:item.id,title:item.title_en,titleLv:item.title_lv,description:item.description_en,descriptionLv:item.description_lv,medium:item.medium,size:item.dimensions,price:item.price_cents/100,image:item.image_path})),
    // Never expose remaining counts or capacity publicly. The server still
    // performs the exact count inside its locked reservation operations.
    classAvailability:(classesResult.data||[]).map(session=>({id:session.id,available:withAvailability(session).available})),
    classSessions:(classesResult.data||[]).map(session=>{const live=withAvailability(session);return {id:live.id,title_en:live.title_en,title_lv:live.title_lv,starts_at:live.starts_at,ends_at:live.ends_at,price_cents:live.price_cents,status:live.status,available:live.available};}),
    privateAvailableIds:(slotsResult.data||[]).map(slot=>slot.id).filter(id=>!heldPrivate.has(id)),
    privateSlots:(slotsResult.data||[]).filter(slot=>!heldPrivate.has(slot.id)),
    mode:"live"
  });
}
