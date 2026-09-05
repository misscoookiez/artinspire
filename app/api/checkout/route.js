import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { artwork, classes } from "@/lib/catalog";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { attachStripeSession, createBookingHold } from "@/lib/bookings";
import { attachArtworkCheckoutSession, createArtworkHold } from "@/lib/fulfillment";
import { rateLimit } from "@/lib/rate-limit";
import { isTrustedBrowserRequest } from "@/lib/request-security";

const site = () => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new URL(configured).origin;
};
const classPurchases={
  trial:{name:"Trial class",amount:1500},
  group:{name:"Group class",amount:2500},
  pass:{name:"Four-class studio pass",amount:8000}
};
const privatePurchases={
  private:{name:"Private studio session",amount:4500},
  rental:{name:"Studio work session",amount:1000}
};
const paymentMethodTypes=(process.env.STRIPE_PAYMENT_METHOD_TYPES || "card,sepa_debit")
  .split(",")
  .map((type)=>type.trim())
  .filter(Boolean);

export async function POST(request) {
  if (!isTrustedBrowserRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const throttle = rateLimit(request, "checkout", { limit: 8, windowMs: 60_000 });
  if (!throttle.allowed) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 429, headers: { "Retry-After": String(throttle.retryAfter) } });
  let bookingHoldId, artworkHoldId;
  try {
    const body = await request.json();
    const origin = site();
    const business = Boolean(body.invoice);
    // This can only be enabled in local development to verify that Stripe Checkout
    // itself is wired correctly before the Supabase booking database is connected.
    // It must never be used as the production scheduler: there is no durable hold.
    const allowLocalStripeBookingTest = process.env.NODE_ENV === "development" && process.env.STRIPE_TEST_BOOKINGS_WITHOUT_DATABASE === "true";
    let line_items, metadata;
    if (body.kind === "art") {
      let chosen = (body.items || []).map(({ id }) => artwork.find(a => a.id === id)).filter(Boolean);
      if(supabaseAdmin){
        const ids=(body.items||[]).map(item=>item.id).filter(id=>typeof id==="string");
        const {data,error}=await supabaseAdmin.from("artworks").select("id,title_en,title_lv,description_en,description_lv,medium,dimensions,price_cents,image_path,status").in("id",ids).eq("status","available");
        if(error)throw error;
        chosen=(data||[]).map(item=>({id:item.id,title:item.title_en,titleLv:item.title_lv,description:item.description_en,medium:item.medium,size:item.dimensions,price:item.price_cents/100,image:item.image_path}));
      }
      if (!chosen.length) return NextResponse.json({error:"Your cart is empty."},{status:400});
      if (stripe && !supabaseAdmin) return NextResponse.json({error:"Artwork inventory is not configured yet."},{status:503});
      if (stripe) artworkHoldId=await createArtworkHold({artworkIds:chosen.map(a=>a.id),email:body.email});
      line_items = chosen.map(a => ({ price_data:{ currency:"eur", product_data:{name:a.title,description:`${a.medium}, ${a.size}`}, unit_amount:a.price*100 }, quantity:1 }));
      metadata={type:"art_order", artwork_ids:chosen.map(a=>a.id).join(","), artwork_hold_id:artworkHoldId||""};
    } else if (body.kind === "class") {
      let session=classes.find(c=>c.id===body.itemId);
      if(supabaseAdmin){
        const {data:liveSession,error}=await supabaseAdmin.from("class_sessions").select("id,title_en,title_lv,starts_at,ends_at,capacity,price_cents,status").eq("id",body.itemId).maybeSingle();
        if(error||!liveSession||liveSession.status!=="open") return NextResponse.json({error:"That class is no longer available."},{status:400});
        session={id:liveSession.id,title:liveSession.title_en,titleLv:liveSession.title_lv,date:new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Riga",weekday:"short",day:"numeric",month:"short"}).format(new Date(liveSession.starts_at)),time:new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Riga",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date(liveSession.starts_at)),price:liveSession.price_cents/100,seats:liveSession.capacity};
      }
      if(!session) return NextResponse.json({error:"That class is no longer available."},{status:400});
      const purchase=body.purchase ? classPurchases[body.purchase] : null;
      if(body.purchase==="pass") return NextResponse.json({error:"The four-class pass is being connected to its own class selector. Please contact the studio for the moment."},{status:503});
      if(body.purchase && !purchase) return NextResponse.json({error:"That class format is unavailable."},{status:400});
      if (stripe && !supabaseAdmin && !allowLocalStripeBookingTest) return NextResponse.json({error:"Bookings are not configured yet."},{status:503});
      if (stripe && supabaseAdmin) bookingHoldId=await createBookingHold({kind:"class",resourceId:session.id,email:body.email});
      const amount=purchase?.amount ?? session.price*100;
      line_items=[{price_data:{currency:"eur",product_data:{name:purchase?.name ?? session.title,description:`${session.date}, ${session.time}`},unit_amount:amount},quantity:1}];
      metadata={type:"class_booking", class_id:session.id, booking_hold_id:bookingHoldId||"", customer_name:body.name||"", purchase:body.purchase||"single"};
    } else if (body.kind === "private") {
      if(!body.privateSlot) return NextResponse.json({error:"Please choose a time."},{status:400});
      const purchase=privatePurchases[body.purchase];
      if(!purchase) return NextResponse.json({error:"Please choose a private-session or studio-work format."},{status:400});
      if (stripe && !supabaseAdmin && !allowLocalStripeBookingTest) return NextResponse.json({error:"Bookings are not configured yet."},{status:503});
      if(supabaseAdmin){
        const {data:slot,error}=await supabaseAdmin.from("private_slots").select("id,price_cents,status,starts_at,ends_at").eq("id",body.privateSlot).maybeSingle();
        if(error||!slot||slot.status!=="open"||slot.price_cents!==purchase.amount) return NextResponse.json({error:"That time is no longer available for this format."},{status:400});
      }
      if (stripe && supabaseAdmin) bookingHoldId=await createBookingHold({kind:"private",resourceId:body.privateSlot,email:body.email});
      line_items=[{price_data:{currency:"eur",product_data:{name:purchase.name,description:body.privateSlot},unit_amount:purchase.amount},quantity:1}];
      metadata={type:"private_booking", private_slot_id:body.privateSlot, booking_hold_id:bookingHoldId||"", customer_name:body.name||"", purchase:body.purchase};
    } else if (body.kind === "gift") {
      const classes = Number.parseInt(body.giftClasses, 10);
      if (!Number.isInteger(classes) || classes < 2 || classes > 40) {
        return NextResponse.json({error:"Please choose between 2 and 40 classes."},{status:400});
      }
      const unitAmount = classes >= 4 ? 2000 : 2500;
      const amount = classes * unitAmount;
      line_items=[{price_data:{currency:"eur",product_data:{name:`Art Studio Inspire gift card · ${classes} classes`,description:`${classes} painting class${classes === 1 ? "" : "es"} · €${unitAmount / 100} per class`},unit_amount:amount},quantity:1}];
      metadata={type:"gift_card", gift_classes:String(classes), customer_name:body.name||"", customer_email:body.email||""};
    } else if (body.kind === "pass") {
      const classes = Number.parseInt(body.giftClasses, 10);
      if (![4, 6, 8].includes(classes)) {
        return NextResponse.json({error:"Please choose a 4-, 6-, or 8-class pass."},{status:400});
      }
      const amount = classes * 2000;
      line_items=[{price_data:{currency:"eur",product_data:{name:`Art Studio Inspire ${classes}-class pass`,description:"Valid for four weeks from the first class."},unit_amount:amount},quantity:1}];
      metadata={type:"class_pass", pass_classes:String(classes), valid_for:"4 weeks from first class", customer_name:body.name||"", customer_email:body.email||""};
    } else return NextResponse.json({error:"Unknown checkout type."},{status:400});
    if (!stripe) return NextResponse.json({url:`${origin}/checkout/success?demo=1`});
    const session=await stripe.checkout.sessions.create({
      mode:"payment", line_items, customer_email:body.email || undefined, metadata,
      payment_method_types:paymentMethodTypes,
      success_url:`${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url:`${origin}/checkout/cancelled`,
      billing_address_collection:business ? "required" : "auto",
      invoice_creation: business ? { enabled:true, invoice_data:{description:"Studio purchase"} } : {enabled:false},
      shipping_address_collection:body.kind==="art" ? {allowed_countries:["LV","EE","LT","DE","FI","SE","NO","DK","PL","NL","BE","FR","IE","AT","ES","IT","GB","US","CA","AU"]} : undefined,
      phone_number_collection:{enabled:body.kind!=="art"}
    });
    if (bookingHoldId) await attachStripeSession(bookingHoldId, session.id);
    if (artworkHoldId) await attachArtworkCheckoutSession(artworkHoldId, session.id);
    return NextResponse.json({url:session.url});
  } catch (error) { console.error(error); return NextResponse.json({error:"Unable to start checkout. Please try again."},{status:500}); }
}
