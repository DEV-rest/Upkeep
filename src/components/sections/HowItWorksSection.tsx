import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorksSection() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="A more structured path from home-service need to completed work."
          description="Upkeep is designed to reduce the friction that usually comes with local services: sourcing, quoting, scheduling, follow-up, and repeated vendor management."
          split
        />

        <div className="process-grid">
          <article className="process-card">
            <span>01</span>
            <h3>Tell us what the home needs</h3>
            <p>Submit a project or recurring-service request through a simple intake flow.</p>
          </article>
          <article className="process-card">
            <span>02</span>
            <h3>We match and coordinate</h3>
            <p>Upkeep connects you with trusted local contractors aligned to the scope.</p>
          </article>
          <article className="process-card">
            <span>03</span>
            <h3>Track the work with confidence</h3>
            <p>Get clear next steps, scheduling visibility, and a more polished service experience.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
