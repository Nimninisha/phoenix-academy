"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setMessage("Registered successfully. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-royal-white fade-up">
      <div className="page-logo">
        <img src="/logo.png" className="page-logo-img" alt="Phoenix Academy" />
        <h1>Create Account</h1>
      </div>

      <div className="login-card phoenix-card-3d">
        <h2 className="login-title">Join Phoenix Academy</h2>
        <p className="login-subtitle">
          Create your account to access simulations and premium resources.
        </p>

        {error && <div className="login-error">{error}</div>}
        {message && <div className="login-success">{message}</div>}

        <form onSubmit={handleRegister} className="login-form">
          <label className="login-label">Full Name</label>
          <input
            name="name"
            type="text"
            className="login-input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="login-label">Email</label>
          <input
            name="email"
            type="email"
            className="login-input"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="login-label">Password</label>
          <input
            name="password"
            type="password"
            className="login-input"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn phoenix-ripple" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="login-bottom-text">
          Already have an account?{" "}
          <Link href="/login" className="login-link">
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
}
