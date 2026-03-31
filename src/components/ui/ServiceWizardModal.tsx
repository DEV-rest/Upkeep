import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ServiceWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    email: string;
    zipCode: string;
    service: string;
  };
}

// Premium Inline SVGs mapped by exact text for maximum professional fidelity
const getIcon = (label: string) => {
  const props = { width: 22, height: 22, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  
  switch(label) {
    // Landscaping
    case "Lawn Mowing": return <svg {...props}><path d="M4 14l3-3 3 3M14 14l3-3 3 3M4 20l3-3 3 3M14 20l3-3 3 3"/></svg>;
    case "Edging & Trimming": return <svg {...props}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8" y2="16"/><line x1="14" y1="14" x2="20" y2="20"/></svg>;
    case "Full Yard Cleanup": return <svg {...props}><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>;
    case "Recurring Maintenance": return <svg {...props}><path d="M21 12A9 9 0 006 5L3 8V3h5M3 12a9 9 0 0015 7l3-3v5h-5"/></svg>;

    // Sizes
    case "Under 1/4 Acre": return <svg {...props}><rect x="10" y="10" width="4" height="4" rx="1"/></svg>;
    case "1/4 to 1/2 Acre": return <svg {...props}><rect x="8" y="8" width="8" height="8" rx="1"/></svg>;
    case "1/2 to 1 Acre": return <svg {...props}><rect x="5" y="5" width="14" height="14" rx="1"/></svg>;
    case "Over 1 Acre": return <svg {...props}><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>;

    // Landscaping Condition
    case "No, standard maintenance": return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case "Slightly overgrown": return <svg {...props}><path d="M12 20V10M12 20a4 4 0 00-4-4M12 20a4 4 0 014-4M6 20v-5a3 3 0 013-3"/></svg>;
    case "Heavy brush/weeds": return <svg {...props}><path d="M12 20v-6a4 4 0 00-4-4h0M12 20v-6a4 4 0 014-4h0M5 20v-8M19 20v-8M9 20v-5M15 20v-5"/></svg>;
    case "Unsure, needs assessment": return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

    // Frequency & Scheduling
    case "Just a one-time visit": return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>;
    case "Weekly service":
    case "Weekly clean": return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="8" y="14" width="2" height="2"/></svg>;
    case "Bi-weekly service":
    case "Bi-weekly clean": return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="8" y="14" width="2" height="2"/><rect x="14" y="14" width="2" height="2"/></svg>;
    case "Monthly service":
    case "Monthly clean": return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="14" width="2" height="2"/><rect x="11" y="14" width="2" height="2"/><rect x="15" y="14" width="2" height="2"/></svg>;

    // Home Sizes
    case "1 Bed / 1 Bath": return <svg {...props}><path d="M3 21h18M5 21v-8a2 2 0 012-2h10a2 2 0 012 2v8M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/></svg>;
    case "2 Beds / 1-2 Baths": return <svg {...props}><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4"/></svg>;
    case "3+ Beds / 2+ Baths": return <svg {...props}><path d="M3 21h18M4 21V9l8-6 8 6v12M8 12h2v2H8zM14 12h2v2h-2zM10 21v-4h4v4"/></svg>;
    case "Large Home (4+ Beds)": return <svg {...props}><path d="M2 21h20M4 21V7l5-4 5 4v14M14 21V9l5-4 3 3v13M8 11h2v2H8zM16 13h2v2h-2z"/></svg>;

    // Clean Type
    case "Standard Clean": return <svg {...props}><path d="M9 3l2.5 5.5L17 11l-5.5 2.5L9 19l-2.5-5.5L1 11l5.5-2.5L9 3z"/></svg>;
    case "Deep Clean": return <svg {...props}><path d="M9 3l2.5 5.5L17 11l-5.5 2.5L9 19l-2.5-5.5L1 11l5.5-2.5L9 3z"/><path d="M19 15l1.5 3.5L24 20l-3.5 1.5L19 25l-1.5-3.5L14 20l3.5-1.5z"/></svg>;
    case "Move In / Move Out": return <svg {...props}><path d="M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4a2 2 0 001-1.7z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>;
    case "Post-Construction Clean": return <svg {...props}><path d="M2 12h20M7 12V7a5 5 0 0110 0v5"/><path d="M12 12v6"/></svg>;

    // Pets
    case "No pets": return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"/></svg>;
    case "Yes, a cat": return <svg {...props}><path d="M12 5c.7 0 1.4.1 2 .3 1.8-2 5-2.8 6.4-2.3 1.4.6-.4 7-.4 7 .6 1.1 1 2.2 1 3.4 0 4.5-4 8.6-9 8.6s-9-3-9-7.6c0-1.2.5-2.4 1-3.4 0 0-1.9-6.4-.5-7 1.4-.6 4.7.2 6.5 2.2"/><path d="M8 14v.5M16 14v.5M11.3 16.3h1.4l.8.7-.8.8"/></svg>;
    case "Yes, a dog": return <svg {...props}><path d="M10 5.2C10 3.8 8.4 2.7 6.5 3c-2.8.5-4.1 6-4 7 .1.7 1.7 1.7 3.7 1 1.3-.5 3.8-3.1 3.8-5.8z"/><path d="M10.5 10.6C9.5 11.5 6 13 6 15c0 1.5 1.5 2 3 2 .6 0 2-1 3-3 .5 1 2 3 3 3 1.5 0 3-.5 3-2 0-2-3.5-3.6-4.5-4.4a1.5 1.5 0 00-3 0z"/><path d="M14 5.2C14 3.8 15.6 2.7 17.5 3c2.8.5 4.1 6 4 7-.1.7-1.7 1.7-3.7 1-1.3-.5-3.8-3.1-3.8-5.8z"/></svg>;
    case "Yes, multiple pets": return <svg {...props}><path d="M7 4a2 2 0 110 4 2 2 0 010-4zM11 6a2 2 0 110 4 2 2 0 010-4zM16 7a2 2 0 110 4 2 2 0 010-4z"/><path d="M4 12c0-2 2-2 3-1 1 1 3 1 4 0 1-1 3-1 3 1 0 2-2 4-4 4s-6-2-6-4z"/></svg>;

    // Repairs
    case "Plumbing Issue": return <svg {...props}><path d="M2 22l1-1h3l9-9M3 21v-3l9-9M15 6l3.4-3.4a2.1 2.1 0 113 3L18 9l.4.4a2.1 2.1 0 11-3 3l-3.8-3.8a2.1 2.1 0 113-3l.4.4z"/></svg>;
    case "Electrical/Fixture": return <svg {...props}><path d="M9 18h6M10 22h4M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/></svg>;
    case "Drywall/Paint": return <svg {...props}><path d="M15 22v-4a4 4 0 00-4-4h-2a4 4 0 00-4 4v4M2 5h20M5 2v8a2 2 0 002 2h10a2 2 0 002-2V2"/></svg>;
    case "General Handyman": return <svg {...props}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9l-3.8 3.8z"/></svg>;
    case "Exterior Repair": return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

    // Repairs Accessibility
    case "Easily accessible (ground level)": return <svg {...props}><path d="M3 21h18M9 21v-4M15 21v-4M9 17h6"/></svg>;
    case "Requires a ladder (up to 1 story)": return <svg {...props}><path d="M8 21V3M16 21V3M8 7h8M8 12h8M8 17h8"/></svg>;
    case "Requires a tall ladder (2+ stories)": return <svg {...props}><path d="M8 21V3M16 21V3M8 7h8M8 12h8M8 17h8M4 11l4-4M20 11l-4-4"/></svg>;
    case "Tight space / Crawlspace": return <svg {...props}><rect x="3" y="10" width="18" height="6" rx="2"/></svg>;

    // Urgency
    case "Emergency (ASAP)": return <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
    case "Within a few days": return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="12 14 12 16 14 16"/></svg>;
    case "Whenever available": return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>;
    case "Just getting a quote": return <svg {...props}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;

    // Materials
    case "Yes, I have everything": return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>;
    case "No, pro needs to supply them": return <svg {...props}><path d="M10 17h4V5H2v12h3M14 5h5l3 5v7h-3M14 10h8"/><circle cx="8.5" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></svg>;
    case "Unsure, need assessment": return <svg {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

    default: return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>;
  }
};

export function ServiceWizardModal({ isOpen, onClose, initialData }: ServiceWizardModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;

  useGSAP(() => {
    if (!modalRef.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.92, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.1)", delay: 0.1 }
      );
    } else {
      gsap.to(modalRef.current, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      document.body.style.overflow = "";
      setTimeout(() => {
        setStep(1);
        setAnswers({});
        setIsTransitioning(false);
        setIsCalculating(false);
      }, 300);
    }
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen && !isTransitioning && !isCalculating) {
      gsap.fromTo(".wizard-option-btn", 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [step, isOpen, isCalculating]);

  // Loading animation loop
  useGSAP(() => {
    if (isCalculating && loaderRef.current) {
      gsap.to(".loader-ring", {
        rotation: 360,
        duration: 1.2,
        repeat: -1,
        ease: "linear"
      });
      gsap.fromTo(".loader-text", 
        { opacity: 0.4 }, 
        { opacity: 1, duration: 0.8, yoyo: true, repeat: -1, ease: "power1.inOut" }
      );
    }
  }, [isCalculating]);

  // Keyboard Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || isTransitioning || isCalculating) return;
      
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        const buttons = document.querySelectorAll(".wizard-option-btn");
        if (buttons[num - 1]) {
          (buttons[num - 1] as HTMLButtonElement).click();
        }
      } else if (e.key === "Enter" && step === totalSteps) {
        const calculateBtn = document.querySelector(".wizard-submit-btn") as HTMLButtonElement;
        if (calculateBtn) calculateBtn.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isTransitioning, isCalculating, step, totalSteps]);

  const handleSelect = (key: string, value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const target = e.currentTarget;
    const siblings = Array.from(target.parentElement!.children).filter(el => el !== target);
    
    target.classList.add("selected");
    gsap.to(siblings, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" });
    gsap.to(target, { scale: 1.02, duration: 0.3, ease: "power2.out" });

    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [key]: value }));
      gsap.fromTo(
        ".wizard-step-content",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", onComplete: () => setIsTransitioning(false) }
      );
      setStep(s => s + 1);
    }, 450);
  };

  const handleBack = () => {
    if (isTransitioning || step <= 1 || isCalculating) return;
    setIsTransitioning(true);
    gsap.fromTo(
      ".wizard-step-content",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", onComplete: () => setIsTransitioning(false) }
    );
    setStep(s => s - 1);
  };

  const handleFinish = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const finalPayload = {
        base: initialData,
        details: answers,
        timestamp: new Date().toISOString()
      };
      console.log("🚀 Payload ready for backend processing:", JSON.stringify(finalPayload, null, 2));
      alert("Success! Your price estimate request has been logged to the console.\n\nBackend integration coming soon.");
      onClose();
    }, 2500);
  };

  const renderStep = () => {
    const s = initialData.service.toLowerCase();

    if (isCalculating) return (
      <div className="wizard-step-content loader-state" ref={loaderRef} style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <div className="loader-ring" style={{
          width: '64px', height: '64px', borderRadius: '50%', 
          border: '4px solid rgba(183, 255, 207, 0.3)',
          borderTopColor: 'var(--green-deep)', marginBottom: '24px'
        }} />
        <h3 className="loader-text" style={{ color: 'var(--green-deep)' }}>Calculating your estimate...</h3>
        <p style={{ color: 'var(--charcoal-soft)' }}>Parsing property dimensions & local rates</p>
      </div>
    );

    if (s.includes("landscaping")) {
      if (step === 1) return (
        <div className="wizard-step-content">
          <h3>What kind of landscaping do you need?</h3>
          <p className="wizard-subtitle">Select the primary service you are looking for.</p>
          <div className="wizard-options">
            {["Lawn Mowing", "Edging & Trimming", "Full Yard Cleanup", "Recurring Maintenance"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("landscapeType", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 2) return (
        <div className="wizard-step-content">
          <h3>What is the approximate size of your yard?</h3>
          <div className="wizard-options">
            {["Under 1/4 Acre", "1/4 to 1/2 Acre", "1/2 to 1 Acre", "Over 1 Acre"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("yardSize", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div className="wizard-step-content">
          <h3>Are there any current overgrowth or severe conditions?</h3>
          <p className="wizard-subtitle">This helps us allocate the right equipment for your visit.</p>
          <div className="wizard-options">
            {["No, standard maintenance", "Slightly overgrown", "Heavy brush/weeds", "Unsure, needs assessment"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("condition", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 4) return (
        <div className="wizard-step-content">
          <h3>What is your preferred service frequency?</h3>
          <div className="wizard-options">
            {["Just a one-time visit", "Weekly service", "Bi-weekly service", "Monthly service"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("frequency", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (s.includes("cleaning")) {
      if (step === 1) return (
        <div className="wizard-step-content">
          <h3>How many bedrooms & bathrooms?</h3>
          <div className="wizard-options">
            {["1 Bed / 1 Bath", "2 Beds / 1-2 Baths", "3+ Beds / 2+ Baths", "Large Home (4+ Beds)"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("homeSize", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 2) return (
        <div className="wizard-step-content">
          <h3>What type of clean do you need?</h3>
          <div className="wizard-options">
            {["Standard Clean", "Deep Clean", "Move In / Move Out", "Post-Construction Clean"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("cleanType", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div className="wizard-step-content">
          <h3>Do you have any pets indoors?</h3>
          <p className="wizard-subtitle">This helps us account for pet hair and specific cleaning supplies.</p>
          <div className="wizard-options">
            {["No pets", "Yes, a cat", "Yes, a dog", "Yes, multiple pets"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("pets", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 4) return (
        <div className="wizard-step-content">
          <h3>What is your preferred service frequency?</h3>
          <div className="wizard-options">
            {["Just a one-time visit", "Weekly clean", "Bi-weekly clean", "Monthly clean"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("frequency", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (s.includes("repairs") || s.includes("maintenance")) {
      if (step === 1) return (
        <div className="wizard-step-content">
          <h3>What needs repairing or maintenance?</h3>
          <div className="wizard-options">
            {["Plumbing Issue", "Electrical/Fixture", "Drywall/Paint", "General Handyman", "Exterior Repair"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("repairType", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 2) return (
        <div className="wizard-step-content">
          <h3>Do you already have the materials/parts?</h3>
          <div className="wizard-options">
            {["Yes, I have everything", "No, pro needs to supply them", "Unsure, need assessment"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("materials", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div className="wizard-step-content">
          <h3>How accessible is the repair location?</h3>
          <p className="wizard-subtitle">We need this to dispatch the correct ladders or safety gear.</p>
          <div className="wizard-options">
            {["Easily accessible (ground level)", "Requires a ladder (up to 1 story)", "Requires a tall ladder (2+ stories)", "Tight space / Crawlspace"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("accessibility", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
      if (step === 4) return (
        <div className="wizard-step-content">
          <h3>How soon do you need this completed?</h3>
          <div className="wizard-options">
            {["Emergency (ASAP)", "Within a few days", "Whenever available", "Just getting a quote"].map((opt, i) => (
              <button key={opt} className="wizard-option-btn" onClick={(e) => handleSelect("urgency", opt, e)}>
                <span className="opt-keybd">{i+1}</span>
                <span className="opt-text">{opt}</span>
                <span className="opt-icon">{getIcon(opt)}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="wizard-step-content final-step">
        <h3>Review your details</h3>
        <p className="wizard-subtitle">We have everything we need to calculate your estimate.</p>
        
        <div className="review-box">
          <div className="review-item"><strong>Service:</strong> {initialData.service}</div>
          <div className="review-item"><strong>Zip:</strong> {initialData.zipCode}</div>
          {Object.entries(answers).map(([key, val]) => (
            <div className="review-item" key={key}>
              <strong style={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, " $1")}:</strong> {val}
            </div>
          ))}
        </div>

        <button 
          className="button button-primary wizard-submit-btn" 
          onClick={handleFinish}
          style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}
        >
          Calculate My Price <span className="opt-keybd" style={{ background: 'rgba(0,0,0,0.08)', borderColor: 'transparent', color: 'inherit' }}>Enter</span>
        </button>
      </div>
    );
  };

  return (
    <div ref={modalRef} className="wizard-modal-overlay" style={{ visibility: "hidden", opacity: 0 }}>
      <div className="wizard-modal-backdrop" onClick={onClose} />
      
      <div ref={contentRef} className="wizard-modal-content">
        <button className="wizard-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="wizard-header" style={{ display: isCalculating ? 'none' : 'block' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', minHeight: '32px' }}>
            {step > 1 ? (
              <button 
                onClick={handleBack} 
                className="wizard-back-btn" 
                style={{ background: 'none', border: 'none', color: 'var(--green-deep)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
              >
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>&larr;</span> Back
              </button>
            ) : (
              <span className="wizard-kicker" style={{ margin: 0 }}>Upkeep Check-in</span>
            )}
          </div>
          <div className="wizard-progress-bar">
            <div className="wizard-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
          <p className="wizard-step-count">Step {step} of {totalSteps}</p>
        </div>

        <div className="wizard-body">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
