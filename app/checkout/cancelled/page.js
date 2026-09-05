import Link from "next/link";

export default function CheckoutCancelled() {
  return <main className="checkout-state"><p>CHECKOUT PAUSED</p><h1>No payment was made.</h1><span>Your place has not been confirmed. You can return and choose another session whenever you are ready.</span><div><Link href="/inspire#nodarbibas">RETURN TO CLASSES →</Link><Link href="/inspire#pasakumi">VIEW PRIVATE EVENTS →</Link></div></main>;
}
