"use client";

import { useEffect, useState } from "react";
import { getUser } from "../../lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const u = await getUser();
      if (!u) {
        window.location.href = "/login";
      } else {
        setUser(u);
      }
    }
    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="home-royal-white fade-up">
        <div className="page-logo">
          <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
          <h1>Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="home-royal-white fade-up">
      <div className="page-logo">
        <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
        <h1>Welcome, {user.name}</h1>
      </div>

      <div className="login-card phoenix-card-3d">
        <h2 className="login-title">Your Dashboard</h2>
        <p className="login-subtitle">
          Access your courses, simulations, subscriptions, and more.
        </p>

        <div className="dashboard-section">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>

        <button
          className="login-btn phoenix-ripple"
          onClick={() => {
            document.cookie = "auth_token=; Max-Age=0; path=/;";
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
