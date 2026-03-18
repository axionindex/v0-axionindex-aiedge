import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DiagnosticSelector } from "@/components/diagnostic-selector";

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navigation />
      <div className="pt-[53px]">
        {/* Header */}
        <div className="border-b border-rule py-3 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <span className="font-label text-[9px] text-stone uppercase tracking-[0.2em]">
              AI Edge Diagnostic™ · Assessment Hub
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-black text-balance">
              Choose Your Diagnostic
            </h1>
            <p className="mt-4 text-cream2 text-lg max-w-2xl mx-auto">
              Understand your structural position relative to the AI compression
              line.
            </p>
          </div>

          <DiagnosticSelector />

          {/* Privacy note */}
          <p className="mt-12 text-center font-label text-[9px] text-stone uppercase tracking-[0.15em]">
            Results are private — never shared with employers or organisations
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
