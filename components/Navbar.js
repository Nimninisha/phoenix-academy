"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="top-bar">

      {/* LEFT — Phoenix Logo + Name */}
      <div className="top-left">
        <Image
          src="/logo.png"
          width={42}
          height={42}
          alt="Phoenix Logo"
          className="nav-logo"
        />
        <span className="nav-brand">Phoenix Academy</span>
      </div>

      {/* CENTER — Navigation Buttons */}
      <nav className="top-center">
        <Link href="/" className="nav-royal-link">Home</Link>
        <Link href="/courses" className="nav-royal-link">Courses</Link>
        <Link href="/store" className="nav-royal-link">Store</Link>
        <Link href="/simulations" className="nav-royal-link">Simulations</Link>
        <Link href="/contact" className="nav-royal-link">Contact</Link>
      </nav>

      {/* RIGHT — Login Button */}
      <div className="top-right">
        <Link href="/login" className="nav-royal-login">
          🔐 Login / Subscription
        </Link>
      </div>

    </header>
  );
}
