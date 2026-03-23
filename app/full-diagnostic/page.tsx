"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@300;400&family=Inter:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0B0B0A;--bg2:#0F0F0E;--bg3:#111110;--bg4:#141412;
  --border:#1C1C1A;--border2:#2E2E2B;--border3:#232320;
  --text:#EAE5DB;--text2:#A8A39A;--text3:#6A6560;--text4:#3A3A37;
  --gold:#C9A96E;--gold-dim:#7A6030;--gold-bg:#14120A;
  --green:#4E9B6A;--green-bg:#081510;--green-border:#1A3C25;
  --red:#B05A5A;--red-bg:#14080A;--red-border:#3C1A1A;
  --blue:#5A7AB0;
  --serif:'Playfair Display',Georgia,serif;
  --mono:'IBM Plex Mono',monospace;
  --sans:'Inter',system-ui,sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}
.shell-hd{display:flex;align-items:center;justify-content:space-between;padding:13px 24px;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10;background:var(--bg)}
.shell-brand{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--text4)}
.shell-back{font-size:11px;color:var(--text3);background:none;border:none;cursor:pointer;font-family:var(--sans)}
.prog-track{height:2px;background:var(--border)}
.prog-fill{height:2px;background:var(--gold);transition:width .4s ease}
.wrap{max-width:640px;margin:0 auto;width:100%;padding:28px 24px 52px}
.eyebrow{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--text4);margin-bottom:8px}
.q-hdr{display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap}
.q-act{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.q-sep{color:var(--border2)}
.q-num{font-size:10px;color:var(--text4);font-family:var(--mono)}
.q-q{font-family:var(--serif);font-size:clamp(17px,2.8vw,22px);font-weight:400;line-height:1.4;margin:10px 0 6px}
.q-nudge{font-size:11px;color:var(--text3);font-style:italic;margin-bottom:16px;line-height:1.55;padding-left:10px;border-left:1px solid var(--border)}
.q-scope{background:var(--bg2);border:1px solid var(--border);border-left:2px solid var(--border2);padding:8px 12px;margin-bottom:14px;font-size:11px;color:var(--text4);line-height:1.5}
.opt{background:var(--bg3);border:1px solid var(--border);padding:12px 16px;cursor:pointer;transition:all .14s;display:flex;gap:12px;align-items:flex-start;margin-bottom:3px}
.opt:hover{border-color:var(--border3);background:var(--bg4)}
.opt.sel{border-color:var(--gold);background:var(--gold-bg)}
.opt-l{font-family:var(--mono);font-size:11px;color:var(--text4);min-width:14px;padding-top:2px;flex-shrink:0}
.opt.sel .opt-l{color:var(--gold)}
.opt-body{flex:1}
.opt-t{font-size:13px;color:var(--text2);line-height:1.4;margin-bottom:3px}
.opt.sel .opt-t{color:var(--text)}
.opt-eg{font-size:11px;color:var(--gold-dim);margin-top:5px;font-style:italic;line-height:1.45}
.opt-s{font-size:10px;color:var(--text4);letter-spacing:.06em}
.opt.sel.compress .opt-s{color:var(--red)}
.opt.sel.neutral .opt-s{color:var(--gold)}
.opt.sel.edge .opt-s{color:var(--green)}
.why-toggle{display:inline-flex;align-items:center;gap:4px;background:none;border:none;color:var(--text4);font-size:11px;cursor:pointer;font-family:var(--sans);text-decoration:underline;text-underline-offset:3px;margin-top:12px;padding:0}
.why-box{background:var(--bg3);border:1px solid var(--border);border-left:2px solid var(--gold-dim);padding:11px 14px;margin-top:7px;font-size:12px;color:var(--text3);line-height:1.65}
.split-block{border:1px solid var(--border);background:var(--bg3);margin-bottom:8px}
.split-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:11px 14px;border-bottom:1px solid var(--border)}
.split-row:last-child{border-bottom:none}
.sn{font-size:13px;color:var(--text);margin-bottom:2px}
.sd{font-size:10px;color:var(--text4);line-height:1.3}
.sc2{display:flex;align-items:center;gap:8px;min-width:160px}
.sv{font-family:var(--mono);font-size:15px;color:var(--gold);min-width:36px;text-align:right}
.total-row{display:flex;justify-content:space-between;padding:9px 14px;font-size:12px;border-top:1px solid var(--border)}
.multi-chip{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:4px}
.chip{background:var(--bg3);border:1px solid var(--border);padding:9px 13px;cursor:pointer;transition:all .14s}
.chip:hover{border-color:var(--border3)}
.chip.sel{border-color:var(--gold);background:var(--gold-bg)}
.chip-t{font-size:12px;color:var(--text2)}
.chip.sel .chip-t{color:var(--text)}
.chip-s{font-size:10px;color:var(--text4);margin-top:2px}
.sub-q{background:var(--bg2);border:1px solid var(--border);border-left:2px solid var(--gold-dim);padding:12px 14px;margin-bottom:3px}
.sub-q-lbl{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-dim);font-weight:700;margin-bottom:6px}
.sub-q-text{font-size:13px;color:var(--text2);margin-bottom:10px;line-height:1.4}
.sub-opts{display:flex;flex-direction:column;gap:2px}
.sub-opt{background:var(--bg3);border:1px solid var(--border);padding:8px 11px;cursor:pointer;font-size:12px;color:var(--text3);transition:all .14s}
.sub-opt:hover{border-color:var(--border3)}
.sub-opt.sel{border-color:var(--gold);color:var(--text);background:var(--gold-bg)}
.profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:14px}
.profile-field{background:var(--bg3);border:1px solid var(--border);padding:12px 14px}
.pf-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--text4);margin-bottom:6px;font-weight:600}
.pf-input{width:100%;background:var(--bg);border:1px solid var(--border2);color:var(--text);font-size:12px;padding:7px 10px;font-family:var(--sans);outline:none}
.pf-input:focus{border-color:var(--gold)}
.pf-select{display:flex;flex-direction:column;gap:2px}
.pf-chip{font-size:11px;padding:5px 10px;border:1px solid var(--border);cursor:pointer;color:var(--text3);background:var(--bg);transition:all .14s}
.pf-chip.sel{border-color:var(--gold);color:var(--gold);background:#1C1A16}
.nav{display:flex;align-items:center;justify-content:space-between;margin-top:28px;padding-top:20px;border-top:1px solid var(--border)}
.btn-g{background:none;border:1px solid var(--border2);color:var(--text3);font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:10px 20px;cursor:pointer;font-family:var(--sans)}
.btn-g:hover{border-color:var(--gold-dim);color:var(--text)}
.btn-p{background:var(--gold);color:var(--bg);font-size:10px;letter-spacing:.14em;text-transform:uppercase;padding:10px 24px;border:none;cursor:pointer;font-weight:700;font-family:var(--sans)}
.btn-p:hover{background:#D4B47A}
.btn-p:disabled{background:var(--border);color:var(--text4);cursor:not-allowed}
.divider{height:1px;background:var(--border);margin:20px 0}
.conflict{background:var(--red-bg);border:1px solid var(--red-border);border-left:3px solid var(--red);padding:11px 14px;margin-top:10px;font-size:12px;color:#C08080;line-height:1.6}
.confirm{background:var(--green-bg);border:1px solid var(--green-border);border-left:3px solid var(--green);padding:10px 13px;margin-top:10px;font-size:12px;color:#7AB090;line-height:1.6}
`;

// ── COHORT DATA ───────────────────────────────────────────────────────────────
const COHORT = {
  byLevel: {
    ic: { avg: 46, p25: 35, p75: 57, label: "Individual contributor" },
    tl: { avg: 52, p25: 41, p75: 63, label: "Team lead / senior IC" },
    mgr: { avg: 56, p25: 45, p75: 67, label: "Manager" },
    sr: { avg: 62, p25: 51, p75: 73, label: "Senior manager / director" },
    vp: { avg: 67, p25: 57, p75: 78, label: "VP / head of function" },
    exec: { avg: 73, p25: 63, p75: 84, label: "C-suite / executive" },
  },
  byFunction: {
    strategy: { avg: 65, label: "Strategy" },
    product: { avg: 60, label: "Product" },
    finance: { avg: 54, label: "Finance & FP&A" },
    hr: { avg: 52, label: "HR & People" },
    operations: { avg: 49, label: "Operations" },
    marketing: { avg: 55, label: "Marketing" },
    sales: { avg: 57, label: "Sales & commercial" },
    tech: { avg: 58, label: "Technology" },
    legal: { avg: 61, label: "Legal & compliance" },
    consulting: { avg: 63, label: "Consulting" },
  },
  byOrgSize: {
    startup: { avg: 58, label: "Startup (<100)" },
    mid: { avg: 54, label: "Mid-size (100–1000)" },
    large: { avg: 52, label: "Large (1000–10,000)" },
    corp: { avg: 55, label: "Enterprise (10,000+)" },
  },
};

interface Archetype {
  name: string;
  range: [number, number];
  band: string;
  color: string;
  desc: string;
  salary: string;
}

const ARCHETYPES: Archetype[] = [
  {
    name: "Structural Architect",
    range: [80, 100],
    band: "acc",
    color: "var(--green)",
    desc: "You operate at the outer edge of what AI can reach. Your work is defined by judgment calls that set direction for others, consequence ownership at the highest levels, and problem-framing that precedes all analytical work. AI compresses your production layer — it compounds your structural leverage.",
    salary:
      "High defensibility. Your position justifies premium compensation and provides strong insulation from substitution risk over the medium and long term. Your structural position is a salary anchor.",
  },
  {
    name: "Strategic Leverager",
    range: [70, 79],
    band: "acc",
    color: "#7AB070",
    desc: "You own the decisions that matter and carry real consequence. Your work combines dominant AI-proof judgment with some structured output — but the judgment layer is clearly primary and distinctly yours. You are positioned above the compression line.",
    salary:
      "Strong defensibility. Ensure your judgment work is visible and explicitly attributed — the invisible judgment premium is the one at risk. Make your framing and decision ownership a named part of your professional narrative.",
  },
  {
    name: "Boundary Builder",
    range: [60, 69],
    band: "hold",
    color: "var(--gold)",
    desc: "Your work sits meaningfully above the AI compression line. You own problems, shape decisions, and carry consequence that others don't. Your edge is established — the priority now is compounding it deliberately before the compression line advances further.",
    salary:
      "Moderate-to-strong defensibility. Your composition positions you above the mid-range. Active management of your structural position over the next 12 months converts this from moderate to strong.",
  },
  {
    name: "Output Manager",
    range: [50, 59],
    band: "hold",
    color: "#C09050",
    desc: "Your work is a genuine mix of protected and compressible dimensions. Your edge is intact but not yet dominant. A significant portion of your time sits in dimensions AI is actively advancing on — the composition shift in your action plan is the structural priority.",
    salary:
      "Moderate defensibility. Sensitive to role design and scope decisions over the next 12–18 months. The action plan identifies the specific moves to shift toward stronger defensibility.",
  },
  {
    name: "Execution Operator",
    range: [0, 49],
    band: "thin",
    color: "var(--red)",
    desc: "The majority of your current work sits in the structured output and execution layer — the zone AI is advancing on fastest. This is a structural position, not a capability assessment. The action plan identifies the specific composition moves required.",
    salary:
      "High compression exposure. Structural urgency is real and immediate. The reclaim strategy in your report addresses this with a specific 90-day routing and repositioning plan.",
  },
];

const bandName = (b: string) =>
  b === "acc" ? "Edge Accelerating" : b === "hold" ? "Edge Holding" : "Edge Thinning";
const trajName = (t: string) => (t === "acc" ? "Accelerating" : t === "hold" ? "Holding" : "Thinning");
const bandColor = (b: string) =>
  b === "acc" ? "var(--green)" : b === "hold" ? "var(--gold)" : "var(--red)";
const salLabels: Record<string, string> = {
  strong: "High defensibility",
  moderate: "Moderate-to-strong defensibility",
  sensitive: "Moderate defensibility — active management required",
  pressure: "High compression exposure",
};
const salColors: Record<string, string> = {
  strong: "var(--green)",
  moderate: "#7AB070",
  sensitive: "var(--gold)",
  pressure: "var(--red)",
};

// ── SUB-ACTIVITY DATA ────────────────────────────────────────────────────────
const SUB_ACTIVITIES: Record<string, { label: string; cat: string; catC: string; note: string; items: { id: string; name: string; desc: string; cat: string; catC: string; parity: number }[] }> = {
  research: {
    label: "Research",
    cat: "AI-Dominant",
    catC: "var(--red)",
    note: "Most Research activities are at or near full AI parity. The protected layer is thin — it sits in the question before the search, not the search itself.",
    items: [
      { id: "web", name: "Web and document research", desc: "Scanning sources, retrieving and synthesising from multiple documents", cat: "Fully automated", catC: "var(--red)", parity: 95 },
      { id: "market", name: "Competitor and market scanning", desc: "Aggregating market intelligence, tracking developments, monitoring signals", cat: "Fully automated", catC: "var(--red)", parity: 92 },
      { id: "data", name: "Data gathering and extraction", desc: "Pulling structured data from systems, databases, and tools", cat: "Fully automated", catC: "var(--red)", parity: 90 },
      { id: "hypothesis", name: "Defining the research hypothesis", desc: "Structuring what is being investigated: what the research should establish, what assumptions underpin it", cat: "AI-proof", catC: "var(--green)", parity: 15 },
      { id: "filter", name: "Relevance filtering and signal selection", desc: "Deciding which sources and inputs are relevant to the specific question", cat: "Advancing rapidly", catC: "var(--gold)", parity: 65 },
      { id: "define", name: "Defining what to research", desc: "Framing the research question itself. AI can search, but it cannot decide what is worth searching for.", cat: "AI-proof", catC: "var(--green)", parity: 12 },
    ],
  },
  analysis: {
    label: "Analysis",
    cat: "AI-Assisted",
    catC: "var(--gold)",
    note: "The fastest-advancing dimension. Statistical analysis is already fully automated. The protected layer — causal inference and framing the analysis — is real but narrowing.",
    items: [
      { id: "statistical", name: "Statistical and quantitative analysis", desc: "Running models, computing metrics, identifying patterns in structured datasets", cat: "Fully automated", catC: "var(--red)", parity: 88 },
      { id: "options", name: "Structured option evaluation", desc: "Scoring alternatives against defined criteria, building comparison matrices", cat: "Fully automated", catC: "var(--red)", parity: 85 },
      { id: "pattern", name: "Pattern identification in complex data", desc: "Finding non-obvious patterns across large or multi-source datasets", cat: "Advancing rapidly", catC: "var(--gold)", parity: 70 },
      { id: "causal", name: "Causal inference and root-cause diagnosis", desc: "Determining what is actually causing an observed outcome under genuine ambiguity", cat: "Advancing", catC: "var(--gold)", parity: 45 },
      { id: "frame", name: "What to analyse and why", desc: "Deciding which analytical question is worth pursuing, and what results mean for the specific decision at hand", cat: "AI-proof", catC: "var(--green)", parity: 18 },
    ],
  },
  insight: {
    label: "Insight Generation",
    cat: "AI-Proof",
    catC: "var(--green)",
    note: "The category is AI-proof — but the protected layer is narrower than it appears. Synthesis is advancing rapidly toward AI parity. Genuine reframing insight remains strongly protected.",
    items: [
      { id: "synthesis", name: "Synthesis — combining findings into a coherent narrative", desc: "Pulling together research and analysis into a structured 'so what'", cat: "Advancing rapidly", catC: "var(--gold)", parity: 72 },
      { id: "framework", name: "Known-framework application to new situations", desc: "Applying established mental models to a new problem or context", cat: "Advancing", catC: "var(--gold)", parity: 65 },
      { id: "crossdomain", name: "Cross-domain connection", desc: "Drawing on experience across domains to produce an interpretation someone inside the problem alone would not reach", cat: "AI-proof", catC: "var(--green)", parity: 22 },
      { id: "aligning", name: "Aligning emerging patterns into solution-oriented conclusions", desc: "Translating insight into a form that can drive decisions and action", cat: "AI-proof", catC: "var(--green)", parity: 18 },
      { id: "reframe", name: "The reframing insight — conclusion that changes the question", desc: "The insight that does not answer the question but reframes what question is worth asking", cat: "Strongly AI-proof", catC: "var(--green)", parity: 10 },
      { id: "naming", name: "Naming the pattern — articulating what others have not seen", desc: "Being first to name what the evidence collectively points to. Changes what is decided.", cat: "Strongly AI-proof", catC: "var(--green)", parity: 8 },
    ],
  },
  framing: {
    label: "Framing",
    cat: "AI-Proof",
    catC: "var(--green)",
    note: "Near-zero compression rate. The primary risk is not AI compression — it is invisibility. Framing work that lives only in the output cannot be attributed to you.",
    items: [
      { id: "refine", name: "Refining given briefs — clarifying scope within an existing frame", desc: "The direction is set — you sharpen edges within a frame someone else defined", cat: "Partially advancing", catC: "var(--gold)", parity: 45 },
      { id: "codesign", name: "Co-designing problem structure with stakeholders", desc: "Joint framing where your input materially shapes the structure", cat: "AI-proof", catC: "var(--green)", parity: 20 },
      { id: "define", name: "Defining the problem independently", desc: "You determine what problem is worth solving and write the structure before any work begins", cat: "Strongly AI-proof", catC: "var(--green)", parity: 8 },
      { id: "challenge", name: "Challenging the brief — reframing what question is worth answering", desc: "Saying: the question you have been asked is not the right question", cat: "Strongly AI-proof", catC: "var(--green)", parity: 5 },
    ],
  },
  deciding: {
    label: "Deciding & Directing",
    cat: "AI-Proof",
    catC: "var(--green)",
    note: "The decision act is what this dimension measures — the judgment call that shapes direction. Consequence ownership is measured separately in Q4.",
    items: [
      { id: "recommend", name: "Recommending options for others to decide", desc: "Structured recommendations or proposals — the decision is made by someone else", cat: "Partially advancing", catC: "var(--gold)", parity: 60 },
      { id: "operational", name: "Making operational decisions within defined parameters", desc: "Day-to-day calls where the criteria are established", cat: "Partially advancing", catC: "var(--gold)", parity: 50 },
      { id: "tradeoff", name: "Trade-off decisions under genuine ambiguity", desc: "Making a call when no framework clearly applies", cat: "AI-proof", catC: "var(--green)", parity: 20 },
      { id: "direction", name: "Setting direction that shapes what others do", desc: "Your call defines the frame within which everyone else works", cat: "Strongly AI-proof", catC: "var(--green)", parity: 10 },
      { id: "consequential", name: "Owning high-stakes, consequential, or irreversible decisions", desc: "Your name is explicitly on the consequence", cat: "Permanently AI-proof", catC: "var(--green)", parity: 5 },
    ],
  },
  executing: {
    label: "Executing & Coordinating",
    cat: "AI-Dominant",
    catC: "var(--red)",
    note: "Highest urgency. First drafts, data processing, and meeting notes are at 88–95% AI parity today.",
    items: [
      { id: "drafts", name: "First drafts — reports, decks, documents, emails", desc: "Generating structured written output from prompts, briefs, or prior content", cat: "Route immediately", catC: "var(--red)", parity: 93 },
      { id: "data", name: "Data processing, cleaning, and formatting", desc: "Structuring and formatting data for reports, dashboards, or presentations", cat: "Route immediately", catC: "var(--red)", parity: 95 },
      { id: "notes", name: "Meeting notes, action tracking, and follow-up", desc: "Transcribing discussions, capturing actions, managing follow-through", cat: "Route immediately", catC: "var(--red)", parity: 90 },
      { id: "reporting", name: "Status updates and structured reporting", desc: "Regular updates, progress reports, and dashboards from underlying data", cat: "Route immediately", catC: "var(--red)", parity: 88 },
      { id: "coordination", name: "Cross-stakeholder coordination and dependency management", desc: "Managing multi-party dependencies, navigating relationship dynamics", cat: "Partially advancing", catC: "var(--gold)", parity: 55 },
      { id: "quality", name: "Quality review and editorial judgment on outputs", desc: "Deciding when a draft meets the required standard", cat: "AI-proof", catC: "var(--green)", parity: 15 },
    ],
  },
};

// ── SCORING ───────────────────────────────────────────────────────────────────
function computeScore(profile: any, qa: any, splits: any) {
  // Work structure score from Q1 split
  const ws = splits.work || {};
  const wTotal = Object.values(ws).reduce((a: number, b: any) => a + b, 0) || 1;
  const aiProof = (((ws.insight || 0) + (ws.framing || 0) + (ws.deciding || 0)) / wTotal) * 100;
  const aiAssist = ((ws.analysis || 0) / wTotal) * 100;
  const aiDom = (((ws.research || 0) + (ws.executing || 0)) / wTotal) * 100;
  const wsScore = Math.min(100, Math.round(aiProof * 1.0 + aiAssist * 0.4));

  // Q2 decision type weighted score
  const q2Core = qa.q2_core || {};
  const q2Splits = qa.q2_splits || {};
  const q2DtW: Record<string, number> = { rule: 0, pattern: 25, tradeoff: 50, context: 75, unique: 100 };
  const q2Keys = Object.keys(q2Core).filter((k) => q2Core[k]);
  const q2Total = q2Keys.reduce((s, k) => s + (parseInt(q2Splits[k]) || 0), 0) || 1;
  const dtScore = q2Keys.length
    ? Math.round(q2Keys.reduce((a, k) => a + ((q2DtW[k] || 0) * (parseInt(q2Splits[k]) || 0)) / q2Total, 0))
    : 50;

  // Reversal cascade score
  const REV_SC: Record<string, number> = { self: 5, team: 20, function: 40, dept: 55, business: 70, org: 85, external: 100 };
  const revLvls = qa.q2_rev_levels || {};
  const revKeys2 = Object.keys(revLvls).filter((k) => revLvls[k]);
  const revScore = revKeys2.length ? Math.max(...revKeys2.map((k) => REV_SC[k] || 0)) : 30;
  const stakesSc: Record<string, number> = { A: 10, B: 30, C: 55, D: 75, E: 100 };
  const stakesScore = stakesSc[qa.q2_stakes] || 30;

  // Q3 framing sub-scores
  const frA = qa.q3a, frB = qa.q3b, frC = qa.q3c;
  const frMap: Record<string, number> = { A: 0, B: 25, C: 50, D: 75, E: 100 };
  const framingScore = Math.round(((frMap[frA] || 0) + (frMap[frB] || 0) + (frMap[frC] || 0)) / 3);

  // Q4 consequence multi-axis
  const cqA = qa.q4a, cqB = qa.q4b;
  const cqMap: Record<string, number> = { A: 0, B: 25, C: 50, D: 75, E: 100 };
  const q4Score = Math.round(((cqMap[cqA] || 0) + (cqMap[cqB] || 0)) / 2);
  const conseqScore = Math.round(q4Score * 0.65 + revScore * 0.2 + stakesScore * 0.15);

  // Q5 impact scope two axes
  const isA = qa.q5a, isB = qa.q5b;
  const isMap: Record<string, number> = { A: 5, B: 22, C: 48, D: 75, E: 100 };
  const impactScore = Math.round((isMap[isA] || 0) * 0.6 + (isMap[isB] || 0) * 0.4);

  // Q6 edge mirror scenarios
  const em1 = qa.q6a, em2 = qa.q6b, em3 = qa.q6c;
  const emMap: Record<string, number> = { A: 0, B: 25, C: 50, D: 75, E: 100 };
  const mirrorScore = Math.round(((emMap[em1] || 0) + (emMap[em2] || 0) + (emMap[em3] || 0)) / 3);

  // Q7 scope shift 6-month
  const ss6Map: Record<string, number> = { A: 10, B: 30, C: 50, D: 70, E: 85, F: 100 };
  const scope6 = ss6Map[qa.q7] || 50;

  // Q8 thinking ownership split
  const th = splits.thinking || {};
  const thTotal = Object.values(th).reduce((a: number, b: any) => a + b, 0) || 1;
  const thinkingScore = Math.round(
    ((th.original || 0) * 100 + (th.adaptive || 0) * 75 + (th.synthetic || 0) * 30 + (th.applied || 0) * 8) / thTotal
  );

  // Q9 depth
  const depthMap: Record<string, number> = { A: 10, B: 35, C: 70, D: 100 };
  const depthScore = depthMap[qa.q9] || 50;

  // Q10 time horizon split
  const hz = splits.horizon || {};
  const hzTotal = Object.values(hz).reduce((a: number, b: any) => a + b, 0) || 1;
  const hzW: Record<string, number> = { daily: 0.92, monthly: 0.72, quarterly: 0.45, annual: 0.18, multiyear: 0.04 };
  const hzComp = Object.keys(hz).reduce((a, k) => a + (hz[k] || 0) * (hzW[k] || 0), 0) / hzTotal;
  const horizonScore = Math.min(100, Math.round((1 - hzComp) * 100));

  const scope24 = scope6;

  // STO split scoring
  const sto = splits.sto || { strategic: 30, tactical: 40, operational: 30 };
  const stoTotal = Object.values(sto).reduce((a: number, b: any) => a + b, 0) || 1;
  const stoScore = Math.round(((sto.strategic || 0) * 100 + (sto.tactical || 0) * 45 + (sto.operational || 0) * 5) / stoTotal);

  // Cross-signal
  const ws2 = splits.work || {};
  const ws2Total = Object.values(ws2).reduce((a: number, b: any) => a + b, 0) || 1;
  const aiProofPct2 = Math.round((((ws2.insight || 0) + (ws2.framing || 0) + (ws2.deciding || 0)) / ws2Total) * 100);
  const stratPct = sto.strategic || 0;
  const crossSignalType =
    stratPct >= 60 && aiProofPct2 >= 50
      ? "aligned"
      : stratPct >= 60 && aiProofPct2 < 40
      ? "hollow"
      : stratPct < 30 && aiProofPct2 >= 60
      ? "underleveraged"
      : "mixed";

  // Primary composite
  const primary = Math.round(
    wsScore * 0.16 +
      dtScore * 0.14 +
      framingScore * 0.12 +
      conseqScore * 0.12 +
      impactScore * 0.09 +
      mirrorScore * 0.1 +
      thinkingScore * 0.08 +
      depthScore * 0.05 +
      horizonScore * 0.04 +
      stoScore * 0.1
  );

  // Trajectory modifier
  const trajMod = Math.round((scope6 + scope24) / 2);
  const final = Math.min(100, Math.max(0, Math.round(primary * 0.9 + trajMod * 0.1)));

  // Experience calibration
  const expMult: Record<string, number> = { e1: 0.9, e2: 0.96, e3: 1.0, e4: 1.04, e5: 1.07 };
  const mgrBoost: Record<string, number> = { never: 0, "1-2": 1, "3-5": 2, "6-10": 3, "10p": 4 };
  const idx = Math.min(100, Math.max(0, Math.round(final * (expMult[profile.experience] || 1.0) + (mgrBoost[profile.mgrYears] || 0))));

  // Cohort
  const level = qa.q11 || "mgr";
  const func = qa.q12 || "hr";
  const cLvl = COHORT.byLevel[level as keyof typeof COHORT.byLevel] || COHORT.byLevel.mgr;
  const cFunc = COHORT.byFunction[func as keyof typeof COHORT.byFunction] || COHORT.byFunction.hr;
  const cohortAvg = Math.round((cLvl.avg + cFunc.avg) / 2);
  const percentile = idx >= 90 ? 96 : idx >= 80 ? 88 : idx >= 70 ? 76 : idx >= 60 ? 61 : idx >= 50 ? 46 : idx >= 40 ? 32 : 20;
  const archetype = ARCHETYPES.find((a) => idx >= a.range[0] && idx <= a.range[1]) || ARCHETYPES[2];
  const band = idx >= 80 ? "acc" : idx >= 60 ? "hold" : "thin";
  const traj = scope6 >= 65 ? "acc" : scope6 >= 38 ? "hold" : "thin";
  const salaryBand =
    idx >= 80 && traj !== "thin"
      ? "strong"
      : idx >= 70 && traj !== "thin"
      ? "strong"
      : idx >= 60 && traj !== "thin"
      ? "moderate"
      : idx >= 50 || traj === "hold"
      ? "sensitive"
      : "pressure";

  // Growth Signal
  const growthSignal = Math.round(scope6 * 0.55 + scope24 * 0.45);
  const growthLabel = growthSignal >= 70 ? "Expanding" : growthSignal >= 50 ? "Holding" : growthSignal >= 30 ? "Thinning" : "Contracting";
  const growthColor = growthSignal >= 70 ? "var(--green)" : growthSignal >= 50 ? "var(--gold)" : growthSignal >= 30 ? "#C09050" : "var(--red)";

  // Brainpower Density
  const bpd = Math.round(aiProof);

  return {
    idx,
    rangeLow: Math.max(0, idx - 3),
    rangeHigh: Math.min(100, idx + 2),
    band,
    traj,
    archetype,
    percentile,
    cohortAvg,
    cLvl,
    cFunc,
    level,
    func,
    salaryBand,
    wsScore,
    dtScore,
    framingScore,
    conseqScore,
    impactScore,
    mirrorScore,
    thinkingScore,
    depthScore,
    horizonScore,
    stoScore,
    scope6,
    scope24,
    growthSignal,
    growthLabel,
    growthColor,
    bpd,
    crossSignalType,
    stratPct,
    aiProofPct: aiProofPct2,
    aiProof: Math.round(aiProof),
    aiAssist: Math.round(aiAssist),
    aiDom: Math.round(aiDom),
    splits,
    profile,
  };
}

// ── WHY TOGGLE ────────────────────────────────────────────────────────────────
function Why({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="why-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "↑ Hide" : "↓ Why this question"}
      </button>
      {open && <div className="why-box">{text}</div>}
    </>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({
  onBack,
  onNext,
  disabled,
  nextLabel = "Continue →",
}: {
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="nav">
      <button className="btn-g" onClick={onBack}>
        ← Back
      </button>
      <button className="btn-p" onClick={onNext} disabled={disabled}>
        {nextLabel}
      </button>
    </div>
  );
}

// ── SHELL ─────────────────────────────────────────────────────────────────────
function Shell({
  progress,
  onBack,
  children,
}: {
  progress: number;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="shell-hd">
        <span className="shell-brand">AI Edge Diagnostic™ — Full Diagnostic</span>
        {onBack && (
          <button className="shell-back" onClick={onBack}>
            ← Back
          </button>
        )}
      </div>
      <div className="prog-track">
        <div className="prog-fill" style={{ width: progress + "%" }} />
      </div>
      <div className="wrap">{children}</div>
    </div>
  );
}

// ── SPLIT INPUT ───────────────────────────────────────────────────────────────
function SplitInput({
  items,
  values,
  onChange,
}: {
  items: { id: string; name: string; desc: string }[];
  values: Record<string, number>;
  onChange: (v: Record<string, number>) => void;
}) {
  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const ok = total === 100;
  return (
    <>
      <div className="split-block">
        {items.map((item) => (
          <div key={item.id} className="split-row">
            <div>
              <div className="sn">{item.name}</div>
              <div className="sd">{item.desc}</div>
            </div>
            <div className="sc2">
              <div style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
                <button
                  onClick={() => onChange({ ...values, [item.id]: Math.max(0, (values[item.id] || 0) - 5) })}
                  disabled={(values[item.id] || 0) === 0}
                  style={{
                    width: 32,
                    height: 40,
                    background: "var(--bg4)",
                    border: "1px solid var(--border2)",
                    borderRight: "none",
                    color: "var(--gold)",
                    fontSize: 18,
                    fontWeight: 300,
                    cursor: "pointer",
                    fontFamily: "IBM Plex Mono,monospace",
                  }}
                >
                  −
                </button>
                <div
                  style={{
                    width: 56,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg3)",
                    border: "1px solid var(--border2)",
                    fontFamily: "IBM Plex Mono,monospace",
                    fontSize: 17,
                    color: "var(--gold)",
                  }}
                >
                  {values[item.id] || 0}
                  <span style={{ fontSize: 11, color: "var(--text4)", marginLeft: 1 }}>%</span>
                </div>
                <button
                  onClick={() => onChange({ ...values, [item.id]: Math.min(100, (values[item.id] || 0) + 5) })}
                  disabled={(values[item.id] || 0) >= 100}
                  style={{
                    width: 32,
                    height: 40,
                    background: "var(--bg4)",
                    border: "1px solid var(--border2)",
                    borderLeft: "none",
                    color: "var(--gold)",
                    fontSize: 18,
                    fontWeight: 300,
                    cursor: "pointer",
                    fontFamily: "IBM Plex Mono,monospace",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="total-row">
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text4)" }}>
            Total allocated
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 14,
              color: ok ? "var(--green)" : total > 100 ? "var(--red)" : "var(--text3)",
            }}
          >
            {total} / 100 {ok ? "✓" : ""}
          </span>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 0 — LANDING
// ─────────────────────────────────────────────────────────────────────────────
function Landing({ onStart }: { onStart: () => void }) {
  return (
    <Shell progress={0}>
      <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
        <div style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 10 }}>
          Axionindex · 2026
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px,8vw,60px)", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>
          The AI Edge
          <span style={{ fontSize: 20, color: "var(--gold)", verticalAlign: "super" }}>™</span>
        </div>
        <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text3)", marginTop: 4 }}>
          Full Diagnostic
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--text2)",
            margin: "14px auto 0",
            maxWidth: 420,
            lineHeight: 1.75,
          }}
        >
          A complete structural audit of how AI affects the work you actually do — your decisions, your thinking, your consequence
          ownership, and the direction your edge is moving.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 0, margin: "10px 0 20px" }}>
        {["Exposure", "Decision Density", "Growth of Boundary", "Economic Anchoring"].map((w, i, a) => (
          <span key={i}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", padding: "0 4px" }}>{w}</span>
            {i < a.length - 1 && (
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>·</span>
            )}
          </span>
        ))}
      </div>

      <div className="divider" />

      <div
        style={{
          background: "#1C1A16",
          border: "1px solid var(--gold-dim)",
          borderLeft: "3px solid var(--gold)",
          padding: "16px 18px",
          marginBottom: 3,
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>
          A note before you begin
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--text)", marginBottom: 10, lineHeight: 1.5 }}>
          Some questions will feel familiar if you have completed the Quick Mirror. That is intentional.
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.75 }}>
          The Quick Mirror asked where your time goes across five broad options. The Full Diagnostic asks you to split it precisely across
          all six work dimensions. The Quick Mirror asked whether your decisions are rule-based or judgment-based. The Full Diagnostic asks
          you to map frequency, stakes, reversibility, and consequence ownership of those decisions separately.
          <br /><br />
          Same territory. Significantly more resolution. The additional precision is what makes the cohort comparison, salary defensibility
          assessment, and 90-day action plan specific to you — rather than indicative.
          <br /><br />
          <strong style={{ color: "var(--text2)", fontWeight: 500 }}>
            Treat each question as if you are answering it for the first time.
          </strong>
        </div>
      </div>

      <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "16px 18px", marginTop: 3, marginBottom: 3 }}>
        <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text4)", fontWeight: 700, marginBottom: 12 }}>
          What the Full Diagnostic produces
        </div>
        {[
          { a: "Full profile build", b: "7 profile inputs that calibrate your cohort comparison and salary defensibility" },
          { a: "13 diagnostic questions", b: "More granular and multi-dimensional than the Quick Mirror version of the same dimensions" },
          { a: "18-section report", b: "Archetype, full index breakdown, cohort comparison, salary defensibility, 9-dimension dashboard, three structural moves, 90-day plan" },
          { a: "Downloadable PDF", b: "Private. Not shared with your employer or any third party. Yours to keep." },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--gold)", flexShrink: 0, paddingTop: 2 }}>→</span>
            <div>
              <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{r.a}</span>
              <span style={{ fontSize: 12, color: "var(--text3)" }}> — {r.b}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", padding: "10px 13px", marginTop: 3, fontSize: 11, color: "var(--text4)", lineHeight: 1.6 }}>
        Answer every question based on your actual work over the past month — not your job description, not your best week, not your aspirations.
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["13 questions", "13–16 minutes", "₹400", "Private PDF report"].map((p) => (
            <span key={p} style={{ fontSize: 10, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", padding: "3px 10px" }}>
              {p}
            </span>
          ))}
        </div>
        <button className="btn-p" onClick={onStart}>
          Begin →
        </button>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function ProfileScreen({
  profile,
  onChange,
  onNext,
  onBack,
}: {
  profile: any;
  onChange: (p: any) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const ok = profile.mandate && profile.experience && profile.mgrYears && profile.orgSize;
  return (
    <Shell progress={5} onBack={onBack}>
      <div className="eyebrow">Your profile — 7 inputs</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px,3vw,22px)", marginBottom: 6, lineHeight: 1.3 }}>Before the diagnostic begins.</div>
      <div style={{ fontSize: 12, color: "var(--text4)", padding: "8px 12px", background: "var(--bg2)", borderLeft: "2px solid var(--border)", marginBottom: 24, lineHeight: 1.6 }}>
        These inputs calibrate your cohort comparison, salary defensibility assessment, and domain-specific recommendations. They do not directly determine your AI Edge Index™.
      </div>

      {/* Role mandate */}
      <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>1 — Primary mandate</div>
      <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontStyle: "italic" }}>The core outcome your role exists to enable — not your title.</div>
      <div className="profile-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {[
          { id: "decisions", t: "Support business decisions", s: "Analysis, recommendations, or expertise that helps others decide" },
          { id: "process", t: "Run operations and execution", s: "Keep workflows, delivery, or day-to-day execution running" },
          { id: "code", t: "Build product, technology, or systems", s: "Create or improve products, platforms, or technical systems" },
          { id: "revenue", t: "Drive commercial outcomes", s: "Generate revenue, growth, partnerships, or customer expansion" },
          { id: "strategy", t: "Shape strategy and direction", s: "Define priorities, choices, or problems worth solving" },
          { id: "people", t: "Build people and capability", s: "Strengthen teams, talent, leadership, or org effectiveness" },
          { id: "governance", t: "Provide governance, risk, or control", s: "Ensure compliance, risk management, or financial discipline" },
          { id: "client", t: "Serve customers or clients directly", s: "Solve customer problems or deliver client outcomes" },
        ].map((o) => (
          <div
            key={o.id}
            onClick={() => onChange({ ...profile, mandate: o.id })}
            style={{
              background: profile.mandate === o.id ? "var(--gold-bg)" : "var(--bg3)",
              border: `1px solid ${profile.mandate === o.id ? "var(--gold)" : "var(--border)"}`,
              padding: "10px 13px",
              cursor: "pointer",
              transition: "all .14s",
            }}
          >
            <div style={{ fontSize: 13, color: profile.mandate === o.id ? "var(--text)" : "var(--text2)", marginBottom: 2 }}>{o.t}</div>
            <div style={{ fontSize: 10, color: "var(--text4)", lineHeight: 1.3 }}>{o.s}</div>
          </div>
        ))}
      </div>

      <div className="divider" />

      {/* Experience + Managing */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
        {[
          { key: "experience", lbl: "2 — Years of experience", opts: ["0–5", "6–10", "11–15", "16–20", "20+"], vals: ["e1", "e2", "e3", "e4", "e5"] },
          { key: "mgrYears", lbl: "3 — Years managing people", opts: ["Never", "1–2", "3–5", "6–10", "10+"], vals: ["never", "1-2", "3-5", "6-10", "10p"] },
        ].map((c) => (
          <div key={c.key} style={{ flex: 1, minWidth: 140 }}>
            <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 7 }}>{c.lbl}</div>
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {c.opts.map((o, i) => (
                <div
                  key={i}
                  onClick={() => onChange({ ...profile, [c.key]: c.vals[i] })}
                  style={{
                    fontSize: 11,
                    padding: "5px 11px",
                    border: `1px solid ${profile[c.key] === c.vals[i] ? "var(--gold)" : "var(--border)"}`,
                    background: profile[c.key] === c.vals[i] ? "#1C1A16" : "var(--bg)",
                    cursor: "pointer",
                    color: profile[c.key] === c.vals[i] ? "var(--gold)" : "var(--text3)",
                    transition: "all .14s",
                  }}
                >
                  {o}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Org size */}
      <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>4 — Organisation size</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 16 }}>
        {[
          { v: "startup", t: "Startup", s: "<100 people" },
          { v: "mid", t: "Mid-size", s: "100–1,000" },
          { v: "large", t: "Large", s: "1,000–10,000" },
          { v: "corp", t: "Enterprise", s: "10,000+" },
        ].map((o) => (
          <div
            key={o.v}
            onClick={() => onChange({ ...profile, orgSize: o.v })}
            style={{
              background: profile.orgSize === o.v ? "var(--gold-bg)" : "var(--bg3)",
              border: `1px solid ${profile.orgSize === o.v ? "var(--gold)" : "var(--border)"}`,
              padding: "9px 13px",
              cursor: "pointer",
              transition: "all .14s",
            }}
          >
            <div style={{ fontSize: 13, color: profile.orgSize === o.v ? "var(--text)" : "var(--text2)", marginBottom: 2 }}>{o.t}</div>
            <div style={{ fontSize: 10, color: "var(--text4)" }}>{o.s}</div>
          </div>
        ))}
      </div>

      {/* Industry */}
      <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>5 — Industry</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 16 }}>
        {[
          { v: "tech", t: "Technology & software" },
          { v: "finance", t: "Financial services" },
          { v: "consulting", t: "Consulting & advisory" },
          { v: "fmcg", t: "FMCG & consumer" },
          { v: "healthcare", t: "Healthcare & pharma" },
          { v: "media", t: "Media & entertainment" },
          { v: "manufacturing", t: "Manufacturing & industry" },
          { v: "govt", t: "Government & public sector" },
          { v: "education", t: "Education" },
          { v: "other", t: "Other" },
        ].map((o) => (
          <div
            key={o.v}
            onClick={() => onChange({ ...profile, industry: o.v })}
            style={{
              background: profile.industry === o.v ? "var(--gold-bg)" : "var(--bg3)",
              border: `1px solid ${profile.industry === o.v ? "var(--gold)" : "var(--border)"}`,
              padding: "8px 12px",
              cursor: "pointer",
              transition: "all .14s",
              fontSize: 12,
              color: profile.industry === o.v ? "var(--text)" : "var(--text2)",
            }}
          >
            {o.t}
          </div>
        ))}
      </div>

      {/* Country */}
      <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>6 — Country of work</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 16 }}>
        {["India", "United States", "United Kingdom", "UAE", "Singapore", "Germany", "Australia", "Other"].map((c) => (
          <div
            key={c}
            onClick={() => onChange({ ...profile, country: c })}
            style={{
              background: profile.country === c ? "var(--gold-bg)" : "var(--bg3)",
              border: `1px solid ${profile.country === c ? "var(--gold)" : "var(--border)"}`,
              padding: "8px 12px",
              cursor: "pointer",
              transition: "all .14s",
              fontSize: 12,
              color: profile.country === c ? "var(--text)" : "var(--text2)",
            }}
          >
            {c}
          </div>
        ))}
      </div>

      {/* Role title */}
      <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>
        7 — Role title <span style={{ color: "var(--text4)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 10 }}>(optional — does not affect scoring)</span>
      </div>
      <input
        value={profile.roleTitle || ""}
        onChange={(e) => onChange({ ...profile, roleTitle: e.target.value })}
        placeholder="e.g. Director of Strategy, CHRO, Senior Product Manager"
        className="pf-input"
        style={{ width: "100%", marginBottom: 4 }}
      />
      <div style={{ fontSize: 10, color: "var(--text4)", marginBottom: 20 }}>Your title has zero effect on your AI Edge Index™. It is used only to personalise language in your report.</div>

      <Nav onBack={onBack} onNext={onNext} disabled={!ok} nextLabel="Begin diagnostic →" />
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Q1 — Work Structure Split
// ─────────────────────────────────────────────────────────────────────────────
function Q1({
  splits,
  onChange,
  onNext,
  onBack,
}: {
  splits: any;
  onChange: (s: any) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<string>("dim");
  const vals = splits.work || { research: 20, analysis: 20, insight: 15, framing: 15, deciding: 15, executing: 15 };
  const subVals = splits.workSub || {};
  const total = Object.values(vals).reduce((a: number, b: any) => a + b, 0);
  const dimOk = total === 100;

  const dimOrder = ["research", "analysis", "insight", "framing", "deciding", "executing"];
  const subNeeded = dimOk ? dimOrder.filter((k) => (vals[k] || 0) > 10) : [];

  const allSubDone = subNeeded.every((k) => {
    const sv = subVals[k] || {};
    const st = Object.values(sv).reduce((a: number, b: any) => a + b, 0);
    return st === 100;
  });

  const dimItems = [
    { id: "research", name: "Research", desc: "Scanning, gathering, and pulling information and context — before analysis begins", cat: "AI-Dominant", catC: "var(--red)" },
    { id: "analysis", name: "Analysis", desc: "Examining information to identify patterns, diagnose problems, and evaluate options", cat: "AI-Assisted", catC: "var(--gold)" },
    { id: "insight", name: "Insight Generation", desc: "Interpreting what patterns mean — forming conclusions that change what is decided", cat: "AI-Proof", catC: "var(--green)" },
    { id: "framing", name: "Framing", desc: "Defining the problem and setting scope before any work begins", cat: "AI-Proof", catC: "var(--green)" },
    { id: "deciding", name: "Deciding & Directing", desc: "Making or proposing calls that determine direction", cat: "AI-Proof", catC: "var(--green)" },
    { id: "executing", name: "Executing & Coordinating", desc: "Producing outputs, coordinating delivery, and ensuring work gets done", cat: "AI-Dominant", catC: "var(--red)" },
  ];

  // Sub-phase
  if (phase !== "dim") {
    const sub = SUB_ACTIVITIES[phase];
    const sv = subVals[phase] || {};
    const st = Object.values(sv).reduce((a: number, b: any) => a + b, 0);
    const subOk = st === 100;
    const idx = subNeeded.indexOf(phase);
    const nextPhase = idx < subNeeded.length - 1 ? subNeeded[idx + 1] : "done";
    const progress = 10 + Math.round(((idx + 1) / subNeeded.length) * 5);

    return (
      <Shell
        progress={progress}
        onBack={() => {
          if (idx === 0) setPhase("dim");
          else setPhase(subNeeded[idx - 1]);
        }}
      >
        <div className="q-hdr">
          <span className="q-act" style={{ color: sub.catC }}>{sub.label} — Sub-activity breakdown</span>
          <span className="q-sep">·</span>
          <span className="q-num">{idx + 1} of {subNeeded.length} dimensions</span>
        </div>
        <div className="q-q">Within {sub.label}, how does your time distribute across these specific activities?</div>
        <div className="q-nudge">You allocated {vals[phase] || 0}% of your total work time to {sub.label}. Now split that 100% across the specific activities within it — based on last month.</div>
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderLeft: `3px solid ${sub.catC}`, padding: "9px 12px", marginBottom: 14, fontSize: 11, color: "var(--text3)", lineHeight: 1.55 }}>{sub.note}</div>

        <div className="split-block">
          {sub.items.map((item, i) => {
            const v = parseInt(String(sv[item.id] || 0));
            return (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", padding: "10px 13px", borderBottom: i < sub.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "var(--text4)", lineHeight: 1.3, marginBottom: 4 }}>{item.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 9, padding: "1px 7px", border: `1px solid ${item.catC}`, color: item.catC, borderRadius: 10 }}>{item.cat}</span>
                    <span style={{ fontSize: 9, color: "var(--text4)" }}>AI parity: <span style={{ fontFamily: "var(--mono)", color: item.parity >= 75 ? "var(--red)" : item.parity >= 40 ? "var(--gold)" : "var(--green)" }}>{item.parity}%</span></span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <button
                    onClick={() => { const nv = { ...sv, [item.id]: Math.max(0, v - 5) }; onChange({ ...splits, workSub: { ...subVals, [phase]: nv } }); }}
                    style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderRight: "none", color: item.catC || "var(--gold)", fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
                  >−</button>
                  <div style={{ width: 52, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg3)", border: "1px solid var(--border2)", fontFamily: "'IBM Plex Mono',monospace", fontSize: 15, color: item.catC || "var(--gold)" }}>{v}<span style={{ fontSize: 10, color: "var(--text4)", marginLeft: 1 }}>%</span></div>
                  <button
                    onClick={() => { const nv = { ...sv, [item.id]: Math.min(100, v + 5) }; onChange({ ...splits, workSub: { ...subVals, [phase]: nv } }); }}
                    style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderLeft: "none", color: item.catC || "var(--gold)", fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
                  >+</button>
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px", borderTop: "1px solid var(--border)", fontSize: 11 }}>
            <span style={{ color: "var(--text4)", textTransform: "uppercase", letterSpacing: ".06em", fontSize: 10 }}>Total allocated</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: st === 100 ? "var(--green)" : st > 100 ? "var(--red)" : "var(--text3)" }}>{st} / 100 {st === 100 ? "✓" : ""}</span>
          </div>
        </div>

        <div className="nav">
          <button className="btn-g" onClick={() => idx === 0 ? setPhase("dim") : setPhase(subNeeded[idx - 1])}>← Back</button>
          <button
            className="btn-p"
            onClick={() => {
              if (nextPhase === "done") onNext();
              else setPhase(nextPhase);
            }}
            disabled={!subOk}
          >
            {nextPhase === "done" ? "Continue →" : `Next: ${SUB_ACTIVITIES[nextPhase]?.label} →`}
          </button>
        </div>
      </Shell>
    );
  }

  // Dimension-level split
  return (
    <Shell progress={10} onBack={onBack}>
      <div className="q-hdr"><span className="q-act">Work Structure — Part 1 of 2</span><span className="q-sep">·</span><span className="q-num">Q1 of 13</span></div>
      <div className="q-q">Across the six work dimensions, how does your time actually distribute?</div>
      <div className="q-nudge">Base this on the past month — not your job description. Allocate 100% across all six.</div>
      <div className="q-scope">Research, Analysis, and Executing are where AI is most active. Insight Generation, Framing, and Deciding & Directing are where structural edge sits.</div>

      <div className="split-block">
        {dimItems.map((item, i) => {
          const v = vals[item.id] || 0;
          return (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", padding: "11px 13px", borderBottom: i < dimItems.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 2, fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: "var(--text4)", lineHeight: 1.3, marginBottom: 3 }}>{item.desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 9, padding: "1px 7px", border: `1px solid ${item.catC}`, color: item.catC, borderRadius: 10, opacity: 0.8 }}>{item.cat}</span>
                  {v > 10 && <span style={{ fontSize: 9, color: "var(--text4)", fontStyle: "italic" }}>↓ Sub-activities will be asked</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <button
                  onClick={() => onChange({ ...splits, work: { ...vals, [item.id]: Math.max(0, v - 5) } })}
                  style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderRight: "none", color: item.catC || "var(--gold)", fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
                >−</button>
                <div style={{ width: 52, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg3)", border: "1px solid var(--border2)", fontFamily: "'IBM Plex Mono',monospace", fontSize: 15, color: item.catC || "var(--gold)" }}>{v}<span style={{ fontSize: 10, color: "var(--text4)", marginLeft: 1 }}>%</span></div>
                <button
                  onClick={() => onChange({ ...splits, work: { ...vals, [item.id]: Math.min(100, v + 5) } })}
                  style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderLeft: "none", color: item.catC || "var(--gold)", fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}
                >+</button>
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px", borderTop: "1px solid var(--border)", fontSize: 11 }}>
          <span style={{ color: "var(--text4)", textTransform: "uppercase", letterSpacing: ".06em", fontSize: 10 }}>Total allocated</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: total === 100 ? "var(--green)" : total > 100 ? "var(--red)" : "var(--text3)" }}>{total} / 100 {total === 100 ? "✓" : ""}</span>
        </div>
      </div>

      {dimOk && (
        <>
          <div className="confirm">
            AI-proof: {Math.round((vals.insight || 0) + (vals.framing || 0) + (vals.deciding || 0))}% ·
            AI-assisted: {vals.analysis || 0}% ·
            AI-dominant: {Math.round((vals.research || 0) + (vals.executing || 0))}%
          </div>
          {subNeeded.length > 0 && (
            <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderLeft: "2px solid var(--gold)", padding: "9px 12px", marginTop: 4, fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text)" }}>Next: </strong> Sub-activity breakdown for {subNeeded.map((k) => SUB_ACTIVITIES[k].label).join(", ")} — the dimensions you allocated more than 10% to.
            </div>
          )}
        </>
      )}

      <Why text="Work type is the primary structural signal. The split you enter here drives the most important calculation in your report — and unlike the Quick Mirror, the Full Diagnostic then goes inside each significant dimension to identify which specific activities within it are already compressible and which remain protected." />

      <div className="nav">
        <button className="btn-g" onClick={onBack}>← Back</button>
        <button
          className="btn-p"
          onClick={() => {
            if (subNeeded.length > 0) setPhase(subNeeded[0]);
            else onNext();
          }}
          disabled={!dimOk}
        >
          {subNeeded.length > 0 ? `Next: ${SUB_ACTIVITIES[subNeeded[0]].label} sub-activities →` : "Continue →"}
        </button>
      </div>
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP — Simplified screen-based routing
// ─────────────────────────────────────────────────────────────────────────────
const DEF_PROFILE = { mandate: null, experience: "e3", mgrYears: "never", orgSize: null, industry: null, country: null, roleTitle: "" };
const DEF_SPLITS = {
  work: { research: 20, analysis: 20, insight: 15, framing: 15, deciding: 15, executing: 15 },
  workSub: {},
  thinking: { original: 20, adaptive: 30, synthetic: 30, applied: 20 },
  horizon: { daily: 30, monthly: 25, quarterly: 25, annual: 15, multiyear: 5 },
  sto: { strategic: 30, tactical: 40, operational: 30 },
};

const SCREENS = ["landing", "profile", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "results"];

export default function FullDiagnosticPage() {
  const [S, setS] = useState("landing");
  const [profile, setProfile] = useState<any>(DEF_PROFILE);
  const [qa, setQa] = useState<any>({});
  const [splits, setSplits] = useState<any>(DEF_SPLITS);
  const [sc, setSc] = useState<any>(null);
  const [jspdfLoaded, setJspdfLoaded] = useState(false);

  useEffect(() => {
    let st: HTMLStyleElement | null = document.querySelector("style[data-fd2]");
    if (!st) {
      st = document.createElement("style");
      st.setAttribute("data-fd2", "1");
      document.head.appendChild(st);
    }
    st.textContent = CSS;
    return () => {
      if (st && st.parentNode) {
        st.parentNode.removeChild(st);
      }
    };
  }, []);

  const go = useCallback((s: string) => {
    setS(s);
    window.scrollTo(0, 0);
  }, []);

  const idx = SCREENS.indexOf(S);
  const prev = useCallback(() => go(SCREENS[Math.max(0, idx - 1)]), [go, idx]);
  const next = useCallback(() => go(SCREENS[Math.min(SCREENS.length - 1, idx + 1)]), [go, idx]);

  const finish = useCallback(() => {
    const enrichedSplits = { ...splits, qa };
    setSc(computeScore(profile, qa, enrichedSplits));
    go("results");
  }, [profile, qa, splits, go]);

  // Landing
  if (S === "landing") return <Landing onStart={() => go("profile")} />;

  // Profile
  if (S === "profile") return <ProfileScreen profile={profile} onChange={setProfile} onNext={next} onBack={() => go("landing")} />;

  // Q1 - Work Structure
  if (S === "q1") return <Q1 splits={splits} onChange={setSplits} onNext={next} onBack={prev} />;

  // Q2 - Decision Architecture
  if (S === "q2") {
    const DT_OPTS = [
      { id: "rule", t: "Rule-based", s: "Apply established process, policy, or precedent", sig: "Highest compression", cls: "compress" },
      { id: "pattern", t: "Pattern-based", s: "Rules exist but I interpret which one applies", sig: "Moderate compression", cls: "compress" },
      { id: "tradeoff", t: "Trade-off", s: "Weigh competing priorities within known constraints", sig: "Moderate protection", cls: "neutral" },
      { id: "context", t: "Context-specific", s: "Fresh judgment required each time", sig: "Strong edge signal", cls: "edge" },
      { id: "unique", t: "Unique and direction-setting", s: "No precedent — I own the call and what follows", sig: "Strongest edge signal", cls: "edge" },
    ];
    const coreTypes = qa.q2_core || {};
    const typeSplits = qa.q2_splits || {};
    const stakes = qa.q2_stakes || null;
    const revLevels = qa.q2_rev_levels || {};
    const coreKeys = Object.keys(coreTypes).filter((k) => coreTypes[k]);
    const anyCore = coreKeys.length > 0;
    const splitTotal = coreKeys.reduce((s, k) => s + (parseInt(typeSplits[k]) || 0), 0);
    const splitOk = anyCore && splitTotal === 100;
    const allDone = splitOk && stakes && Object.values(revLevels).some(Boolean);

    return (
      <Shell progress={18} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Decision Architecture</span><span className="q-sep">·</span><span className="q-num">Q2 of 13</span></div>
        <div className="q-q">Three questions about the decisions that define your role.</div>
        <div className="q-nudge">Decision architecture is scored across three dimensions: the type of judgment required, the impact when things go wrong, and the cascade of consequences if a decision has to be reversed.</div>

        <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>Part 1 — Which decision types are core to your role?</div>
        <div style={{ fontSize: 11, color: "var(--text4)", fontStyle: "italic", marginBottom: 10, lineHeight: 1.5 }}>Select only the types that genuinely define your working week.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 12 }}>
          {DT_OPTS.map((o) => {
            const sel = !!coreTypes[o.id];
            return (
              <div
                key={o.id}
                onClick={() => setQa({ ...qa, q2_core: { ...coreTypes, [o.id]: !sel }, q2_splits: { ...typeSplits, [o.id]: sel ? undefined : typeSplits[o.id] } })}
                style={{ background: sel ? "var(--gold-bg)" : "var(--bg3)", border: `1px solid ${sel ? "var(--gold)" : "var(--border)"}`, padding: "11px 14px", cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start", transition: "all .14s" }}
              >
                <div style={{ width: 16, height: 16, borderRadius: 2, border: `2px solid ${sel ? "var(--gold)" : "var(--border2)"}`, background: sel ? "var(--gold)" : "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all .14s" }}>
                  {sel && <span style={{ fontSize: 9, fontWeight: 700, color: "var(--bg)" }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: sel ? "var(--text)" : "var(--text2)", marginBottom: 2 }}>{o.t}</div>
                  <div style={{ fontSize: 11, color: "var(--text4)", marginBottom: 3, lineHeight: 1.4 }}>{o.s}</div>
                  <div style={{ fontSize: 10, color: sel ? ({ compress: "var(--red)", neutral: "var(--gold)", edge: "var(--green)" }[o.cls] || "var(--text4)") : "var(--text4)", letterSpacing: ".06em" }}>{o.sig}</div>
                </div>
              </div>
            );
          })}
        </div>

        {anyCore && (
          <>
            <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />
            <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>Part 2 — Allocate 100% across your core decision types</div>
            <div style={{ border: "1px solid var(--border)", background: "var(--bg3)" }}>
              {coreKeys.map((k, i) => {
                const opt = DT_OPTS.find((o) => o.id === k);
                const v = parseInt(typeSplits[k]) || 0;
                const c = { compress: "var(--red)", neutral: "var(--gold)", edge: "var(--green)" }[opt?.cls || ""] || "var(--gold)";
                return (
                  <div key={k} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", padding: "10px 13px", borderBottom: i < coreKeys.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 1 }}>{opt?.t}</div>
                      <div style={{ fontSize: 10, color: c, letterSpacing: ".04em" }}>{opt?.sig}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                      <button onClick={() => setQa({ ...qa, q2_splits: { ...typeSplits, [k]: Math.max(0, v - 5) } })} style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderRight: "none", color: c, fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}>−</button>
                      <div style={{ width: 52, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg3)", border: "1px solid var(--border2)", fontFamily: "'IBM Plex Mono',monospace", fontSize: 15, color: c }}>{v}<span style={{ fontSize: 10, color: "var(--text4)", marginLeft: 1 }}>%</span></div>
                      <button onClick={() => setQa({ ...qa, q2_splits: { ...typeSplits, [k]: Math.min(100, v + 5) } })} style={{ width: 30, height: 38, background: "var(--bg4)", border: "1px solid var(--border2)", borderLeft: "none", color: c, fontSize: 17, cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace" }}>+</button>
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 13px", borderTop: "1px solid var(--border)", fontSize: 11 }}>
                <span style={{ color: "var(--text4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Total allocated</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: splitTotal === 100 ? "var(--green)" : splitTotal > 100 ? "var(--red)" : "var(--text3)" }}>{splitTotal} / 100 {splitTotal === 100 ? "✓" : ""}</span>
              </div>
            </div>
          </>
        )}

        {splitOk && (
          <>
            <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
            <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>Part 3 — When your most strategic decisions go wrong</div>

            <div className="sub-q" style={{ marginBottom: 3 }}>
              <div className="sub-q-lbl">Impact when wrong — how severe is the consequence?</div>
              <div className="sub-opts">
                {[
                  { v: "A", t: "Contained — the impact stays manageable and recovery is straightforward" },
                  { v: "B", t: "Moderate — meaningful rework, cost, or missed opportunity but recoverable" },
                  { v: "C", t: "Significant — material impact on outcomes, timelines, or resources" },
                  { v: "D", t: "Substantial — affects business direction, relationships, or structural priorities" },
                  { v: "E", t: "Critical — organisation-wide, reputational, financial, or irreversible" },
                ].map((o) => (
                  <div key={o.v} className={`sub-opt ${stakes === o.v ? "sel" : ""}`} onClick={() => setQa({ ...qa, q2_stakes: o.v })}>{o.t}</div>
                ))}
              </div>
            </div>

            <div className="sub-q" style={{ marginTop: 3 }}>
              <div className="sub-q-lbl">Reversal cascade — if a decision had to be reversed</div>
              <div className="sub-q-text">Select every level where the implications of reversing your most strategic decision would be felt.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 6 }}>
                {[
                  { id: "self", l: "Self", s: "Consequences are contained to my own work and output" },
                  { id: "team", l: "Immediate team", s: "Affects 2–5 colleagues in my direct team" },
                  { id: "function", l: "Function", s: "Affects my broader function or vertical (10–50 people)" },
                  { id: "dept", l: "Department", s: "Affects a whole department or business unit" },
                  { id: "business", l: "Business", s: "Affects significant business operations or strategy" },
                  { id: "org", l: "Organisation", s: "Affects the whole organisation — structural or reputational" },
                  { id: "external", l: "External", s: "Affects clients, customers, partners, or the market" },
                ].map((r) => {
                  const sel = !!revLevels[r.id];
                  return (
                    <div
                      key={r.id}
                      onClick={() => setQa({ ...qa, q2_rev_levels: { ...revLevels, [r.id]: !sel } })}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: sel ? "var(--gold-bg)" : "var(--bg3)", border: `1px solid ${sel ? "var(--gold)" : "var(--border)"}`, cursor: "pointer", transition: "all .14s" }}
                    >
                      <div style={{ width: 15, height: 15, borderRadius: 2, border: `2px solid ${sel ? "var(--gold)" : "var(--border2)"}`, background: sel ? "var(--gold)" : "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, fontWeight: 700, color: "var(--bg)", transition: "all .14s" }}>{sel ? "✓" : ""}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: sel ? "var(--text)" : "var(--text2)", marginBottom: 1 }}>{r.l}</div>
                        <div style={{ fontSize: 10, color: "var(--text4)", lineHeight: 1.3 }}>{r.s}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <Why text="The three-part design isolates what the original single question collapsed together. Part 1 identifies what is genuinely core. Part 2 forces a precise allocation. Part 3 maps the actual consequence architecture: impact magnitude and reversal cascade together tell you how structurally consequential your decisions actually are." />
        <Nav onBack={prev} onNext={next} disabled={!allDone} />
      </Shell>
    );
  }

  // Q3 - Problem Framing (3 sub-questions)
  if (S === "q3") {
    const opts3 = ["A", "B", "C", "D", "E"];
    const qs = [
      { key: "q3a", lbl: "Who initiates the problem?", opts: ["The problem arrives fully defined from above — I receive a clear brief", "The problem is partially defined — I refine scope within a given frame", "The problem is indicated — I am expected to identify and frame it from a broader signal", "I identify problems proactively — before anyone has asked me to", "I define which problems are worth solving for the organisation"] },
      { key: "q3b", lbl: "Who structures the work?", opts: ["The work structure is given to me — I execute within it", "I refine a given structure — adjusting within broad parameters set by others", "I co-design the structure with others — a genuine collaboration", "I design the structure — others execute within what I set", "I set the overall architecture and ask others to design within it"] },
      { key: "q3c", lbl: "Who defines what success looks like?", opts: ["Success criteria are defined by others — I meet a given standard", "Success criteria are largely given — I interpret edge cases", "I contribute to defining success criteria — in collaboration with others", "I set the success criteria — others work to meet them", "I determine what the organisation should measure success against"] },
    ];
    const allAnswered = qs.every((q) => qa[q.key]);
    return (
      <Shell progress={24} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Problem Framing</span><span className="q-sep">·</span><span className="q-num">Q3 of 13</span></div>
        <div className="q-q">How does your role relate to problem definition — before the work begins?</div>
        <div className="q-nudge">Three separate questions about the framing layer of your work. Answer each based on the past month.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {qs.map((q) => (
            <div key={q.key} className="sub-q">
              <div className="sub-q-lbl">{q.lbl}</div>
              <div className="sub-opts">
                {q.opts.map((t, i) => (
                  <div key={i} className={`sub-opt ${qa[q.key] === opts3[i] ? "sel" : ""}`} onClick={() => setQa({ ...qa, [q.key]: opts3[i] })}>{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Why text="Problem framing is the most upstream act in any professional role — and the one AI cannot perform without a human to close the accountability loop. The three sub-questions separate framing into initiation, structure, and success criteria — each a distinct layer of the framing act." />
        <Nav onBack={prev} onNext={next} disabled={!allAnswered} />
      </Shell>
    );
  }

  // Q4 - Consequence (2 axes)
  if (S === "q4") {
    const opts5 = ["A", "B", "C", "D", "E"];
    const breadthOpts = ["Only myself — the consequence stays within my own work", "My immediate team — 2–5 people", "My department or function — up to 50 people", "The whole business or organisation", "External — clients, customers, partners, or the market"];
    const attrOpts = ["Not attributed to me — the consequence sits elsewhere", "Indirectly attributed — I contributed, but others carry the named accountability", "Collective ownership — shared across a group, I am one of many", "Collective ownership, but directly attributable to me — the group owns it, but my role is clearly identified", "Exclusively attributed — my name is on it, the consequence is mine alone"];
    const allAnswered = qa.q4a && qa.q4b;
    return (
      <Shell progress={31} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Consequence Architecture</span><span className="q-sep">·</span><span className="q-num">Q4 of 13</span></div>
        <div className="q-q">When the decisions you influence go wrong — who feels it, and who owns it?</div>
        <div className="q-nudge">Two dimensions of consequence. Answer based on your typical experience.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div className="sub-q">
            <div className="sub-q-lbl">Breadth — who feels it?</div>
            <div className="sub-q-text">When your decisions go wrong, how many people or teams are typically affected?</div>
            <div className="sub-opts">
              {breadthOpts.map((t, i) => (
                <div key={i} className={`sub-opt ${qa.q4a === opts5[i] ? "sel" : ""}`} onClick={() => setQa({ ...qa, q4a: opts5[i] })}>{t}</div>
              ))}
            </div>
          </div>
          <div className="sub-q">
            <div className="sub-q-lbl">Attribution — how is ownership held?</div>
            <div className="sub-q-text">When outcomes go wrong, how is the accountability structured?</div>
            <div className="sub-opts">
              {attrOpts.map((t, i) => (
                <div key={i} className={`sub-opt ${qa.q4b === opts5[i] ? "sel" : ""}`} onClick={() => setQa({ ...qa, q4b: opts5[i] })}>{t}</div>
              ))}
            </div>
          </div>
        </div>
        <Why text="AI cannot carry consequence. Roles where a named human must own the outcome retain a structural premium no capability improvement can eliminate. Breadth captures how far the impact travels. Attribution captures whether your name is in the frame." />
        <Nav onBack={prev} onNext={next} disabled={!allAnswered} />
      </Shell>
    );
  }

  // Q5 - Impact Scope (2 axes)
  if (S === "q5") {
    const scaleOpts5 = ["A", "B", "C", "D", "E"];
    const axes = [
      { key: "q5a", lbl: "Reach — who feels the impact?", opts: ["My own immediate work — no downstream consequence beyond myself", "My immediate team — colleagues in my team depend on my contribution", "My department or function — multiple teams rely on my work", "The whole business or organisation — my work shapes broader decisions", "External — clients, customers, partners, or the market depend on it"] },
      { key: "q5b", lbl: "Depth — how materially does your work affect them?", opts: ["Marginally — my work is one of many inputs, easily substitutable", "Noticeably — my contribution meaningfully shapes the output", "Significantly — the quality of what others do depends on what I produce", "Critically — without my specific contribution, the work would stall or fail", "Definitively — I set the direction that shapes everything that follows"] },
    ];
    const allAnswered = axes.every((a) => qa[a.key]);
    return (
      <Shell progress={38} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Impact Architecture</span><span className="q-sep">·</span><span className="q-num">Q5 of 13</span></div>
        <div className="q-q">When your work or decisions have an impact — who feels it, and how materially?</div>
        <div className="q-nudge">Two separate questions: the reach of your contribution, and its depth.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {axes.map((a) => (
            <div key={a.key} className="sub-q">
              <div className="sub-q-lbl">{a.lbl}</div>
              <div className="sub-opts">
                {a.opts.map((t, i) => (
                  <div key={i} className={`sub-opt ${qa[a.key] === scaleOpts5[i] ? "sel" : ""}`} onClick={() => setQa({ ...qa, [a.key]: scaleOpts5[i] })}>{t}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Why text="Impact scope is the Economic Anchoring dimension of E.D.G.E. — how far your contribution travels. Depth adds the second dimension: wide reach with shallow depth is structurally weaker than narrow reach with deep, critical dependency." />
        <Nav onBack={prev} onNext={next} disabled={!allAnswered} />
      </Shell>
    );
  }

  // Q6 - Edge Mirror (3 scenarios)
  if (S === "q6") {
    const scenarios = [
      { key: "q6a", title: "The output replacement scenario", q: "If AI generated all the structured output in your role for the next six months — the research, first drafts, reports, data models, and analysis — what would happen to your contribution?", nudge: "Answer based on last month — not your aspirational role.", opts: [{ l: "A", t: "My value would significantly reduce — most of what I do would be covered", s: "High compression exposure" }, { l: "B", t: "My output would look similar — I could review and refine what AI produced", s: "Moderate compression" }, { l: "C", t: "My role would shift — more judgment, less production", s: "Transitional" }, { l: "D", t: "My leverage would increase — less time on output, more on direction", s: "Strong edge signal" }, { l: "E", t: "My core contribution would be unchanged — it was never about the output", s: "Strongest edge signal" }] },
      { key: "q6b", title: "The decision delegation scenario", q: "If your organisation gave the decisions you currently own to a capable colleague one level below you — how replaceable would your specific judgment be?", nudge: "Not whether they could do the role — whether they could replicate your specific judgment.", opts: [{ l: "A", t: "Fully replaceable — a capable colleague at the next level could make these calls", s: "Low judgment scarcity" }, { l: "B", t: "Largely replaceable — most decisions, yes; a few would need more senior input", s: "Moderate scarcity" }, { l: "C", t: "Partially — some decisions require my specific experience or pattern recognition", s: "Meaningful scarcity" }, { l: "D", t: "Mostly not — my specific judgment reflects experience or context that takes time to develop", s: "Strong scarcity" }, { l: "E", t: "Not replaceable — my judgment in these decisions is specifically tied to my accumulated context", s: "Highest structural scarcity" }] },
      { key: "q6c", title: "The visibility test", q: "If your framing, judgment, and direction-setting work became completely invisible — and only your structured outputs were seen — how would you be perceived?", nudge: "Think about what your work would look like if the invisible judgment layer was not visible.", opts: [{ l: "A", t: "No change — what I produce speaks for itself without the judgment context", s: "Output-first role" }, { l: "B", t: "Somewhat reduced — some of what I do well would be less visible", s: "Partial judgment visibility" }, { l: "C", t: "Significantly reduced — the reasoning behind the output is where most of my value sits", s: "Judgment layer substantial" }, { l: "D", t: "Dramatically reduced — without the framing context, my outputs look routine", s: "Judgment-primary role" }, { l: "E", t: "My contribution would disappear — the output without the judgment is not my work", s: "Pure judgment contribution" }] },
    ];
    const allAnswered = scenarios.every((s) => qa[s.key]);
    return (
      <Shell progress={45} onBack={prev}>
        <div className="q-hdr"><span className="q-act">The Edge Mirror</span><span className="q-sep">·</span><span className="q-num">Q6 of 13</span></div>
        <div className="q-q">Three scenarios. Answer each one honestly — based on last month, not your aspirational role.</div>
        <div className="q-nudge">Each scenario tests a different layer of your structural position. They are designed to be uncomfortable.</div>
        <div style={{ background: "var(--red-bg)", border: "1px solid var(--red-border)", borderLeft: "3px solid var(--red)", padding: "10px 13px", marginBottom: 16, fontSize: 12, color: "#C08080", fontStyle: "italic", lineHeight: 1.6 }}>These questions are designed to be uncomfortable. Answer based on last month — not your aspirational role.</div>
        {scenarios.map((s, si) => (
          <div key={s.key} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-dim)", fontWeight: 700, marginBottom: 4 }}>Scenario {si + 1}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--text)", marginBottom: 6, lineHeight: 1.45, fontWeight: 400 }}>{s.q}</div>
            <div style={{ fontSize: 11, color: "var(--text4)", fontStyle: "italic", marginBottom: 8, lineHeight: 1.45 }}>{s.nudge}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {s.opts.map((o) => (
                <div
                  key={o.l}
                  onClick={() => setQa({ ...qa, [s.key]: o.l })}
                  style={{ background: qa[s.key] === o.l ? "var(--gold-bg)" : "var(--bg3)", border: `1px solid ${qa[s.key] === o.l ? "var(--gold)" : "var(--border)"}`, padding: "9px 13px", cursor: "pointer", display: "flex", gap: 11, alignItems: "flex-start", transition: "all .14s" }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: qa[s.key] === o.l ? "var(--gold)" : "var(--text4)", flexShrink: 0, paddingTop: 1 }}>{o.l}</span>
                  <div>
                    <div style={{ fontSize: 12, color: qa[s.key] === o.l ? "var(--text)" : "var(--text2)", marginBottom: 2, lineHeight: 1.4 }}>{o.t}</div>
                    <div style={{ fontSize: 10, color: qa[s.key] === o.l ? "var(--gold-dim)" : "var(--text4)", letterSpacing: ".04em" }}>{o.s}</div>
                  </div>
                </div>
              ))}
            </div>
            {si < scenarios.length - 1 && <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />}
          </div>
        ))}
        <Why text="Three scenarios isolate three structural layers. The output replacement scenario tests the surface layer — how much of your work is in the output zone. The decision delegation scenario tests the judgment scarcity layer. The visibility test isolates the framing premium — whether your value sits in the deliverable or in the judgment that precedes it." />
        <Nav onBack={prev} onNext={next} disabled={!allAnswered} />
      </Shell>
    );
  }

  // Q7 - Scope Shift 6-month
  if (S === "q7") {
    const scope = qa.q7;
    const canContinue = !!scope;
    return (
      <Shell progress={52} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Edge Trajectory — 6 months</span><span className="q-sep">·</span><span className="q-num">Q7 of 13</span></div>
        <div className="q-q">In the last 12 months, has the structural nature of your work changed?</div>
        <div className="q-nudge">Think about the actual content — not your title. Have the types of decisions you own, the problems you solve, or the consequences you carry shifted?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 14 }}>
          {[
            { v: "A", t: "Significantly narrowed — much more defined, structured, or execution-focused than 12 months ago", s: "Strong thinning signal" },
            { v: "B", t: "Somewhat narrowed — slightly more execution-focused than 12 months ago", s: "Moderate thinning" },
            { v: "C", t: "Unchanged — the structural nature of my work has been broadly stable over 12 months", s: "Holding trajectory" },
            { v: "D", t: "Somewhat expanded — more judgment-based work than 12 months ago", s: "Moderate growth" },
            { v: "E", t: "Significantly expanded — decision boundary and consequence ownership have clearly grown over 12 months", s: "Strong acceleration signal" },
          ].map((o) => (
            <div
              key={o.v}
              onClick={() => setQa({ ...qa, q7: o.v })}
              className={`opt ${o.v === "A" || o.v === "B" ? "compress" : o.v === "C" ? "neutral" : "edge"} ${scope === o.v ? "sel" : ""}`}
            >
              <span className="opt-l">{o.v}</span>
              <div className="opt-body"><div className="opt-t">{o.t}</div><div className="opt-s">{o.s}</div></div>
            </div>
          ))}
        </div>
        <Why text="The 12-month trajectory tells the diagnostic whether your current structural position is growing or decaying. Direction matters as much as level." />
        <Nav onBack={prev} onNext={next} disabled={!canContinue} />
      </Shell>
    );
  }

  // Q8 - Thinking Ownership Split
  if (S === "q8") {
    const vals = splits.thinking || { original: 20, adaptive: 30, synthetic: 30, applied: 20 };
    const items = [
      { id: "original", name: "Original thinking", desc: "You generate new frameworks, models, or perspectives that did not exist before" },
      { id: "adaptive", name: "Adaptive thinking", desc: "You take existing frameworks and reshape them for a new context or problem" },
      { id: "synthetic", name: "Synthetic thinking", desc: "You combine and synthesise existing thinking into a coherent view" },
      { id: "applied", name: "Applied thinking", desc: "You apply established frameworks or methods to the problem at hand" },
    ];
    const total = Object.values(vals).reduce((a: number, b: any) => a + b, 0);
    const ok = total === 100;
    return (
      <Shell progress={59} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Thinking Ownership</span><span className="q-sep">·</span><span className="q-num">Q8 of 13</span></div>
        <div className="q-q">When you do your best work, how does the thinking distribute across these four modes?</div>
        <div className="q-nudge">Think about the actual cognitive act — not the subject matter or the deliverable. Allocate 100% across all four.</div>
        <SplitInput items={items} values={vals} onChange={(v) => setSplits({ ...splits, thinking: v })} />
        {ok && (
          <div className="confirm">
            AI-proof thinking: {Math.round((vals.original || 0) + (vals.adaptive || 0))}% (original + adaptive) ·
            Compressible: {Math.round((vals.synthetic || 0) + (vals.applied || 0))}% (synthetic + applied)
          </div>
        )}
        <Why text="Thinking Ownership measures whether you generate the frame — or fill one someone else built. Original and adaptive thinking produce structural durability — AI cannot generate genuinely new frameworks or adapt them with the contextual judgment that makes them fit." />
        <Nav onBack={prev} onNext={next} disabled={!ok} />
      </Shell>
    );
  }

  // Q9 - Depth
  if (S === "q9") {
    return (
      <Shell progress={65} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Cognitive Depth</span><span className="q-sep">·</span><span className="q-num">Q9 of 13</span></div>
        <div className="q-q">At what cognitive depth does your most valuable work consistently operate?</div>
        <div className="q-nudge">Not the most complex work you have ever done — the work that most consistently defines your contribution in a typical month.</div>
        {[
          { l: "A", t: "Application tier", cls: "compress", eg: "You receive a method, process, or instruction and apply it to produce an output.", s: "Highest compression — AI applies methods at comparable quality" },
          { l: "B", t: "Interpretation tier", cls: "compress", eg: "You receive data, a situation, or a result and read what it means.", s: "Moderate compression — AI increasingly interprets structured data" },
          { l: "C", t: "Insight generation tier", cls: "edge", eg: "You form a conclusion that was not visible in the data or situation.", s: "AI-proof — genuine insight generation requires judgment AI cannot replicate" },
          { l: "D", t: "Problem definition tier", cls: "edge", eg: "You decide what question is worth answering — before any analysis begins.", s: "Most AI-proof — problem definition is the most upstream and protected act" },
        ].map((o) => (
          <div key={o.l} className={`opt ${o.cls} ${qa.q9 === o.l ? "sel" : ""}`} onClick={() => setQa({ ...qa, q9: o.l })} style={{ marginBottom: 3 }}>
            <span className="opt-l">{o.l}</span>
            <div className="opt-body">
              <div className="opt-t">{o.t}</div>
              {qa.q9 === o.l && <div className="opt-eg">{o.eg}</div>}
              <div className="opt-s">{o.s}</div>
            </div>
          </div>
        ))}
        <Why text="Depth of work measures how far upstream your cognitive contribution sits. The four tiers form a hierarchy from application (most compressible) to problem definition (most AI-proof)." />
        <Nav onBack={prev} onNext={next} disabled={!qa.q9} />
      </Shell>
    );
  }

  // Q10 - Time Horizon Split
  if (S === "q10") {
    const vals = splits.horizon || { daily: 30, monthly: 25, quarterly: 25, annual: 15, multiyear: 5 };
    const items = [
      { id: "daily", name: "Day to day", desc: "Operational decisions — what happens today or this week" },
      { id: "monthly", name: "Monthly", desc: "Near-term problem resolution, planning, and course correction" },
      { id: "quarterly", name: "Quarterly", desc: "Tactical priority-setting and resource allocation" },
      { id: "annual", name: "Annual", desc: "Strategic direction-setting and structural decisions" },
      { id: "multiyear", name: "Multi-year", desc: "Organisational design, long-horizon bets, and transformational decisions" },
    ];
    const total = Object.values(vals).reduce((a: number, b: any) => a + b, 0);
    const ok = total === 100;
    return (
      <Shell progress={71} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Decision Time Horizon</span><span className="q-sep">·</span><span className="q-num">Q10 of 13</span></div>
        <div className="q-q">Across the decisions you own or materially influence, how does time horizon distribute?</div>
        <div className="q-nudge">Allocate 100% across the five horizons. A leader spending 80% of their decision time at the daily-operational level has a different structural position than one operating at multi-year horizon.</div>
        <SplitInput items={items} values={vals} onChange={(v) => setSplits({ ...splits, horizon: v })} />
        {ok && (
          <div className="confirm">
            Near-term (daily + monthly): {(vals.daily || 0) + (vals.monthly || 0)}% · Strategic (annual + multi-year): {(vals.annual || 0) + (vals.multiyear || 0)}%
          </div>
        )}
        <Why text="Time horizon is a structural amplifier. Short-horizon decisions sit closest to rules and precedent — they are the most compressible. Long-horizon decisions require judgment about genuinely uncertain futures." />
        <Nav onBack={prev} onNext={next} disabled={!ok} />
      </Shell>
    );
  }

  // Q11 - STO Layer
  if (S === "q11") {
    const vals = splits.sto || { strategic: 30, tactical: 40, operational: 30 };
    const items = [
      { id: "strategic", name: "Strategic layer", desc: "Work that defines direction, sets priorities, or determines what problems are worth solving" },
      { id: "tactical", name: "Tactical layer", desc: "Work that translates strategy into plans, manages resources, and solves problems within a defined direction" },
      { id: "operational", name: "Operational layer", desc: "Work that executes within defined plans, produces structured outputs, and coordinates delivery" },
    ];
    const total = Object.values(vals).reduce((a: number, b: any) => a + b, 0);
    const ok = total === 100;
    return (
      <Shell progress={77} onBack={prev}>
        <div className="q-hdr"><span className="q-act">STO Layer — Q2 2026</span><span className="q-sep">·</span><span className="q-num">Q11 of 13</span></div>
        <div className="q-q">How does your work actually distribute across the three organisational layers?</div>
        <div className="q-nudge">This is not about your title — it is about where the work itself sits. Allocate 100% based on last month.</div>
        <div className="q-scope">The Strategic/Tactical/Operational (STO) split combined with your work dimension split from Q1 produces the Cross-Signal — the most structurally revealing output in the Full Diagnostic.</div>
        <SplitInput items={items} values={vals} onChange={(v) => setSplits({ ...splits, sto: v })} />
        <Why text="The STO layer captures the organisational altitude at which your work actually happens — independent of your title. When combined with the six work dimension split from Q1, it produces the Cross-Signal: the structural read that exposes misalignment between where your work sits in the hierarchy and what cognitive category it falls into." />
        <Nav onBack={prev} onNext={next} disabled={!ok} />
      </Shell>
    );
  }

  // Q12 - Organisational Layer
  if (S === "q12") {
    return (
      <Shell progress={83} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Organisational Position</span><span className="q-sep">·</span><span className="q-num">Q12 of 13</span></div>
        <div className="q-q">Which best describes your current organisational layer?</div>
        <div className="q-nudge">Not your aspiration or your title — the layer where you actually sit. This calibrates your cohort comparison.</div>
        {[
          { l: "A", v: "ic", t: "Individual contributor", eg: "I do the work. I don't manage others.", s: "IC layer" },
          { l: "B", v: "tl", t: "Team lead or senior IC", eg: "I guide others or act as a technical anchor, but primarily do the work myself.", s: "TL layer" },
          { l: "C", v: "mgr", t: "Manager", eg: "I set direction for a team and own their collective output.", s: "Manager layer" },
          { l: "D", v: "sr", t: "Senior manager or director", eg: "I manage managers. I own a function or vertical.", s: "Director layer" },
          { l: "E", v: "vp", t: "VP or head of function", eg: "I own a significant business domain.", s: "VP layer" },
          { l: "F", v: "exec", t: "Executive / C-suite", eg: "I own organisation-wide direction and consequence.", s: "Executive layer" },
        ].map((o) => (
          <div key={o.l} className={`opt neutral ${qa.q11 === o.v ? "sel" : ""}`} onClick={() => setQa({ ...qa, q11: o.v })} style={{ marginBottom: 3 }}>
            <span className="opt-l">{o.l}</span>
            <div className="opt-body">
              <div className="opt-t">{o.t}</div>
              {qa.q11 === o.v && <div className="opt-eg">{o.eg}</div>}
              <div className="opt-s">{o.s}</div>
            </div>
          </div>
        ))}
        <Why text="Organisational layer calibrates your cohort comparison and salary defensibility assessment. Your AI Edge Index™ is compared against peers at your specific level." />
        <Nav onBack={prev} onNext={next} disabled={!qa.q11} />
      </Shell>
    );
  }

  // Q13 - Function
  if (S === "q13") {
    const funcOpts = [
      { v: "strategy", t: "Strategy", s: "avg index: 65" },
      { v: "product", t: "Product", s: "avg index: 60" },
      { v: "finance", t: "Finance & FP&A", s: "avg index: 54" },
      { v: "hr", t: "HR & People", s: "avg index: 52" },
      { v: "operations", t: "Operations", s: "avg index: 49" },
      { v: "marketing", t: "Marketing", s: "avg index: 55" },
      { v: "sales", t: "Sales & Commercial", s: "avg index: 57" },
      { v: "tech", t: "Technology & Engineering", s: "avg index: 58" },
      { v: "legal", t: "Legal, Risk & Compliance", s: "avg index: 61" },
      { v: "consulting", t: "Consulting & Advisory", s: "avg index: 63" },
    ];
    return (
      <Shell progress={90} onBack={prev}>
        <div className="q-hdr"><span className="q-act">Function & Domain</span><span className="q-sep">·</span><span className="q-num">Q13 of 13</span></div>
        <div className="q-q">What is your primary function or domain?</div>
        <div className="q-nudge">Choose the function that best describes where your role sits. The cohort average shown is the average AI Edge Index™ for professionals in that function.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {funcOpts.map((o) => (
            <div key={o.v} className={`opt neutral ${qa.q12 === o.v ? "sel" : ""}`} onClick={() => setQa({ ...qa, q12: o.v })}>
              <div className="opt-body">
                <div className="opt-t">{o.t}</div>
                <div className="opt-s">{o.s}</div>
              </div>
            </div>
          ))}
        </div>
        <Why text="Function shapes both your cohort comparison and the domain-specific action recommendations in your report." />
        <Nav onBack={prev} onNext={finish} disabled={!qa.q12} nextLabel="Generate my report →" />
      </Shell>
    );
  }

  // RESULTS
  if (S === "results" && sc) {
    const [genPDF, setGenPDF] = useState(false);
    const [email, setEmail] = useState("");

    const cohortBar = (userV: number, cohortV: number, label: string) => {
      const diff = userV - cohortV;
      return (
        <div style={{ padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 12 }}>
            <span style={{ color: "var(--text3)" }}>{label}</span>
            <span style={{ fontFamily: "var(--mono)", color: diff >= 0 ? "var(--green)" : "var(--red)", fontSize: 11 }}>{diff >= 0 ? "+" : ""}{Math.round(diff)} vs cohort</span>
          </div>
          <div style={{ position: "relative", height: 6, background: "var(--border)", borderRadius: 3 }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: 6, width: `${Math.min(userV, 100)}%`, background: "var(--gold)", borderRadius: 3, opacity: 0.85 }} />
            <div style={{ position: "absolute", top: -4, left: `${Math.min(cohortV, 100)}%`, width: "1.5px", height: 14, background: "var(--text3)", borderRadius: 1 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--text4)" }}>
            <span>You: {Math.round(userV)}</span><span>Cohort avg: {Math.round(cohortV)}</span>
          </div>
        </div>
      );
    };

    const moves: { n: string; t: string; b: string }[] = [];
    if (sc.thinkingScore < 45) moves.push({ n: "01", t: "Shift from synthetic to adaptive thinking", b: "Your thinking ownership sits heavily in the synthetic and applied tiers — the most compressible cognitive modes. Identify three recurring problem types in your work and write a brief framework for each." });
    else moves.push({ n: "01", t: "Make your original and adaptive thinking structurally visible", b: "Your thinking ownership sits at the adaptive or original tier — strong structural position. The risk is invisibility." });
    if (sc.depthScore < 50) moves.push({ n: "02", t: "Move from interpretation to insight generation", b: "Your depth of work sits at the interpretation or application tier. Before you communicate any finding, write the so-what first." });
    else moves.push({ n: "02", t: "Own the problem definition layer explicitly", b: "Your depth sits at insight generation or above. Make your problem-definition work visible and attributed." });
    if (sc.idx < 50) moves.push({ n: "03", t: "Redesign your role composition — structural urgency is real", b: `Your AI Edge Index™ of ${sc.rangeLow}–${sc.rangeHigh} sits in the Execution Operator range. Identify the two highest-volume activities in the AI-dominant tier and begin routing them to AI tools.` });
    else if (sc.idx < 60) moves.push({ n: "03", t: "Shift from Output Manager to Boundary Builder", b: `Your AI Edge Index™ of ${sc.rangeLow}–${sc.rangeHigh} sits in the Output Manager range. Route AI-dominant sub-activities to AI tools, redirect that time to problem definition and consequence-bearing decisions.` });
    else moves.push({ n: "03", t: "Compound your structural position", b: `Your AI Edge Index™ of ${sc.rangeLow}–${sc.rangeHigh} and ${trajName(sc.traj).toLowerCase()} trajectory place you in a structurally strong position. Identify one domain of consequence you do not currently own but could.` });

    const plan = [
      { w: "Week 1–2", act: "Structural audit", steps: ["Map every activity in your role against the six work dimensions", "Identify the top three activities by time in the AI-dominant tier", "Write problem statements for two recurring problems you currently solve without documenting the framing"] },
      { w: "Week 3–4", act: "Framing practice", steps: ["Before any significant piece of work, write the problem statement first", "Share one reframe with a colleague — make your framing work visible", "Identify one decision you contribute to but don't own — and propose taking principal ownership"] },
      { w: "Month 2", act: "Composition shift", steps: ["Route one AI-dominant activity to an AI tool", "Attend one meeting where you don't own the framing — write the problem statement before it begins", "Document one consequential decision with your name explicitly attached"] },
      { w: "Month 3", act: "Structural consolidation", steps: ["Retake the Quick Mirror — compare index to baseline", "Write a structural position statement: what you own, where your edge sits, what you are building", "Share results with one trusted senior colleague"] },
    ];

    const downloadPDF = async () => {
      setGenPDF(true);
      try {
        // Wait for jsPDF to load if not already
        if (!(window as any).jspdf) {
          await new Promise<void>((res, rej) => {
            const checkInterval = setInterval(() => {
              if ((window as any).jspdf) {
                clearInterval(checkInterval);
                res();
              }
            }, 100);
            setTimeout(() => {
              clearInterval(checkInterval);
              rej(new Error("jsPDF load timeout"));
            }, 10000);
          });
        }
        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
        const W = 210, M = 18, TW = W - M * 2;
        let y = 20;
        const nl = (h = 6) => { y += h; };
        const chk = () => { if (y > 270) { doc.addPage(); y = 20; doc.setFillColor(15, 15, 14); doc.rect(0, 0, W, 297, "F"); } };
        const sf = (s: number, w = "normal", c = [170, 163, 154]) => { doc.setFont("helvetica", w); doc.setFontSize(s); doc.setTextColor(...c); };
        const GOLD = [201, 169, 110], GREEN = [78, 155, 106], RED = [176, 90, 90], MID = [106, 101, 96], DARK = [15, 15, 14];

        // COVER
        doc.setFillColor(...DARK); doc.rect(0, 0, W, 297, "F");
        doc.setFillColor(...GOLD); doc.rect(0, 0, W, 2.5, "F");
        sf(8, "bold", MID); doc.setCharSpace(1.8); doc.text("AI EDGE DIAGNOSTIC™  ·  FULL DIAGNOSTIC REPORT  ·  2026", W / 2, 28, { align: "center" }); doc.setCharSpace(0);
        sf(36, "bold", GOLD); doc.text(bandName(sc.band), W / 2, 65, { align: "center" });
        sf(12, "normal", MID); doc.text(sc.archetype.name, W / 2, 76, { align: "center" });
        const ad = doc.splitTextToSize(sc.archetype.desc, 130);
        sf(10, "normal", [80, 78, 74]); doc.text(ad, W / 2, 90, { align: "center" });
        sf(26, "bold", GOLD); doc.text(`${sc.rangeLow} – ${sc.rangeHigh}`, W / 2, 162, { align: "center" });
        sf(9, "normal", MID); doc.text("AI EDGE INDEX™  ·  STRUCTURAL RANGE", W / 2, 172, { align: "center" });
        sf(10, "normal", [70, 68, 64]); doc.text(`Percentile: top ${100 - sc.percentile}%  ·  Cohort average: ${sc.cohortAvg}  ·  Trajectory: ${trajName(sc.traj)}`, W / 2, 185, { align: "center" });
        if (sc.profile.roleTitle) { sf(9, "normal", [55, 53, 49]); doc.text(sc.profile.roleTitle, W / 2, 200, { align: "center" }); }
        sf(8, "normal", [50, 48, 44]); doc.text("Private and confidential  ·  axionindex.org  ·  Axionindex 2026", W / 2, 276, { align: "center" });

        const sec = (num: number, title: string, cb: () => void) => {
          doc.addPage(); doc.setFillColor(...DARK); doc.rect(0, 0, W, 297, "F"); y = 22;
          doc.setFillColor(...GOLD); doc.rect(M, y, 2, 10, "F");
          sf(7, "bold", [140, 135, 128]); doc.setCharSpace(1.2); doc.text(`SECTION ${String(num).padStart(2, "0")}`, M + 5, y + 4); doc.setCharSpace(0);
          sf(13, "bold"); doc.text(title, M + 5, y + 10); y += 20; cb();
        };
        const para = (t: string, ind = 0) => { chk(); sf(10, "normal", MID); const ls = doc.splitTextToSize(t, TW - ind); doc.text(ls, M + ind, y); y += ls.length * 5 + 3; };
        const kv = (k: string, v: string, vc = MID) => { chk(); sf(8, "bold", [140, 135, 128]); doc.setCharSpace(0.5); doc.text(k.toUpperCase(), M, y); doc.setCharSpace(0); sf(11, "normal", vc); doc.text(v, M + 55, y); y += 7; };
        const bar = (label: string, val: number, bc = GOLD) => { chk(); sf(10, "normal", MID); doc.text(label, M, y); doc.setFillColor(28, 28, 26); doc.rect(M + 85, y - 4, TW - 85, 5, "F"); doc.setFillColor(...bc); doc.rect(M + 85, y - 4, Math.max(0, (TW - 85) * Math.min(val / 100, 1)), 5, "F"); sf(9, "bold", bc); doc.text(String(Math.round(val)), M + TW, y, { align: "right" }); y += 10; };

        sec(1, "AI Edge Index™ — Full Breakdown", () => {
          kv("Final index", `${sc.rangeLow} – ${sc.rangeHigh}`, GOLD);
          kv("Band", bandName(sc.band), sc.band === "acc" ? GREEN : sc.band === "hold" ? GOLD : RED);
          kv("Archetype", sc.archetype.name, GOLD);
          kv("Trajectory (12-month)", trajName(sc.traj), sc.traj === "acc" ? GREEN : sc.traj === "hold" ? GOLD : RED);
          kv("Cohort average", String(sc.cohortAvg));
          kv("Percentile", `Top ${100 - sc.percentile}%`, GREEN);
          nl(4);
          para("The AI Edge Index™ reflects the structural composition of your current work across thirteen dimensions, scored and weighted to produce a single structural range.");
        });

        sec(2, `Archetype: ${sc.archetype.name}`, () => {
          para(sc.archetype.desc); nl(4);
          sf(8, "bold", [140, 135, 128]); doc.setCharSpace(0.5); doc.text("SALARY SIGNAL", M, y); doc.setCharSpace(0); y += 6;
          doc.setFillColor(20, 18, 10); doc.rect(M, y - 2, TW, 22, "F"); doc.setFillColor(...GOLD); doc.rect(M, y - 2, 2, 22, "F");
          sf(10, "normal", MID); const ss = doc.splitTextToSize(sc.archetype.salary, TW - 8); doc.text(ss, M + 6, y + 4); y += 26;
        });

        sec(3, "Work Structure Breakdown", () => {
          para(`Your work distributes across the six dimensions as follows. AI-proof dimensions: ${sc.aiProof}% · AI-assisted: ${sc.aiAssist}% · AI-dominant: ${sc.aiDom}%`); nl(4);
          const ws = sc.splits.work || {};
          bar("Research (AI-dominant)", ws.research || 0, RED);
          bar("Analysis (AI-assisted)", ws.analysis || 0, GOLD);
          bar("Insight Generation (AI-proof)", ws.insight || 0, GREEN);
          bar("Framing (AI-proof)", ws.framing || 0, GREEN);
          bar("Deciding & Directing (AI-proof)", ws.deciding || 0, GREEN);
          bar("Executing (AI-dominant)", ws.executing || 0, RED);
        });

        sec(4, "Three Structural Moves", () => {
          moves.forEach(m => {
            chk();
            doc.setFillColor(20, 18, 10); doc.rect(M, y - 2, TW, 9, "F");
            doc.setFillColor(...GOLD); doc.rect(M, y - 2, 2, 9, "F");
            sf(8, "bold", GOLD); doc.text(m.n, M + 5, y + 3);
            sf(11, "bold"); doc.text(m.t, M + 14, y + 3); y += 13;
            para(m.b, 4); nl(4);
          });
        });

        sec(5, "90-Day Action Plan", () => {
          plan.forEach(w => {
            chk();
            sf(11, "bold", GOLD); doc.text(`${w.w} — ${w.act}`, M, y); y += 8;
            w.steps.forEach(s => { chk(); para("• " + s, 4); });
            nl(4);
          });
        });

        doc.save("AI-Edge-Full-Diagnostic-Report.pdf");
      } catch (err) {
        console.error(err);
        alert("PDF generation failed. Please try again.");
      }
      setGenPDF(false);
    };

    return (
      <>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
          strategy="lazyOnload"
          onLoad={() => setJspdfLoaded(true)}
        />
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 64px" }}>
          <div className="shell-hd"><span className="shell-brand">AI Edge Diagnostic™ — Full Diagnostic</span></div>

          {/* BAND HEADER */}
          <div style={{ padding: "36px 0 24px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 10 }}>AI Edge Diagnostic™ · Full Diagnostic · 2026</div>
            {sc.profile.roleTitle && <div style={{ fontSize: 11, color: "var(--text4)", marginBottom: 6 }}>{sc.profile.roleTitle}</div>}
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px,8vw,60px)", fontWeight: 400, color: bandColor(sc.band), lineHeight: 1, marginBottom: 8 }}>{bandName(sc.band)}</div>
            <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 14px" }}>{sc.archetype.desc}</div>
            <div style={{ display: "inline-block", background: "var(--bg3)", border: "1px solid var(--gold-dim)", padding: "8px 20px", marginBottom: 14 }}>
              <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 3 }}>Archetype</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--gold)" }}>{sc.archetype.name}</div>
            </div>
            <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text4)", marginBottom: 6 }}>AI Edge Index™</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 42, fontWeight: 400, color: "var(--gold)", lineHeight: 1, marginBottom: 3 }}>{sc.rangeLow} – {sc.rangeHigh}</div>
            <div style={{ fontSize: 10, color: "var(--text4)", fontFamily: "var(--mono)", letterSpacing: ".08em", marginBottom: 14 }}>Structural range</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap" }}>
              {[
                { l: "Percentile", v: `Top ${100 - sc.percentile}%`, c: "var(--green)" },
                { l: "Cohort average", v: sc.cohortAvg, c: "var(--text3)" },
                { l: "Trajectory", v: trajName(sc.traj), c: bandColor(sc.traj) },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "var(--text4)", marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 16, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SALARY */}
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderLeft: `3px solid ${salColors[sc.salaryBand]}`, padding: "13px 15px", margin: "14px 0 3px" }}>
            <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, color: salColors[sc.salaryBand], marginBottom: 4 }}>Salary defensibility</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>{salLabels[sc.salaryBand]}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{sc.archetype.salary}</div>
          </div>

          {/* AI SPLIT */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
            <div style={{ background: "var(--red-bg)", border: "1px solid var(--red-border)", borderTop: "2px solid var(--red)", padding: "13px 14px" }}>
              <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--red)", fontWeight: 700, marginBottom: 8 }}>What AI can already do</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #2A1010", fontSize: 13 }}><span style={{ color: "var(--text)" }}>AI-Dominant</span><span style={{ fontFamily: "var(--mono)", fontSize: 17, color: "var(--red)" }}>{sc.aiDom}%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}><span style={{ color: "var(--text)" }}>AI-Assisted</span><span style={{ fontFamily: "var(--mono)", fontSize: 17, color: "var(--gold)", opacity: 0.85 }}>{sc.aiAssist}%</span></div>
            </div>
            <div style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)", borderTop: "2px solid var(--green)", padding: "13px 14px" }}>
              <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--green)", fontWeight: 700, marginBottom: 8 }}>What remains uniquely yours</div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 13 }}><span style={{ color: "var(--text)" }}>AI-Proof</span><span style={{ fontFamily: "var(--mono)", fontSize: 17, color: "var(--green)" }}>{sc.aiProof}%</span></div>
            </div>
          </div>

          {/* COHORT */}
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "14px 16px", marginBottom: 3 }}>
            <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>Cohort comparison</div>
            {cohortBar(sc.idx, sc.cLvl.avg, `By level — ${sc.cLvl.label}`)}
            {cohortBar(sc.idx, sc.cFunc.avg || 54, `By function — ${sc.cFunc.label || ""}`)}
            {cohortBar(sc.idx, sc.cohortAvg, "Combined cohort average")}
          </div>

          {/* MOVES */}
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "14px 16px", marginBottom: 3 }}>
            <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>Three structural moves</div>
            {moves.map((m) => (
              <div key={m.n} style={{ background: "var(--bg2)", border: "1px solid var(--border)", padding: "13px 15px", marginBottom: 3 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 6 }}><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold)", flexShrink: 0 }}>{m.n}</span><div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", lineHeight: 1.35 }}>{m.t}</div></div>
                <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.65, paddingLeft: 22 }}>{m.b}</div>
              </div>
            ))}
          </div>

          {/* 90-DAY */}
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "14px 16px", marginBottom: 3 }}>
            <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>90-day action plan</div>
            {plan.map((w, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "var(--gold)", marginBottom: 6 }}>{w.w} — {w.act}</div>
                {w.steps.map((s, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--text3)", marginBottom: 4, lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text4)", flexShrink: 0 }}>→</span><span>{s}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* PDF */}
          <div style={{ background: "#1C1A16", border: "1px solid var(--gold-dim)", borderTop: "2px solid var(--gold)", padding: "18px 18px", marginTop: 3 }}>
            <div style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 6 }}>Download your full report</div>
            <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.65, marginBottom: 14 }}>Your complete Full Diagnostic report — including salary defensibility, cohort comparison, all dimension scores, 90-day action plan — as a private downloadable PDF.</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (optional)"
                style={{ flex: 1, minWidth: 200, background: "var(--bg)", border: "1px solid var(--border2)", color: "var(--text)", fontSize: 12, padding: "8px 11px", fontFamily: "var(--sans)", outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Private PDF", "Not shared with employer"].map((p) => (
                  <span key={p} style={{ fontSize: 10, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", padding: "3px 9px" }}>{p}</span>
                ))}
              </div>
              <button
                onClick={downloadPDF}
                disabled={genPDF}
                style={{ background: "var(--gold)", color: "var(--bg)", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", border: "none", padding: "12px 26px", cursor: genPDF ? "not-allowed" : "pointer", opacity: genPDF ? 0.7 : 1, fontFamily: "var(--sans)" }}
              >
                {genPDF ? "Generating PDF..." : "Download PDF Report →"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "24px 0 0", borderTop: "1px solid var(--border)", marginTop: 20 }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(13px,2vw,16px)", color: "var(--text4)", fontStyle: "italic", lineHeight: 1.9, marginBottom: 14 }}>"Performance earns the next cycle.<br />Positioning shapes the next five."</div>
            <button onClick={() => { setS("landing"); setProfile(DEF_PROFILE); setQa({}); setSplits(DEF_SPLITS); setSc(null); }} style={{ background: "none", border: "1px solid var(--border2)", color: "var(--text3)", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", padding: "9px 20px", cursor: "pointer", fontFamily: "var(--sans)" }}>
              ← Start again
            </button>
          </div>
        </div>
      </>
    );
  }

  // Fallback
  return (
    <Shell progress={0} onBack={() => go("landing")}>
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: 14, color: "var(--text3)" }}>Loading...</div>
      </div>
    </Shell>
  );
}
