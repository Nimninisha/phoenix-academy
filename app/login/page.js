"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setShake(true);
        setTimeout(() => setShake(false), 600);
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Network error. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-royal-white fade-up">
      <div className="page-logo">
        <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
        <h1>Login / Subscription</h1>
      </div>

      <div className={`login-card phoenix-card-3d ${shake ? "login-shake" : ""}`}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Access your simulations, courses, and premium resources.
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn phoenix-ripple" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-bottom-text">
          <Link href="/forgot-password" className="login-link">
            Forgot Password →
          </Link>
        </p>

        <p className="login-bottom-text">
          New here?{" "}
          <Link href="/register" className="login-link">
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}

