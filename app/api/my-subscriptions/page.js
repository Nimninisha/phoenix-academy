"use client";

import { useEffect, useState } from "react";
import PageLogo from "../../components/PageLogo";

export default function MySubscriptionsPage() {
  const userId = "demo-user-id";
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const loadSubs = async () => {
      const res = await fetch("/api/my-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      setSubs(data);
    };

    loadSubs();
  }, []);

  return (
    <div className="page">
      <PageLogo title="My Subscriptions" />

      {subs.length === 0 && <p>No active subscriptions.</p>}

      {subs.map((sub) => (
        <div key={sub._id} className="subscription-card">
          <h3>{sub.planKind.toUpperCase()} — {sub.billingPeriod}</h3>
          <p><strong>Type:</strong> {sub.resourceType}</p>
          <p><strong>Start:</strong> {new Date(sub.currentPeriodStart).toLocaleDateString()}</p>
          <p><strong>Expires:</strong> {new Date(sub.currentPeriodEnd).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
