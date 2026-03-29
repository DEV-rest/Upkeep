import heroVideo from "../../data/media/hero.mp4";
import { Navbar } from "../layout/Navbar";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <header className="hero" id="top">
      <video
        autoPlay
        className="hero-video"
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-backdrop" />
      <Navbar />

      <div className="hero-layout">
        <div className="hero-content">
          <p className="eyebrow">Property maintenance, simplified</p>
          <h1>One platform. Every service.</h1>
          <p className="hero-copy">
            Manage landscaping today and expand into cleaning, repairs, and
            ongoing maintenance through one structured, reliable system. Upkeep
            brings scheduling, communication, and follow-through into one
            place.
          </p>

          <div className="hero-actions">
            <Button className="hero-primary-action" href="#contact">
              Request Service
            </Button>
            <Button className="hero-secondary-action" href="#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>

          <p className="hero-availability-note">Limited local availability</p>
        </div>

        <aside className="hero-panel" aria-label="Featured Upkeep service">
          <div className="hero-panel-shell card-glow">
            <span className="hero-panel-kicker">Now booking</span>
            <h2>Spring landscaping</h2>
            <p className="hero-panel-description">
              Seasonal lawn care, cleanup, edging, and recurring plans.
            </p>

            <div className="hero-panel-points">
              <div>
                <strong>For homeowners</strong>
                <span>Clear scheduling, fewer handoffs</span>
              </div>
              <div>
                <strong>For contractors</strong>
                <span>More consistent local work</span>
              </div>
            </div>

            <Button className="hero-card-action" href="#contact" variant="secondary">
              Request priority availability
            </Button>
          </div>
        </aside>
      </div>
    </header>
  );
}

