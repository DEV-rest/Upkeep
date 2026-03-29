import { exampleProjects } from "../../data/exampleProjects";
import { SectionHeading } from "../ui/SectionHeading";

export function PortfolioSection() {
  return (
    <section className="section portfolio" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Example Work"
          title="Real service categories presented with the polish homeowners expect."
          description="The platform supports multiple property needs while maintaining a consistent premium visual standard across every category."
          split
        />

        <div className="gallery-grid">
          {exampleProjects.map((project) => (
            <article
              className="gallery-card"
              key={project.title}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(12, 24, 17, 0.05), rgba(12, 24, 17, 0.82)), url(${project.image})`,
              }}
            >
              <span>{project.label}</span>
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
