"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { AIEdgeFooter } from "@/components/ai-edge-footer";

export const metadata: Metadata = {
  title: "Labour Codes — Axion Index",
  description:
    "Navigate India's four labour codes with decision intelligence, compliance triggers, and implementation playbooks.",
  openGraph: {
    title: "Labour Codes — Axion Index",
    description:
      "Navigate India's four labour codes with decision intelligence, compliance triggers, and implementation playbooks.",
    type: "website",
  },
};

export default function LabourCodesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [triggerFormData, setTriggerFormData] = useState({
    employees: "",
    contractors: "",
    women: "",
    sector: "",
    state: "",
    establishment: "",
  });
  const [classificationAnswers, setClassificationAnswers] = useState<number[]>([]);
  const [classificationResult, setClassificationResult] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClassificationAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...classificationAnswers];
    newAnswers[questionIndex] = score;
    setClassificationAnswers(newAnswers);

    if (newAnswers.length === 6 && newAnswers.every((a) => a > 0)) {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      if (totalScore >= 16) {
        setClassificationResult("Direct Employee");
      } else if (totalScore >= 10) {
        setClassificationResult("Contingent Worker");
      } else {
        setClassificationResult("Genuine Consultant");
      }
    }
  };

  const whatNewCards = [
    {
      title: "Central Government Issues Clarification on Gratuity in CTC",
      type: "Update",
      date: "Apr 2026",
    },
    {
      title: "Karnataka Finalises Occupational Safety Rules",
      type: "Signal",
      date: "Apr 2026",
    },
    {
      title: "Supreme Court Defers IT Contract Labour Judgment",
      type: "Divergence",
      date: "Mar 2026",
    },
    {
      title: "State Tracker: 18 States Now Finalised",
      type: "Action",
      date: "Mar 2026",
    },
  ];

  const hubCards = [
    { title: "Trigger Engine", status: "Live", badge: "Tool" },
    { title: "Classification Test", status: "Live", badge: "Tool" },
    { title: "State Tracker", status: "Live", badge: "Reference" },
    { title: "Grey Areas", status: "Live", badge: "Guidance" },
    { title: "Compensation Playbook", status: "Coming Q3", badge: "Playbook" },
    { title: "IR Playbook", status: "Coming Q3", badge: "Playbook" },
    { title: "Sector Guides", status: "Coming Q4", badge: "Guidance" },
    { title: "Implementation Sequencer", status: "Coming Q4", badge: "Tool" },
  ];

  const greyAreas = [
    {
      question: "IT Worker Classification",
      govt: "No official stance",
      consensus: "Generally contracts with IT firms",
      axion: "Classification depends on control, not sector",
    },
    {
      question: "Gratuity in CTC",
      govt: "Limited guidance on allocation",
      consensus: "Varies by state practice",
      axion: "Separate accrual required for compliance",
    },
    {
      question: "Recurring Incentives in 50% Test",
      govt: "Pending clarification",
      consensus: "Some states include, some exclude",
      axion: "Safest to exclude from 50% calculation",
    },
    {
      question: "ESOPs/RSUs in Wages",
      govt: "Not explicitly addressed",
      consensus: "Evolving legal interpretation",
      axion: "Treat as non-monetary for threshold purposes",
    },
    {
      question: "Contract Labour: Core Activity Test",
      govt: "Multiple contradictions",
      consensus: "Very fact-dependent",
      axion: "Risk mitigation through clear contracting",
    },
    {
      question: "Remote Work Jurisdiction",
      govt: "Work state vs employee state unclear",
      consensus: "Default to work location",
      axion: "Document clearly in engagement letter",
    },
  ];

  const complianceTriggers = [
    { name: "PF", logic: "Employees ≥ 1", status: "Mandatory" },
    { name: "ESI", logic: "Employees ≥ 10 (non-seasonal)", status: "Mandatory" },
    { name: "Gratuity", logic: "Service > 5 years (≥ 1 employee)", status: "Mandatory" },
    { name: "Bonus", logic: "Employees ≥ 1, 50% of basic ≥ threshold", status: "Mandatory" },
    { name: "Canteen", logic: "Employees ≥ 250", status: "Mandatory" },
    { name: "Crèche", logic: "Women employees ≥ 30", status: "Mandatory" },
    { name: "ICC", logic: "Employees ≥ 10", status: "Mandatory" },
    { name: "Works Committee", logic: "Employees ≥ 20 (industrial)", status: "Mandatory" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0C0B09", color: "#F4EFE6" }}>
      <style jsx global>{`
        :root {
          --ink: #0C0B09;
          --gold: #C49A3C;
          --parchment: #F4EFE6;
          --rust: #8C3B28;
          --dim: #6B6358;
          --green: #5BAD7A;
          --border-dark: rgba(196,154,60,.2);
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .reveal {
          animation: fadeUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .reveal:nth-child(1) { animation-delay: 0.1s; }
        .reveal:nth-child(2) { animation-delay: 0.2s; }
        .reveal:nth-child(3) { animation-delay: 0.3s; }
        .reveal:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      <Navigation />

      {/* Live Status Strip */}
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          background: "rgba(12, 11, 9, 0.95)",
          borderBottom: "1px solid rgba(196,154,60,.15)",
          backdropFilter: "blur(10px)",
          padding: "12px 48px",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(244,239,230,0.65)",
          display: "flex",
          gap: "40px",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "#5BAD7A",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          Central: All 4 codes in force
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "var(--gold)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          States: ~18 finalised
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              background: "rgba(244,239,230,0.4)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          Karnataka: Consultation closes Apr 18
        </div>
      </div>

      <main style={{ paddingTop: "140px" }}>
        {/* Hero Section */}
        <section style={{ padding: "80px 48px", textAlign: "center", marginBottom: "80px" }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              marginBottom: "30px",
              lineHeight: 1.3,
            }}
          >
            The System Reset of{" "}
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Employment in India</span>
          </h1>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "60px",
              marginTop: "50px",
              padding: "40px",
              background: "rgba(196,154,60,.05)",
              border: "1px solid rgba(196,154,60,.1)",
              borderRadius: "4px",
              maxWidth: "700px",
              margin: "50px auto 0",
            }}
          >
            {[
              { label: "Codes", value: "4" },
              { label: "Laws Replaced", value: "29" },
              { label: "Minimum Basic", value: "50%" },
              { label: "IR Threshold", value: "300" },
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "var(--gold)",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--dim)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's New Grid */}
        <section style={{ padding: "0 48px 80px", marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            What&apos;s New
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            {whatNewCards.map((card, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{
                  padding: "30px",
                  background: "rgba(196,154,60,.03)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(196,154,60,.08)";
                  e.currentTarget.style.borderColor = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(196,154,60,.03)";
                  e.currentTarget.style.borderColor = "var(--border-dark)";
                }}
              >
                <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      background: "var(--gold)",
                      color: "var(--ink)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderRadius: "1px",
                    }}
                  >
                    {card.type}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--dim)",
                    }}
                  >
                    {card.date}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 500, lineHeight: 1.4 }}>
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Decision Tools */}
        <section style={{ padding: "0 48px 80px", marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            Decision Tools
          </h2>

          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border-dark)",
              marginBottom: "40px",
              overflow: "auto",
            }}
          >
            {["Trigger Engine", "Classification Test", "State Tracker", "Grey Areas"].map(
              (tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: "15px 30px",
                    background: "transparent",
                    border: "none",
                    color:
                      activeTab === idx
                        ? "var(--gold)"
                        : "rgba(244,239,230,0.45)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderBottom: activeTab === idx ? "2px solid var(--gold)" : "none",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: "400px" }}>
            {/* Trigger Engine */}
            {activeTab === 0 && (
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {[
                    { label: "Employees", key: "employees" },
                    { label: "Contractor Workers", key: "contractors" },
                    { label: "Women Workers", key: "women" },
                    { label: "Sector", key: "sector" },
                    { label: "State", key: "state" },
                    { label: "Establishment Type", key: "establishment" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.75rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                          color: "var(--dim)",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.key === "employees" ? "number" : "text"}
                        value={
                          triggerFormData[field.key as keyof typeof triggerFormData] || ""
                        }
                        onChange={(e) =>
                          setTriggerFormData({
                            ...triggerFormData,
                            [field.key]: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "rgba(196,154,60,.05)",
                          border: "1px solid var(--border-dark)",
                          color: "var(--parchment)",
                          fontSize: "0.9rem",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    padding: "12px 30px",
                    background: "var(--gold)",
                    color: "var(--ink)",
                    border: "none",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "2px",
                    marginBottom: "40px",
                  }}
                >
                  Calculate Triggers
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {complianceTriggers.map((trigger, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "20px",
                        background: "rgba(196,154,60,.03)",
                        border: "1px solid var(--border-dark)",
                        borderRadius: "2px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: "600" }}>
                          {trigger.name}
                        </h4>
                        <span
                          style={{
                            padding: "2px 8px",
                            background: "var(--green)",
                            color: "var(--ink)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            borderRadius: "1px",
                          }}
                        >
                          {trigger.status}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "rgba(244,239,230,0.65)" }}>
                        {trigger.logic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classification Test */}
            {activeTab === 1 && (
              <div>
                {[
                  "Who controls when, where, how work is done?",
                  "Is this ongoing or project-based?",
                  "Is the work core to business?",
                  "Can worker send a substitute?",
                  "Who provides tools/equipment?",
                  "What % of income from this engagement?",
                ].map((question, idx) => (
                  <div key={idx} style={{ marginBottom: "40px" }}>
                    <h4 style={{ fontSize: "0.95rem", marginBottom: "15px" }}>
                      {idx + 1}. {question}
                    </h4>
                    <div style={{ display: "flex", gap: "15px" }}>
                      {["Low", "Medium", "High"].map((level, levelIdx) => (
                        <button
                          key={levelIdx}
                          onClick={() => handleClassificationAnswer(idx, levelIdx + 1)}
                          style={{
                            padding: "10px 20px",
                            background:
                              classificationAnswers[idx] === levelIdx + 1
                                ? "var(--gold)"
                                : "rgba(196,154,60,.05)",
                            color:
                              classificationAnswers[idx] === levelIdx + 1
                                ? "var(--ink)"
                                : "var(--parchment)",
                            border:
                              classificationAnswers[idx] === levelIdx + 1
                                ? "none"
                                : "1px solid var(--border-dark)",
                            fontSize: "0.85rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            borderRadius: "2px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {classificationResult && (
                  <div
                    style={{
                      padding: "30px",
                      background: "rgba(91,173,122,.1)",
                      border: "1px solid rgba(91,173,122,.3)",
                      borderRadius: "2px",
                      marginTop: "40px",
                    }}
                  >
                    <h4 style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", marginBottom: "10px" }}>
                      Classification Result
                    </h4>
                    <p style={{ fontSize: "1.3rem", fontWeight: "600", color: "#5BAD7A" }}>
                      {classificationResult}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* State Tracker */}
            {activeTab === 2 && (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.85rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-dark)" }}>
                      <th style={{ padding: "15px", textAlign: "left", color: "var(--dim)" }}>
                        State
                      </th>
                      <th style={{ padding: "15px", textAlign: "center", color: "var(--dim)" }}>
                        Wages Code
                      </th>
                      <th style={{ padding: "15px", textAlign: "center", color: "var(--dim)" }}>
                        IR Code
                      </th>
                      <th style={{ padding: "15px", textAlign: "center", color: "var(--dim)" }}>
                        SS Code
                      </th>
                      <th style={{ padding: "15px", textAlign: "center", color: "var(--dim)" }}>
                        OSH Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Andhra Pradesh",
                      "Assam",
                      "Bihar",
                      "Chhattisgarh",
                      "Delhi",
                      "Gujarat",
                      "Haryana",
                      "Himachal Pradesh",
                      "Jharkhand",
                      "Karnataka",
                    ].map((state, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: "1px solid rgba(196,154,60,.1)",
                        }}
                      >
                        <td
                          style={{
                            padding: "15px",
                            color: "rgba(244,239,230,0.85)",
                          }}
                        >
                          {state}
                        </td>
                        {[0, 1, 2, 3].map((col) => (
                          <td
                            key={col}
                            style={{
                              padding: "15px",
                              textAlign: "center",
                            }}
                          >
                            <span
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                display: "inline-block",
                                background:
                                  (idx + col) % 3 === 0
                                    ? "#5BAD7A"
                                    : (idx + col) % 3 === 1
                                      ? "var(--gold)"
                                      : "rgba(107,99,88,0.5)",
                              }}
                            ></span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Grey Areas */}
            {activeTab === 3 && (
              <div>
                {greyAreas.map((area, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "30px",
                      background: "rgba(196,154,60,.03)",
                      border: "1px solid var(--border-dark)",
                      marginBottom: "20px",
                      borderRadius: "2px",
                    }}
                  >
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "15px" }}>
                      {area.question}
                    </h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                      <div>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--dim)",
                            marginBottom: "8px",
                          }}
                        >
                          Government Position
                        </p>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {area.govt}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--dim)",
                            marginBottom: "8px",
                          }}
                        >
                          Legal Consensus
                        </p>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {area.consensus}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                            marginBottom: "8px",
                          }}
                        >
                          Axion View
                        </p>
                        <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {area.axion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Hub Section */}
        <section style={{ padding: "0 48px 80px", marginBottom: "80px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            Tools & Resources
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "25px",
            }}
          >
            {hubCards.map((card, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{
                  padding: "30px",
                  background: "rgba(196,154,60,.03)",
                  border: "1px solid var(--border-dark)",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(196,154,60,.08)";
                  e.currentTarget.style.borderColor = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(196,154,60,.03)";
                  e.currentTarget.style.borderColor = "var(--border-dark)";
                }}
              >
                <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      background:
                        card.status === "Live"
                          ? "var(--green)"
                          : "rgba(196,154,60,.3)",
                      color:
                        card.status === "Live" ? "var(--ink)" : "var(--parchment)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderRadius: "1px",
                    }}
                  >
                    {card.status}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      background: "rgba(196,154,60,.15)",
                      color: "var(--parchment)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderRadius: "1px",
                    }}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: "500", lineHeight: 1.4 }}>
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: "80px 48px",
            textAlign: "center",
            background: "rgba(196,154,60,.05)",
            border: "1px solid var(--border-dark)",
            marginBottom: "80px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              marginBottom: "30px",
            }}
          >
            Run a 10-Minute Readiness Check
          </h2>
          <p style={{ fontSize: "1rem", marginBottom: "30px", color: "rgba(244,239,230,0.8)" }}>
            Get clarity on your compliance status across all four codes
          </p>
          <button
            style={{
              padding: "15px 40px",
              background: "var(--gold)",
              color: "var(--ink)",
              border: "none",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              fontWeight: "600",
            }}
          >
            Start Assessment →
          </button>
        </section>
      </main>

      <AIEdgeFooter />
    </div>
  );
}
