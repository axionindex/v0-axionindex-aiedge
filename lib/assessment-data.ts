// Quick Mirror (Free) Assessment - 6 Questions
export const quickMirrorQuestions = [
  {
    id: 1,
    dimension: "Exposure / Edge Diagnosis",
    question:
      "Over the past four weeks, how has your time actually been allocated?",
    whyThisQuestion:
      "The foundational signal. Where time goes is where value is anchored.",
    options: [
      {
        label: "A",
        text: "70% or more in structured output — analysis, research, reporting, drafting, process coordination",
        signal: "Strong compression signal",
        points: 1,
      },
      {
        label: "B",
        text: "50–70% in structured output",
        signal: "Moderate compression signal",
        points: 2,
      },
      {
        label: "C",
        text: "Roughly balanced between output and judgment",
        signal: "Transitional zone",
        points: 3,
      },
      {
        label: "D",
        text: "50–70% in decision ownership, framing, or influence",
        signal: "Moderate judgment density",
        points: 4,
      },
      {
        label: "E",
        text: "70% or more in consequence-bearing decisions and framing",
        signal: "Strong edge signal",
        points: 5,
      },
    ],
  },
  {
    id: 2,
    dimension: "Decision Density / Edge Diagnosis",
    question: "The decisions you make most often are best described as:",
    whyThisQuestion:
      "Decision type is the single highest-impact variable. Rule-based decisions are already being compressed. Unique decisions retain structural protection.",
    options: [
      {
        label: "A",
        text: "Rule-based — I apply established process, policy, or precedent",
        signal: "High compression",
        points: 1,
      },
      {
        label: "B",
        text: "Pattern-based — rules exist but I interpret which applies",
        signal: "Moderate compression",
        points: 2,
      },
      {
        label: "C",
        text: "Trade-off decisions — I weigh competing priorities within known constraints",
        signal: "Moderate protection",
        points: 3,
      },
      {
        label: "D",
        text: "Context-specific — visible consequences, judgment over precedent",
        signal: "Strong edge signal",
        points: 4,
      },
      {
        label: "E",
        text: "Unique and direction-setting — no clear precedent, I own the consequence",
        signal: "Strongest edge signal",
        points: 5,
      },
    ],
  },
  {
    id: 3,
    dimension: "Decision Density / Edge Diagnosis",
    question:
      "Before beginning research or execution, how often do you define the problem in your own words?",
    whyThisQuestion:
      "Problem framing is the most upstream AI-proof capability. Framing frequency is a direct proxy for judgment depth.",
    options: [
      {
        label: "A",
        text: "Rarely — I start from the brief or task as given",
        signal: "Low framing investment",
        points: 1,
      },
      {
        label: "B",
        text: "Occasionally — when the problem feels unclear",
        signal: "Reactive framing",
        points: 2,
      },
      {
        label: "C",
        text: "About half the time",
        signal: "Developing habit",
        points: 3,
      },
      {
        label: "D",
        text: "Most of the time — I reframe before I begin",
        signal: "Strong framing practice",
        points: 4,
      },
      {
        label: "E",
        text: "Always — framing precedes every action",
        signal: "Framing as default mode",
        points: 5,
      },
    ],
  },
  {
    id: 4,
    dimension: "Economic Anchoring / Edge Diagnosis",
    question:
      "When decisions you influence go wrong, how visible is your accountability?",
    whyThisQuestion:
      "AI cannot carry consequence. Roles where a human must genuinely own the outcome retain a structural human premium.",
    options: [
      {
        label: "A",
        text: "Not visible — accountability sits clearly elsewhere",
        signal: "No consequence anchor",
        points: 1,
      },
      {
        label: "B",
        text: "Indirect — I contributed but others carry the outcome",
        signal: "Low consequence ownership",
        points: 2,
      },
      {
        label: "C",
        text: "Shared — I am one of several accountable parties",
        signal: "Partial ownership",
        points: 3,
      },
      {
        label: "D",
        text: "Direct — the outcome is primarily attributed to me",
        signal: "Strong ownership signal",
        points: 4,
      },
      {
        label: "E",
        text: "Explicit and attributable — my name is on it",
        signal: "Strongest AI-proof signal",
        points: 5,
      },
    ],
  },
  {
    id: 5,
    dimension: "Exposure — Quiet Wake-Up",
    question:
      "If AI generated the structured output in your role for the next six months — the research, first drafts, reports, and analysis — what would happen?",
    instruction:
      "The following question is designed to be uncomfortable. Answer it based on last month — not your aspirational role.",
    whyThisQuestion:
      "Forces honest separation between the structured output layer and the judgment layer of the role.",
    options: [
      {
        label: "A",
        text: "My value would significantly reduce — most of what I do would be covered",
        signal: "High compression exposure",
        points: 1,
      },
      {
        label: "B",
        text: "My output would look similar — I could review and refine what AI produced",
        signal: "Moderate compression exposure",
        points: 2,
      },
      {
        label: "C",
        text: "My role would shift — I'd spend more time on judgment and less on production",
        signal: "Transitional signal",
        points: 3,
      },
      {
        label: "D",
        text: "My leverage would increase — less time on output, more on direction",
        signal: "Strong edge signal",
        points: 4,
      },
      {
        label: "E",
        text: "My core contribution would be unchanged — it was never about the output",
        signal: "Strongest edge signal",
        points: 5,
      },
    ],
  },
  {
    id: 6,
    dimension: "Growth of Boundary / Edge Trajectory",
    question:
      "Over the past year, has the nature of your work shifted toward more judgment and decision ownership — or stayed the same?",
    whyThisQuestion:
      "The trajectory question. Determines whether edge is accelerating, holding, or thinning over time.",
    options: [
      {
        label: "A",
        text: "My scope has narrowed — I am doing more defined, structured work than before",
        signal: "Thinning trajectory",
        points: 1,
      },
      {
        label: "B",
        text: "My scope has stayed largely the same",
        signal: "Holding trajectory",
        points: 2,
      },
      {
        label: "C",
        text: "Slight expansion — I have taken on marginally more judgment-based work",
        signal: "Modest growth",
        points: 3,
      },
      {
        label: "D",
        text: "Meaningful expansion — my decision boundary has clearly grown",
        signal: "Growing trajectory",
        points: 4,
      },
      {
        label: "E",
        text: "Significant expansion into new domains of consequence and judgment",
        signal: "Accelerating trajectory",
        points: 5,
      },
    ],
  },
];

// Full Diagnostic (Paid) Assessment sections
export const fullDiagnosticSections = {
  section1: {
    title: "Structural Level Derivation",
    purpose:
      "Derive structural operating level. No title declared — level is derived from answers.",
    questions: [
      {
        id: "s1q1",
        question: "What is the furthest boundary of impact of your decisions?",
        options: [
          { label: "A", text: "Self", points: 1 },
          { label: "B", text: "Team", points: 2 },
          { label: "C", text: "Function", points: 3 },
          { label: "D", text: "Cross-functional", points: 4 },
          { label: "E", text: "Enterprise", points: 5 },
        ],
      },
      {
        id: "s1q2",
        question:
          "Over what time horizon do your decisions materially operate?",
        options: [
          { label: "A", text: "Daily / weekly", points: 1 },
          { label: "B", text: "Quarterly", points: 2 },
          { label: "C", text: "Annual", points: 3 },
          { label: "D", text: "Multi-year", points: 4 },
        ],
      },
      {
        id: "s1q3",
        question: "When ambiguity is high, who resolves it?",
        options: [
          { label: "A", text: "My manager", points: 1 },
          { label: "B", text: "Shared discussion", points: 2 },
          {
            label: "C",
            text: "Me — it comes to me because no one else can hold it",
            points: 3,
          },
        ],
      },
      {
        id: "s1q4",
        question:
          "If a high-stakes decision fails, where does accountability land?",
        options: [
          { label: "A", text: "Upward — with my manager or above", points: 1 },
          { label: "B", text: "Shared across the team", points: 2 },
          { label: "C", text: "Directly with me", points: 3 },
        ],
      },
      {
        id: "s1q5",
        question:
          "How often are you the final decision node — the person whose call it is?",
        options: [
          { label: "A", text: "Rarely", points: 1 },
          { label: "B", text: "Sometimes", points: 2 },
          { label: "C", text: "Frequently", points: 3 },
          { label: "D", text: "Almost always", points: 4 },
        ],
      },
    ],
  },
  section2: {
    title: "Scope Chain Allocation",
    purpose:
      "Allocate exactly 100% of your working time across the five elements.",
    instruction:
      "Total allocation must equal 100%. Scarcity is defined by trade-offs.",
    workTypes: [
      {
        id: "framing",
        name: "Framing",
        aiRelationship: "AI-PROOF",
        description:
          "Problem definition — deciding what question is worth asking before any research begins",
      },
      {
        id: "research",
        name: "Research",
        aiRelationship: "AI-DOMINANT",
        description:
          "Information gathering — synthesising sources, scanning, building the information base",
      },
      {
        id: "analysis",
        name: "Analysis",
        aiRelationship: "AI-ASSISTED",
        description:
          "Structuring, modelling, interpreting — turning information into understanding",
      },
      {
        id: "decision",
        name: "Decision",
        aiRelationship: "TYPE-DEPENDENT",
        description:
          "Converting analysis into committed action — making the call and owning the direction",
      },
      {
        id: "influence",
        name: "Influence",
        aiRelationship: "AI-PROOF",
        description:
          "Stakeholder alignment — getting people with competing interests to commit to a direction",
      },
    ],
  },
  section3: {
    title: "Decision Taxonomy",
    purpose: "Distribute your last 10 meaningful decisions across the four types below.",
    instruction: "Diagnostic integrity requires full allocation.",
    decisionTypes: [
      {
        id: "ruleBased",
        name: "Rule-Based",
        aiCompression: "High compression",
        description:
          "Clear criteria exist. You apply established policy, process, or precedent. The answer is knowable in advance.",
      },
      {
        id: "patternBased",
        name: "Pattern-Based with Interpretation",
        aiCompression: "Moderate compression",
        description:
          "Rules exist but the situation requires judgment about which rule applies or what the spirit of the policy is.",
      },
      {
        id: "tradeOff",
        name: "Trade-off within Constraints",
        aiCompression: "Lower compression",
        description:
          "No clear rule, but similar situations have existed. You draw on experience and contextual judgment.",
      },
      {
        id: "unique",
        name: "Unique and Precedent-Setting",
        aiCompression: "Structurally protected",
        description:
          "No precedent. High stakes. Incomplete information. You form the view, make the call, own the consequence.",
      },
    ],
  },
  section4: {
    title: "Judgment Depth Calibration",
    purpose:
      "Rate each statement from 1 (rarely true) to 5 (almost always true). Answer based on reality, not aspiration.",
    statements: [
      {
        id: "jd1",
        text: "I form a hypothesis or point of view before gathering input or research.",
        measures:
          "Positional conviction — root capability in an AI-abundant world",
      },
      {
        id: "jd2",
        text: "When the brief is ambiguous, I am asked to define the scope before others begin work.",
        measures:
          "Tacit leverage — tests whether contextual authority is real and recognised by others",
      },
      {
        id: "jd3",
        text: "My decisions regularly operate under conditions of genuine ambiguity.",
        measures:
          "Ambiguity tolerance — ability to act decisively when the right answer is unclear",
      },
      {
        id: "jd4",
        text: "I absorb the consequences personally when outcomes I influenced fail.",
        measures:
          "Consequence ownership — the structural human premium AI cannot replicate",
      },
    ],
  },
  section5: {
    title: "Compression Exposure Audit",
    purpose:
      "Of the structured output work in your role, allocate exactly 100% across these categories.",
    instruction: "Diagnostic integrity requires full allocation.",
    categories: [
      {
        id: "research",
        name: "Research synthesis and information gathering",
        coefficient: 88,
      },
      {
        id: "documents",
        name: "Document, slide, and report creation",
        coefficient: 75,
      },
      {
        id: "reporting",
        name: "Structured reporting and dashboards",
        coefficient: 70,
      },
      {
        id: "process",
        name: "Process coordination and workflow management",
        coefficient: 65,
      },
      {
        id: "compliance",
        name: "Documentation, compliance, and structured filing",
        coefficient: 60,
      },
    ],
  },
  section6: {
    title: "Direction of Travel",
    purpose:
      "Determines momentum component — whether edge is accelerating, holding, or thinning.",
    questions: [
      {
        id: "d1",
        question:
          "Over the last 12 months, has your decision boundary expanded, remained stable, or contracted?",
        options: [
          {
            label: "A",
            text: "Contracted — I have less decision authority than a year ago",
            points: 1,
          },
          { label: "B", text: "Remained stable", points: 2 },
          { label: "C", text: "Slightly expanded", points: 3 },
          {
            label: "D",
            text: "Meaningfully expanded into new domains",
            points: 4,
          },
        ],
      },
      {
        id: "d2",
        question:
          "Over the last 12 months, has your exposure to genuine ambiguity increased or decreased?",
        options: [
          {
            label: "A",
            text: "Decreased — my work is more defined than before",
            points: 1,
          },
          { label: "B", text: "Stayed the same", points: 2 },
          {
            label: "C",
            text: "Increased — I face more genuine uncertainty now",
            points: 3,
          },
          { label: "D", text: "Significantly increased", points: 4 },
        ],
      },
      {
        id: "d3",
        question:
          "Over the last 12 months, has the consequence visibility of your work increased or decreased?",
        options: [
          {
            label: "A",
            text: "Decreased — my accountability is less visible",
            points: 1,
          },
          { label: "B", text: "Stayed the same", points: 2 },
          {
            label: "C",
            text: "Increased — outcomes are more attributable to me",
            points: 3,
          },
          { label: "D", text: "Significantly increased", points: 4 },
        ],
      },
    ],
  },
};

// Scoring utilities
export function calculateQuickMirrorScore(answers: Record<number, number>) {
  const totalRaw = Object.values(answers).reduce((sum, val) => sum + val, 0);

  // Map raw score (6-30) to edge score (0-100)
  // Using formula: Edge Score = (Judgment Density × 0.6) + ((100 - Output Exposure) × 0.4)
  // Simplified mapping for Quick Mirror
  const minRaw = 6;
  const maxRaw = 30;
  const edgeScore = Math.round(
    ((totalRaw - minRaw) / (maxRaw - minRaw)) * 100
  );

  // Determine band
  let band: "accelerating" | "holding" | "thinning";
  if (edgeScore >= 75) {
    band = "accelerating";
  } else if (edgeScore >= 50) {
    band = "holding";
  } else {
    band = "thinning";
  }

  // Determine direction from Q6
  const q6Answer = answers[6];
  let direction: "thinning" | "holding" | "accelerating";
  if (q6Answer === 1) {
    direction = "thinning";
  } else if (q6Answer === 2) {
    direction = "holding";
  } else if (q6Answer >= 3 && q6Answer <= 4) {
    direction = "holding"; // leaning accelerating
  } else {
    direction = "accelerating";
  }

  // Calculate component scores
  const judgmentDensity = Math.round(
    ((answers[2] + answers[3] + answers[4]) / 15) * 100
  );
  const outputExposure = Math.round(
    (1 - (answers[1] + answers[5]) / 10) * 100
  );
  const decisionAuthority = Math.round(
    ((answers[2] + answers[4]) / 10) * 100
  );

  return {
    edgeScore,
    band,
    direction,
    range: { min: Math.max(0, edgeScore - 5), max: Math.min(100, edgeScore + 5) },
    components: {
      judgmentDensity,
      outputExposure,
      decisionAuthority,
    },
  };
}

// Band descriptions
export const bandDescriptions = {
  accelerating: {
    title: "Edge Accelerating",
    description:
      "Your current scope is anchored primarily to consequence-bearing judgment, decision ownership, and structural influence. AI compression is not absent — but your leverage sits above it. The direction of your work is building edge, not losing it.",
  },
  holding: {
    title: "Edge Holding",
    description:
      "Your current scope combines meaningful judgment with compressible output. Your edge is intact but sensitive to how you allocate your time. The direction of your work is stable — which means intentional shifts are needed for it to accelerate.",
  },
  thinning: {
    title: "Edge Thinning",
    description:
      "A significant portion of your current scope overlaps with work AI performs with increasing capability. Your edge is not gone — but the structural pressure on your compensation is real and quiet. Small deliberate shifts compound over time.",
  },
};

// Directional shifts by band
export const directionalShifts = {
  thinning: [
    "Take ownership of one decision that carries visible consequence — budget, client outcome, delivery risk — where the outcome is attributable to you.",
    "Default research and structured drafting to AI tools. Reclaim that time for problem framing and interpretation.",
    "Decline one recurring low-judgment task this quarter and reallocate that time to framing or influence.",
  ],
  holding: [
    "Move from recommendation provider to decision proposer — propose a call and a consequence path, not just analysis.",
    "Identify one recurring output in your role and default it to AI. Reclaim that time for problem ownership.",
    "Increase problem framing time by 10% this quarter — write the problem before beginning research.",
  ],
  accelerating: [
    "Codify your decision boundary — make ownership visible and explicit, not assumed.",
    "Create one judgment artifact per month — a decision memo, trade-off note, or pre-mortem that documents your reasoning.",
    "Reduce time in AI-dominant work by default — delegate research and structured synthesis to tools as a standing practice.",
  ],
};
