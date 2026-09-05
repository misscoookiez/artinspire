import Link from "next/link";

export default function CheckoutSuccess({ searchParams }) {
  const demo = searchParams?.demo === "1";
  return <main className="checkout-state"><p>{demo ? "DEMO CONFIRMATION" : "PAYMENT RECEIVED"}</p><h1>{demo ? "Your booking flow is ready." : "Thank you."}</h1><span>{demo ? "Stripe test mode will replace this confirmation once your account is connected." : "Your order or booking is now being confirmed. A receipt will arrive by email."}</span><div><Link href="/inspire#nodarbibas">VIEW CLASSES →</Link><Link href="/inspire">VISIT INSPIRE →</Link></div></main>;
}
