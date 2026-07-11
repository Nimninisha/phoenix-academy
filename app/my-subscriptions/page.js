"use client";

import { useEffect, useState } from "react";

export default function MySubscriptionsPage() {
  const [subscriptions, setSubscriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      const res = await fetch(
        "/api/subscription-status"
      );

      const data = await res.json();

      setSubscriptions(
        data.subscriptions || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>My Subscriptions</h1>

      {loading && (
        <p>Loading...</p>
      )}

      {!loading &&
        subscriptions.length === 0 && (
          <p>
            No active subscriptions found.
          </p>
        )}

      {!loading &&
        subscriptions.map((sub) => (
          <div
            key={sub._id}
            style={{
              border:
                "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginTop: "15px",
            }}
          >
            <h3>
              {sub.planKind}
            </h3>

            <p>
              Status:{" "}
              {sub.status}
            </p>

            <p>
              Billing Period:{" "}
              {sub.billingPeriod}
            </p>

            <p>
              Stripe Subscription:
              {" "}
              {
                sub.stripeSubscriptionId
              }
            </p>

            <p>
              Renewal Date:{" "}
              {new Date(
                sub.currentPeriodEnd
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
    </div>
  );
}