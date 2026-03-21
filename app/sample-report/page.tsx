"use client";

import Link from "next/link";

// Sample report data
const reportData = {
  name: "Alex Chen",
  role: "Senior Strategy Manager",
  function: "Strategy & Consulting",
  experience: "11–15 years",
  score: { min: 61, max: 67 },
  band: "Edge Holding",
  archetype: "The Threshold Professional",
  trajectory: "Holding",
  percentile: 38,
  cohortAvg: 58,
  workStructure: { aiProof: 28, aiAssisted: 30, aiDominant: 42 },
  salaryDefensibility: "Sensitive",
  dimensions: {
    decisionDensity: 58,
    compressionExposure: 62,
    structuralAuthority: 54,
    judgmentOwnership: 52,
    thinkingOwnership: 48,
    scopeMomentum: 38,
  },
};

// Section Header Component
function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
      <div
        style={{
          width: "3px",
          height: "48px",
          background: "var(--gold)",
        }}
      />
      <div>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          Section {num}
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "#EAE5DB",
            marginTop: "4px",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

// Bar Chart Component
function BarChart({
  label,
  value,
  color,
  showValue = true,
  marker,
}: {
  label: string;
  value: number;
  color: string;
  showValue?: boolean;
  marker?: number;
}) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "0.8rem",
          color: "#A09890",
        }}
      >
        <span>{label}</span>
        {showValue && <span style={{ color: "#EAE5DB" }}>{value}%</span>}
      </div>
      <div
        style={{
          height: "8px",
          background: "#1C1C1A",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            transition: "width 0.6s ease",
          }}
        />
        {marker !== undefined && (
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: `${marker}%`,
              transform: "translateX(-50%)",
              width: "2px",
              height: "16px",
              background: "#EAE5DB",
            }}
          />
        )}
      </div>
    </div>
  );
}

// Card Component
function Card({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <div
      style={{
        background: gold ? "rgba(201,169,110,0.06)" : "#161614",
        border: gold ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.08)",
        borderLeft: gold ? "3px solid #C9A96E" : undefined,
        padding: "24px",
        marginBottom: "16px",
      }}
    >
      {children}
    </div>
  );
}

// Stat Box Component
function StatBox({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "16px 24px" }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6A6560",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#EAE5DB",
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            color: "#6A6560",
            marginTop: "4px",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// Dimension Card Component
function DimensionCard({
  label,
  score,
  strength,
  interpretation,
}: {
  label: string;
  score: number;
  strength: "Strong" | "Moderate" | "Developing" | "Weak";
  interpretation: string;
}) {
  const strengthColors = {
    Strong: "#4E9B6A",
    Moderate: "#C9A96E",
    Developing: "#C9A96E",
    Weak: "#B05A5A",
  };

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#EAE5DB",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: strengthColors[strength],
              marginTop: "4px",
            }}
          >
            {strength}
          </div>
        </div>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#C9A96E",
          }}
        >
          {score}
        </div>
      </div>
      <div
        style={{
          height: "6px",
          background: "#1C1C1A",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: strengthColors[strength],
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "0.8rem",
          color: "#A09890",
          lineHeight: 1.6,
        }}
      >
        {interpretation}
      </p>
    </Card>
  );
}

export default function SampleReportPage() {
  return (
    <div style={{ background: "#0B0B0A", minHeight: "100vh", color: "#EAE5DB" }}>
      {/* SAMPLE REPORT Watermark */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-45deg)",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "8rem",
          fontWeight: 700,
          color: "rgba(201,169,110,0.04)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 10,
          letterSpacing: "0.1em",
        }}
      >
        SAMPLE REPORT
      </div>

      {/* Sticky Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(11,11,10,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#EAE5DB",
            textDecoration: "none",
          }}
        >
          AI <span style={{ color: "#C9A96E" }}>EDGE</span> LAB
        </Link>
        <Link
          href="/full-diagnostic"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#C9A96E",
            textDecoration: "none",
            padding: "10px 20px",
            border: "1px solid rgba(201,169,110,0.4)",
            transition: "all 0.2s",
          }}
        >
          Take Full Diagnostic
        </Link>
      </nav>

      {/* Cover Band */}
      <section
        style={{
          borderTop: "3px solid #C9A96E",
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6A6560",
            marginBottom: "24px",
          }}
        >
          AI Edge Diagnostic&trade; &middot; Full Diagnostic Report &middot; 2026-Q1 &middot; Sample
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.5rem",
            fontWeight: 700,
            color: "#EAE5DB",
            marginBottom: "12px",
          }}
        >
          Edge Holding
        </h1>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.8rem",
            color: "#C9A96E",
            marginBottom: "8px",
          }}
        >
          {reportData.archetype}
        </div>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "2rem",
            fontWeight: 600,
            color: "#C9A96E",
            marginBottom: "32px",
          }}
        >
          {reportData.score.min} – {reportData.score.max} / 100
        </div>

        {/* 4-stat row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "48px",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            paddingBottom: "24px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <StatBox label="Trajectory" value={reportData.trajectory} />
          <StatBox label="Percentile" value={`Top ${reportData.percentile}%`} />
          <StatBox label="Cohort Avg" value={reportData.cohortAvg} />
          <StatBox label="Band" value={reportData.band} />
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Section 01 - AI Edge Index Full Breakdown */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="01" title="AI Edge Index Full Breakdown" />
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", marginBottom: "4px" }}>
                  Score Range
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.2rem", color: "#C9A96E" }}>
                  {reportData.score.min}–{reportData.score.max}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", marginBottom: "4px" }}>
                  Band
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB" }}>
                  {reportData.band}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", marginBottom: "4px" }}>
                  Work Structure
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem", color: "#A09890" }}>
                  AI-Dominant: {reportData.workStructure.aiDominant}%
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "16px" }}>
              Your AI Edge Index places you in the <strong style={{ color: "#EAE5DB" }}>Edge Holding</strong> band. This means your current work structure contains sufficient judgment ownership and decision density to maintain value, but the margin is narrow. You are not in immediate compression danger, but you are also not building structural distance from AI capability expansion.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8 }}>
              The holding position requires active management. Without deliberate moves to increase decision density or shift work composition, natural drift will erode your position as AI capabilities expand into adjacent task categories. Your 12-month trajectory depends on whether you convert current boundary access into permanent structural ownership.
            </p>
          </Card>
        </section>

        {/* Section 02 - Archetype */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="02" title="Archetype: The Threshold Professional" />
          <Card>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "16px" }}>
              <strong style={{ color: "#EAE5DB" }}>The Threshold Professional</strong> occupies the critical boundary between execution excellence and decision authority. You have demonstrated competence that earns trust, but that trust has not yet translated into structural ownership of decisions. You are invited to the table but not yet deciding what goes on it.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "24px" }}>
              This archetype faces the highest variance in AI-era outcomes. Those who convert threshold access into judgment ownership will accelerate rapidly. Those who remain in the contribution zone—providing excellent input without owning output—will find their position increasingly compressed as AI handles the contribution layer more effectively.
            </p>
          </Card>
          <Card gold>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#C9A96E", marginBottom: "8px" }}>
              SALARY SIGNAL
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#EAE5DB", lineHeight: 1.7 }}>
              Current compensation reflects contribution value, not decision value. Without structural repositioning, expect compensation pressure within 18–24 months as AI handles contribution-layer work more efficiently.
            </p>
          </Card>
        </section>

        {/* Section 03 - Cohort Comparison */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="03" title="Cohort Comparison" />
          <Card>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#6A6560", marginBottom: "12px" }}>
                By Level (Senior Manager)
              </div>
              <BarChart label="Your Score" value={64} color="#C9A96E" marker={58} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", textAlign: "right" }}>
                Cohort avg: 58
              </div>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#6A6560", marginBottom: "12px" }}>
                By Function (Strategy & Consulting)
              </div>
              <BarChart label="Your Score" value={64} color="#C9A96E" marker={62} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", textAlign: "right" }}>
                Cohort avg: 62
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#6A6560", marginBottom: "12px" }}>
                Combined (Level + Function)
              </div>
              <BarChart label="Your Score" value={64} color="#C9A96E" marker={60} />
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", textAlign: "right" }}>
                Cohort avg: 60
              </div>
            </div>
          </Card>
        </section>

        {/* Section 04 - Salary Defensibility */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="04" title="Salary Defensibility" />
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#6A6560" }}>Rating:</span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.85rem",
                  color: "#C9A96E",
                  padding: "4px 12px",
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.3)",
                }}
              >
                Sensitive
              </span>
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "24px" }}>
              Your salary defensibility rating of <strong style={{ color: "#EAE5DB" }}>Sensitive</strong> indicates that your current compensation is vulnerable to market repricing as AI capabilities expand. While not in immediate danger, the structural foundation of your compensation—primarily tied to execution quality and analysis depth—faces medium-term pressure. The path to defensibility requires shifting compensation anchors from output volume to decision ownership.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                fontSize: "0.7rem",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {[
                { label: "Strong", range: "80-100", color: "#4E9B6A" },
                { label: "Moderate", range: "60-79", color: "#C9A96E" },
                { label: "Sensitive", range: "40-59", color: "#C9A96E", active: true },
                { label: "Pressure", range: "0-39", color: "#B05A5A" },
              ].map((band) => (
                <div
                  key={band.label}
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    background: band.active ? "rgba(201,169,110,0.1)" : "#161614",
                    border: band.active ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ color: band.color, marginBottom: "4px" }}>{band.label}</div>
                  <div style={{ color: "#6A6560" }}>{band.range}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Section 05 - Work Structure Breakdown */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="05" title="Work Structure Breakdown" />
          <Card>
            <BarChart label="Framing" value={8} color="#4E9B6A" />
            <BarChart label="Deciding" value={12} color="#4E9B6A" />
            <BarChart label="Insighting" value={8} color="#4E9B6A" />
            <BarChart label="Analysis" value={30} color="#C9A96E" />
            <BarChart label="Executing" value={22} color="#B05A5A" />
            <BarChart label="Research" value={20} color="#B05A5A" />
            <div style={{ display: "flex", gap: "24px", marginTop: "20px", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem" }}>
              <span style={{ color: "#4E9B6A" }}>AI-Proof: {reportData.workStructure.aiProof}%</span>
              <span style={{ color: "#C9A96E" }}>AI-Assisted: {reportData.workStructure.aiAssisted}%</span>
              <span style={{ color: "#B05A5A" }}>AI-Dominant: {reportData.workStructure.aiDominant}%</span>
            </div>
          </Card>
          <Card gold>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#EAE5DB", lineHeight: 1.7 }}>
              AI-dominant work exceeds AI-proof work by <strong>14 percentage points</strong>. This imbalance creates structural vulnerability. Priority: convert execution and research time into framing and decision activities.
            </p>
          </Card>
        </section>

        {/* Section 06 - Thinking Ownership */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="06" title="Thinking Ownership Deep-Dive" />
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890" }}>Thinking Ownership Score</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.5rem", color: "#C9A96E" }}>48/100</span>
            </div>
            <BarChart label="Original Thinking" value={15} color="#4E9B6A" />
            <BarChart label="Adaptive Thinking" value={20} color="#C9A96E" />
            <BarChart label="Synthesis" value={40} color="#C9A96E" />
            <BarChart label="Applied" value={25} color="#B05A5A" />
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginTop: "20px" }}>
              Your thinking ownership profile shows concentration in synthesis (40%) with limited original thinking (15%). While synthesis remains valuable, it is increasingly automatable. The path to higher thinking ownership requires shifting from combining existing ideas to generating new problem frames and solution architectures.
            </p>
          </Card>
        </section>

        {/* Section 07 - Decision Depth & Time Horizon */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="07" title="Decision Depth & Time Horizon" />
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890" }}>Decision Depth Score</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.5rem", color: "#C9A96E" }}>54</span>
            </div>
            <BarChart label="Daily Decisions" value={25} color="#B05A5A" />
            <BarChart label="Monthly Decisions" value={30} color="#C9A96E" />
            <BarChart label="Quarterly Decisions" value={25} color="#C9A96E" />
            <BarChart label="Annual Decisions" value={15} color="#4E9B6A" />
            <BarChart label="Multi-year Decisions" value={5} color="#4E9B6A" />
          </Card>
        </section>

        {/* Section 08 - Complete Dimension Dashboard */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="08" title="Complete Dimension Dashboard" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            <DimensionCard
              label="Decision Density"
              score={reportData.dimensions.decisionDensity}
              strength="Moderate"
              interpretation="Moderate decision ownership with room for expansion into higher-consequence territory."
            />
            <DimensionCard
              label="Compression Exposure"
              score={reportData.dimensions.compressionExposure}
              strength="Developing"
              interpretation="Elevated exposure to AI compression. Current work structure includes significant automatable components."
            />
            <DimensionCard
              label="Structural Authority"
              score={reportData.dimensions.structuralAuthority}
              strength="Moderate"
              interpretation="Some structural authority but primarily advisory rather than decision-making."
            />
            <DimensionCard
              label="Judgment Ownership"
              score={reportData.dimensions.judgmentOwnership}
              strength="Moderate"
              interpretation="Contributing judgment but not owning final decisions. Conversion opportunity exists."
            />
            <DimensionCard
              label="Thinking Ownership"
              score={reportData.dimensions.thinkingOwnership}
              strength="Developing"
              interpretation="Synthesis-heavy profile. Original thinking generation is the primary development area."
            />
            <DimensionCard
              label="Scope Momentum"
              score={reportData.dimensions.scopeMomentum}
              strength="Weak"
              interpretation="Decision boundary is static. Requires deliberate expansion strategy."
            />
          </div>
        </section>

        {/* Section 09 - Trajectory */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="09" title="Trajectory" />
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#6A6560" }}>Direction:</span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.85rem",
                  color: "#C9A96E",
                  padding: "4px 12px",
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.3)",
                }}
              >
                Holding
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "20px" }}>
              <div style={{ padding: "16px", background: "#1C1C1A" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", marginBottom: "8px" }}>
                  12-Month Signal
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890" }}>
                  Stable if actively managed
                </div>
              </div>
              <div style={{ padding: "16px", background: "#1C1C1A" }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#6A6560", marginBottom: "8px" }}>
                  24-Month Signal
                </div>
                <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890" }}>
                  Compression risk without intervention
                </div>
              </div>
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8 }}>
              The Holding trajectory indicates neither significant upward momentum nor immediate downward pressure. This is the most common—and most dangerous—position because it creates a false sense of stability. The holding band is inherently unstable as AI capabilities expand, requiring active position management to maintain.
            </p>
          </Card>
        </section>

        {/* Section 10 - Career Implications */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="10" title="Career Implications" />
          <Card>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Next Role Positioning
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "24px" }}>
              Your next role should prioritize decision ownership over scope expansion. A lateral move with higher judgment authority is more valuable than a promotion with broader execution responsibility. Seek roles where you own outcomes, not just deliverables.
            </p>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Trajectory Management
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "24px" }}>
              Convert every project into a decision ownership opportunity. Before accepting work, negotiate for judgment authority, not just responsibility. Document decisions you make, not just work you complete.
            </p>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Leverage Strategy
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8 }}>
              Use AI tools to compress execution time, then reinvest that time into decision participation. The goal is not to do more work faster, but to shift the composition of your work toward higher-value activities.
            </p>
          </Card>
        </section>

        {/* Section 11 - Three Structural Moves */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="11" title="Three Structural Moves (Holding Band)" />
          <Card gold>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#C9A96E", marginBottom: "8px" }}>
              MOVE 01
            </div>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Move from recommendation to decision proposer
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.7 }}>
              Stop presenting options. Start proposing decisions with your recommendation. Force yourself to own the choice, even if someone else approves it.
            </p>
          </Card>
          <Card gold>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#C9A96E", marginBottom: "8px" }}>
              MOVE 02
            </div>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Default one recurring output to AI, reclaim time
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.7 }}>
              Identify one regular deliverable that AI can handle. Automate it. Use the reclaimed time for decision participation, not more execution.
            </p>
          </Card>
          <Card gold>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.65rem", color: "#C9A96E", marginBottom: "8px" }}>
              MOVE 03
            </div>
            <h4 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", color: "#EAE5DB", marginBottom: "12px" }}>
              Write the problem before beginning research
            </h4>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.7 }}>
              Before any analysis, write a one-paragraph problem definition. This forces framing ownership and positions you as the problem definer, not just the problem solver.
            </p>
          </Card>
        </section>

        {/* Section 12 - 90-Day Action Plan */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="12" title="90-Day Action Plan" />
          <Card>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#C9A96E", marginBottom: "12px" }}>
                WEEK 1-2
              </div>
              <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, paddingLeft: "20px" }}>
                <li>Audit current work: categorize all activities by AI-proof / AI-assisted / AI-dominant</li>
                <li>Identify one recurring output to automate</li>
                <li>Schedule 3 decision-adjacent meetings where you currently only attend for input</li>
              </ul>
            </div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#C9A96E", marginBottom: "12px" }}>
                MONTH 1
              </div>
              <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, paddingLeft: "20px" }}>
                <li>Propose one decision instead of presenting options</li>
                <li>Implement AI automation for identified recurring output</li>
                <li>Start problem definition practice: write problem statement before any analysis</li>
              </ul>
            </div>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "#C9A96E", marginBottom: "12px" }}>
                MONTH 3
              </div>
              <ul style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, paddingLeft: "20px" }}>
                <li>Achieve 20% reduction in AI-dominant work composition</li>
                <li>Own at least one decision outcome (not just recommendation)</li>
                <li>Establish weekly framing practice in current role</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Section 13 - Framework & Quarterly Update */}
        <section style={{ marginBottom: "64px" }}>
          <SectionHeader num="13" title="Framework & Quarterly Update" />
          <Card>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "0.9rem", color: "#A09890", lineHeight: 1.8, marginBottom: "20px" }}>
              This report uses the E.D.G.E. Framework (Exposure, Decision Density, Growth of Boundary, Economic Anchoring) to assess your structural position in the AI era. The framework is updated quarterly as AI capabilities evolve and new data on work structure transformation becomes available.
            </p>
            <Link
              href="/"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                color: "#C9A96E",
                textDecoration: "none",
              }}
            >
              Learn more at axionindex.org →
            </Link>
          </Card>
        </section>
      </main>

      {/* Bottom CTA Band */}
      <section
        style={{
          background: "#161614",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6A6560",
            marginBottom: "24px",
          }}
        >
          This is a sample report showing what the Full Diagnostic produces
        </p>
        <Link
          href="/full-diagnostic"
          style={{
            display: "inline-block",
            background: "#C9A96E",
            color: "#0B0B0A",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            padding: "18px 40px",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
        >
          Take the Full Diagnostic →
        </Link>
      </section>
    </div>
  );
}
