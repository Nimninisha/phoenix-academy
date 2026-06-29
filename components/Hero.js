export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <h1>Welcome to Phoenix Academy</h1>
          <p>
            We provide educational support for every curriculum, every age, and every learner.
          </p>
          <div className="hero-buttons">
            <a
              href="https://your-lms-link.com"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Student Login
            </a>
            <a href="/courses" className="btn-secondary">
              View Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
