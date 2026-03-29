import { Button } from "../ui/Button";

export function CTASection() {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-strip">
          <div className="cta-strip-copy">
            <p className="eyebrow">Built for the next service too</p>
            <h2>Stop juggling vendors. Start managing your home in one place.</h2>
          </div>
          <Button className="cta-strip-action" href="#contact">
            Start With Upkeep
          </Button>
        </div>
      </div>
    </section>
  );
}
