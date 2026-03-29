import { siteNavigation } from "../../constants/site";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <nav className="nav">
      <a className="brand" href="#top" aria-label="Upkeep home">
        <span className="brand-mark">U</span>
        <span className="brand-text">Upkeep</span>
      </a>

      <div className="nav-links">
        {siteNavigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>

      <Button className="nav-cta" href="#contact">
        Book a Call
      </Button>
    </nav>
  );
}
