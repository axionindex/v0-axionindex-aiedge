"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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

const ARCHETYPES = [
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
  const frA = qa.q3a,
    frB = qa.q3b,
    frC = qa.q3c;
  const frMap: Record<string, number> = { A: 0, B: 25, C: 50, D: 75, E: 100 };
  const framingScore = Math.round(((frMap[frA] || 0) + (frMap[frB] || 0) + (frMap[frC] || 0)) / 3);

  // Q4 consequence multi-axis
  const cqA = qa.q4a,
    cqB = qa.q4b;
  const cqMap: Record<string, number> = { A: 0, B: 25, C: 50, D: 75, E: 100 };
  const q4Score = Math.round(((cqMap[cqA] || 0) + (cqMap[cqB] || 0)) / 2);
  const conseqScore = Math.round(q4Score * 0.65 + revScore * 0.2 + stakesScore * 0.15);

  // Q5 impact scope two axes
  const isA = qa.q5a,
    isB = qa.q5b;
  const isMap: Record<string, number> = { A: 5, B: 22, C: 48, D: 75, E: 100 };
  const impactScore = Math.round((isMap[isA] || 0) * 0.6 + (isMap[isB] || 0) * 0.4);

  // Q6 edge mirror scenarios
  const em1 = qa.q6a,
    em2 = qa.q6b,
    em3 = qa.q6c;
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

  const scope24 = scope6; // Use 6-month as proxy

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

      {/* NOTE ON REPETITION */}
      <div
        style={{
          background: "#1C1A16",
          border: "1px solid var(--gold-dim)",
          borderLeft: "3px solid var(--gold)",
          padding: "16px 18px",
          marginBottom: 3,
        }}
      >
        <div
          style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}
        >
          A note before you begin
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--text)", marginBottom: 10, lineHeight: 1.5 }}>
          Some questions will feel familiar if you have completed the Quick Mirror. That is intentional.
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.75 }}>
          The Quick Mirror asked where your time goes across five broad options. The Full Diagnostic asks you to split it precisely across
          all six work dimensions. The Quick Mirror asked whether your decisions are rule-based or judgment-based. The Full Diagnostic asks
          you to map frequency, stakes, reversibility, and consequence ownership of those decisions separately.
          <br />
          <br />
          Same territory. Significantly more resolution. The additional precision is what makes the cohort comparison, salary defensibility
          assessment, and 90-day action plan specific to you — rather than indicative.
          <br />
          <br />
          <strong style={{ color: "var(--text2)", fontWeight: 500 }}>
            Treat each question as if you are answering it for the first time.
          </strong>
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "16px 18px", marginTop: 3, marginBottom: 3 }}>
        <div
          style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text4)", fontWeight: 700, marginBottom: 12 }}
        >
          What the Full Diagnostic produces
        </div>
        {[
          { a: "Full profile build", b: "7 profile inputs that calibrate your cohort comparison and salary defensibility" },
          { a: "13 diagnostic questions", b: "More granular and multi-dimensional than the Quick Mirror version of the same dimensions" },
          {
            a: "18-section report",
            b: "Archetype, full index breakdown, cohort comparison, salary defensibility, 9-dimension dashboard, three structural moves, 90-day plan",
          },
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

      <div
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          padding: "10px 13px",
          marginTop: 3,
          fontSize: 11,
          color: "var(--text4)",
          lineHeight: 1.6,
        }}
      >
        Answer every question based on your actual work over the past month — not your job description, not your best week, not your
        aspirations.
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 20,
          paddingTop: 20,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["13 questions", "13–16 minutes", "₹400", "Private PDF report"].map((p) => (
            <span
              key={p}
              style={{ fontSize: 10, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", padding: "3px 10px" }}
            >
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
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function FullDiagnosticPage() {
  const [screen, setScreen] = useState(0);
  const [profile, setProfile] = useState<any>({});
  const [qa, setQa] = useState<any>({});
  const [splits, setSplits] = useState<any>({ work: {}, thinking: {}, horizon: {}, sto: {} });
  const [score, setScore] = useState<any>(null);

  useEffect(() => {
    // Inject styles
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleComplete = () => {
    const sc = computeScore(profile, qa, { ...splits, qa });
    setScore(sc);
    setScreen(99); // Results screen
  };

  // Screen navigation
  if (screen === 0) {
    return <Landing onStart={() => setScreen(1)} />;
  }

  // For now, show a placeholder for the full diagnostic
  // The complete implementation would include all 13 question screens
  return (
    <Shell progress={5} onBack={() => setScreen(0)}>
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--gold)", marginBottom: 16 }}>
          Full Diagnostic
        </div>
        <div style={{ fontSize: 14, color: "var(--text3)", marginBottom: 24, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
          The complete 13-question diagnostic with profile building, cohort comparison, salary defensibility assessment, and downloadable PDF report.
        </div>
        <div style={{ background: "var(--gold-bg)", border: "1px solid var(--gold-dim)", padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
            Coming Soon
          </div>
          <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
            The Full Diagnostic is currently being finalized. Join the waitlist to be notified when it launches.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/quick-mirror" className="btn-g" style={{ textDecoration: "none" }}>
            Take Quick Mirror Instead
          </Link>
          <Link href="/#cta" className="btn-p" style={{ textDecoration: "none" }}>
            Join Waitlist
          </Link>
        </div>
      </div>
    </Shell>
  );
}
