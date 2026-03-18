import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo and credits */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-display text-lg font-black tracking-tight">
              AI <span className="text-gold">EDGE</span> LAB
            </span>
            <span className="font-label text-[9px] text-stone uppercase tracking-[0.15em]">
              · Nitin Nahata · Axionindex · 2026
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/#concepts"
              className="font-label text-[10px] text-stone uppercase tracking-[0.1em] hover:text-gold transition-colors"
            >
              Concepts
            </Link>
            <Link
              href="/#framework"
              className="font-label text-[10px] text-stone uppercase tracking-[0.1em] hover:text-gold transition-colors"
            >
              Framework
            </Link>
            <Link
              href="/#workplace"
              className="font-label text-[10px] text-stone uppercase tracking-[0.1em] hover:text-gold transition-colors"
            >
              Workplace
            </Link>
            <Link
              href="/#individual"
              className="font-label text-[10px] text-stone uppercase tracking-[0.1em] hover:text-gold transition-colors"
            >
              Individual
            </Link>
            <Link
              href="/#lexicon"
              className="font-label text-[10px] text-stone uppercase tracking-[0.1em] hover:text-gold transition-colors"
            >
              Lexicon
            </Link>
            <Link
              href="/diagnostic"
              className="font-label text-[10px] text-gold uppercase tracking-[0.1em] hover:text-gold2 transition-colors"
            >
              Take Diagnostic
            </Link>
          </nav>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-rule2 text-center">
          <p className="font-label text-[9px] text-stone2 uppercase tracking-[0.15em]">
            AI Edge Diagnostic™ · Framework Version: 2026-Q1
          </p>
        </div>
      </div>
    </footer>
  );
}
