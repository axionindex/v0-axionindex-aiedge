import type { Metadata } from "next";
import { AIEdgeSidebar } from "@/components/ai-edge-sidebar";
import { AIEdgeHero } from "@/components/ai-edge-hero";
import { ShiftsSection } from "@/components/shifts-section";
import { TruthsSection } from "@/components/truths-section";
import { WorkStructureSection } from "@/components/work-structure-section";
import { BPDCurveSection } from "@/components/bpd-curve-section";
import { EdgeSection } from "@/components/edge-section";
import { AssessmentSection } from "@/components/assessment-section";
import { OwnershipSection } from "@/components/ownership-section";
import { SalarySection } from "@/components/salary-section";
import { ChangesSection } from "@/components/changes-section";
import { CTASection } from "@/components/cta-section";
import { AIEdgeFooter } from "@/components/ai-edge-footer";

export const metadata: Metadata = {
  title: "Axion Index — AI Edge Lab · Operating Intelligence for the Evolving Organisation",
  description:
    "The AI Edge Lab: Four indices translating invisible organisational forces into quantified, decision-grade signals. Framework for understanding how roles, careers, and organisations must evolve in the AI era.",
  openGraph: {
    title: "Axion Index — AI Edge Lab · Operating Intelligence for the Evolving Organisation",
    description:
      "Four indices. One compound logic. Diagnostic instruments for the evolving organisation.",
    type: "website",
  },
};

export default function AIEdgeLabPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F2EC" }}>
      {/* Sidebar - desktop only */}
      <AIEdgeSidebar />
      
      {/* Main content - offset on desktop for sidebar */}
      <main className="lg:ml-[240px]">
        <AIEdgeHero />
        <ShiftsSection />
        <TruthsSection />
        <WorkStructureSection />
        <BPDCurveSection />
        <EdgeSection />
        <AssessmentSection />
        <OwnershipSection />
        <SalarySection />
        <ChangesSection />
        <CTASection />
        <AIEdgeFooter />
      </main>
    </div>
  );
}
