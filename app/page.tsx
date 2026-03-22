import { AxionNavigation } from "@/components/axion/axion-navigation";
import { AxionHero } from "@/components/axion/axion-hero";
import { AxionWhy } from "@/components/axion/axion-why";
import { AxionWhatWeDo } from "@/components/axion/axion-what-we-do";
import { AxionIdea } from "@/components/axion/axion-idea";
import { AxionFramework } from "@/components/axion/axion-framework";
import { AxionPersonas } from "@/components/axion/axion-personas";
import { AxionDomains } from "@/components/axion/axion-domains";
import { AxionAIEdge } from "@/components/axion/axion-aiedge";
import { AxionHowWeWork } from "@/components/axion/axion-how-we-work";
import { AxionPositioning } from "@/components/axion/axion-positioning";
import { AxionUnconventional } from "@/components/axion/axion-unconventional";
import { AxionContact } from "@/components/axion/axion-contact";
import { AxionFooter } from "@/components/axion/axion-footer";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--parchment)" }}>
      <AxionNavigation />
      <AxionHero />
      <AxionWhy />
      <AxionWhatWeDo />
      <AxionIdea />
      <AxionFramework />
      <AxionPersonas />
      <AxionDomains />
      <AxionAIEdge />
      <AxionHowWeWork />
      <AxionPositioning />
      <AxionUnconventional />
      <AxionContact />
      <AxionFooter />
    </main>
  );
}
