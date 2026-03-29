import { Footer } from "./components/layout/Footer";
import { CTASection } from "./components/sections/CTASection";
import { ContactSection } from "./components/sections/ContactSection";
import { HeroSection } from "./components/sections/HeroSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { PortfolioSection } from "./components/sections/PortfolioSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { TrustStrip } from "./components/sections/TrustStrip";

function App() {
  return (
    <div className="page-shell">
      <HeroSection />
      <main>
        <TrustStrip />
        <ServicesSection />
        <HowItWorksSection />
        <PortfolioSection />
        <CTASection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
