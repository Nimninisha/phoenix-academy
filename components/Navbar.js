"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <header className="top-bar">

      {/* LEFT */}
      <div className="top-left">
        <Image
          src="/logo.png"
          width={42}
          height={42}
          alt="Phoenix Logo"
        />
        <span className="nav-brand">Phoenix Academy</span>
      </div>

      {/* CENTER */}
      <nav className="top-center">
        <Link href="/" className="nav-royal-link">Home</Link>
        <Link href="/courses" className="nav-royal-link">Courses</Link>
        <Link href="/store" className="nav-royal-link">Store</Link>
        <Link href="/simulations" className="nav-royal-link">Simulations</Link>
        <Link href="/contact" className="nav-royal-link">Contact</Link>
      </nav>

      {/* RIGHT */}
      <div className="top-right">

        {!user && (
          <Link href="/login" className="nav-royal-login">
            🔐 Login / Subscription
          </Link>
        )}

        {user && (
          <>
            <span style={{ marginRight: "10px" }}>
              👋 {user.email}
            </span>

            {user.role === "admin" && (
              <Link href="/admin" style={{ marginRight: "10px" }}>
                ⚙ Admin
              </Link>
            )}

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

    </header>
  );
}