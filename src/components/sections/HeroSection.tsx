import { useEffect, useRef, useState } from "react";
import heroVideo from "../../data/media/hero.mp4";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../ui/Button";
import { ServiceWizardModal } from "../ui/ServiceWizardModal";

gsap.registerPlugin(useGSAP);

const serviceOptions = [
  { value: "Landscaping", label: "Landscaping & Lawn Care" },
  { value: "Home Cleaning", label: "Home Cleaning" },
  { value: "Repairs", label: "Repairs & Handyman" },
  { value: "Property Maintenance", label: "Property Maintenance" }
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [service, setService] = useState("Landscaping");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-video",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
    );

    tl.fromTo(
      [".eyebrow", "h1", ".hero-copy"],
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.2, ease: "power4.out" },
      "-=1.2"
    );

    tl.fromTo(
      ".hero-backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      "<"
    );

    tl.fromTo(
      ".hero-actions",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
      "-=0.9"
    );

    tl.fromTo(
      ".hero-availability-note",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    tl.fromTo(
      ".hero-panel-shell",
      { scale: 0.9, opacity: 0, x: 40 },
      { scale: 1, opacity: 1, x: 0, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.5"
    );

    gsap.to(".hero-panel-shell", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
  }, { scope: containerRef });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !zipCode) {
      alert("Please provide your email and zip code to check availability.");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
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

        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Property maintenance, simplified</p>
            <h1>One platform. <span className="hero-nowrap">Every service.</span></h1>
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
            <form className="hero-panel-shell card-glow hero-service-form" onSubmit={handleSubmit}>
              <span className="hero-panel-kicker">Now booking</span>
              <h2>Spring landscaping</h2>
              <p className="hero-panel-description">
                Seasonal lawn care, cleanup, edging, and recurring plans.
              </p>
              <div className="hero-panel-fields" aria-label="Check availability preview">
                <div className="intake-row hero-intake-row">
                  <label>
                    Email Address
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Zip Code
                    <input
                      type="text"
                      placeholder="e.g. 90210"
                      pattern="[0-9]*"
                      maxLength={5}
                      value={zipCode}
                      onChange={(event) => setZipCode(event.target.value)}
                      required
                    />
                  </label>
                </div>

                <label>
                  Primary Need
                  <div className={`custom-select-wrapper ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
                    <div className="custom-select-trigger" onClick={() => setIsDropdownOpen((open) => !open)}>
                      <span>{serviceOptions.find((option) => option.value === service)?.label || "Select a service..."}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className="custom-select-menu">
                        {serviceOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`custom-select-item ${service === option.value ? "selected" : ""}`}
                            onClick={() => {
                              setService(option.value);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option.label}
                            {service === option.value && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <button className="button button-primary intake-submit hero-intake-submit" type="submit">
                Start Estimate
              </button>
            </form>
          </aside>
        </div>
      </header>

      <ServiceWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{ email, zipCode, service }}
      />
    </>
  );
}
