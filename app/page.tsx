"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Linkedin, Mail } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function AxionIndexHome() {
  return (
    <div className="min-h-screen bg-[#0C0B09] text-[#F4EFE6]">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.04%22/%3E%3C/svg%3E')]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-[#0C0B09]/95 backdrop-blur-xl border-b border-[#C49A3C]/20 z-40 flex items-center px-6 md:px-14">
        <Link href="/" className="font-serif text-lg font-bold tracking-[.16em] uppercase text-[#C49A3C]">
          Axion Index
        </Link>
        <div className="ml-auto hidden md:flex gap-1">
          {["What We Do", "3i Framework", "Domains", "Founder"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="font-mono text-[10px] tracking-wider uppercase text-[#B0A898] border border-[#C49A3C]/12 px-3 py-2 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-all"
            >
              {item}
            </a>
          ))}
          <Link
            href="/labour-codes"
            className="font-mono text-[10px] tracking-wider uppercase bg-[#C49A3C] text-[#0C0B09] px-3 py-2"
          >
            Labour Codes
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-14 pt-32 pb-24 border-b border-[#C49A3C]/20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-[11px] tracking-[.25em] uppercase text-[#C49A3C] mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[#C49A3C]" />
          Operating Authority
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] max-w-4xl mb-6"
        >
          Codified energy for the{" "}
          <em className="italic text-[#C49A3C]">evolving organisation</em>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg text-[#B0A898] max-w-xl leading-relaxed mb-10"
        >
          We build decision intelligence for workforce architecture, compensation design, and regulatory navigation. Where most see compliance checklists, we see operating system resets.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/labour-codes"
            className="font-mono text-xs tracking-wider uppercase bg-[#C49A3C] text-[#0C0B09] px-6 py-3 hover:bg-[#E8D5A3] transition-colors flex items-center gap-2"
          >
            Explore Labour Codes <ArrowRight className="w-4 h-4" />
          </Link>
          
          <a
            href="#domains"
            className="font-mono text-xs tracking-wider uppercase border border-[#C49A3C]/30 text-[#F4EFE6] px-6 py-3 hover:border-[#C49A3C] hover:text-[#C49A3C] transition-all"
          >
            View Domains
          </a>
        </motion.div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-20 px-6 md:px-14 border-b border-[#C49A3C]/20">
        <div className="font-mono text-[10px] tracking-[.2em] uppercase text-[#C49A3C] opacity-70 mb-2">
          01 — What We Do
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-2">
          Not consultants. <em className="italic text-[#C49A3C]">Operating architects.</em>
        </h2>
        <p className="text-[#B0A898] max-w-2xl mb-10">
          We don&apos;t produce reports that sit on shelves. We build decision frameworks, implementation playbooks, and intelligence systems that become part of how organisations operate.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { num: "01", title: "Decision Intelligence", body: "Frameworks that convert regulatory complexity into clear decision paths. Not interpretations — operating logic." },
            { num: "02", title: "Implementation Architecture", body: "Playbooks that sequence action across CEO, CFO, CHRO, and operations. Not checklists — accountability maps." },
            { num: "03", title: "Operating Authority", body: "Resources that make organisations self-sufficient. Not consultant dependency — institutional capability." },
          ].map((card) => (
            <div
              key={card.num}
              className="bg-[#141210] border border-[#C49A3C]/12 p-6 hover:border-[#C49A3C] transition-colors"
            >
              <div className="font-mono text-[9px] text-[#6B6358] mb-2">{card.num}</div>
              <h3 className="font-serif text-xl font-medium mb-2">{card.title}</h3>
              <p className="text-sm text-[#B0A898] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3i Framework */}
      <section id="3i-framework" className="py-20 px-6 md:px-14 bg-[#141210] border-b border-[#C49A3C]/20">
        <div className="font-mono text-[10px] tracking-[.2em] uppercase text-[#C49A3C] opacity-70 mb-2">
          02 — The 3i Framework
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-2">
          Interpretation → Implication → <em className="italic text-[#C49A3C]">Implementation</em>
        </h2>
        <p className="text-[#B0A898] max-w-2xl mb-10">
          Most organisations are over-indexed on implementation activity and deeply under-indexed on implication clarity. The 3i Framework corrects this.
        </p>

        <div className="grid md:grid-cols-3 border border-[#C49A3C]/12">
          {[
            { num: "1", title: "Interpretation", sub: "What does the law actually say?", body: "Legal text decoded. Settled vs. unsettled distinguished. Grey areas mapped. No opinions dressed as facts.", color: "#C49A3C" },
            { num: "2", title: "Implication", sub: "What breaks in your operating system?", body: "Cost cascade modelling. Classification exposure. Governance gaps. The layer most consultants skip.", color: "#D4A84B" },
            { num: "3", title: "Implementation", sub: "What do you actually do?", body: "Sequenced action. Role-level accountability. Decision checkpoints. Execution that follows understanding.", color: "#8C3B28" },
          ].map((card, i) => (
            <div
              key={card.num}
              className={`p-8 text-center relative ${i < 2 ? "border-r border-[#C49A3C]/12" : ""}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: card.color }} />
              <div className="font-serif text-5xl font-light text-[#C49A3C] opacity-20 leading-none">{card.num}</div>
              <h3 className="font-serif text-2xl font-medium mt-2 mb-1">{card.title}</h3>
              <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-3">{card.sub}</div>
              <p className="text-sm text-[#B0A898] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="py-20 px-6 md:px-14 border-b border-[#C49A3C]/20">
        <div className="font-mono text-[10px] tracking-[.2em] uppercase text-[#C49A3C] opacity-70 mb-2">
          03 — Domains
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-2">
          Where we operate <em className="italic text-[#C49A3C]">with authority</em>
        </h2>
        <p className="text-[#B0A898] max-w-2xl mb-10">
          Each domain represents a structural shift in how organisations must think about workforce, compensation, or governance.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            { title: "Labour Codes", sub: "The System Reset of Employment in India", body: "Four codes. 29 laws replaced. Workforce classification, wage architecture, contractor governance — all restructured.", status: "live", href: "/labour-codes" },
            { title: "Compensation Architecture", sub: "Beyond Salary Benchmarking", body: "Total cost modelling. Benefit cascade design. Equity integration. Compensation as operating system.", status: "Q3 2026" },
            { title: "Startup Workforce OS", sub: "Stage-Wise People Architecture", body: "Bootstrap to Series C playbooks. Founder-ready decision matrices. Diligence-proof governance.", status: "Q4 2026" },
            { title: "AI Edge Lab", sub: "Workforce Intelligence Systems", body: "AI-powered compliance monitoring. Predictive workforce analytics. Intelligent decision support.", status: "2027" },
          ].map((domain) => (
            <Link
              key={domain.title}
              href={domain.href || "#"}
              className="bg-[#141210] border border-[#C49A3C]/12 p-7 hover:border-[#C49A3C] hover:-translate-y-1 transition-all block relative group"
            >
              <span className={`absolute top-4 right-4 font-mono text-[9px] tracking-wider uppercase px-2 py-1 ${domain.status === "live" ? "text-[#5BAD7A] bg-[#5BAD7A]/12" : "text-[#6B6358] bg-[#6B6358]/12"}`}>
                {domain.status === "live" ? "Live" : domain.status}
              </span>
              <h3 className="font-serif text-2xl font-medium mb-1 pr-20">{domain.title}</h3>
              <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-3">{domain.sub}</div>
              <p className="text-sm text-[#B0A898] leading-relaxed mb-4">{domain.body}</p>
              <span className={`font-mono text-[10px] tracking-wider uppercase ${domain.status === "live" ? "text-[#C49A3C]" : "text-[#6B6358]"}`}>
                {domain.status === "live" ? "Enter Hub →" : "Coming Soon"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-20 px-6 md:px-14 bg-[#141210] border-b-[3px] border-[#C49A3C]">
        <div className="font-mono text-[10px] tracking-[.2em] uppercase text-[#C49A3C] opacity-70 mb-2">
          04 — Founder
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-10">
          Built by a <em className="italic text-[#C49A3C]">practitioner</em>
        </h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <div className="aspect-square bg-[#1A1815] border border-[#C49A3C]/12 flex items-center justify-center">
            <span className="font-mono text-xs text-[#6B6358] tracking-wider">NITIN NAHATA</span>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-medium mb-1">Nitin Nahata</h3>
            <div className="font-mono text-[11px] tracking-wider uppercase text-[#C49A3C] mb-5">
              Founder, Axion Index · Group CHRO, Gameskraft
            </div>
            <p className="text-[#B0A898] leading-relaxed mb-4">
              Two decades building people architecture across startups and enterprises. Currently Group CHRO at Gameskraft, leading workforce strategy for one of India&apos;s largest gaming companies.
            </p>
            <p className="text-[#B0A898] leading-relaxed mb-6">
              Axion Index is the codification of a simple belief: workforce decisions are board-level governance matters, not HR administrative tasks. The tools organisations need should make them self-sufficient, not consultant-dependent.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/nahatanitin/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-wider uppercase text-[#C49A3C] border border-[#C49A3C]/30 px-4 py-2 hover:bg-[#C49A3C] hover:text-[#0C0B09] transition-all flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="mailto:nitin@axionindex.org"
                className="font-mono text-xs tracking-wider uppercase text-[#C49A3C] border border-[#C49A3C]/30 px-4 py-2 hover:bg-[#C49A3C] hover:text-[#0C0B09] transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-14 border-t border-[#C49A3C]/20">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-2">Axion Index</div>
            <p className="text-[#B0A898] text-sm leading-relaxed">Operating authority for organisations navigating structural shifts in workforce architecture and regulation.</p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-3">Domains</div>
            <ul className="space-y-2 text-sm text-[#B0A898]">
              <li><a href="/labour-codes" className="hover:text-[#C49A3C] transition-colors">Labour Codes</a></li>
              <li><a href="#" className="hover:text-[#C49A3C] transition-colors">Compensation Architecture</a></li>
              <li><a href="#" className="hover:text-[#C49A3C] transition-colors">Startup Workforce OS</a></li>
              <li><a href="#" className="hover:text-[#C49A3C] transition-colors">AI Edge Lab</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-wider uppercase text-[#C49A3C] mb-3">Connect</div>
            <ul className="space-y-2 text-sm text-[#B0A898]">
              <li><a href="https://www.linkedin.com/in/nahatanitin/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C49A3C] transition-colors">LinkedIn</a></li>
              <li><a href="mailto:nitin@axionindex.org" className="hover:text-[#C49A3C] transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-[#C49A3C] transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[#C49A3C]/20 text-center text-xs text-[#6B6358] tracking-wider">
          © 2026 Axion Index. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
