"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home-royal-white">

      {/* HERO */}
      <section className="hero-royal-white fade-up">
        <div className="hero-gold-particles"></div>

        <div className="hero-royal-box">
          <h1 className="hero-royal-title phoenix-gold-glow">
            Empowering Students Worldwide
          </h1>

          <p className="hero-royal-text">
            Advanced digital simulations, laboratory practice, printed resources, and video lessons — all designed to help students succeed in international exams.
          </p>

          <Link href="/store" className="hero-royal-btn phoenix-ripple">
            Explore Store
          </Link>
        </div>
      </section>

      <div className="phoenix-divider-white"></div>

      {/* ABOUT */}
      <section className="section-royal-white fade-up">
        <h2 className="section-royal-title phoenix-title-gold">
          About Phoenix Academy
        </h2>

        <p className="section-royal-text">
          Phoenix Academy is a modern digital learning platform built for students preparing for 
          <strong> university entrance exams</strong>, 
          <strong> international school qualifications</strong>, and 
          <strong> English language certifications</strong>.
        </p>

        <p className="section-royal-text">
          Our mission is simple: deliver high‑quality, exam‑focused learning materials that are 
          <strong>interactive</strong>, 
          <strong>accurate</strong>, and 
          <strong>easy to use</strong>.
        </p>
      </section>

      <div className="phoenix-divider-white"></div>

      {/* FEATURES */}
      <section className="features-royal-white fade-up">
        <h2 className="section-royal-title phoenix-title-gold">
          What We Provide
        </h2>

        {/* QUIZ SIMULATIONS */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Quiz Simulations</h3>
          <p className="card-royal-text">
            Our Quiz Simulations are the core of Phoenix Academy. These are full exam‑style digital simulations designed to prepare students for:
          </p>

          <ul className="card-royal-list">
            <li><strong>IMAT</strong> — International Medical Admissions Test</li>
            <li><strong>TIL</strong> — Bocconi University Test</li>
            <li><strong>CENT‑S</strong> — Medicine & Surgery entrance exam</li>
            <li><strong>TOLC</strong> — CISIA entrance exams</li>
            <li><strong>Cambridge English</strong> — Starters, Movers, Flyers, KET, PET, FCE, IELTS</li>
          </ul>

          <p className="card-royal-text">
            Each simulation includes <strong>10 exam papers</strong>, with 
            <strong>Simulation 1 FREE</strong> and the remaining premium simulations unlocked through subscription.
          </p>

          <Link href="/store" className="card-royal-link phoenix-link-gold">
            Browse Quiz Simulations →
          </Link>
        </div>

        {/* LAB SIMULATIONS */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Lab Simulations (CAIE Paper 3)</h3>
          <p className="card-royal-text">
            Our Lab Simulations are specially designed for students preparing for 
            <strong> CAIE IGCSE, AS, and A‑Level Paper 3 Laboratory Skills</strong>.
          </p>

          <ul className="card-royal-list">
            <li>Experimental setup</li>
            <li>Data collection</li>
            <li>Graphing & analysis</li>
            <li>Practical reasoning</li>
          </ul>

          <p className="card-royal-text">
            Lab Simulations are <strong>exclusive to CAIE</strong> and do not include Italian university exams.
          </p>

          <Link href="/store" className="card-royal-link phoenix-link-gold">
            Browse Lab Simulations →
          </Link>
        </div>

        {/* PRINTED RESOURCES */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Printed Resources</h3>
          <p className="card-royal-text">
            For students who prefer traditional study materials, Phoenix Academy offers:
          </p>

          <ul className="card-royal-list">
            <li><strong>Model Papers</strong> — full exam papers with solutions</li>
            <li><strong>Revision Books</strong> — topic‑wise summaries and practice questions</li>
          </ul>

          <p className="card-royal-text">
            Printed resources cover all major curricula including:
            <strong> Italy Exams, CAIE, AQA, Pearson Edexcel, IB Curriculum, Cambridge English</strong>.
          </p>

          <Link href="/store" className="card-royal-link phoenix-link-gold">
            Browse Printed Resources →
          </Link>
        </div>

        {/* VIDEO LESSONS */}
        <div className="card-royal-white phoenix-card-3d">
          <h3 className="card-royal-title">Video Lessons (YouTube)</h3>
          <p className="card-royal-text">
            Our video lessons are freely accessible and hosted on YouTube. These lessons include:
          </p>

          <ul className="card-royal-list">
            <li>Exam strategies</li>
            <li>Topic explanations</li>
            <li>Walkthroughs of past papers</li>
            <li>Tips for IMAT, CAIE, Cambridge English</li>
          </ul>

          <Link href="https://youtube.com" className="card-royal-link phoenix-link-gold" target="_blank">
            Visit YouTube Channel →
          </Link>
        </div>
      </section>
    </div>
  );
}
