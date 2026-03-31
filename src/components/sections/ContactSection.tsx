import { useState, useRef, useEffect } from "react";
import { siteContact } from "../../constants/site";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceWizardModal } from "../ui/ServiceWizardModal";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [service, setService] = useState("Landscaping");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceOptions = [
    { value: "Landscaping", label: "Landscaping & Lawn Care" },
    { value: "Home Cleaning", label: "Home Cleaning" },
    { value: "Repairs", label: "Repairs & Handyman" },
    { value: "Property Maintenance", label: "Property Maintenance" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !zipCode) {
      alert("Please provide your email and zip code to check availability.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-panel interaction-panel">
          <div className="contact-copy">
            <SectionHeading
              eyebrow="Check Availability"
              title="A smarter way to get home services done."
            />
            <p>
              Upkeep makes pricing and scheduling transparent. Enter your details below to begin our interactive price estimator and see when we can start.
            </p>
          </div>

          <form className="contact-form intake-form" onSubmit={handleSubmit}>
            <div className="intake-row">
              <label>
                Email Address
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setZipCode(e.target.value)}
                  required 
                />
              </label>
            </div>
            
            <label>
              Primary Need
              <div 
                className={`custom-select-wrapper ${isDropdownOpen ? 'open' : ''}`} 
                ref={dropdownRef}
              >
                <div 
                  className="custom-select-trigger" 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{serviceOptions.find(o => o.value === service)?.label || "Select a service..."}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <div className="custom-select-menu">
                    {serviceOptions.map(opt => (
                      <div 
                        key={opt.value} 
                        className={`custom-select-item ${service === opt.value ? 'selected' : ''}`}
                        onClick={() => {
                          setService(opt.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {opt.label}
                        {service === opt.value && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </label>
            
            <button className="button button-primary intake-submit" type="submit">
              Start Estimate
            </button>
          </form>
        </div>
      </div>

      <ServiceWizardModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{ email, zipCode, service }}
      />
    </section>
  );
}
