type ServiceCategory = {
  title: string;
  description: string;
  detail: string;
};

type ExampleProject = {
  title: string;
  label: string;
  image: string;
};

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  image: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    title: "Landscaping",
    description:
      "Routine lawn care, design-forward planting, irrigation, and seasonal property upkeep.",
    detail: "Recurring and project-based",
  },
  {
    title: "Home Cleaning",
    description:
      "Reliable interior cleaning for primary residences, move-ins, and recurring service plans.",
    detail: "Vetted local teams",
  },
  {
    title: "Repairs",
    description:
      "Minor fixes, punch-list work, and skilled help for the maintenance items homeowners delay.",
    detail: "Fast scheduling",
  },
  {
    title: "Property Maintenance",
    description:
      "A flexible support layer for recurring home tasks, inspections, and preventive service visits.",
    detail: "Managed through one platform",
  },
];

const exampleProjects: ExampleProject[] = [
  {
    title: "Front Elevation Refresh",
    label: "Landscaping",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Move-In Cleaning Reset",
    label: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Patio Repair & Finish Work",
    label: "Repairs",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Seasonal Exterior Prep",
    label: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Emily Parker",
    location: "Dallas, TX",
    quote:
      "Upkeep feels like the first home services company built for how homeowners actually live. Clear communication, quality contractors, and no wasted time.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Marcus Reed",
    location: "Austin, TX",
    quote:
      "We used the platform for landscaping and later for recurring cleaning. The experience felt consistent, premium, and unusually organized.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sophia Nguyen",
    location: "Houston, TX",
    quote:
      "The trust factor is what stood out. Contractor quality was strong, the booking flow was straightforward, and follow-up was better than any local vendor we had tried.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
  },
];

function App() {
  return (
    <div className="page-shell">
      <header className="hero" id="top">
        <div className="hero-backdrop" />
        <nav className="nav">
          <a className="brand" href="#top" aria-label="Upkeep home">
            <span className="brand-mark">U</span>
            <span className="brand-text">Upkeep</span>
          </a>

          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#projects">Examples</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="nav-cta" href="#contact">
            Book a Call
          </a>
        </nav>

        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Modern Home Services Platform</p>
            <h1>Trusted local contractors, coordinated through one premium experience.</h1>
            <p className="hero-copy">
              Upkeep helps homeowners book recurring and on-demand services
              across landscaping, cleaning, maintenance, and repairs with a
              cleaner, more reliable experience from quote to completion.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Get Started
              </a>
              <a className="button button-secondary" href="#services">
                Explore Services
              </a>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>4.9/5</strong>
                <span>Average homeowner satisfaction score</span>
              </div>
              <div>
                <strong>48 hrs</strong>
                <span>Typical time to initial scheduling response</span>
              </div>
              <div>
                <strong>One platform</strong>
                <span>Manage multiple service categories in one place</span>
              </div>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-panel-top">
              <span className="panel-kicker">Platform Snapshot</span>
              <h2>Premium coordination for recurring home care.</h2>
            </div>

            <div className="hero-panel-card featured-card">
              <div>
                <span className="mini-label">Most requested</span>
                <strong>Landscaping & Exterior Care</strong>
              </div>
              <p>Design-led outdoor maintenance, lawn care, irrigation, and seasonal refreshes.</p>
            </div>

            <div className="hero-panel-list">
              <div className="hero-panel-card">
                <span>Cleaning</span>
                <p>Recurring interior service with reliable scheduling.</p>
              </div>
              <div className="hero-panel-card">
                <span>Repairs</span>
                <p>Fast support for the tasks homeowners postpone.</p>
              </div>
            </div>

            <div className="hero-panel-footer">
              <div>
                <strong>Trusted local network</strong>
                <span>Curated contractors, centralized communication</span>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section trust-strip">
          <div className="trust-card">
            <span className="trust-label">For homeowners who want less vendor chaos</span>
            <p>
              Upkeep combines premium service presentation, vetted local pros,
              and a centralized booking experience that feels far closer to a
              modern SaaS product than a directory.
            </p>
          </div>
          <div className="trust-stats">
            <div>
              <strong>Multi-service</strong>
              <span>Landscaping, cleaning, repairs, upkeep</span>
            </div>
            <div>
              <strong>Concierge feel</strong>
              <span>Clearer communication, fewer handoff gaps</span>
            </div>
            <div>
              <strong>Built for repeat use</strong>
              <span>Not just a one-time booking marketplace</span>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="services">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Service Categories</p>
              <h2>Essential home services, packaged with more clarity and control.</h2>
            </div>
            <p className="section-copy">
              Built for recurring upkeep and one-off needs alike, with a
              platform layer that makes local contractor coordination feel more
              trustworthy and far less fragmented.
            </p>
          </div>

          <div className="services-grid">
            {serviceCategories.map((service) => (
              <article className="service-card" key={service.title}>
                <span className="service-label">{service.detail}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact">Request availability</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">How It Works</p>
              <h2>A more structured path from home-service need to completed work.</h2>
            </div>
            <p className="section-copy">
              Upkeep is designed to reduce the friction that usually comes with
              local services: sourcing, quoting, scheduling, follow-up, and
              repeated vendor management.
            </p>
          </div>

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
        </section>

        <section className="section portfolio" id="projects">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">Example Work</p>
              <h2>Real service categories presented with the polish homeowners expect.</h2>
            </div>
            <p className="section-copy">
              The platform supports multiple property needs while maintaining a
              consistent premium visual standard across every category.
            </p>
          </div>

          <div className="gallery-grid">
            {exampleProjects.map((item) => (
              <article
                className="gallery-card"
                key={item.title}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(12, 24, 17, 0.05), rgba(12, 24, 17, 0.82)), url(${item.image})`,
                }}
              >
                <span>{item.label}</span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-strip">
          <div>
            <p className="eyebrow">Designed For Repeat Use</p>
            <h2>Use one platform for the services every home eventually needs.</h2>
          </div>
          <a className="button button-primary" href="#contact">
            Start With Upkeep
          </a>
        </section>

        <section className="section section-soft testimonials">
          <div className="section-heading">
            <p className="eyebrow">Homeowner Feedback</p>
            <h2>Trust built through consistency, contractor quality, and a better booking experience.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
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
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow">Book A Consultation</p>
              <h2>Tell us what your home needs and we&apos;ll guide the next step.</h2>
              <p>
                Whether you need recurring service, one-time support, or a
                broader property-maintenance plan, Upkeep is designed to make
                sourcing and scheduling feel simple.
              </p>
              <div className="contact-points">
                <div>
                  <strong>Service coverage</strong>
                  <span>Landscaping, cleaning, repairs, maintenance</span>
                </div>
                <div>
                  <strong>Support hours</strong>
                  <span>Mon to Fri, 8:00 AM to 6:00 PM</span>
                </div>
                <div>
                  <strong>Contact</strong>
                  <span>hello@useupkeep.com</span>
                </div>
              </div>
            </div>

            <form className="contact-form">
              <label>
                Name
                <input type="text" name="name" placeholder="Your full name" />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="name@email.com" />
              </label>
              <label>
                Service Category
                <select name="service" defaultValue="Landscaping">
                  <option>Landscaping</option>
                  <option>Home Cleaning</option>
                  <option>Repairs</option>
                  <option>Property Maintenance</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Describe the home, service type, and timing."
                />
              </label>
              <button className="button button-primary" type="submit">
                Request Availability
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">U</span>
            <span className="brand-text">Upkeep</span>
          </a>
          <p>A modern platform for premium home services and trusted local execution.</p>
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#projects">Examples</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <a href="mailto:hello@useupkeep.com">hello@useupkeep.com</a>
          <a href="tel:5550148294">(555) 014-8294</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
