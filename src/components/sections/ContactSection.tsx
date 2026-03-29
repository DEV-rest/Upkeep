import { siteContact } from "../../constants/site";
import { SectionHeading } from "../ui/SectionHeading";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-copy">
            <SectionHeading
              eyebrow="Book A Consultation"
              title="Tell us what your home needs and we'll guide the next step."
            />
            <p>
              Whether you need recurring service, one-time support, or a broader
              property-maintenance plan, Upkeep is designed to make sourcing and
              scheduling feel simple.
            </p>
            <div className="contact-points">
              <div>
                <strong>Service coverage</strong>
                <span>Landscaping, cleaning, repairs, maintenance</span>
              </div>
              <div>
                <strong>Support hours</strong>
                <span>{siteContact.supportHours}</span>
              </div>
              <div>
                <strong>Contact</strong>
                <span>{siteContact.email}</span>
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
      </div>
    </section>
  );
}
