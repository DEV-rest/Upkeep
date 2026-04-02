import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";

const processSteps = [
  {
    id: "request",
    number: "01",
    label: "Request",
    title: "Tell us what your home needs",
    description:
      "Submit a request for landscaping or other services through a simple intake. Define scope, timing, and preferences in one place.",
    eyebrow: "Structured intake",
    bullets: [
      "Define scope, timing, and service preferences",
      "Keep one request stream for current and future needs",
      "Start with landscaping and expand as needed"
    ],
    status: "Request received",
    metaLabel: "Captured",
    metaValue: "Scope, timing, preferences"
  },
  {
    id: "match",
    number: "02",
    label: "Match",
    title: "We coordinate the right professionals",
    description:
      "Upkeep connects you with trusted local contractors and organizes scheduling, communication, and expectations.",
    eyebrow: "Coordinated matching",
    bullets: [
      "Route the job to trusted local professionals",
      "Align schedule, communication, and expectations",
      "Reduce the handoff friction between homeowner and vendor"
    ],
    status: "Coordinator assigned",
    metaLabel: "Active coordination",
    metaValue: "Scheduling, communication, vendor fit"
  },
  {
    id: "manage",
    number: "03",
    label: "Manage",
    title: "Track and manage everything in one place",
    description:
      "Monitor progress, manage recurring services, and maintain consistency without juggling multiple vendors.",
    eyebrow: "Ongoing visibility",
    bullets: [
      "Follow progress and upcoming visits in one view",
      "Manage repeat work without restarting the process",
      "Keep service quality more consistent over time"
    ],
    status: "Service plan live",
    metaLabel: "Operational view",
    metaValue: "Progress, recurring work, continuity"
  }
] as const;

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStepId, setActiveStepId] = useState<(typeof processSteps)[number]["id"]>("request");

  const activeStep = processSteps.find((step) => step.id === activeStepId) ?? processSteps[0];
  const activeIndex = processSteps.findIndex((step) => step.id === activeStep.id);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();

      if (window.innerWidth <= 1100) {
        setActiveStepId((currentStepId) => (currentStepId === processSteps[0].id ? currentStepId : processSteps[0].id));

        return;
      }

      const startOffset = window.innerHeight * 0.18;
      const progressSpan = Math.max(rect.height - window.innerHeight + startOffset, 1);
      const rawProgress = (startOffset - rect.top) / progressSpan;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 0.9999);
      const nextIndex = Math.min(processSteps.length - 1, Math.floor(clampedProgress * processSteps.length));
      const nextStepId = processSteps[nextIndex].id;

      setActiveStepId((currentStepId) => (currentStepId === nextStepId ? currentStepId : nextStepId));
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateActiveStep);
      }
    };

    updateActiveStep();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;

    if (!section || window.innerWidth <= 1100) {
      setActiveStepId(processSteps[index].id);
      return;
    }

    const maxTravel = Math.max(section.offsetHeight - window.innerHeight, 0);
    const targetTop = section.offsetTop + (maxTravel * index) / processSteps.length;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <section className="section process-section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="A calmer, more product-like way to move from request to completed work."
          description="Upkeep replaces scattered vendor coordination with one clear operating flow, so homeowners can request, get matched, and manage services through a single structured system."
          split
        />

        <div className="process-scroll-track">
          <div className="process-experience">
            <div className="process-steps" aria-label="How Upkeep works">
              <div className="process-rail" aria-hidden="true">
                <span style={{ transform: `scaleY(${(activeIndex + 1) / processSteps.length})` }} />
              </div>

              {processSteps.map((step, index) => {
                const isActive = step.id === activeStep.id;

                return (
                  <button
                    key={step.id}
                    aria-current={isActive ? "step" : undefined}
                    className={`process-step ${isActive ? "active" : ""}`.trim()}
                    onClick={() => scrollToStep(index)}
                    onFocus={() => setActiveStepId(step.id)}
                    onMouseEnter={() => setActiveStepId(step.id)}
                    type="button"
                  >
                    <span className="process-step-number">{step.number}</span>
                    <span className="process-step-copy">
                      <strong>{step.label}</strong>
                      <span>{index === 0 ? "Start with one intake" : index === 1 ? "We handle coordination" : "Stay in control over time"}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <article className="process-panel" key={activeStep.id} aria-live="polite">
              <div className="process-panel-top">
                <div>
                  <p className="process-panel-eyebrow">{activeStep.eyebrow}</p>
                  <h3>{activeStep.title}</h3>
                </div>
                <span className="process-panel-status">{activeStep.status}</span>
              </div>

              <p className="process-panel-copy">{activeStep.description}</p>

              <div className="process-panel-body">
                <div className="process-panel-meta">
                  <span>{activeStep.number}</span>
                  <div>
                    <strong>{activeStep.metaLabel}</strong>
                    <p>{activeStep.metaValue}</p>
                  </div>
                </div>

                <div className="process-panel-flow">
                  <p>What happens here</p>
                  <ul>
                    {activeStep.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
