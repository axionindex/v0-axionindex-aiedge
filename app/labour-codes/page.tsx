"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertTriangle, Clock, HelpCircle } from "lucide-react"

// Compliance trigger data
const BONUS_SECTORS = ["mfg", "construction", "logistics", "retail", "health"]
const PT_STATES = ["KA", "MH", "WB", "TN", "GJ", "AP", "TG", "KL", "MP", "AS", "OR", "CG", "MG", "TR", "JH", "BR"]
const LWF_STATES = ["AP", "TG", "KA", "KL", "TN", "MP", "CG", "OR", "PB"]

const TRIGGERS = [
  { id: "pf", name: "Provident Fund", threshold: 20, category: "Social Security", logic: "emp ≥ 20", legal: "SS Code §16", detail: "12% + 12%" },
  { id: "esi", name: "ESI", threshold: 10, category: "Social Security", logic: "emp ≥ 10 (wages ≤₹21K)", legal: "SS Code §44", detail: "3.25% + 0.75%" },
  { id: "gratuity", name: "Gratuity", threshold: 10, category: "Social Security", logic: "emp ≥ 10", legal: "SS Code §53", detail: "Pro-rata Day 1 for FTE" },
  { id: "bonus", name: "Statutory Bonus", threshold: 20, sectorDependent: true, category: "Wages", logic: "emp ≥ 20 + notified sector", legal: "Bonus Act", detail: "IT/consulting NOT notified" },
  { id: "canteen", name: "Canteen", threshold: 100, includingContractors: true, category: "Welfare", logic: "workers ≥ 100 (incl. contractors)", legal: "OSH Code §24", detail: "Non-recoverable" },
  { id: "creche", name: "Crèche", threshold: 50, womenThreshold: 20, category: "Welfare", logic: "workers ≥ 50 AND women ≥ 20", legal: "OSH Code §24", detail: "Non-recoverable" },
  { id: "icc", name: "ICC/POSH", threshold: 10, category: "Committees", logic: "emp ≥ 10", legal: "POSH Act §4", detail: "Mandatory" },
  { id: "works", name: "Works Committee", threshold: 100, category: "Committees", logic: "workers ≥ 100", legal: "IR Code §3", detail: "Joint committee" },
  { id: "standing", name: "Standing Orders", threshold: 300, category: "IR Code", logic: "workers ≥ 300", legal: "IR Code §30", detail: "Recommended below 300" },
  { id: "retrenchment", name: "Govt Approval (Retrenchment)", threshold: 300, category: "IR Code", logic: "workers ≥ 300", legal: "IR Code §77", detail: "Raised from 100" },
]

const CLASSIFICATION_TESTS = [
  { id: 1, question: "Who controls when, where, and how work is done?", legal: "Control Test", options: [{ text: "Worker decides", score: 0 }, { text: "Mixed", score: 1 }, { text: "Company directs", score: 2 }] },
  { id: 2, question: "Is this ongoing or project-based?", legal: "Continuity Test", options: [{ text: "Defined project", score: 0 }, { text: "Recurring projects", score: 1 }, { text: "Ongoing continuous", score: 2 }] },
  { id: 3, question: "Is the work core to business?", legal: "Integration Test", options: [{ text: "Support function", score: 0 }, { text: "Important but not core", score: 1 }, { text: "Core function", score: 2 }] },
  { id: 4, question: "Can worker send a substitute?", legal: "Substitution Test", options: [{ text: "Yes, freely", score: 0 }, { text: "With approval", score: 1 }, { text: "No, personal service", score: 2 }] },
  { id: 5, question: "Who provides tools/equipment?", legal: "Economic Reality", options: [{ text: "Worker provides", score: 0 }, { text: "Mixed", score: 1 }, { text: "Company provides", score: 2 }] },
  { id: 6, question: "What % of income from this?", legal: "Dependence Test", options: [{ text: "Less than 50%", score: 0 }, { text: "50-80%", score: 1 }, { text: "Over 80%", score: 2 }] },
]

const STATE_DATA = [
  { state: "Tamil Nadu", wages: "final", ir: "final", ss: "final", osh: "final" },
  { state: "Gujarat", wages: "final", ir: "final", ss: "final", osh: "final" },
  { state: "Madhya Pradesh", wages: "final", ir: "final", ss: "final", osh: "final" },
  { state: "Uttar Pradesh", wages: "final", ir: "final", ss: "final", osh: "final" },
  { state: "Maharashtra", wages: "final", ir: "final", ss: "draft", osh: "final" },
  { state: "Karnataka", wages: "draft", ir: "draft", ss: "draft", osh: "draft" },
  { state: "Telangana", wages: "final", ir: "final", ss: "final", osh: "draft" },
  { state: "Kerala", wages: "draft", ir: "draft", ss: "draft", osh: "draft" },
  { state: "Delhi", wages: "final", ir: "draft", ss: "draft", osh: "final" },
  { state: "West Bengal", wages: "draft", ir: "draft", ss: "draft", osh: "draft" },
]

const GREY_AREAS = [
  { title: "IT Worker Classification", body: "Whether IT employees qualify as 'workers' affecting overtime, standing orders.", govt: "No exemption issued", legal: "Treat as employees; OT ambiguous", axion: "Apply conservative interpretation" },
  { title: "Gratuity in CTC", body: "Whether gratuity can be shown as CTC component.", govt: "Employer obligation per SS Code", legal: "Should not be in CTC display", axion: "Remove from CTC; accrue as liability" },
  { title: "Recurring Incentives in 50% Test", body: "Whether guaranteed variable pay counts toward total remuneration.", govt: "FAQ mentions 'amounts paid' — ambiguous", legal: "Include guaranteed variable", axion: "If predictable, include in test" },
  { title: "ESOPs/RSUs in Wages", body: "Whether equity forms part of wages for statutory purposes.", govt: "Not addressed in Code", legal: "Generally excluded until exercise", axion: "Exclude but document; monitor" },
  { title: "Contract Labour: Core Activity", body: "What constitutes 'core activity' where deployment is restricted.", govt: "OSH Code has exceptions", legal: "Revenue-generating = likely core", axion: "Apply substance test" },
  { title: "Remote Work Jurisdiction", body: "Which state's laws apply when employee works remotely.", govt: "No guidance", legal: "Place of work generally governs", axion: "Apply work-state for PT/hours" },
]

export default function LabourCodesPage() {
  const [activeTab, setActiveTab] = useState("triggers")
  
  // Trigger Engine state
  const [empCount, setEmpCount] = useState("")
  const [contractorCount, setContractorCount] = useState("")
  const [womenCount, setWomenCount] = useState("")
  const [sector, setSector] = useState("")
  const [state, setState] = useState("KA")
  
  // Classification state
  const [classificationAnswers, setClassificationAnswers] = useState<Record<number, number>>({})

  const emp = parseInt(empCount) || 0
  const contractors = parseInt(contractorCount) || 0
  const women = parseInt(womenCount) || 0
  const totalWorkers = emp + contractors

  const triggerResults = useMemo(() => {
    if (emp === 0) return []
    return TRIGGERS.map((item) => {
      let status = "not-required"
      if (item.sectorDependent) {
        if (emp >= item.threshold && BONUS_SECTORS.includes(sector)) status = "mandatory"
      } else if (item.includingContractors) {
        if (totalWorkers >= item.threshold) status = "mandatory"
      } else if (item.womenThreshold) {
        if (totalWorkers >= item.threshold && women >= item.womenThreshold) status = "mandatory"
      } else {
        if (emp >= item.threshold) status = "mandatory"
        else if (emp >= item.threshold - 3) status = "assess"
      }
      return { ...item, status }
    })
  }, [emp, contractors, women, sector, totalWorkers])

  const classificationResult = useMemo(() => {
    if (Object.keys(classificationAnswers).length < 6) return null
    const total = Object.values(classificationAnswers).reduce((a, b) => a + b, 0)
    const pct = total / 12
    if (pct <= 0.20) return { classification: "GENUINE CONSULTANT", risk: "LOW", riskClass: "text-[#5BAD7A]", note: "Strong independent contractor indicators." }
    if (pct <= 0.40) return { classification: "CONSULTANT (review)", risk: "LOW-MED", riskClass: "text-[#5BAD7A]", note: "Some employment indicators. Periodic review recommended." }
    if (pct <= 0.55) return { classification: "BORDERLINE", risk: "MEDIUM", riskClass: "text-[#D4A84B]", note: "Grey zone. Restructure or convert to fixed-term." }
    if (pct <= 0.70) return { classification: "FIXED-TERM", risk: "MED-HIGH", riskClass: "text-[#D4A84B]", note: "Convert to employment with statutory benefits." }
    return { classification: "DIRECT EMPLOYEE", risk: "HIGH", riskClass: "text-[#8C3B28]", note: "Immediate conversion required. Calculate back-payment exposure." }
  }, [classificationAnswers])

  const tabs = [
    { id: "triggers", label: "Trigger Engine" },
    { id: "classification", label: "Classification" },
    { id: "states", label: "State Tracker" },
    { id: "grey", label: "Grey Areas" },
  ]

  return (
    <div className="min-h-screen bg-[#0C0B09] text-[#F4EFE6]">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.04%22/%3E%3C/svg%3E')]" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-[#0C0B09]/95 backdrop-blur-xl border-b border-[#C49A3C]/20 z-40 flex items-center px-6 md:px-14">
        <Link href="/" className="font-serif text-lg font-bold tracking-[.16em] uppercase text-[#C49A3C]">
          Axion Index
        </Link>
        <div className="ml-auto hidden md:flex gap-1">
          <Link href="/#what-we-do" className="font-mono text-[10px] tracking-wider uppercase text-[#B0A898] border border-[#C49A3C]/12 px-3 py-2 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-all">
            What We Do
          </Link>
          <Link href="/#framework" className="font-mono text-[10px] tracking-wider uppercase text-[#B0A898] border border-[#C49A3C]/12 px-3 py-2 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-all">
            3i Framework
          </Link>
          <Link href="/labour-codes" className="font-mono text-[10px] tracking-wider uppercase bg-[#C49A3C] text-[#0C0B09] px-3 py-2">
            Labour Codes
          </Link>
        </div>
      </nav>

      {/* Live Strip */}
      <div className="fixed top-[72px] left-0 right-0 bg-[#141210] border-b border-[#C49A3C]/12 z-30 px-6 md:px-14 py-2 flex items-center gap-6 text-[10px] font-mono tracking-wider uppercase overflow-x-auto">
        <div className="flex items-center gap-2 text-[#5BAD7A] bg-[#5BAD7A]/12 px-2 py-1 shrink-0">
          <span className="w-2 h-2 bg-[#5BAD7A] rounded-full animate-pulse" />
          Live Status
        </div>
        <span className="text-[#B0A898] shrink-0">Central: All 4 codes in force</span>
        <span className="text-[#D4A84B] shrink-0">States: ~18 finalised</span>
        <span className="text-[#D4A84B] shrink-0">Karnataka: Consultation closes Apr 18</span>
      </div>

      <main className="pt-[140px]">
        {/* Hero */}
        <section className="px-6 md:px-14 py-16 border-b border-[#C49A3C]/20">
          <div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C49A3C] mb-4">
            Labour Codes · Effective 21 November 2025
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight max-w-3xl mb-4">
            The System Reset of <em className="italic text-[#C49A3C]">Employment in India</em>
          </h1>
          <p className="text-lg text-[#B0A898] max-w-2xl mb-8">
            Four Labour Codes consolidating 29 laws. Not a compliance update — a structural reset of workforce classification, wage architecture, and contractor governance.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-[#141210] border border-[#C49A3C]/12">
            {[
              { value: "4", label: "Codes in Force" },
              { value: "29", label: "Laws Replaced" },
              { value: "50%", label: "Minimum Basic" },
              { value: "300", label: "IR Threshold" },
            ].map((stat, i) => (
              <div key={i} className={`p-4 text-center ${i < 3 ? "border-r border-[#C49A3C]/12" : ""}`}>
                <div className="font-serif text-3xl text-[#C49A3C]">{stat.value}</div>
                <div className="font-mono text-[9px] tracking-wider uppercase text-[#6B6358]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What's New */}
        <section className="px-6 md:px-14 py-8 bg-[#141210] border-b border-[#C49A3C]/12">
          <div className="font-mono text-[11px] tracking-wider uppercase text-[#C49A3C] mb-4">
            What Changed This Week
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { type: "signal", text: "EPFO issues compliance timeline", detail: "Wage declarations due by May 31" },
              { type: "update", text: "Gujarat finalises all 4 code rules", detail: "First western state to complete" },
              { type: "divergence", text: "Karnataka extends consultation", detail: "15 days extension after feedback" },
              { type: "action", text: "MoLE FAQ clarifies OT in 50% test", detail: "Overtime included in total remuneration" },
            ].map((item, i) => (
              <div key={i} className="bg-[#0C0B09] border border-[#C49A3C]/12 p-4 hover:border-[#C49A3C] transition-colors">
                <div className={`font-mono text-[9px] tracking-wider uppercase mb-1 ${
                  item.type === "signal" ? "text-[#5BAD7A]" :
                  item.type === "update" ? "text-[#D4A84B]" :
                  item.type === "divergence" ? "text-[#8C3B28]" : "text-[#C49A3C]"
                }`}>{item.type}</div>
                <div className="text-sm font-medium mb-1">{item.text}</div>
                <div className="text-xs text-[#6B6358]">{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Decision Tools */}
        <section className="px-6 md:px-14 py-16 border-t-[3px] border-[#C49A3C]">
          <div className="font-mono text-[10px] tracking-[.2em] uppercase text-[#C49A3C] opacity-70 mb-2">
            Decision Tools
          </div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Labour Codes <em className="italic text-[#C49A3C]">Operating System</em>
          </h2>
          <p className="text-[#B0A898] max-w-2xl mb-8">
            Logic-driven tools that separate settled law from interpretation from grey areas.
          </p>

          {/* Tab Nav */}
          <div className="flex gap-1 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 border transition-all ${
                  activeTab === tab.id
                    ? "bg-[#C49A3C] text-[#0C0B09] border-[#C49A3C]"
                    : "text-[#B0A898] border-[#C49A3C]/12 hover:border-[#C49A3C] hover:text-[#C49A3C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Trigger Engine */}
          {activeTab === "triggers" && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-1">Employees (on payroll)</label>
                  <input
                    type="number"
                    value={empCount}
                    onChange={(e) => setEmpCount(e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full bg-[#141210] border border-[#C49A3C]/12 text-[#F4EFE6] px-3 py-2 focus:outline-none focus:border-[#C49A3C]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-1">Contractor Workers</label>
                  <input
                    type="number"
                    value={contractorCount}
                    onChange={(e) => setContractorCount(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full bg-[#141210] border border-[#C49A3C]/12 text-[#F4EFE6] px-3 py-2 focus:outline-none focus:border-[#C49A3C]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-1">Women Workers</label>
                  <input
                    type="number"
                    value={womenCount}
                    onChange={(e) => setWomenCount(e.target.value)}
                    placeholder="e.g., 30"
                    className="w-full bg-[#141210] border border-[#C49A3C]/12 text-[#F4EFE6] px-3 py-2 focus:outline-none focus:border-[#C49A3C]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-1">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#141210] border border-[#C49A3C]/12 text-[#F4EFE6] px-3 py-2 focus:outline-none focus:border-[#C49A3C]"
                  >
                    <option value="">Select sector</option>
                    <option value="it">IT / Software (NOT bonus-notified)</option>
                    <option value="mfg">Manufacturing (bonus-notified)</option>
                    <option value="fintech">Fintech / BFSI</option>
                    <option value="health">Healthcare (bonus-notified)</option>
                    <option value="construction">Construction (bonus-notified)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-1">Primary State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#141210] border border-[#C49A3C]/12 text-[#F4EFE6] px-3 py-2 focus:outline-none focus:border-[#C49A3C]"
                  >
                    <option value="KA">Karnataka</option>
                    <option value="MH">Maharashtra</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="DL">Delhi</option>
                    <option value="TG">Telangana</option>
                  </select>
                </div>
              </div>

              {triggerResults.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-3">
                  {triggerResults.filter(r => r.status !== "not-required").map((item) => (
                    <div key={item.id} className="bg-[#141210] border border-[#C49A3C]/12 p-4 flex justify-between items-start">
                      <div>
                        <div className="font-medium mb-1">{item.name}</div>
                        <div className="text-xs text-[#6B6358]">{item.detail}</div>
                        <div className="font-mono text-[10px] text-[#B0A898] mt-2 pt-2 border-t border-[#C49A3C]/12">
                          Logic: {item.logic} · {item.legal}
                        </div>
                      </div>
                      <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-1 ${
                        item.status === "mandatory" ? "text-[#5BAD7A] bg-[#5BAD7A]/12" : "text-[#D4A84B] bg-[#D4A84B]/12"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#6B6358]">
                  Enter organisation details above to see compliance triggers
                </div>
              )}
            </div>
          )}

          {/* Classification */}
          {activeTab === "classification" && (
            <div>
              <p className="text-sm text-[#B0A898] mb-6">
                <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 bg-[#D4A84B]/12 text-[#D4A84B] mr-2">Interpretive Tool</span>
                Applies legal tests used by courts. Does not constitute legal advice.
              </p>

              <div className="space-y-4 mb-6">
                {CLASSIFICATION_TESTS.map((test) => (
                  <div key={test.id} className="bg-[#141210] border border-[#C49A3C]/12 p-4">
                    <div className="font-medium mb-1">{test.id}. {test.question}</div>
                    <div className="font-mono text-[10px] text-[#6B6358] mb-3">{test.legal}</div>
                    <div className="flex gap-2 flex-wrap">
                      {test.options.map((opt) => (
                        <button
                          key={opt.text}
                          onClick={() => setClassificationAnswers(prev => ({ ...prev, [test.id]: opt.score }))}
                          className={`font-mono text-[11px] px-3 py-2 border transition-all ${
                            classificationAnswers[test.id] === opt.score
                              ? "bg-[#C49A3C] text-[#0C0B09] border-[#C49A3C]"
                              : "text-[#B0A898] border-[#C49A3C]/12 hover:border-[#C49A3C]"
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {classificationResult && (
                <div className="bg-[#141210] border-2 border-[#C49A3C] p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <div className="font-mono text-[10px] text-[#6B6358] mb-1">CLASSIFICATION</div>
                      <div className={`font-serif text-xl ${classificationResult.riskClass}`}>{classificationResult.classification}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#6B6358] mb-1">RISK LEVEL</div>
                      <div className={`font-serif text-xl ${classificationResult.riskClass}`}>{classificationResult.risk}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#6B6358] mb-1">SCORE</div>
                      <div className="font-serif text-xl">{Object.values(classificationAnswers).reduce((a, b) => a + b, 0)}/12</div>
                    </div>
                  </div>
                  <div className="bg-[#1A1815] border-l-[3px] border-[#C49A3C] p-4 text-sm text-[#B0A898]">
                    <strong>Axion Assessment:</strong> {classificationResult.note}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* State Tracker */}
          {activeTab === "states" && (
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] border-b border-[#C49A3C]/20">
                      <th className="text-left py-2">State</th>
                      <th className="text-center py-2">Wages</th>
                      <th className="text-center py-2">IR</th>
                      <th className="text-center py-2">SS</th>
                      <th className="text-center py-2">OSH</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STATE_DATA.map((s) => (
                      <tr key={s.state} className="border-b border-[#C49A3C]/12">
                        <td className="py-2 font-medium">{s.state}</td>
                        {[s.wages, s.ir, s.ss, s.osh].map((status, i) => (
                          <td key={i} className="text-center py-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              status === "final" ? "bg-[#5BAD7A]" :
                              status === "draft" ? "bg-[#D4A84B]" : "bg-[#6B6358]"
                            }`} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#141210] border border-[#C49A3C]/12 p-5">
                <div className="font-mono text-[11px] tracking-wider uppercase text-[#C49A3C] mb-4">Summary (Apr 2026)</div>
                {[
                  { label: "All 4 Codes Finalised", value: "8 states", color: "text-[#5BAD7A]" },
                  { label: "3+ Codes Finalised", value: "10 states", color: "text-[#D4A84B]" },
                  { label: "Draft Rules Only", value: "14 states", color: "text-[#B0A898]" },
                  { label: "Pending", value: "4 states", color: "text-[#6B6358]" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-[#C49A3C]/12">
                    <span className="text-sm text-[#B0A898]">{item.label}</span>
                    <span className={`font-mono text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grey Areas */}
          {activeTab === "grey" && (
            <div className="space-y-4">
              {GREY_AREAS.map((g, i) => (
                <div key={i} className="bg-[#141210] border border-[#C49A3C]/12 border-l-[3px] border-l-[#8C3B28] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 bg-[#8C3B28]/20 text-[#8C3B28]">Unresolved</span>
                    <span className="font-medium">{g.title}</span>
                  </div>
                  <p className="text-sm text-[#B0A898] mb-4">{g.body}</p>
                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-[#C49A3C]/12">
                    <div>
                      <div className="font-mono text-[9px] text-[#6B6358] mb-1">GOVERNMENT</div>
                      <div className="text-sm">{g.govt}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-[#6B6358] mb-1">LEGAL CONSENSUS</div>
                      <div className="text-sm">{g.legal}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-[#6B6358] mb-1">AXION VIEW</div>
                      <div className="text-sm text-[#C49A3C]">{g.axion}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="px-6 md:px-14 py-12 text-center bg-gradient-to-br from-[#C49A3C]/5 to-[#8C3B28]/5 border-t border-[#C49A3C]/20">
          <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-2">Your First Action</div>
          <h2 className="font-serif text-2xl md:text-3xl mb-2">
            Run a 10-Minute <em className="italic text-[#C49A3C]">Readiness Check</em>
          </h2>
          <p className="text-[#B0A898] max-w-md mx-auto mb-6 text-sm">
            Answer 15 questions about your workforce, wage structure, and state footprint.
          </p>
          
            href="mailto:nitin@axionindex.org?subject=Labour%20Codes%20Readiness%20Check"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase bg-[#C49A3C] text-[#0C0B09] px-6 py-3 hover:bg-[#E8D5A3] transition-colors"
          >
            Start Readiness Check <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 md:px-14 text-center border-t border-[#C49A3C]/20">
          <div className="font-serif font-bold tracking-[.18em] uppercase text-[#C49A3C] mb-4">
            Axion Index
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {["What We Do", "3i Framework", "Domains", "LinkedIn"].map((link) => (
              <Link
                key={link}
                href={link === "LinkedIn" ? "https://www.linkedin.com/in/nahatanitin/" : `/#${link.toLowerCase().replace(/ /g, "-")}`}
                className="font-mono text-[10px] tracking-wider uppercase text-[#6B6358] hover:text-[#C49A3C] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
          <div className="text-xs text-[#6B6358]">
            axionindex.org · Bengaluru · 2026
          </div>
        </footer>
      </main>
    </div>
  )
}