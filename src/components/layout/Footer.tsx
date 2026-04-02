import { siteContact, siteNavigation } from "../../constants/site";
import { Brand } from "../ui/Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Brand className="footer-brand" />
        <p>A modern platform for premium home services and trusted local execution.</p>
      </div>

      <div className="footer-links">
        {siteNavigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <div className="footer-contact">
        <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
        <a href={siteContact.phoneHref}>{siteContact.phone}</a>
      </div>
    </footer>
  );
}
