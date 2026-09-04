# Sandra Rudzite Studio

Bilingual portfolio, original-art shop, and Art Studio Inspire booking application. The public visual build works without credentials. Payments, bookings, inventory changes, and refunds activate only after Stripe and Supabase are connected.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Run `npm install` then `npm run dev -- -p 3001`.
3. Visit `http://localhost:3001`.

Without credentials, checkout deliberately returns to the local demo-success state. No card is charged and no booking data is stored.

## Connect Supabase

1. Create a Supabase project in the EU region if that suits the studio's data requirements.
2. Add its URL, anon key, and **server-only** service-role key to `.env.local` / Vercel environment variables. Never put the service-role key in browser code.
3. In the Supabase SQL editor, run `supabase/schema.sql` from top to bottom.
4. For test-mode data only, run `supabase/seed.example.sql`.
5. Replace every seed title, size, price, image path, class session, and private slot before live payments.

The schema exposes only available catalogue records publicly. Capacity, holds, customer data, fulfilment, and Stripe events stay server-only.

## Connect Stripe

1. Add Stripe **test** secret key and test webhook signing secret.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact local or production base URL.
3. In the Stripe dashboard, enable **cards** and **SEPA Direct Debit** for Checkout if SEPA is offered, then create a webhook endpoint at `/api/stripe/webhook` and enable:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded` (needed for SEPA Direct Debit)
   - `checkout.session.expired`
   - `charge.refunded`
4. Run test purchases for an original, a group class, and a private session.
5. Confirm that a paid artwork becomes unavailable; abandoned checkouts release after their hold; class capacity remains correct; a private slot reopens after an eligible refund.
6. Only then switch to live Stripe keys and a live webhook signing secret.

## Deploy to Vercel

1. Import this project into Vercel or connect a Git repository.
2. Add the same production environment variables in **Project Settings → Environment Variables**.
3. Set `NEXT_PUBLIC_SITE_URL` to the HTTPS custom domain, without a trailing slash.
4. Deploy, then register the production Stripe webhook endpoint. Stripe webhooks must point at the deployed HTTPS domain—not localhost.
5. Replace demo image files with Supabase Storage/CDN URLs and update `lib/catalog.js` or the future admin catalogue data.

## Before accepting live money

- Confirm actual artwork titles, media, dimensions, availability, prices, and shipping rates.
- Confirm studio schedule, capacity, session duration, and private-session pricing.
- Add the legal business identity, VAT policy, shipping policy, privacy contact, and final cancellation language to `/legal`.
- Choose and connect an email provider for booking confirmations, calendar attachments, and management links. The token-based management/refund route is implemented; sending those emails needs the studio's chosen email account/provider.
- Complete Stripe Tax configuration only if VAT/tax registration requires it.
- Test on a real phone, then place/refund real Stripe **test-mode** payments before enabling live mode.
