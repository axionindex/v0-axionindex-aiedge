import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { AIEdgeFooter } from "@/components/ai-edge-footer";

export const metadata: Metadata = {
  title: "New Labour Code — Axion Index",
  description:
    "New Labour Code: Redefining work and compensation in the AI era.",
  openGraph: {
    title: "New Labour Code — Axion Index",
    description:
      "New Labour Code: Redefining work and compensation in the AI era.",
    type: "website",
  },
};

export default function NewLabourCodePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F2EC" }}>
      <Navigation />
      
      <main style={{ paddingTop: "60px" }}>
        <section
          style={{
            padding: "80px 48px",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              fontWeight: 900,
              letterSpacing: "0.05em",
              marginBottom: "20px",
              color: "#F5F2EC",
              textTransform: "uppercase",
            }}
          >
            New <span style={{ color: "var(--gold, #C9A84C)" }}>Labour</span> Code
          </h1>
          
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem",
              maxWidth: "700px",
              lineHeight: 1.6,
              color: "rgba(245,242,236,0.7)",
              marginBottom: "40px",
            }}
          >
            Redefining work, compensation, and organisational structure for the AI era
          </p>

          <div
            style={{
              maxWidth: "800px",
              textAlign: "left",
              marginTop: "60px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(245,242,236,0.65)",
            }}
          >
            <p style={{ marginBottom: "20px" }}>
              The New Labour Code represents a fundamental rethinking of how organisations structure work, compensate talent, and distribute decision-making authority in a world where intelligence is becoming abundant and judgment is the new scarcity.
            </p>
            
            <p style={{ marginBottom: "20px" }}>
              As AI compresses cognitive tasks and automates routine work, the traditional labor model breaks down. This code articulates the principles, structures, and instruments that enable organisations to:
            </p>

            <ul style={{ marginLeft: "20px", marginBottom: "20px", listStyle: "disc" }}>
              <li style={{ marginBottom: "12px" }}>Identify and protect the high-judgment work that will command premium compensation</li>
              <li style={{ marginBottom: "12px" }}>Design career paths that map individual growth to expanding decision authority</li>
              <li style={{ marginBottom: "12px" }}>Create compensation structures anchored to economic value rather than task completion</li>
              <li style={{ marginBottom: "12px" }}>Build organisations where human judgment and AI capability create multiplicative value</li>
            </ul>

            <p style={{ marginBottom: "20px" }}>
              The New Labour Code is not a restraint on organisations. It is the operating system for extracting sustainable competitive advantage from human talent in the AI age.
            </p>
          </div>
        </section>

        <section
          style={{
            padding: "60px 48px",
            borderTop: "1px solid rgba(201,168,76,0.15)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.6)",
              marginBottom: "30px",
            }}
          >
            Coming Soon
          </h2>
          
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.2rem",
              color: "rgba(245,242,236,0.6)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Full documentation on the New Labour Code framework, implementation guides, and case studies will be available soon.
          </p>
        </section>
      </main>

      <AIEdgeFooter />
    </div>
  );
}
