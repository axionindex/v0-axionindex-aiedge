"use client";

import { useState, useEffect } from "react";
import { Lock, CheckCircle, Shield, Globe } from "lucide-react";

interface PaymentGateProps {
  onComplete: (email: string) => void;
}

// Razorpay Payment Link URLs - Replace these with your actual Razorpay payment links
const RAZORPAY_LINKS = {
  india: "https://rzp.io/l/YOUR_INDIA_LINK", // ₹400
  international: "https://rzp.io/l/YOUR_INTERNATIONAL_LINK", // $9.99
};

export function PaymentGate({ onComplete }: PaymentGateProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isIndia, setIsIndia] = useState<boolean | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  // Auto-detect user's country
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setIsIndia(data.country_code === "IN");
      } catch {
        // Default to international if detection fails
        setIsIndia(false);
      } finally {
        setIsDetecting(false);
      }
    };
    detectCountry();
  }, []);

  const handlePayment = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address for PDF delivery.");
      return;
    }

    // Store email in localStorage for retrieval after payment
    localStorage.setItem("diagnostic_email", email);

    // Redirect to appropriate Razorpay payment link
    const paymentLink = isIndia ? RAZORPAY_LINKS.india : RAZORPAY_LINKS.international;
    
    // Razorpay payment links support prefilled fields
    // Format: https://rzp.io/l/YOUR_LINK?email=user@email.com
    const fullUrl = `${paymentLink}?email=${encodeURIComponent(email)}`;
    
    window.location.href = fullUrl;
  };

  // For demo purposes - simulate payment completion
  const handleDemoComplete = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address for PDF delivery.");
      return;
    }
    onComplete(email);
  };

  const price = isIndia ? "₹400" : "$9.99";
  const priceLabel = isIndia ? "INR" : "USD";

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

      {/* Location detection */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <Globe className="w-4 h-4 text-stone" />
        {isDetecting ? (
          <span className="font-label text-[10px] text-stone uppercase tracking-[0.1em]">
            Detecting your location...
          </span>
        ) : (
          <span className="font-label text-[10px] text-stone uppercase tracking-[0.1em]">
            {isIndia ? "India" : "International"} pricing ({priceLabel})
            <button
              onClick={() => setIsIndia(!isIndia)}
              className="ml-2 text-gold underline underline-offset-2 hover:text-gold2"
            >
              Switch
            </button>
          </span>
        )}
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
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {/* Payment button */}
      <button
        onClick={handlePayment}
        disabled={isDetecting}
        className={`w-full px-6 py-4 font-label text-[12px] uppercase tracking-[0.15em] transition-colors ${
          isDetecting
            ? "bg-stone3 text-stone cursor-not-allowed"
            : "bg-gold text-ink hover:bg-gold2"
        }`}
      >
        {isDetecting ? "Loading..." : `Pay ${price} · Unlock Results`}
      </button>

      {/* Trust signals */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-stone">
          <Shield className="w-4 h-4" />
          <span className="font-label text-[9px] uppercase tracking-[0.1em]">
            Secure Payment via Razorpay
          </span>
        </div>
        <p className="font-label text-[9px] text-stone2 uppercase tracking-[0.1em] text-center">
          Results are private — never shared with employers or organisations
        </p>
      </div>

      {/* Demo mode - Remove this section in production */}
      <div className="mt-10 p-4 bg-goldp border border-goldb">
        <p className="font-label text-[10px] text-gold uppercase tracking-[0.15em] mb-2 text-center">
          Demo Mode
        </p>
        <p className="text-cream3 text-sm text-center mb-4">
          Replace the payment links in the code with your Razorpay payment links.
          For now, use the button below to test:
        </p>
        <button
          onClick={handleDemoComplete}
          className="w-full px-4 py-2 bg-ink border border-gold text-gold font-label text-[10px] uppercase tracking-[0.15em] hover:bg-gold hover:text-ink transition-colors"
        >
          Skip Payment (Demo Only)
        </button>
      </div>
    </div>
  );
}
