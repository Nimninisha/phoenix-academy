"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function SubscribePage() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const res = await fetch("/api/checkout", { method: "POST" });
    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="page">
      <h1>Subscription Plans</h1>
      <p>Access all premium simulations with one subscription.</p>
      <button className="btn-primary" onClick={handleCheckout}>
        Subscribe Now
      </button>
    </div>
  );
}
