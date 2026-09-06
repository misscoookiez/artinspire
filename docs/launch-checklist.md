# Art Studio Inspire — launch configuration

The site is ready to use Supabase for its live catalogue, bookings and editable
content. Configure the following **server-side** environment variables on the
hosting provider before enabling payments and email in public.

## 1. Website address

```text
NEXT_PUBLIC_SITE_URL=https://artinspire.lv
```

Use the final public address without a trailing slash. This is used in payment
return links, booking management links and calendar files.

## 2. Supabase

Copy the values from the existing Supabase project settings:

```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` must never be exposed in browser code or entered as
a public environment variable.

## 3. Email via Resend

1. Create or sign in to a Resend account.
2. Add and verify a sending domain (for example `artinspire.lv`) by adding the
   DNS records Resend supplies.
3. Create an API key with sending access.
4. Add these variables at the host:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Art Studio Inspire <hello@artinspire.lv>
STUDIO_INBOX_EMAIL=misscoookiez@gmail.com
```

This powers Contact and event-inquiry messages, reservation notifications and
customer confirmations. Use a verified sender address for `RESEND_FROM_EMAIL`.

## 4. Stripe payments and scheduling

Keep the existing production Stripe secret key and add a webhook endpoint in
the Stripe Dashboard:

```text
https://artinspire.lv/api/stripe/webhook
```

Subscribe it to these events:

```text
checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.expired
charge.refunded
```

Stripe will reveal a webhook signing secret after the endpoint is created. Add
it to the host:

```text
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PAYMENT_METHOD_TYPES=card
```

Only add additional Stripe payment methods after confirming that their
asynchronous payment behaviour is acceptable for a booked time slot.

## 5. After saving variables

Redeploy or restart the site. Then safely test with a real email address:

1. Send a Contact message and confirm it arrives at `STUDIO_INBOX_EMAIL`.
2. Reserve a test session and confirm the guest receives the booking email,
   management link and `.ics` calendar download.
3. Complete a Stripe test payment and confirm the webhook creates/updates the
   booking in Supabase.
4. Use the booking management link at least 24 hours before the test session
   and confirm cancellation reopens the slot and initiates the Stripe refund.

Do not send keys or webhook secrets in chat, email, source control or an admin
content field.
