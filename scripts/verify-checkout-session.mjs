import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const sessionId=process.argv[2];
if(!sessionId) throw new Error("Pass a Stripe Checkout session id.");

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
const database=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
const session=await stripe.checkout.sessions.retrieve(sessionId);
if(session.status==="open") await stripe.checkout.sessions.expire(sessionId);
const {error}=await database.from("booking_holds").delete().eq("stripe_session_id",sessionId);
if(error) throw error;
console.log(JSON.stringify({currency:session.currency,amountTotal:session.amount_total,paymentStatus:session.payment_status,expired:true,holdRemoved:true}));
