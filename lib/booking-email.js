function escapeIcs(value=""){return String(value).replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/\n/g,"\\n");}
export function bookingCalendar({title,startsAt,endsAt,token}){
  const stamp=date=>new Date(date).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
  const url=`${process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"}/manage/${token}`;
  return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Art Studio Inspire//Bookings//EN\r\nBEGIN:VEVENT\r\nUID:${token}@artstudioinspire\r\nDTSTAMP:${stamp(Date.now())}\r\nDTSTART:${stamp(startsAt)}\r\nDTEND:${stamp(endsAt)}\r\nSUMMARY:${escapeIcs(title)}\r\nDESCRIPTION:${escapeIcs(`See you soon at Art Studio Inspire. Manage this booking: ${url}`)}\r\nLOCATION:Miera iela 17\r\nURL:${url}\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
}

export async function sendBookingConfirmation({email,name,title,startsAt,endsAt,token}){
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL)return false;
  const manageUrl=`${process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"}/manage/${token}`;
  const calendarUrl=`${process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000"}/api/bookings/${token}/calendar`;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[email],subject:`See you soon — ${title}`,html:`<p>Hi ${name||"there"},</p><p><strong>See you soon at Art Studio Inspire.</strong></p><p>Your booking: ${title}</p><p><a href="${calendarUrl}">Add this class to your calendar</a></p><p><small>You can cancel online and receive an automatic refund until 24 hours before the start time. <a href="${manageUrl}">Manage this booking</a>.</small></p>`})});
  if(!response.ok)throw new Error("Confirmation email could not be sent.");
  return true;
}

export async function sendClassPassConfirmation({email,name,classes}){
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL||!email)return false;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[email],subject:"Your Art Studio Inspire class pass",html:`<p>Hi ${name||"there"},</p><p><strong>Your ${classes}-class pass is ready.</strong></p><p>It becomes valid for four weeks from your first class. To choose that first visit, reply to this email or contact Art Studio Inspire with the group and date that suit you.</p><p>We look forward to seeing what you make.</p>`})});
  if(!response.ok)throw new Error("Class-pass confirmation email could not be sent.");
  return true;
}

export async function sendGiftCardConfirmation({email,name,classes,code}){
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL||!email)return false;
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[email],subject:"Your Art Studio Inspire gift card",html:`<p>Hi ${name||"there"},</p><p><strong>Your gift card for ${classes} painting class${classes === 1 ? "" : "es"} is ready.</strong></p><p>Gift card code: <strong>${code}</strong></p><p>To choose the recipient’s first visit, reply to this email or contact Art Studio Inspire with the preferred group and date.</p><p>We hope it gives someone beautiful time to make something.</p>`})});
  if(!response.ok)throw new Error("Gift-card confirmation email could not be sent.");
  return true;
}

function escapeHtml(value=""){
  return String(value).replace(/[&<>"']/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[character]);
}

export async function sendGroupApplication({name,email,group}){
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL)return false;
  const inbox=process.env.STUDIO_INBOX_EMAIL||"misscoookiez@gmail.com";
  const safeName=escapeHtml(name);
  const safeEmail=escapeHtml(email);
  const safeGroup=escapeHtml(group);
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[inbox],reply_to:email,subject:`New group application — ${group}`,html:`<p><strong>New Art Studio Inspire group application</strong></p><p><strong>Group:</strong> ${safeGroup}<br><strong>Name:</strong> ${safeName}<br><strong>Email:</strong> ${safeEmail}</p>`})});
  if(!response.ok)throw new Error("Application email could not be sent.");
  const confirmation=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[email],subject:"Your Art Studio Inspire place is reserved",html:`<p>Hi ${safeName||"there"},</p><p><strong>Your place in ${safeGroup} is reserved.</strong></p><p>We will be in touch with the first date and practical details.</p><p>— Art Studio Inspire</p>`})});
  if(!confirmation.ok)throw new Error("Application confirmation could not be sent.");
  return true;
}

export async function sendReservationNotification({name,email,label,kind}){
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL)return false;
  const inbox=process.env.STUDIO_INBOX_EMAIL||"misscoookiez@gmail.com";
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[inbox],reply_to:email,subject:`New ${kind === "private" ? "private" : "class"} reservation — ${label}`,html:`<p><strong>New Art Studio Inspire reservation</strong></p><p><strong>Time:</strong> ${escapeHtml(label)}<br><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p><p>This place is already reserved in the live schedule. Please follow up personally with the guest.</p>`})});
  if(!response.ok)throw new Error("Reservation notification email could not be sent.");
  return true;
}
