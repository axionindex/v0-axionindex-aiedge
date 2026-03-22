import { AxionNavigation } from "@/components/axion/axion-navigation";
import { AxionHero } from "@/components/axion/axion-hero";
import { AxionThesis } from "@/components/axion/axion-thesis";
import { AxionInstruments } from "@/components/axion/axion-instruments";
import { AxionPhilosophy } from "@/components/axion/axion-philosophy";
import { AxionFounder } from "@/components/axion/axion-founder";
import { AxionCTA } from "@/components/axion/axion-cta";
import { AxionFooter } from "@/components/axion/axion-footer";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--parchment)" }}>
      <AxionNavigation />
      <AxionHero />
      <AxionThesis />
      <AxionInstruments />
      <AxionPhilosophy />
      <AxionFounder />
      <AxionCTA />
      <AxionFooter />
    </main>
  );
}
