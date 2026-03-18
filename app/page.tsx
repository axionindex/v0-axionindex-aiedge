import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FrameworkSection } from "@/components/framework-section";
import { LexiconSection } from "@/components/lexicon-section";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navigation />
      <HeroSection />
      <FrameworkSection />
      <LexiconSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
