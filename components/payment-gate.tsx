"use client";

import { useState } from "react";
import { Lock, CheckCircle, Shield } from "lucide-react";

interface PaymentGateProps {
  onComplete: (email: string) => void;
}

export function PaymentGate({ onComplete }: PaymentGateProps) {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address for PDF delivery.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    // Simulate payment processing
    // In production, this would integrate with Stripe/Razorpay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onComplete(email);
  };

  return (
    <div className="max-w-xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-goldp border border-goldb mb-6">
          <Lock className="w-8 h-8 text-gold" />
        </div>

        <h1 className="font-display text-3xl lg:text-4xl font-black text-cream mb-4">
          Your Diagnostic is Complete
        </h1>

        <p className="text-cream2 text-lg">
          Unlock your full results and working document.
        </p>
      </div>

      {/* What you get */}
      <div className="bg-ink2 border border-rule p-6 mb-8">
        <p className="font-label text-[10px] text-gold uppercase tracking-[0.2em] mb-4">
          What You'll Receive
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-cream2">
              Full Edge Score with detailed component breakdown
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-cream2">
              Edge Direction indicator with 12-month trajectory
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-cream2">
              Structural level derivation and scope analysis
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-cream2">
              5-page PDF working document with 90-day action plan
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-cream2">
              Quarterly tracking template for edge evolution
            </span>
          </li>
        </ul>
      </div>

      {/* Email input */}
      <div className="mb-6">
        <label className="block font-label text-[10px] text-stone uppercase tracking-[0.15em] mb-2">
          Email for PDF Delivery
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="your@email.com"
          className="w-full bg-ink border border-rule px-4 py-3 text-cream placeholder-stone focus:border-gold focus:outline-none"
        />
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Payment button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full px-6 py-4 font-label text-[12px] uppercase tracking-[0.15em] transition-colors ${
          isProcessing
            ? "bg-stone3 text-stone cursor-not-allowed"
            : "bg-gold text-ink hover:bg-gold2"
        }`}
      >
        {isProcessing ? "Processing..." : "Pay ₹400 · Unlock Results"}
      </button>

      {/* Trust signals */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-stone">
          <Shield className="w-4 h-4" />
          <span className="font-label text-[9px] uppercase tracking-[0.1em]">
            Secure Payment via Razorpay / Stripe
          </span>
        </div>
        <p className="font-label text-[9px] text-stone2 uppercase tracking-[0.1em] text-center">
          Results are private — never shared with employers or organisations
        </p>
      </div>

      {/* Demo note */}
      <div className="mt-10 p-4 bg-goldp border border-goldb text-center">
        <p className="font-label text-[10px] text-gold uppercase tracking-[0.15em] mb-1">
          Demo Mode
        </p>
        <p className="text-cream3 text-sm">
          This is a demonstration. In production, payment will be processed
          through Stripe or Razorpay before showing results.
        </p>
      </div>
    </div>
  );
}
