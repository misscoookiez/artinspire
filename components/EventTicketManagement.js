"use client";
import { useState } from "react";

export default function EventTicketManagement({ ticket, token, canCancel }) {
  const [state, setState] = useState("");
  const cancel = async () => {
    setState("Processing your cancellation…");
    const response = await fetch(`/api/event-tickets/${token}/cancel`, { method:"POST" });
    const data = await response.json();
    setState(data.message || data.error || "We could not process that request.");
  };
  return <main className="manage-page"><header><a href="/">ART STUDIO INSPIRE</a><a href="/events">EVENTS</a></header><section><p>EVENT TICKET</p><h1>Your place<br/><em>is yours.</em></h1><div className="manage-card"><span>{ticket.paid ? "PAID TICKET" : "RESERVED PLACE"}</span><h2>{ticket.title}</h2><p>{new Date(ticket.startsAt).toLocaleString("en-GB", { dateStyle:"full", timeStyle:"short", timeZone:"Europe/Riga" })}</p><small>Status · {ticket.status}</small></div>{canCancel ? <div className="manage-action"><h2>Need to change plans?</h2><p>{ticket.paid ? "Cancel at least 24 hours before the event and the ticket payment will be refunded automatically to the original payment method." : "Cancel at least 24 hours before the event and your reserved place will be released."}</p><button onClick={cancel} disabled={Boolean(state)}>{state || (ticket.paid ? "CANCEL & REFUND TICKET" : "CANCEL RESERVATION")}</button></div> : <div className="manage-action"><h2>This ticket can no longer be cancelled online.</h2><p>The 24-hour cancellation window has passed, or the ticket was already changed. Contact the studio if you need help.</p><a href="mailto:misscoookiez@gmail.com">CONTACT THE STUDIO →</a></div>}</section></main>;
}
