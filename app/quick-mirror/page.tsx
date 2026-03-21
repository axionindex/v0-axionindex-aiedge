"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & DATA
// ═══════════════════════════════════════════════════════════════════════════

type Screen = "landing" | "brief" | "profile" | "wt" | "jo" | "to" | "imp" | "th" | "qC" | "qT" | "results";

interface WorkType {
  id: string;
  name: string;
  desc: string;
  badge: string;
  bc: string;
  comp: number;
}

interface SliderItem {
  id: string;
  name: string;
  desc: string;
}

interface ImpactLevel extends SliderItem {
  aiMult: number;
}

interface TimeHorizon extends SliderItem {
  comp: number;
}

interface QuestionOption {
  l: string;
  t: string;
  s: string;
  v: number;
}

interface QuestionDef {
  id: "qC" | "qT";
  act: string;
  section: string;
  q: string;
  opts: QuestionOption[];
}

const WORK_TYPES: WorkType[] = [
  { id: "research", name: "Research", desc: "Gathering, scanning, synthesising from sources", badge: "AI-DOMINANT", bc: "badge-dom", comp: 0.88 },
  { id: "analysis", name: "Analysis", desc: "Structuring data, modelling, identifying patterns", badge: "AI-ASSISTED", bc: "badge-asst", comp: 0.58 },
  { id: "insighting", name: "Insight Generation", desc: "Drawing novel conclusions that re-frame direction", badge: "AI-PROOF", bc: "badge-proof", comp: 0.12 },
  { id: "framing", name: "Framing", desc: "Defining the right problem before work begins", badge: "AI-PROOF", bc: "badge-proof", comp: 0.05 },
  { id: "deciding", name: "Deciding & Directing", desc: "Making calls, owning consequence, setting direction", badge: "AI-PROOF", bc: "badge-proof", comp: 0.08 },
  { id: "executing", name: "Executing", desc: "Structured output, coordination, delivery", badge: "AI-DOMINANT", bc: "badge-dom", comp: 0.85 },
];

const JUDGMENT_OWN: SliderItem[] = [
  { id: "jo_own", name: "I own the judgment", desc: "The call is mine — I make it and absorb the consequence" },
  { id: "jo_lead", name: "I lead the judgment", desc: "I facilitate, synthesise, and propose direction others endorse" },
  { id: "jo_contrib", name: "I contribute to judgment", desc: "I provide input and analysis — others make the final call" },
  { id: "jo_exec", name: "I execute on judgment", desc: "I implement decisions made by others" },
];

const JO_WEIGHTS: Record<string, number> = { jo_own: 1.0, jo_lead: 0.72, jo_contrib: 0.38, jo_exec: 0.12 };

const THINKING_OWN: SliderItem[] = [
  { id: "to_orig", name: "Original thinking", desc: "I generate the idea or frame from first principles" },
  { id: "to_adapt", name: "Adaptive thinking", desc: "I take existing frameworks and adapt them with genuine judgment" },
  { id: "to_synth", name: "Synthesis", desc: "I connect and combine information into a coherent view" },
  { id: "to_apply", name: "Application", desc: "I apply established methods and processes" },
];

const TO_WEIGHTS: Record<string, number> = { to_orig: 1.0, to_adapt: 0.75, to_synth: 0.40, to_apply: 0.12 };

const IMPACT_LEVELS: ImpactLevel[] = [
  { id: "self", name: "Self only", desc: "My individual output only", aiMult: 0.05 },
  { id: "team", name: "Team", desc: "My immediate team's outcomes and direction", aiMult: 0.22 },
  { id: "dept", name: "Department", desc: "Cross-team decisions within my broader group", aiMult: 0.48 },
  { id: "func", name: "Function", desc: "Whole-function or multi-department impact", aiMult: 0.75 },
  { id: "enterprise", name: "Enterprise", desc: "Organisation-wide or external market-level", aiMult: 1.0 },
];

const TIME_HORIZONS: TimeHorizon[] = [
  { id: "daily", name: "Day to Day", desc: "Operational — this week", comp: 0.90 },
  { id: "monthly", name: "Monthly", desc: "Near-term planning", comp: 0.70 },
  { id: "quarterly", name: "Quarterly", desc: "Tactical priority-setting", comp: 0.45 },
  { id: "annual", name: "Annual", desc: "Strategic direction", comp: 0.20 },
  { id: "multiyear", name: "Multi-year", desc: "Long-horizon bets", comp: 0.05 },
];

const Q_CONSEQUENCE: QuestionDef = {
  id: "qC",
  act: "Act Two — Edge Depth",
  section: "Consequence Visibility",
  q: "When decisions you influence go wrong, how visible is your accountability?",
  opts: [
    { l: "A", t: "Not visible — accountability sits clearly elsewhere", s: "No consequence anchor", v: 0 },
    { l: "B", t: "Indirect — I contributed but others carry the outcome", s: "Low ownership", v: 25 },
    { l: "C", t: "Shared — I am one of several accountable parties", s: "Partial ownership", v: 50 },
    { l: "D", t: "Direct — the outcome is primarily attributed to me", s: "Strong ownership signal", v: 75 },
    { l: "E", t: "Explicit and attributable — my name is on it", s: "Strongest AI-proof signal", v: 100 },
  ],
};

const Q_MOMENTUM: QuestionDef = {
  id: "qT",
  act: "Act Two — Edge Depth",
  section: "Scope Shift Momentum",
  q: "Over the past year, has the nature of your work shifted toward more judgment and decision ownership?",
  opts: [
    { l: "A", t: "My scope has narrowed — more defined, structured work than before", s: "Thinning trajectory", v: 0 },
    { l: "B", t: "My scope has stayed largely the same", s: "Holding trajectory", v: 25 },
    { l: "C", t: "Slight expansion — marginally more judgment-based work", s: "Modest growth", v: 50 },
    { l: "D", t: "Meaningful expansion — my decision boundary has clearly grown", s: "Growing trajectory", v: 75 },
    { l: "E", t: "Significant expansion into new domains of consequence and judgment", s: "Accelerating", v: 100 },
  ],
};

const EXP_OPTS = [
  { l: "e1", t: "0–5 years", mult: 0.82 },
  { l: "e2", t: "6–10 years", mult: 0.92 },
  { l: "e3", t: "11–15 years", mult: 1.0 },
  { l: "e4", t: "16–20 years", mult: 1.05 },
  { l: "e5", t: "20+ years", mult: 1.08 },
];

const MGR_OPTS = [
  { l: "m0", t: "Never managed", v: 0, s: "" },
  { l: "m1", t: "1–2 years", v: 20, s: "Early leadership" },
  { l: "m2", t: "3–5 years", v: 45, s: "Established manager" },
  { l: "m3", t: "6–10 years", v: 70, s: "Senior manager" },
  { l: "m4", t: "10+ years", v: 90, s: "Career manager" },
];

const PROGRESS: Record<Screen, number> = {
  landing: 0,
  brief: 0,
  profile: 10,
  wt: 22,
  jo: 36,
  to: 50,
  imp: 62,
  th: 74,
  qC: 83,
  qT: 92,
  results: 100,
};

const SEG_COLOURS = ["#C9A96E", "#4A9467", "#4A6E9A", "#A85252", "#8B6FA0", "#6A8FA0"];

// ═══════════════════════════════════════════════════════════════════════════
// SCORING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function sumDict(d: Record<string, number>): number {
  return Object.values(d).reduce((a, b) => a + (b || 0), 0);
}

function calcDecisionDensity(jo: Record<string, number>, to: Record<string, number>, wt: Record<string, number>): number {
  const jT = sumDict(jo), tT = sumDict(to), wT = sumDict(wt);
  if (!jT || !tT || !wT) return 50;
  const joS = Math.min(100, Math.round(Object.keys(JO_WEIGHTS).reduce((s, k) => s + (jo[k] || 0) * JO_WEIGHTS[k], 0) / jT * 100));
  const toS = Math.min(100, Math.round(Object.keys(TO_WEIGHTS).reduce((s, k) => s + (to[k] || 0) * TO_WEIGHTS[k], 0) / tT * 100));
  const apP = Math.round(((wt.insighting || 0) + (wt.framing || 0) + (wt.deciding || 0)) / wT * 100);
  return Math.min(100, Math.round(joS * 0.42 + toS * 0.28 + apP * 0.30));
}

function calcStructuralAuthority(imp: Record<string, number>, qC: number): number {
  const iT = sumDict(imp);
  const iS = iT ? Math.min(100, Math.round(IMPACT_LEVELS.reduce((s, i) => s + (imp[i.id] || 0) * i.aiMult, 0) / iT * 100)) : 40;
  return Math.min(100, Math.round((qC || 0) * 0.60 + iS * 0.40));
}

function calcCompressionExposure(wt: Record<string, number>, th: Record<string, number>): number {
  const wT = sumDict(wt), tT = sumDict(th);
  const wC = wT ? Math.round(WORK_TYPES.reduce((s, i) => s + (wt[i.id] || 0) * i.comp, 0) / wT * 100) : 50;
  const tC = tT ? Math.round(TIME_HORIZONS.reduce((s, i) => s + (th[i.id] || 0) * i.comp, 0) / tT * 100) : 50;
  return Math.min(100, Math.round(wC * 0.55 + tC * 0.45));
}

interface ScoreResult {
  score: number;
  decisionDensity: number;
  structuralAuthority: number;
  compressionExposure: number;
  momentumIndex: number;
  joScore: number;
  toScore: number;
  impScore: number;
  consequenceSignal: number;
  aiProofPct: number;
  aiDomPct: number;
  aiAsstPct: number;
  wtRawPct: Record<string, number>;
}

function calcScore(state: {
  profile: { experience: string | null; mgrYears: string | null };
  wt: Record<string, number>;
  jo: Record<string, number>;
  to: Record<string, number>;
  imp: Record<string, number>;
  th: Record<string, number>;
  qC: string | null;
  qT: string | null;
}): ScoreResult {
  const cqC = Q_CONSEQUENCE.opts.find(o => o.l === state.qC)?.v ?? 50;
  const cqT = Q_MOMENTUM.opts.find(o => o.l === state.qT)?.v ?? 25;
  const decisionDensity = calcDecisionDensity(state.jo, state.to, state.wt);
  const structuralAuthority = calcStructuralAuthority(state.imp, cqC);
  const compressionExposure = calcCompressionExposure(state.wt, state.th);
  const momentumIndex = cqT;
  let base = Math.round(decisionDensity * 0.40 + structuralAuthority * 0.25 + (100 - compressionExposure) * 0.25 + momentumIndex * 0.10);
  const expMult = EXP_OPTS.find(o => o.l === state.profile.experience)?.mult || 1.0;
  const mgrBonus = (MGR_OPTS.find(o => o.l === state.profile.mgrYears)?.v || 0) * 0.04;
  const score = Math.min(100, Math.max(0, Math.round(base * expMult + mgrBonus)));
  const wT = sumDict(state.wt);
  const aiProofPct = wT ? Math.round(((state.wt.insighting || 0) + (state.wt.framing || 0) + (state.wt.deciding || 0)) / wT * 100) : 0;
  const aiDomPct = wT ? Math.round(((state.wt.research || 0) + (state.wt.executing || 0)) / wT * 100) : 0;
  const aiAsstPct = wT ? Math.round((state.wt.analysis || 0) / wT * 100) : 0;
  const wtRawPct: Record<string, number> = {};
  WORK_TYPES.forEach(i => { wtRawPct[i.id] = wT ? Math.round((state.wt[i.id] || 0) / wT * 100) : 0; });
  const jT = sumDict(state.jo);
  const joScore = jT ? Math.min(100, Math.round(Object.keys(JO_WEIGHTS).reduce((s, k) => s + (state.jo[k] || 0) * JO_WEIGHTS[k], 0) / jT * 100)) : 50;
  const tT = sumDict(state.to);
  const toScore = tT ? Math.min(100, Math.round(Object.keys(TO_WEIGHTS).reduce((s, k) => s + (state.to[k] || 0) * TO_WEIGHTS[k], 0) / tT * 100)) : 50;
  const iT = sumDict(state.imp);
  const impScore = iT ? Math.min(100, Math.round(IMPACT_LEVELS.reduce((s, i) => s + (state.imp[i.id] || 0) * i.aiMult, 0) / iT * 100)) : 40;
  return { score, decisionDensity, structuralAuthority, compressionExposure, momentumIndex, joScore, toScore, impScore, consequenceSignal: cqC, aiProofPct, aiDomPct, aiAsstPct, wtRawPct };
}

function getBand(s: number): "acc" | "hold" | "thin" {
  return s >= 75 ? "acc" : s >= 50 ? "hold" : "thin";
}

function getBandName(b: "acc" | "hold" | "thin"): string {
  return b === "acc" ? "Edge Accelerating" : b === "hold" ? "Edge Holding" : "Edge Thinning";
}

function getDir(m: number): "acc" | "hold" | "thin" {
  return m >= 63 ? "acc" : m >= 38 ? "hold" : "thin";
}

function getDirName(b: "acc" | "hold" | "thin"): string {
  return b === "acc" ? "Accelerating" : b === "hold" ? "Holding" : "Thinning";
}

function getBandDesc(b: "acc" | "hold" | "thin"): string {
  const descs = {
    acc: "Your work is anchored primarily to consequence-bearing judgment, decision ownership, and structural influence. AI compression is not absent — but your leverage sits above it.",
    hold: "Your work combines meaningful judgment with compressible output. Your edge is intact but sensitive to how you allocate your time.",
    thin: "A significant portion of your current scope overlaps with work AI performs with increasing capability. The structural pressure on your contribution is real and quiet.",
  };
  return descs[b];
}

function getDirDesc(b: "acc" | "hold" | "thin"): string {
  const descs = {
    acc: "Your decision boundary expanded and consequence visibility increased over the past 12 months. Your edge is not just present — it is in motion.",
    hold: "Your decision boundary and consequence visibility have remained largely stable. Your edge is intact — but not yet compounding.",
    thin: "Your scope has narrowed or consequence visibility has decreased. Your edge score reflects today — your direction shapes tomorrow.",
  };
  return descs[b];
}

function getMoves(b: "acc" | "hold" | "thin"): { t: string; d: string }[] {
  const moves = {
    acc: [
      { t: "Codify your decision boundary — make ownership visible, not assumed.", d: "Undocumented authority is fragile authority. Document your decisions, name your accountability, and make your consequence record visible to the people who determine your structural value." },
      { t: "Create one judgment artifact per month — a decision memo, trade-off note, or reasoning record.", d: "AI can produce results. Only a human can show how they thought through a problem. A body of documented reasoning is portable, credible, and impossible to attribute to any tool." },
      { t: "Default all compressible work to AI tools as a standing practice.", d: "Every hour in AI-dominant work is an hour your edge is not compounding. Delegate research and structured drafting to tools. Reclaim that time for framing and deciding — specifically." },
    ],
    hold: [
      { t: "Move from recommendation provider to decision proposer — own the call, not just the input.", d: "Propose a specific direction with a named consequence path. That shift from advisor to decision-maker is visible, remembered, and compounds over time in ways advisory contributions do not." },
      { t: "Default one recurring output to AI this quarter and reclaim the time for problem ownership.", d: "One recurring report or analysis defaulted to AI tools frees 2–4 hours per week. Those hours must go explicitly to framing and deciding — not to more execution." },
      { t: "Write the problem before you begin research — every time.", d: "Problem framing is the single most AI-proof act available. Defining the right question before gathering the answer moves you upstream of where AI compresses most." },
    ],
    thin: [
      { t: "Own one decision this quarter that carries visible consequence — where the outcome is attributable to you.", d: "Consequence visibility is the AI-proof anchor. Without a consequence anchor, the AI substitution case is strongest. One decision, fully owned, shifts the structural foundation." },
      { t: "Default research and structured drafting to AI tools — starting this week.", d: "AI compression does not wait. Spend two hours this week defaulting at least one research or drafting task to AI tools. Assess whether the output is indistinguishable from your own." },
      { t: "Move toward problem-owning roles — not output-generating ones.", d: "The structural divide is not between hard and easy work. It is between work that defines the problem and work that solves it. Seek roles that position you upstream of the brief." },
    ],
  };
  return moves[b];
}

function sCol(v: number, inv = false): string {
  if (inv) return v <= 38 ? "var(--green)" : v <= 62 ? "var(--gold)" : "var(--red)";
  return v >= 65 ? "var(--green)" : v >= 45 ? "var(--gold)" : "var(--red)";
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function QuickMirrorPage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [profile, setProfile] = useState<{ experience: string | null; mgrYears: string | null }>({ experience: null, mgrYears: null });
  const [wt, setWt] = useState<Record<string, number>>({ research: 0, analysis: 0, insighting: 0, framing: 0, deciding: 0, executing: 0 });
  const [jo, setJo] = useState<Record<string, number>>({ jo_own: 0, jo_lead: 0, jo_contrib: 0, jo_exec: 0 });
  const [to, setTo] = useState<Record<string, number>>({ to_orig: 0, to_adapt: 0, to_synth: 0, to_apply: 0 });
  const [imp, setImp] = useState<Record<string, number>>({ self: 0, team: 0, dept: 0, func: 0, enterprise: 0 });
  const [th, setTh] = useState<Record<string, number>>({ daily: 0, monthly: 0, quarterly: 0, annual: 0, multiyear: 0 });
  const [qC, setQC] = useState<string | null>(null);
  const [qT, setQT] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreResult | null>(null);
  const [showLogic, setShowLogic] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const changeScreen = (s: Screen) => {
    if (s === "results") {
      const result = calcScore({ profile, wt, jo, to, imp, th, qC, qT });
      setScores(result);
    }
    setScreen(s);
  };

  const progress = PROGRESS[screen] || 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER SCREENS
  // ═══════════════════════════════════════════════════════════════════════════

  const renderLanding = () => (
    <div className="qm-landing">
      <div className="land-eyebrow">Nitin Nahata · Axionindex · 2026-Q1</div>
      <h1 className="land-title">The AI Edge<span className="land-tm">™</span></h1>
      <div className="land-subtitle">Diagnostic</div>
      <div className="land-sub">A Structural Assessment for the AI Economy</div>
      <div className="land-tag">Exposure · Decision Density · Growth of Boundary · Economic Anchoring</div>
      <div className="land-thesis">
        <p>AI is not replacing jobs in a single dramatic moment. It is compressing the structure of work — quietly, consistently, without pause.</p>
        <div className="land-q">Where is your edge today?<br /><span style={{ color: "var(--gold)" }}>Is it accelerating, holding, or thinning?</span></div>
      </div>
      <div className="land-divider" />
      <div className="land-modes">
        <div className="mode-card" onClick={() => changeScreen("brief")}>
          <span className="mode-badge">Quick Mirror — Free</span>
          <div className="mode-title">7 questions · 7–9 minutes · Immediate structural signal</div>
          <div className="mode-desc">Score, band, direction, work split, and three structural moves. Includes Judgment Ownership, Thinking Ownership, Impact Boundary, and Time Horizon — the four dimensions most professionals have never mapped.</div>
          <div className="mode-meta">Free · No account required →</div>
          <div className="mode-arrow">→</div>
        </div>
      </div>
      <div className="land-disc">Answer based on your actual work — not your job description, not your best week. This is a mirror, not a label.</div>
    </div>
  );

  const renderBrief = () => (
    <div className="q-shell" style={{ alignItems: "flex-start", paddingTop: "48px" }}>
      <div className="brief-wrap" style={{ paddingTop: 0 }}>
        <div className="ari-tag">AI Replaceability Index™ · Quick Mirror</div>
        <div className="brief-eye">7 structured inputs · 7–9 minutes</div>
        <div className="brief-title">What this instrument measures — and what it doesn't</div>
        {[
          "A private structural assessment for professionals who want to know whether their work is anchored to contribution that remains scarce in an AI economy.",
          "It measures the economic structure of work — not skill, not AI literacy, not performance. It reflects present structural alignment.",
          "Results are private and yours alone. Never administered by organisations. Never shared with HR.",
        ].map((t, i) => (
          <div key={i} className="brief-item">
            <div className="brief-dot" />
            <div className="brief-text">{t}</div>
          </div>
        ))}
        <div className="brief-rule" />
        <div style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "12px" }}>The E.D.G.E. Framework</div>
        <div className="edge-grid">
          {[
            ["E", "Exposure", "How much of your work is AI-compressible?"],
            ["D", "Decision Density", "How much consequence-bearing judgment do you own?"],
            ["G", "Growth of Boundary", "Is your decision authority expanding over time?"],
            ["E", "Economic Anchoring", "Is your contribution tied to scarce, accountable outcomes?"],
          ].map(([l, w, d], i) => (
            <div key={i} className="edge-item">
              <div className="edge-l">{l}</div>
              <div className="edge-w">{w}</div>
              <div className="edge-d">{d}</div>
            </div>
          ))}
        </div>
        <div className="brief-rule" />
        <div className="brief-note">Answer based on the past month — not your job description, not your best week. This is a mirror, not a label.</div>
        <div className="nav-buttons">
          <button className="btn-g" onClick={() => changeScreen("landing")}>← Home</button>
          <button className="btn-p" onClick={() => changeScreen("profile")}>Begin →</button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="q-shell" style={{ alignItems: "flex-start" }}>
      <div className="prof-wrap">
        <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "12px" }}>Professional Context</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, lineHeight: 1.3, marginBottom: "10px" }}>Before we begin</div>
        <div style={{ fontSize: "12px", color: "var(--text3)", lineHeight: 1.65, marginBottom: "32px", maxWidth: "520px" }}>
          Two calibration questions. Experience and management tenure are applied as structural multipliers — profile carries 20% weight, your answers carry 80%.
        </div>
        <div className="prof-sec">
          <div className="prof-lbl">Total professional experience</div>
          <div className="prof-hint">Experience premium applied — accumulated pattern recognition and contextual judgment increase with tenure.</div>
          <div className="opt-grid">
            {EXP_OPTS.map(o => (
              <div key={o.l} className={`opt-card ${profile.experience === o.l ? "sel" : ""}`} onClick={() => setProfile(p => ({ ...p, experience: o.l }))}>
                <div className="opt-card-t">{o.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="prof-sec">
          <div className="prof-lbl">Years as a people manager</div>
          <div className="prof-hint">Management tenure feeds the consequence and influence dimension of the scoring model.</div>
          <div className="opt-grid">
            {MGR_OPTS.map(o => (
              <div key={o.l} className={`opt-card ${profile.mgrYears === o.l ? "sel" : ""}`} onClick={() => setProfile(p => ({ ...p, mgrYears: o.l }))}>
                <div className="opt-card-t">{o.t}</div>
                {o.s && <div className="opt-card-s">{o.s}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="nav-buttons">
          <button className="btn-g" onClick={() => changeScreen("brief")}>← Back</button>
          <button className="btn-p" onClick={() => changeScreen("wt")} disabled={!profile.experience || !profile.mgrYears}>Continue →</button>
        </div>
      </div>
    </div>
  );

  const renderSlider = (key: "wt" | "jo" | "to" | "imp" | "th") => {
    const configs: Record<string, { act: string; section: string; ctr: string; q: string; sub: string; items: SliderItem[] | WorkType[] | ImpactLevel[] | TimeHorizon[]; badges: boolean; next: Screen; back: Screen }> = {
      wt: { act: "Act One — Work Structure", section: "Q1 — Work Type Distribution", ctr: "1 of 7", q: "How is your work actually distributed across these six types?", sub: "Allocate exactly 100%. Base this on the past month — not your job description.", items: WORK_TYPES, badges: true, next: "jo", back: "profile" },
      jo: { act: "Act One — Judgment Layer", section: "Q2 — Judgment Ownership", ctr: "2 of 7", q: "Across your work, how is judgment actually owned?", sub: "Think about your last 20 meaningful work interactions. Allocate 100% — based on reality, not aspiration.", items: JUDGMENT_OWN, badges: false, next: "to", back: "wt" },
      to: { act: "Act One — Thinking Layer", section: "Q3 — Thinking Ownership", ctr: "3 of 7", q: "How does your thinking contribution distribute across these four modes?", sub: "Most professionals overestimate original thinking and underestimate synthesis. Allocate based on the past month.", items: THINKING_OWN, badges: false, next: "imp", back: "jo" },
      imp: { act: "Act One — Impact Layer", section: "Q4 — Impact Boundary", ctr: "4 of 7", q: "Across which levels does your work create real, primary consequence?", sub: "Allocate 100% across the five levels. A decision that affects your team is structurally different from one that shapes the enterprise.", items: IMPACT_LEVELS, badges: false, next: "th", back: "to" },
      th: { act: "Act One — Impact Layer", section: "Q5 — Decision Time Horizon", ctr: "5 of 7", q: "Across which time horizons do your decisions materially operate?", sub: "Allocate 100% across the five horizons. Time horizon is a proxy for structural authority — day-to-day decisions are increasingly compressible; multi-year decisions require contextual judgment AI cannot hold.", items: TIME_HORIZONS, badges: false, next: "qC", back: "imp" },
    };
    const c = configs[key];
    const stateMap: Record<string, Record<string, number>> = { wt, jo, to, imp, th };
    const setterMap: Record<string, React.Dispatch<React.SetStateAction<Record<string, number>>>> = { wt: setWt, jo: setJo, to: setTo, imp: setImp, th: setTh };
    const vals = stateMap[key];
    const setter = setterMap[key];
    const total = sumDict(vals);
    const ok = total === 100;
    const over = total > 100;
    const segs = c.items.filter((i: SliderItem) => (vals[i.id] || 0) > 0);

    return (
      <div className="q-shell">
        <div className="q-inner">
          <div className="q-act">{c.act}</div>
          <div className="q-ctr">{c.section} · {c.ctr}</div>
          <div className="q-text">{c.q}</div>
          <div className="q-sub">{c.sub}</div>
          <div className="q-block">
            {c.items.map((item: SliderItem | WorkType) => (
              <div key={item.id} className="q-row">
                <div>
                  <div className="q-row-name">{item.name}</div>
                  {item.desc && <div className="q-row-desc">{item.desc}</div>}
                  {c.badges && "badge" in item && (
                    <span className={`q-row-badge ${item.bc}`}>{item.badge}</span>
                  )}
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={vals[item.id] || 0}
                  className="q-slider"
                  onChange={(e) => setter(prev => ({ ...prev, [item.id]: parseInt(e.target.value) }))}
                />
                <div className="q-val">{vals[item.id] || 0}%</div>
              </div>
            ))}
          </div>
          {total > 0 && (
            <div className="q-viz">
              <div className="q-viz-bar">
                {segs.map((item: SliderItem, n: number) => (
                  <div key={item.id} className="q-viz-seg" style={{ width: `${vals[item.id]}%`, background: SEG_COLOURS[n % 6], opacity: 0.75 }} />
                ))}
              </div>
              <div className="q-viz-leg">
                {segs.map((item: SliderItem, n: number) => (
                  <span key={item.id} className="q-viz-item">
                    <span className="q-viz-dot" style={{ background: SEG_COLOURS[n % 6] }} />
                    {item.name}: {vals[item.id]}%
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className={`q-total ${ok ? "ok" : over ? "over" : ""}`}>
            <span className="q-total-lbl">Total</span>
            <span className={`q-total-val ${ok ? "ok" : over ? "over" : ""}`}>{total} / 100</span>
          </div>
          {!ok && <div className="q-err">Must equal 100% — scarcity is defined by trade-offs.</div>}
          <div className="nav-buttons">
            <button className="btn-g" onClick={() => changeScreen(c.back)}>← Back</button>
            <button className="btn-p" onClick={() => changeScreen(c.next)} disabled={!ok}>Continue →</button>
          </div>
        </div>
      </div>
    );
  };

  const renderSingle = (qd: QuestionDef, num: number, tot: number) => {
    const sel = qd.id === "qC" ? qC : qT;
    const setSel = qd.id === "qC" ? setQC : setQT;
    return (
      <div className="sq-shell">
        <div className="sq-inner">
          <div className="sq-act">{qd.act}</div>
          <div className="sq-ctr">{qd.section} · {num} of {tot}</div>
          <div className="sq-text">{qd.q}</div>
          <div className="sq-opts">
            {qd.opts.map(o => (
              <div key={o.l} className={`sq-opt ${sel === o.l ? "sel" : ""}`} onClick={() => setSel(o.l)}>
                <span className="sq-opt-l">{o.l}</span>
                <div>
                  <div className="sq-opt-t">{o.t}</div>
                  {o.s && <div className="sq-opt-s">{o.s}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="nav-buttons">
            <button className="btn-g" onClick={() => changeScreen(qd.id === "qC" ? "th" : "qC")}>← Back</button>
            <button className="btn-p" onClick={() => changeScreen(qd.id === "qT" ? "results" : "qT")} disabled={!sel}>Continue →</button>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!scores) return null;
    const band = getBand(scores.score);
    const dir = getDir(scores.momentumIndex);
    const moves = getMoves(band);
    const salMsg: Record<string, string> = {
      acc: "Salary defensibility is structurally strong — your contribution sits above the AI compression line.",
      hold: "Salary defensibility is intact but sensitive — dependent on deliberate scope choices over the next 12–24 months.",
      thin: "Salary defensibility is under quiet structural pressure — the scarcity of your current contribution is declining.",
    };

    return (
      <div className="res-wrap">
        {/* Band Header */}
        <div className="r-band">
          <div className="r-band-lbl">AI Edge Diagnostic™ · Quick Mirror · 2026-Q1 · ARI™</div>
          <div className={`r-band-name ${band}`}>{getBandName(band)}</div>
          <div className="r-band-desc">{getBandDesc(band)}</div>
          <div className="r-sal">{salMsg[band]}</div>
          <div className="r-score-row">
            <span className="r-score-val">{scores.score}</span>
            <span className="r-score-den">/ 100</span>
          </div>
          <div className="r-score-rng">Structural range: {Math.max(0, scores.score - 5)} – {Math.min(100, scores.score + 5)}</div>
          <div className="r-score-note">Reflects the structural composition of your work — not capability, performance, or potential.</div>
          <div className="r-stats">
            <div className="r-stat">
              <div className="r-stat-l">vs cohort</div>
              <div className="r-stat-v" style={{ color: "var(--text4)", fontSize: "9px", letterSpacing: "0.06em" }}>Full Diag →</div>
            </div>
            <div className="r-stat">
              <div className="r-stat-l">Trajectory</div>
              <div className="r-stat-v" style={{ color: band === "acc" ? "var(--green)" : band === "hold" ? "var(--gold)" : "var(--red)" }}>{getDirName(dir)}</div>
            </div>
            <div className="r-stat">
              <div className="r-stat-l">AI-Proof</div>
              <div className="r-stat-v" style={{ color: "var(--green)" }}>{scores.aiProofPct}%</div>
            </div>
            <div className="r-stat">
              <div className="r-stat-l">AI-Dominant</div>
              <div className="r-stat-v" style={{ color: "var(--red)" }}>{scores.aiDomPct}%</div>
            </div>
          </div>
        </div>

        {/* Edge Direction */}
        <div className="r-sec">
          <div className="r-sec-eye">Edge Direction</div>
          <div className="r-sec-title">Is your structural position moving — and which way?</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
            <div className={`r-dir-pill ${dir}`}>Direction: {getDirName(dir)}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--text4)" }}>Momentum Index: {scores.momentumIndex} / 100</div>
          </div>
          <div className="r-narr">{getDirDesc(dir)}</div>
        </div>

        {/* Work Structure */}
        <div className="r-sec">
          <div className="r-sec-eye">Section 1 — Work Structure</div>
          <div className="r-sec-title">How your hours distribute — and what each type means</div>
          <div className="r-split">
            <div className="r-split-col" style={{ background: "var(--gbg2)" }}>
              <div className="r-split-lbl" style={{ color: "var(--green)" }}>AI-Proof</div>
              <div className="r-split-pct" style={{ color: "var(--green)" }}>{scores.aiProofPct}%</div>
              <div className="r-split-desc">Framing, Insight, Deciding</div>
              <div className="r-split-bar" style={{ background: "var(--green)" }} />
              <div className="r-split-tag" style={{ color: "var(--green)" }}>Highest leverage zone</div>
            </div>
            <div className="r-split-col" style={{ background: "var(--bbg)" }}>
              <div className="r-split-lbl" style={{ color: "var(--blue)" }}>AI-Assisted</div>
              <div className="r-split-pct" style={{ color: "var(--blue)" }}>{scores.aiAsstPct}%</div>
              <div className="r-split-desc">Analysis</div>
              <div className="r-split-bar" style={{ background: "var(--blue)" }} />
              <div className="r-split-tag" style={{ color: "var(--blue)" }}>Judgment still required</div>
            </div>
            <div className="r-split-col" style={{ background: "var(--rbg)" }}>
              <div className="r-split-lbl" style={{ color: "var(--red)" }}>AI-Dominant</div>
              <div className="r-split-pct" style={{ color: "var(--red)" }}>{scores.aiDomPct}%</div>
              <div className="r-split-desc">Research, Executing</div>
              <div className="r-split-bar" style={{ background: "var(--red)" }} />
              <div className="r-split-tag" style={{ color: "var(--red)" }}>Highest compression zone</div>
            </div>
          </div>
          <div className="r-bars">
            {WORK_TYPES.map(item => (
              <div key={item.id} className="r-bar-row">
                <div className="r-bar-lbl">{item.name}</div>
                <div className="r-bar-track">
                  <div className="r-bar-fill" style={{ width: `${scores.wtRawPct[item.id]}%`, background: item.bc === "badge-proof" ? "var(--green)" : item.bc === "badge-asst" ? "var(--blue)" : "var(--red)" }} />
                </div>
                <div className="r-bar-val">{scores.wtRawPct[item.id]}%</div>
                <span className={`r-bar-badge ${item.bc === "badge-proof" ? "badge-proof-sm" : item.bc === "badge-asst" ? "badge-asst-sm" : "badge-dom-sm"}`}>
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension Overview */}
        <div className="r-sec">
          <div className="r-sec-eye">Section 2 — Dimension Overview</div>
          <div className="r-sec-title">The four structural signals that shape your score</div>
          <div className="r-dim-grid">
            {[
              { k: "Decision Density", v: scores.decisionDensity, t: "The degree to which your cognitive contribution is consequence-bearing and judgment-led" },
              { k: "Compression Exposure", v: scores.compressionExposure, inv: true, t: "The proportion of your working hours overlapping with AI's current capability zone" },
              { k: "Structural Authority", v: scores.structuralAuthority, t: "Consequence ownership × impact scope — whether your decisions carry weight" },
              { k: "Judgment Ownership", v: scores.joScore, t: "Whether you own the call or contribute to judgment owned by others" },
            ].map((d, i) => (
              <div key={i} className="r-dim-card">
                <div className="r-dim-open">
                  <div className="r-dim-score" style={{ color: sCol(d.v, d.inv) }}>{d.v}</div>
                  <div className="r-dim-name">{d.k}</div>
                  <div className="r-dim-interp">{d.t}</div>
                </div>
              </div>
            ))}
            {[
              { k: "Thinking Ownership", t: "Whether you generate the frame or fill it — original vs applied thinking" },
              { k: "Impact Boundary", t: "The scope of consequence your decisions carry — self to enterprise" },
            ].map((d, i) => (
              <div key={i} className="r-dim-card">
                <div className="r-dim-locked">
                  <div className="r-dim-score" style={{ color: "var(--text4)" }}>—</div>
                  <div className="r-dim-name">{d.k}</div>
                  <div className="r-dim-lock-blur">{d.t}</div>
                  <div className="r-dim-lock-tag">Full Diag</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three Structural Moves */}
        <div className="r-sec">
          <div className="r-sec-eye">Section 3 — Three Structural Moves</div>
          <div className="r-sec-title">What shifts your edge in the next 90 days</div>
          {moves.map((m, i) => (
            <div key={i} className="r-move">
              <div className="r-move-n">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="r-move-t">{m.t}</div>
                <div className="r-move-d">{m.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        <div className="r-upgrade">
          <div className="r-up-eye">Unlock the Full Diagnostic</div>
          <div className="r-up-title">30 questions · PDF report · Cohort comparison · Archetype analysis</div>
          <div className="r-up-body">The Quick Mirror shows you a structural signal. The Full Diagnostic shows you why — with cohort data, archetype mapping, salary defensibility scoring, and a complete dimension breakdown.</div>
          <div className="r-up-vs">
            <div className="r-up-col">
              <div className="r-up-col-lbl" style={{ color: "var(--text3)" }}>Quick Mirror</div>
              <div className="r-up-item">✓ 7 questions</div>
              <div className="r-up-item">✓ Score + Band + Direction</div>
              <div className="r-up-item">✓ Work Structure split</div>
              <div className="r-up-item">✓ Three structural moves</div>
            </div>
            <div className="r-up-col">
              <div className="r-up-col-lbl" style={{ color: "var(--gold)" }}>Full Diagnostic</div>
              <div className="r-up-item">✓ 30 questions + profile</div>
              <div className="r-up-item">✓ Cohort comparison</div>
              <div className="r-up-item">✓ Archetype analysis</div>
              <div className="r-up-item">✓ Salary Defensibility Score</div>
              <div className="r-up-item">✓ PDF report via email</div>
            </div>
          </div>
          <div className="r-up-cta">
            <div>
              <div className="r-up-price">$49 USD</div>
              <div className="r-up-price-sub">One-time · PDF delivered via email</div>
            </div>
            <Link href="/full-diagnostic" className="r-up-btn">Start Full Diagnostic →</Link>
          </div>
        </div>

        {/* Scoring Logic Toggle */}
        <div className="r-logic-wrap">
          <button className="r-logic-btn" onClick={() => setShowLogic(!showLogic)}>
            {showLogic ? "↑ Hide scoring logic" : "↓ View scoring logic"}
          </button>
          {showLogic && (
            <div className="r-logic-box">
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Decision Density (40%): Judgment Ownership × 0.42 + Thinking Ownership × 0.28 + AI-Proof Work % × 0.30</div>
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Structural Authority (25%): Consequence Visibility × 0.60 + Impact Scope × 0.40</div>
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Compression Exposure (25%): Work Type Compression × 0.55 + Time Horizon Compression × 0.45</div>
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Momentum Index (10%): Scope shift direction over last 12 months</div>
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Experience multiplier: 0.82–1.08 based on tenure</div>
              <div className="r-logic-line"><span className="r-logic-arr">→</span> Management bonus: up to +3.6 points for 10+ years</div>
            </div>
          )}
        </div>

        {/* Closing */}
        <div className="r-closing">
          <div className="r-closing-txt">
            Your score reflects where your work sits today —<br />
            <span style={{ color: "var(--gold)" }}>not where it has to stay.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="r-footer">
          AI Edge Diagnostic™ · Quick Mirror · Axionindex · 2026<br />
          <Link href="/" style={{ color: "var(--gold)", textDecoration: "none" }}>axionindex.org</Link> · <Link href="https://www.linkedin.com/in/nahatanitin/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text4)", textDecoration: "none" }}>Nitin Nahata</Link>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  if (screen === "landing") {
    return (
      <>
        <style jsx global>{`
          :root {
            --bg: #09090A;
            --bg2: #0E0E0F;
            --bg3: #131314;
            --bg4: #181819;
            --border: #1E1E20;
            --border2: #282829;
            --border3: #323234;
            --text: #F0ECE4;
            --text2: #B8B2A8;
            --text3: #7A746C;
            --text4: #45433F;
            --gold: #C9A96E;
            --gdim: #6E5A2E;
            --gbg: #0E0C07;
            --gborder: #2A2210;
            --green: #4A9467;
            --gbg2: #070F0B;
            --gbrd: #162B1E;
            --red: #A85252;
            --rbg: #100808;
            --rbrd: #311616;
            --amber: #B87A35;
            --abg: #0F0A05;
            --abrd: #3A2610;
            --blue: #4A6E9A;
            --bbg: #070A10;
            --bbrd: #182235;
          }
          body { background: var(--bg); color: var(--text); font-family: 'IBM Plex Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; font-size: 13px; line-height: 1.6; margin: 0; }
          .site-nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 28px; border-bottom: 1px solid var(--border); background: rgba(9,9,10,0.97); backdrop-filter: blur(8px); position: sticky; top: 0; z-index: 100; }
          .nav-logo { font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text); text-decoration: none; }
          .nav-logo span { color: var(--gold); }
          .nav-sep { width: 1px; height: 22px; background: var(--border2); margin: 0 18px; }
          .nav-tag { font-family: 'IBM Plex Mono', monospace; font-size: 0.52rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--text4); }
          .nav-links { display: flex; align-items: center; gap: 0; }
          .nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text4); text-decoration: none; padding: 0 14px; transition: color 0.15s; }
          .nav-link:hover { color: var(--gold); }
          .nav-link.active { color: var(--gold); }
          .qm-landing { min-height: calc(100vh - 52px); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px; position: relative; overflow: hidden; }
          .qm-landing::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,169,110,0.05), transparent); pointer-events: none; }
          .land-eyebrow { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text4); margin-bottom: 44px; text-align: center; }
          .land-title { font-family: 'Playfair Display', serif; font-size: clamp(40px, 7vw, 76px); font-weight: 400; text-align: center; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 6px; }
          .land-tm { font-size: clamp(14px, 2vw, 24px); vertical-align: super; color: var(--gold); }
          .land-subtitle { font-family: 'Playfair Display', serif; font-size: clamp(14px, 1.8vw, 18px); color: var(--text3); letter-spacing: 0.06em; text-align: center; margin-bottom: 8px; }
          .land-sub { font-size: 12px; letter-spacing: 0.1em; text-align: center; color: var(--text3); margin-bottom: 8px; text-transform: uppercase; }
          .land-tag { font-size: 11px; color: var(--text4); letter-spacing: 0.06em; text-align: center; margin-bottom: 44px; }
          .land-thesis { max-width: 500px; text-align: center; margin-bottom: 36px; }
          .land-thesis p { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(15px, 2vw, 18px); line-height: 1.7; color: var(--text2); margin-bottom: 6px; }
          .land-q { font-family: 'Playfair Display', serif; font-size: clamp(14px, 1.8vw, 17px); line-height: 1.7; color: var(--text); margin-top: 10px; }
          .land-divider { width: 1px; height: 32px; background: var(--border2); margin: 28px auto; }
          .land-modes { display: grid; grid-template-columns: 1fr; gap: 2px; max-width: 520px; width: 100%; margin-bottom: 28px; }
          .mode-card { background: var(--bg3); border: 1px solid var(--border); padding: 28px 24px; cursor: pointer; transition: all 0.15s; position: relative; }
          .mode-card:hover { border-color: var(--gdim); background: var(--bg4); }
          .mode-badge { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; display: block; }
          .mode-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 400; margin-bottom: 10px; line-height: 1.3; }
          .mode-desc { font-size: 12px; color: var(--text3); line-height: 1.65; margin-bottom: 16px; }
          .mode-meta { font-size: 10px; color: var(--text4); letter-spacing: 0.05em; text-transform: uppercase; }
          .mode-arrow { position: absolute; bottom: 22px; right: 22px; font-size: 14px; color: var(--text4); transition: all 0.15s; }
          .mode-card:hover .mode-arrow { color: var(--gold); transform: translateX(3px); }
          .land-disc { font-size: 11px; color: var(--text4); text-align: center; max-width: 480px; line-height: 1.65; }
        `}</style>
        <nav className="site-nav">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" className="nav-logo">AI <span>EDGE</span> LAB</Link>
            <div className="nav-sep" />
            <span className="nav-tag">Doctrine · 2026</span>
          </div>
          <div className="nav-links">
            <Link href="/#shifts" className="nav-link">Doctrine</Link>
            <Link href="/#edge" className="nav-link">Framework</Link>
            <Link href="/quick-mirror" className="nav-link active">Assessment</Link>
            <Link href="/#cta" className="nav-link">Resources</Link>
            <Link href="https://www.linkedin.com/in/nahatanitin/" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn ↗</Link>
          </div>
        </nav>
        {renderLanding()}
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #09090A; --bg2: #0E0E0F; --bg3: #131314; --bg4: #181819;
          --border: #1E1E20; --border2: #282829; --border3: #323234;
          --text: #F0ECE4; --text2: #B8B2A8; --text3: #7A746C; --text4: #45433F;
          --gold: #C9A96E; --gdim: #6E5A2E; --gbg: #0E0C07; --gborder: #2A2210;
          --green: #4A9467; --gbg2: #070F0B; --gbrd: #162B1E;
          --red: #A85252; --rbg: #100808; --rbrd: #311616;
          --amber: #B87A35; --abg: #0F0A05; --abrd: #3A2610;
          --blue: #4A6E9A; --bbg: #070A10; --bbrd: #182235;
        }
        body { background: var(--bg); color: var(--text); font-family: 'IBM Plex Sans', system-ui, sans-serif; -webkit-font-smoothing: antialiased; font-size: 13px; line-height: 1.6; margin: 0; }
        .shell { min-height: 100vh; display: flex; flex-direction: column; }
        .shell-hd { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; border-bottom: 1px solid var(--border); background: rgba(9,9,10,0.95); backdrop-filter: blur(8px); }
        .shell-brand { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text4); }
        .shell-back { font-size: 10px; color: var(--text3); cursor: pointer; background: none; border: none; font-family: inherit; letter-spacing: 0.06em; transition: color 0.15s; }
        .shell-back:hover { color: var(--gold); }
        .prog-track { height: 2px; background: var(--border); }
        .prog-fill { height: 2px; background: linear-gradient(90deg, var(--gold), var(--green)); transition: width 0.4s ease; }
        .q-shell { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; overflow-y: auto; }
        .q-inner { max-width: 720px; width: 100%; }
        .q-act { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
        .q-ctr { font-size: 10px; color: var(--text4); letter-spacing: 0.07em; margin-bottom: 10px; font-family: 'IBM Plex Mono', monospace; }
        .q-text { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 24px); font-weight: 400; line-height: 1.4; margin-bottom: 6px; }
        .q-sub { font-size: 12px; color: var(--text3); line-height: 1.6; margin-bottom: 20px; font-style: italic; max-width: 580px; padding-left: 10px; border-left: 1px solid var(--border); }
        .q-block { border: 1px solid var(--border); }
        .q-row { display: grid; grid-template-columns: 1fr 150px 56px; align-items: center; padding: 11px 14px; border-bottom: 1px solid var(--border); gap: 12px; }
        .q-row:last-child { border-bottom: none; }
        @media (max-width: 560px) { .q-row { grid-template-columns: 1fr 56px; } }
        .q-row-name { font-size: 13px; font-weight: 500; color: var(--text); }
        .q-row-desc { font-size: 10px; color: var(--text4); margin-top: 2px; }
        .q-row-badge { font-size: 9px; letter-spacing: 0.06em; padding: 1px 6px; border: 1px solid; margin-top: 4px; display: inline-block; }
        .badge-proof { color: var(--green); border-color: var(--gbrd); background: var(--gbg2); }
        .badge-dom { color: var(--red); border-color: var(--rbrd); background: var(--rbg); }
        .badge-asst { color: var(--blue); border-color: var(--bbrd); background: var(--bbg); }
        @media (max-width: 560px) { .q-row-desc, .q-row-badge { display: none; } }
        .q-slider { width: 100%; accent-color: var(--gold); cursor: pointer; }
        .q-val { font-family: 'IBM Plex Mono', monospace; font-size: 18px; color: var(--gold); text-align: right; }
        .q-total { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: var(--bg3); border: 1px solid var(--border); margin-top: 2px; }
        .q-total.ok { border-color: var(--gbrd); background: var(--gbg2); }
        .q-total.over { border-color: var(--rbrd); background: var(--rbg); }
        .q-total-lbl { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text4); }
        .q-total-val { font-family: 'IBM Plex Mono', monospace; font-size: 16px; }
        .q-total-val.ok { color: var(--green); }
        .q-total-val.over { color: var(--red); }
        .q-err { font-size: 11px; color: var(--red); margin-top: 5px; font-style: italic; }
        .q-viz { margin-top: 12px; }
        .q-viz-bar { display: flex; height: 4px; border-radius: 2px; overflow: hidden; gap: 1px; margin-bottom: 8px; }
        .q-viz-seg { height: 100%; transition: width 0.25s ease; }
        .q-viz-leg { display: flex; flex-wrap: wrap; gap: 8px; }
        .q-viz-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: var(--text4); }
        .q-viz-dot { width: 7px; height: 7px; border-radius: 1px; flex-shrink: 0; }
        .sq-shell { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; }
        .sq-inner { max-width: 640px; width: 100%; }
        .sq-act { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 10px; }
        .sq-ctr { font-size: 10px; color: var(--text4); letter-spacing: 0.07em; margin-bottom: 10px; font-family: 'IBM Plex Mono', monospace; }
        .sq-text { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 24px); font-weight: 400; line-height: 1.4; margin-bottom: 20px; }
        .sq-opts { display: flex; flex-direction: column; gap: 4px; }
        .sq-opt { background: var(--bg3); border: 1px solid var(--border); padding: 13px 16px; cursor: pointer; transition: all 0.13s; display: flex; gap: 13px; align-items: flex-start; }
        .sq-opt:hover { border-color: var(--border2); background: var(--bg4); }
        .sq-opt.sel { border-color: var(--gdim) !important; background: var(--gbg) !important; }
        .sq-opt-l { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--text4); min-width: 13px; padding-top: 2px; flex-shrink: 0; }
        .sq-opt-t { font-size: 13px; color: var(--text2); line-height: 1.4; }
        .sq-opt-s { font-size: 10px; color: var(--text4); margin-top: 3px; }
        .nav-buttons { display: flex; align-items: center; justify-content: space-between; margin-top: 28px; }
        .btn-p { background: var(--gold); color: #09090A; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 12px 28px; border: none; cursor: pointer; font-family: 'IBM Plex Sans', sans-serif; font-weight: 600; transition: background 0.15s; }
        .btn-p:hover { background: #DDB85C; }
        .btn-p:disabled { background: var(--bg4); color: var(--text4); cursor: not-allowed; }
        .btn-g { background: none; border: 1px solid var(--border2); color: var(--text3); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 12px 24px; cursor: pointer; font-family: 'IBM Plex Sans', sans-serif; transition: all 0.15s; }
        .btn-g:hover { border-color: var(--gdim); color: var(--text); }
        .brief-wrap { max-width: 640px; margin: 0 auto; padding: 48px 24px; flex: 1; }
        .brief-eye { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 16px; }
        .brief-title { font-family: 'Playfair Display', serif; font-size: clamp(22px, 3.5vw, 34px); font-weight: 400; line-height: 1.2; margin-bottom: 24px; }
        .brief-item { display: flex; gap: 12px; margin-bottom: 12px; }
        .brief-dot { width: 3px; height: 3px; background: var(--gold); border-radius: 50%; margin-top: 8px; flex-shrink: 0; }
        .brief-text { font-size: 13px; color: var(--text2); line-height: 1.65; }
        .brief-rule { height: 1px; background: var(--border); margin: 24px 0; }
        .brief-note { font-size: 11px; color: var(--text4); line-height: 1.65; margin-bottom: 28px; font-style: italic; }
        .ari-tag { display: inline-block; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gborder); background: var(--gbg); padding: 3px 10px; font-family: 'IBM Plex Mono', monospace; margin-bottom: 12px; }
        .edge-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin: 16px 0; }
        @media (max-width: 480px) { .edge-grid { grid-template-columns: 1fr; } }
        .edge-item { background: var(--bg3); border: 1px solid var(--border); padding: 16px 18px; }
        .edge-l { font-family: 'IBM Plex Mono', monospace; font-size: 22px; color: var(--gold); font-weight: 300; margin-bottom: 3px; }
        .edge-w { font-size: 12px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
        .edge-d { font-size: 11px; color: var(--text3); line-height: 1.4; }
        .prof-wrap { max-width: 700px; margin: 0 auto; padding: 48px 24px; flex: 1; }
        .prof-sec { margin-bottom: 32px; }
        .prof-lbl { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
        .prof-hint { font-size: 11px; color: var(--text4); line-height: 1.5; margin-bottom: 14px; font-style: italic; }
        .opt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        @media (max-width: 440px) { .opt-grid { grid-template-columns: 1fr; } }
        .opt-card { background: var(--bg3); border: 1px solid var(--border); padding: 12px 14px; cursor: pointer; transition: all 0.13s; }
        .opt-card:hover { border-color: var(--border2); background: var(--bg4); }
        .opt-card.sel { border-color: var(--gdim) !important; background: var(--gbg) !important; }
        .opt-card-t { font-size: 13px; color: var(--text2); }
        .opt-card-s { font-size: 10px; color: var(--text4); margin-top: 3px; }
        .res-wrap { max-width: 680px; margin: 0 auto; padding: 60px 24px 80px; }
        .r-band { text-align: center; padding-bottom: 40px; border-bottom: 1px solid var(--border); margin-bottom: 40px; }
        .r-band-lbl { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text4); margin-bottom: 14px; }
        .r-band-name { font-family: 'Playfair Display', serif; font-size: clamp(36px, 6vw, 62px); font-weight: 400; line-height: 1; margin-bottom: 14px; }
        .r-band-name.acc { color: var(--green); }
        .r-band-name.hold { color: var(--gold); }
        .r-band-name.thin { color: var(--red); }
        .r-band-desc { font-size: 13px; color: var(--text2); line-height: 1.65; max-width: 520px; margin: 0 auto 14px; }
        .r-sal { font-size: 11px; color: var(--text3); font-style: italic; max-width: 520px; margin: 0 auto; }
        .r-score-row { display: flex; align-items: baseline; justify-content: center; gap: 6px; margin-bottom: 6px; margin-top: 24px; }
        .r-score-val { font-family: 'IBM Plex Mono', monospace; font-size: 48px; font-weight: 300; color: var(--text); line-height: 1; }
        .r-score-den { font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: var(--text4); }
        .r-score-rng { font-size: 11px; color: var(--text4); letter-spacing: 0.06em; text-align: center; margin-bottom: 6px; }
        .r-score-note { font-size: 12px; color: var(--text4); font-style: italic; max-width: 440px; margin: 0 auto; text-align: center; }
        .r-stats { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--border); margin: 24px auto; max-width: 520px; }
        .r-stat { padding: 10px 12px; border-right: 1px solid var(--border); }
        .r-stat:last-child { border-right: none; }
        .r-stat-l { font-size: 9px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--text4); margin-bottom: 3px; }
        .r-stat-v { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 300; }
        .r-sec { margin-bottom: 36px; padding-bottom: 36px; border-bottom: 1px solid var(--border); }
        .r-sec:last-of-type { border-bottom: none; }
        .r-sec-eye { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .r-sec-title { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 24px); font-weight: 400; margin-bottom: 14px; line-height: 1.25; }
        .r-dir-pill { display: inline-block; padding: 8px 20px; margin-bottom: 12px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'IBM Plex Mono', monospace; }
        .r-dir-pill.acc { border: 1px solid var(--gbrd); color: var(--green); background: var(--gbg2); }
        .r-dir-pill.hold { border: 1px solid var(--gborder); color: var(--gold); background: var(--gbg); }
        .r-dir-pill.thin { border: 1px solid var(--rbrd); color: var(--red); background: var(--rbg); }
        .r-narr { font-size: 13px; color: var(--text3); line-height: 1.65; }
        .r-split { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); overflow: hidden; margin: 14px 0; }
        .r-split-col { padding: 14px 12px; }
        .r-split-lbl { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; margin-bottom: 4px; }
        .r-split-pct { font-family: 'IBM Plex Mono', monospace; font-size: 28px; font-weight: 300; line-height: 1; margin-bottom: 4px; }
        .r-split-desc { font-size: 10px; color: var(--text4); line-height: 1.35; margin-bottom: 7px; }
        .r-split-bar { height: 3px; border-radius: 2px; }
        .r-split-tag { font-size: 10px; margin-top: 5px; }
        .r-bars { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); padding: 8px 12px; }
        .r-bar-row { display: flex; align-items: center; gap: 9px; padding: 5px 0; border-bottom: 1px solid var(--border); font-size: 11px; }
        .r-bar-row:last-child { border-bottom: none; }
        .r-bar-lbl { flex: 1; color: var(--text3); }
        .r-bar-track { flex: 0 0 110px; height: 4px; background: var(--border2); border-radius: 2px; position: relative; }
        .r-bar-fill { position: absolute; left: 0; top: 0; height: 4px; border-radius: 2px; }
        .r-bar-val { font-family: 'IBM Plex Mono', monospace; font-size: 11px; min-width: 28px; text-align: right; }
        .r-bar-badge { font-size: 9px; padding: 1px 6px; border: 1px solid; }
        .badge-proof-sm { color: var(--green); border-color: var(--gbrd); }
        .badge-dom-sm { color: var(--red); border-color: var(--rbrd); }
        .badge-asst-sm { color: var(--blue); border-color: var(--bbrd); }
        .r-dim-grid { display: flex; flex-direction: column; gap: 2px; margin-top: 12px; }
        .r-dim-card { border: 1px solid var(--border); }
        .r-dim-open { background: var(--bg3); padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
        .r-dim-locked { background: #1C1C1E; border: 1px solid #2A2A2C; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
        .r-dim-score { font-family: 'IBM Plex Mono', monospace; font-size: 22px; font-weight: 300; min-width: 42px; text-align: right; flex-shrink: 0; }
        .r-dim-name { font-size: 12px; font-weight: 500; flex: 1; color: var(--text2); }
        .r-dim-interp { font-size: 11px; color: var(--text3); }
        .r-dim-lock-tag { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text4); padding: 2px 8px; border: 1px solid var(--border); flex-shrink: 0; font-family: 'IBM Plex Mono', monospace; }
        .r-dim-lock-blur { filter: blur(3px); pointer-events: none; user-select: none; font-size: 11px; color: var(--text3); flex: 2; }
        .r-move { display: flex; gap: 12px; align-items: flex-start; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .r-move:last-child { border-bottom: none; }
        .r-move-n { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--gold); flex-shrink: 0; width: 22px; padding-top: 2px; letter-spacing: 0.06em; }
        .r-move-t { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
        .r-move-d { font-size: 11px; color: var(--text3); line-height: 1.55; }
        .r-upgrade { background: var(--gbg); border: 1px solid var(--gborder); border-top: 2px solid var(--gold); padding: 24px 26px; margin-top: 32px; }
        .r-up-eye { font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
        .r-up-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 400; color: var(--text); margin-bottom: 8px; line-height: 1.3; }
        .r-up-body { font-size: 12px; color: var(--text3); line-height: 1.7; margin-bottom: 14px; }
        .r-up-vs { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); overflow: hidden; margin: 14px 0; }
        .r-up-col { background: var(--bg3); padding: 13px 14px; }
        .r-up-col-lbl { font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; margin-bottom: 8px; }
        .r-up-item { font-size: 11px; color: var(--text3); padding: 4px 0; border-bottom: 1px solid var(--border); display: flex; gap: 6px; align-items: flex-start; line-height: 1.4; }
        .r-up-item:last-child { border-bottom: none; }
        .r-up-cta { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--gborder); }
        .r-up-price { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: var(--gold); }
        .r-up-price-sub { font-size: 10px; color: var(--text4); margin-top: 2px; }
        .r-up-btn { background: var(--gold); color: var(--bg); font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.09em; text-transform: uppercase; padding: 11px 20px; cursor: pointer; border: none; white-space: nowrap; text-decoration: none; }
        .r-up-btn:hover { background: #DDB85C; }
        .r-logic-wrap { text-align: center; margin-top: 28px; }
        .r-logic-btn { background: none; border: none; color: var(--text4); font-size: 10px; letter-spacing: 0.1em; cursor: pointer; font-family: inherit; text-decoration: underline; text-underline-offset: 3px; }
        .r-logic-btn:hover { color: var(--text3); }
        .r-logic-box { background: var(--bg3); border: 1px solid var(--border); padding: 14px 16px; max-width: 560px; margin: 10px auto 0; text-align: left; }
        .r-logic-line { font-size: 10px; color: var(--text3); line-height: 1.6; display: flex; gap: 7px; margin-bottom: 4px; font-family: 'IBM Plex Mono', monospace; }
        .r-logic-arr { color: var(--gdim); flex-shrink: 0; }
        .r-closing { text-align: center; padding: 48px 24px 60px; }
        .r-closing-txt { font-family: 'Playfair Display', serif; font-size: clamp(16px, 2.5vw, 22px); color: var(--text); line-height: 1.9; max-width: 460px; margin: 0 auto; }
        .r-footer { text-align: center; font-size: 10px; color: var(--text4); line-height: 1.8; margin-top: 16px; }
      `}</style>
      <div className="shell">
        <div className="shell-hd">
          <span className="shell-brand">AI Edge Diagnostic™ — Quick Mirror</span>
          <button className="shell-back" onClick={() => changeScreen("landing")}>← Home</button>
        </div>
        <div className="prog-track">
          <div className="prog-fill" style={{ width: `${progress}%` }} />
        </div>
        {screen === "brief" && renderBrief()}
        {screen === "profile" && renderProfile()}
        {screen === "wt" && renderSlider("wt")}
        {screen === "jo" && renderSlider("jo")}
        {screen === "to" && renderSlider("to")}
        {screen === "imp" && renderSlider("imp")}
        {screen === "th" && renderSlider("th")}
        {screen === "qC" && renderSingle(Q_CONSEQUENCE, 6, 7)}
        {screen === "qT" && renderSingle(Q_MOMENTUM, 7, 7)}
        {screen === "results" && renderResults()}
      </div>
    </>
  );
}
