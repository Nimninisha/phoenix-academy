"use client";

import Link from "next/link";

export default function SubscriptionPage() {
  return (
    <div className="home-royal-white fade-up">
      <div className="page-logo">
        <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
        <h1>Subscription Plans</h1>
      </div>

      <div className="features-royal-white">

        {/* Monthly */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Monthly Subscription</h3>
          <p className="card-royal-text">
            Access all premium simulations, printed resources, and dashboard features.
          </p>

          <ul className="card-royal-list">
            <li>All Quiz Simulations</li>
            <li>All Lab Simulations</li>
            <li>All Printed Resources</li>
            <li>Dashboard Access</li>
          </ul>

          <Link href="/checkout?plan=monthly" className="card-royal-link phoenix-link-gold">
            Subscribe Monthly →
          </Link>
        </div>

        {/* Yearly */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Yearly Subscription</h3>
          <p className="card-royal-text">
            Best value — full access for 12 months.
          </p>

          <ul className="card-royal-list">
            <li>Everything in Monthly</li>
            <li>Exclusive yearly-only discounts</li>
            <li>Priority support</li>
          </ul>

          <Link href="/checkout?plan=yearly" className="card-royal-link phoenix-link-gold">
            Subscribe Yearly →
          </Link>
        </div>
      </div>
    </div>
  );
}
