import BookingManagement from "@/components/BookingManagement";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function ManageBookingPage({ params }) {
  const { token } = await params;
  if (!supabaseAdmin) return <Unavailable />;
  const { data:booking } = await supabaseAdmin.from("bookings").select("id,kind,status,class_session_id,private_slot_id,manage_token").eq("manage_token",token).maybeSingle();
  if (!booking) return <Unavailable />;
  const table=booking.kind === "private" ? "private_slots" : "class_sessions";
  const id=booking.kind === "private" ? booking.private_slot_id : booking.class_session_id;
  const { data:session }=await supabaseAdmin.from(table).select(booking.kind === "private" ? "starts_at" : "starts_at,title_en").eq("id",id).maybeSingle();
  if (!session) return <Unavailable />;
  const startsAt=session.starts_at;
  const canCancel=booking.status === "confirmed" && new Date(startsAt).getTime()-Date.now() >= 24*60*60*1000;
  return <BookingManagement token={token} canCancel={canCancel} booking={{kind:booking.kind,status:booking.status,startsAt,title:booking.kind === "private" ? "Private studio session" : session.title_en}}/>;
}

function Unavailable(){return <main className="manage-page"><header><a href="/">SANDRA RUDZĪTE</a><a href="/inspire">ART STUDIO INSPIRE</a></header><section><p>BOOKING MANAGEMENT</p><h1>This link is not<br/><em>available.</em></h1><div className="manage-action"><p>It may have expired, already been used, or the booking service is not connected yet. Contact the studio and we will help.</p><a href="mailto:misscoookiez@gmail.com">CONTACT THE STUDIO →</a></div></section></main>}
