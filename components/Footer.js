"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-royal-white fade-up">
      <div className="footer-container">
        <p>© 2026 Phoenix Academy. All rights reserved.</p>

        <div className="footer-royal-icons">
          <Link href="https://youtube.com" target="_blank">
            <img
              src="/icons/youtube-gold.png"
              className="footer-icon"
              alt="YouTube"
            />
          </Link>

          <Link href="https://facebook.com" target="_blank">
            <img
              src="/icons/facebook-gold.png"
              className="footer-icon"
              alt="Facebook"
            />
          </Link>

          <Link href="https://instagram.com" target="_blank">
            <img
              src="/icons/instagram-gold.png"
              className="footer-icon"
              alt="Instagram"
            />
          </Link>

          <Link href="https://wa.me/" target="_blank">
            <img
              src="/icons/whatsapp-gold.png"
              className="footer-icon"
              alt="WhatsApp"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
