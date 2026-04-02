import { useEffect, useState } from "react";
import { siteNavigation } from "../../constants/site";
import { Brand } from "../ui/Brand";
import { Button } from "../ui/Button";

export function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const compact = window.scrollY > 12;
      setIsCompact(compact);

      if (!compact) {
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`nav-shell ${isCompact ? "nav-shell-compact" : ""} ${isMenuOpen ? "nav-open" : ""}`.trim()}>
      {isCompact ? (
        <>
          <button
            aria-controls="site-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="nav-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>

          <div className="nav-menu" id="site-navigation">
            <div className="nav-links">
              {siteNavigation.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>

            <Button className="nav-cta" href="#contact" onClick={closeMenu}>
              Book a Call
            </Button>
          </div>
        </>
      ) : (
        <nav className="nav">
          <Brand />

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
      )}
    </div>
  );
}
