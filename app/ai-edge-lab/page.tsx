import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { BandSection } from "@/components/band-section";
import { ShiftsSection } from "@/components/shifts-section";
import { IndividualSection } from "@/components/individual-section";
import { TruthsSection } from "@/components/truths-section";
import { WorkStructureSection } from "@/components/work-structure-section";
import { BPDCurveSection } from "@/components/bpd-curve-section";
import { EdgeSection } from "@/components/edge-section";
import { AssessmentSection } from "@/components/assessment-section";
import { OwnershipSection } from "@/components/ownership-section";
import { SalarySection } from "@/components/salary-section";
import { ChangesSection } from "@/components/changes-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function AIEdgeLabPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#080808", color: "#F5F2EC" }}>
      <Navigation />
      <HeroSection />
      <BandSection />
      <ShiftsSection />
      <IndividualSection />
      <TruthsSection />
      <WorkStructureSection />
      <BPDCurveSection />
      <EdgeSection />
      <AssessmentSection />
      <OwnershipSection />
      <SalarySection />
      <ChangesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
