import { useRef } from "react";
import heroVideo from "../../data/media/hero.mp4";
import { Navbar } from "../layout/Navbar";
import { Button } from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Video fade in
    tl.fromTo(
      ".hero-video",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
    );

    // Navbar slide down
    tl.fromTo(
      ".nav",
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
      "-=1.5"
    );

    // Backdrop fade in
    tl.fromTo(
      ".hero-backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      "<"
    );

    // Stagger text content (Eyebrow, H1, Copy)
    tl.fromTo(
      [".eyebrow", "h1", ".hero-copy"],
      { y: 50, opacity: 0, filter: "blur(10px)" }, // Filter blur for extra premium feel
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.2, ease: "power4.out" },
      "-=1.2"
    );

    // Actions fade in with a slight spring
    tl.fromTo(
      ".hero-actions",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
      "-=0.9"
    );
    
    // Availability note fade
    tl.fromTo(
      ".hero-availability-note",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    // Right panel entrance
    tl.fromTo(
      ".hero-panel-shell",
      { scale: 0.9, opacity: 0, x: 40 },
      { scale: 1, opacity: 1, x: 0, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.5"
    );

    // Continual floating animation for the panel
    gsap.to(".hero-panel-shell", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2 // Start after entrance finishes
    });
    
  }, { scope: containerRef });

  return (
    <header className="hero" id="top" ref={containerRef}>
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

