"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/send-reset-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessage("Reset link sent to your email.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-royal-white fade-up">
      <div className="page-logo">
        <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
        <h1>Forgot Password?</h1>
      </div>

      <div className="login-card phoenix-card-3d">
        <h2 className="login-title">Reset Your Password</h2>
        <p className="login-subtitle">
          Enter your email and we will send you a reset link.
        </p>

        {error && <div className="login-error">{error}</div>}
        {message && <div className="login-success">{message}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="login-btn phoenix-ripple" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="login-bottom-text">
          Remember your password?{" "}
          <a href="/login" className="login-link">Login →</a>
        </p>
      </div>
    </div>
  );
}
