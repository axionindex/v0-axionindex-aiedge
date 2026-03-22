"use client";

import Link from "next/link";

export default function AxionIndexSite() {
  const gold = '#C6A86E';

  const navItems = [
    {
      label: 'The System',
      items: [
        { title: 'The Problem', desc: 'Where invisible fragility begins to surface.', href: '#problem' },
        { title: 'The Axion Idea', desc: 'Why unseen forces determine visible outcomes.', href: '#axion-idea' },
        { title: 'Failure Signals', desc: 'The signals organisations miss until it is late.', href: '#signals' },
      ],
    },
    {
      label: 'Framework',
      items: [
        { title: 'Belief → Conviction → Rhythm', desc: 'The signature Axion sequence.', href: '#framework' },
        { title: 'Signature Diagrams', desc: 'Three visuals that make the doctrine memorable.', href: '#diagrams' },
        { title: 'Who This Means For', desc: 'How founders, CFOs, CHROs, and boards enter the same problem.', href: '#audience' },
      ],
    },
    {
      label: 'Work',
      items: [
        { title: 'What We Do', desc: 'How Axion Index turns ambiguity into operating clarity.', href: '#work' },
        { title: 'Domains of Work', desc: 'Where we go deep and why it matters.', href: '#domains' },
        { title: 'Proof Layer', desc: 'The operating body of work behind the positioning.', href: '#proof' },
      ],
    },
    {
      label: 'Insights',
      items: [
        { title: 'Signals from the Field', desc: 'Sharp essays and structural observations.', href: '#insights' },
        { title: 'Founder', desc: 'Built from inside unfinished organisations.', href: '#founder' },
        { title: 'Start a Conversation', desc: 'Engage Axion Index for diagnostics, advisory, and speaking.', href: '#contact' },
      ],
    },
  ];

  const problemPoints = [
    'Workforce models are fragmented',
    'Compliance is reactive',
    'Decision ownership is unclear',
    'AI is compressing entire layers of work',
  ];

  const workCards = [
    {
      title: 'Diagnose Risk',
      text: 'Identify hidden workforce, compliance, governance, and structural risks before they become visible as business failure.',
    },
    {
      title: 'Redesign Work',
      text: 'Rebuild roles, accountability, and decision logic across the organisation so scale does not create silent fracture.',
    },
    {
      title: 'Translate Regulation',
      text: 'Convert labour codes into cost, control, and operating design decisions instead of treating compliance as paperwork.',
    },
    {
      title: 'Prepare for AI',
      text: 'Map which layers of work are compressing, what remains defensible, and where judgment becomes the scarce advantage.',
    },
  ];

  const framework = [
    {
      title: 'Belief',
      text: 'Founder-led. Implicit. Fragile. Powerful — but unscalable if it lives in one person's head.',
    },
    {
      title: 'Conviction',
      text: 'Shared. Tested. Internalised. It now survives disagreement and moves without the founder in the room.',
    },
    {
      title: 'Rhythm',
      text: 'Repeatable. Predictable. System-led. Conviction becomes behaviour, governance, and operating cadence.',
    },
  ];

  const signals = [
    'Founder dependency hidden inside ordinary decisions',
    'Compliance exposure disguised as process debt',
    'Cultural fracture misdiagnosed as communication failure',
    'AI layered onto systems that never solved the basics',
  ];

  const audience = [
    {
      title: 'Founder / CEO',
      text: 'You sense something is breaking before you can name it.',
    },
    {
      title: 'CFO',
      text: 'Workforce is your largest cost — but often your least understood operating system.',
    },
    {
      title: 'CHRO',
      text: 'You are expected to solve problems that are not really "HR problems."',
    },
    {
      title: 'Board',
      text: 'You have visibility into outcomes — not the system producing them.',
    },
  ];

  const domains = [
    {
      title: 'Operating Architecture for Scaleups',
      text: 'Designing systems before structure hardens.',
    },
    {
      title: 'Labour Code Readiness',
      text: 'Compliance as organisational design, not legal burden.',
    },
    {
      title: 'AI & Work Redesign',
      text: 'Understanding compression vs defensibility of work.',
    },
    {
      title: 'Governance & Decision Ownership',
      text: 'Clarifying who actually owns what.',
    },
    {
      title: 'HR as Risk Architecture',
      text: 'Detecting failure before it becomes visible.',
    },
    {
      title: 'Cultural Contracts & Belief Systems',
      text: 'Making the invisible contracts of authority, fairness, and legitimacy explicit.',
    },
  ];

  const contrasts = [
    ['HR manages people', 'HR architects systems'],
    ['Culture is curated', 'Culture emerges from operating logic'],
    ['Compliance is backend', 'Compliance is a structural signal'],
    ['Technology is the solution', 'Technology is codified thinking'],
  ];

  const insights = [
    {
      type: 'Essay',
      title: 'Your best engineers may legally be workers.',
      text: 'Why labour codes are not a compliance update for the IT sector, but a structural reset of operating model assumptions.',
    },
    {
      type: 'Founder Note',
      title: 'When intelligence becomes cheap, judgment becomes scarce.',
      text: 'A leadership reflection on AI compression, judgment, and what the next layer of human advantage looks like.',
    },
    {
      type: 'Signal',
      title: 'The acceptance horizon is shrinking.',
      text: 'Silence, latency, and unresolved ambiguity are becoming operating liabilities in the modern workplace.',
    },
  ];

  const proofCards = [
    {
      title: '3i Labour Code Readiness Index',
      text: 'A founder-facing reference system for interpreting regulation through implication, impact, and implementation.',
    },
    {
      title: 'Diagnostic-Led Operating Review',
      text: 'A structured review of workforce architecture, decision ownership, compliance exposure, and hidden fragility.',
    },
    {
      title: 'AI Edge / Work Compression Lens',
      text: 'A model for understanding which layers of work are compressing and where human leverage still compounds.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(198,168,110,0.10),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.05),transparent_24%),linear-gradient(to_bottom,#0A0A0A,#0A0A0A)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-white/42">Axion Index</div>
            <div className="mt-1 text-sm text-white/64">Codified energy for the unfinished</div>
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            {navItems.map((nav) => (
              <div key={nav.label} className="group relative">
                <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/[0.04] hover:text-white">
                  {nav.label}
                  <span className="text-white/35">▾</span>
                </button>
                <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[360px] translate-y-2 rounded-[1.4rem] border border-white/10 bg-[#111111]/95 p-3 opacity-0 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {nav.items.map((item) => (
                    <a key={item.title} href={item.href} className="block rounded-[1rem] px-4 py-4 transition hover:bg-white/[0.04]">
                      <div className="text-sm font-medium text-white/92">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/55">{item.desc}</div>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* THE AI EDGE LAB link */}
            <Link
              href="/ai-edge-lab"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:bg-white/[0.04]"
              style={{ color: '#5BAD7A' }}
            >
              The AI Edge Lab
            </Link>
          </div>

          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
            style={{ backgroundColor: gold }}
          >
            Speak With Us
          </a>
        </div>
      </header>

      <main>
        <section className="px-6 pb-24 pt-24 lg:px-10 lg:pb-32 lg:pt-32">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-6 text-[11px] uppercase tracking-[0.38em] text-white/42">
                Operating intelligence for the future of work
              </div>
              <h1 className="max-w-5xl text-5xl font-medium leading-[0.93] tracking-[-0.06em] sm:text-6xl lg:text-[88px]">
                Your organisation is already breaking.
                <span className="block" style={{ color: gold }}>
                  You just haven&apos;t seen where.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 lg:text-xl">
                Most organisations don&apos;t fail because of bad strategy. They fail because the system underneath cannot carry it.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 lg:text-lg">
                Axion Index helps organisations diagnose, design, and control the forces that actually determine whether they scale — or break.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                  style={{ backgroundColor: gold }}
                >
                  Start a Conversation
                </a>
                <a
                  href="#framework"
                  className="rounded-full border border-white/18 px-6 py-3 text-sm text-white/86 transition hover:border-white/32 hover:bg-white/[0.03]"
                >
                  Explore the Framework
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="mb-5 text-[11px] uppercase tracking-[0.34em] text-white/40">
                Signature sequence
              </div>
              <div className="space-y-4">
                {framework.map((item, idx) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-medium tracking-[-0.03em]">{item.title}</h3>
                      <span className="text-xs uppercase tracking-[0.28em]" style={{ color: gold }}>
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/64">{item.text}</p>
                    {idx < framework.length - 1 && (
                      <div className="mt-4 text-lg" style={{ color: gold }}>
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-white/62">
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-white/36">Failure mode</span>
                  <span className="mt-2 block">Belief → Fragility</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-white/62">
                  <span className="block text-[10px] uppercase tracking-[0.28em] text-white/36">Failure mode</span>
                  <span className="mt-2 block">Conviction → Bureaucracy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">The problem</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                The system underneath work is breaking.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {problemPoints.map((point) => (
                <div key={point} className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
                  <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.03]" />
                  <p className="mt-8 text-xl leading-8 tracking-[-0.03em] text-white/88">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-3xl text-lg leading-9 text-white/66">
              Yet organisations continue to operate as if nothing has changed. What looks like inefficiency is not inefficiency.
              <span className="mt-3 block text-white">It is structural failure in slow motion.</span>
            </div>
          </div>
        </section>

        <section id="signals" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Failure signals</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                The market notices these late. We design for them early.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {signals.map((item, idx) => (
                <div key={item} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: gold }}>0{idx + 1}</div>
                  <p className="mt-8 text-xl leading-8 tracking-[-0.03em] text-white/88">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">What Axion Index does</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                We don&apos;t manage people. We design the system they operate in.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {workCards.map((card) => (
                <div key={card.title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.045]">
                  <div className="mb-5 h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.04]" />
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">{card.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-3xl text-lg leading-9 text-white/64">
              Most organisations optimise what is visible. We redesign what actually determines outcomes.
            </div>
          </div>
        </section>

        <section id="axion-idea" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">The Axion idea</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                The forces that determine outcomes are invisible.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-white/68 lg:text-lg">
              <p>
                In physics, an axion is a particle believed to hold matter together — invisible, but foundational.
              </p>
              <p>
                Organisations are no different. They are held together by belief systems, operating rhythm, decision architecture, and human energy.
              </p>
              <p>
                These forces are rarely measured. They are felt — and usually discovered only when they break.
                <span className="mt-3 block text-white">Axion Index exists to codify them.</span>
              </p>
            </div>
          </div>
        </section>

        <section id="framework" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Signature framework</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Every organisation scales through one sequence.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
              {framework.map((item, idx) => (
                <div key={item.title} className="contents">
                  <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-medium tracking-[-0.04em]">{item.title}</h3>
                      <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: gold }}>
                        stage 0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-base leading-8 text-white/66">{item.text}</p>
                  </div>
                  {idx < framework.length - 1 && (
                    <div className="hidden items-center justify-center text-3xl lg:flex" style={{ color: gold }}>
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/36">Failure mode</div>
                <div className="mt-3 text-xl tracking-[-0.03em] text-white/88">Belief without conviction → Fragility</div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/36">Failure mode</div>
                <div className="mt-3 text-xl tracking-[-0.03em] text-white/88">Conviction without rhythm → Bureaucracy</div>
              </div>
            </div>
          </div>
        </section>

        <section id="diagrams" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Signature diagrams</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Three visuals that should become Axion Index memory assets.
              </h2>
            </div>

            <div className="mt-12 space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-xl">
                    <div className="text-[10px] uppercase tracking-[0.32em] text-white/36">Diagram 01</div>
                    <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em]">Belief → Conviction → Rhythm</h3>
                    <p className="mt-4 text-base leading-8 text-white/64">The operating path from founding belief to scalable performance.</p>
                  </div>
                  <div className="grid min-w-[320px] flex-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                    {['Belief', 'Conviction', 'Rhythm'].map((item, idx) => (
                      <div key={item} className="contents">
                        <div className="rounded-[1.2rem] border border-white/10 bg-black/20 p-5 text-center text-lg text-white/90">{item}</div>
                        {idx < 2 && <div className="hidden text-center text-2xl md:block" style={{ color: gold }}>→</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/36">Diagram 02</div>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em]">Invisible Forces of Organisation</h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">A simple orbital map showing the underlying forces conventional management tools rarely capture.</p>
                <div className="mt-8 flex items-center justify-center">
                  <div className="relative h-[320px] w-[320px] rounded-full border border-white/10">
                    <div className="absolute inset-10 rounded-full border border-white/10" />
                    <div className="absolute inset-20 rounded-full border border-white/10" />
                    <div className="absolute left-1/2 top-1/2 -ml-16 -mt-16 flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-center text-sm leading-6 text-white/88">Organisational<br />Outcome</div>
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">Belief Systems</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">Decision Architecture</div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">Operating Rhythm</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm">Human Energy</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/36">Diagram 03</div>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em]">Work Compression Curve</h3>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">A positioning visual for AI-era work design: what compresses first, and where judgment and architecture become more valuable.</p>
                <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                  <div className="relative h-56 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
                    <div className="absolute bottom-8 left-8 right-8 top-8">
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
                      <div className="absolute bottom-0 left-0 top-0 w-px bg-white/15" />
                      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                        <path d="M2 80 C22 72, 36 60, 50 48 S78 24, 98 10" fill="none" stroke={gold} strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="absolute bottom-2 left-8 text-xs uppercase tracking-[0.28em] text-white/40">Execution → Analysis → Insight → Judgment</div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/64">
                    The curve shows where AI compresses work fastest and where human leverage compounds: consequence assessment, ambiguity navigation, and system design.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="audience" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">What this means for you</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Different leaders. Same underlying problem.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {audience.map((item) => (
                <div key={item.title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/64">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="domains" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Domains of work</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Where we go deep.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {domains.map((item, idx) => (
                <div key={item.title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/34">Domain 0{idx + 1}</div>
                  <h3 className="mt-6 text-2xl font-medium leading-9 tracking-[-0.03em] text-white/90">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Edge Lab Section with Link */}
        <section id="aiedge" className="border-t border-white/10 px-6 py-24 lg:px-10" style={{ background: 'linear-gradient(160deg, #080d16, #0c1220, #080d16)' }}>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em]" style={{ color: '#5BAD7A' }}>The AI Edge Lab</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Operating intelligence, <em className="italic" style={{ color: '#7BA8CC' }}>made measurable.</em>
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/66">
                Self-serve instruments that give organisations clear sight into AI exposure, labour code readiness, and operating system risk.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/ai-edge-lab"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                  style={{ backgroundColor: '#5BAD7A' }}
                >
                  Enter The AI Edge Lab →
                </Link>
                <Link
                  href="/quick-mirror"
                  className="rounded-full border px-6 py-3 text-sm transition hover:bg-white/[0.03]"
                  style={{ borderColor: 'rgba(91,173,122,0.4)', color: '#5BAD7A' }}
                >
                  Quick Mirror — Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Positioning</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                We are not a consulting firm. We are not a software company.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/66">
                We are an operating intelligence layer. We diagnose before we recommend. We design before we implement. We translate before we optimise.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10">
              {contrasts.map(([left, right], idx) => (
                <div key={left} className={`grid gap-5 bg-white/[0.02] px-6 py-6 md:grid-cols-2 ${idx !== contrasts.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div className="text-sm uppercase tracking-[0.28em] text-white/36">{left}</div>
                  <div className="text-lg leading-8 text-white/86">{right}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="insights" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Signals from the field</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Thinking that proves the system behind the brand.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {insights.map((card) => (
                <div key={card.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/18 hover:bg-white/[0.045]">
                  <div className="text-[10px] uppercase tracking-[0.32em]" style={{ color: gold }}>{card.type}</div>
                  <h3 className="mt-5 text-2xl font-medium leading-9 tracking-[-0.03em] text-white/92">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{card.text}</p>
                  <div className="mt-6 text-sm text-white/42">Read note →</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <div className="max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Proof layer</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                More than beautiful positioning. A real operating body of work.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {proofCards.map((card) => (
                <div key={card.title} className="rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Founder</div>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Built from inside the system.
              </h2>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
              <div className="text-3xl font-medium tracking-[-0.04em]">Nitin Nahata</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.34em] text-white/40">Founder · Operating Architect</div>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/66">
                22+ years across Tata, Udaan, and Gameskraft. Focused on one question: what happens to organisations when the economics of work change?
              </p>
              <div className="mt-10 border-l-2 pl-5 text-2xl leading-10 tracking-[-0.03em] text-white/90" style={{ borderColor: gold }}>
                &ldquo;HR&apos;s role is not to manage people. It is to architect the system where belief becomes performance.&rdquo;
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.38em] text-white/40">Final note</div>
                <h2 className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Before failure is visible, redesign is still optional.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 lg:text-lg">
                  By the time failure is visible, redesign is no longer optional. It is expensive. Axion Index helps you act before that point.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-black/25 p-6">
                <div className="text-[11px] uppercase tracking-[0.32em] text-white/36">Start the conversation</div>
                <div className="mt-8 space-y-4 text-lg text-white/88">
                  <div>Strategy engagements</div>
                  <div>Diagnostic reviews</div>
                  <div>Speaking & advisory</div>
                </div>
                <a
                  href="mailto:hello@axionindex.org"
                  className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                  style={{ backgroundColor: gold }}
                >
                  hello@axionindex.org
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-12 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-white/42">Axion Index</div>
            <div className="mt-1 text-sm text-white/50">Codified energy for the unfinished</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/ai-edge-lab" className="transition hover:text-white/80" style={{ color: '#5BAD7A' }}>The AI Edge Lab</Link>
            <a href="#framework" className="transition hover:text-white/80">Framework</a>
            <a href="#contact" className="transition hover:text-white/80">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
