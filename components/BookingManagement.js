"use client";
import { useState } from "react";

export default function BookingManagement({ booking, token, canCancel }) {
  const [state,setState]=useState("");
  const start=new Date(booking.startsAt).toLocaleString("en-GB",{dateStyle:"full",timeStyle:"short"});
  const cancel=async()=>{
    setState("Processing your cancellation…");
    const response=await fetch(`/api/bookings/${token}/cancel`,{method:"POST"});
    const data=await response.json();
    setState(data.message || data.error || "We could not process that request.");
  };
  return <main className="manage-page"><header><a href="/">ART STUDIO INSPIRE</a><a href="/classes">CLASSES</a></header><section><p>BOOKING MANAGEMENT</p><h1>Your studio<br/><em>time.</em></h1><div className="manage-card"><span>{booking.kind === "private" ? "PRIVATE SESSION" : "GROUP CLASS"}</span><h2>{booking.title}</h2><p>{start}</p><small>Status · {booking.status}</small><a href={`/api/bookings/${token}/calendar`}>ADD TO CALENDAR (.ICS) →</a></div>{canCancel?<div className="manage-action"><h2>Need to change plans?</h2><p>{booking.paid ? "Cancel at least 24 hours before the session starts and the payment will be refunded automatically to the original payment method." : "Cancel at least 24 hours before the session starts and your reserved place will be released automatically."}</p><button onClick={cancel} disabled={Boolean(state)}>{state || (booking.paid ? "CANCEL & REFUND BOOKING" : "CANCEL RESERVATION")}</button></div>:<div className="manage-action"><h2>This booking can no longer be cancelled online.</h2><p>The 24-hour cancellation window has passed, or this booking has already been changed. Please contact the studio if you need help.</p><a href="mailto:misscoookiez@gmail.com">CONTACT THE STUDIO →</a></div>}</section></main>;
}
