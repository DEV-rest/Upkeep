import { testimonials } from "../../data/testimonials";
import { SectionHeading } from "../ui/SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="section section-soft testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Homeowner Feedback"
          title="Trust built through consistency, contractor quality, and a better booking experience."
        />

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card card-glow" key={testimonial.name}>
              <div className="testimonial-top">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.location}</p>
                </div>
              </div>
              <blockquote>{testimonial.quote}</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

