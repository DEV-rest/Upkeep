import { serviceCategories } from "../../data/serviceCategories";
import { SectionHeading } from "../ui/SectionHeading";

export function ServicesSection() {
  return (
    <section className="section section-soft" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Service Categories"
          title="Essential home services, packaged with more clarity and control."
          description="Built for recurring upkeep and one-off needs alike, with a platform layer that makes local contractor coordination feel more trustworthy and far less fragmented."
          split
        />

        <div className="services-grid">
          {serviceCategories.map((service) => (
            <article className="service-card card-glow" key={service.title}>
              <span className="service-label">{service.detail}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact">Request availability</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

