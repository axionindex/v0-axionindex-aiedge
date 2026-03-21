"use client";

export function IndividualSection() {
  return (
    <div
      id="individual"
      style={{
        background: "var(--black)",
        borderBottom: "1px solid #181818",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 52px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left Column */}
          <div>
            <div className="sec-lbl">For The Individual Professional</div>
            <h2 className="sec-title">Where does<br />this leave you?</h2>
            <p className="sec-body">
              If your role is built around producing intelligence — research, analysis, data interpretation — AI Edge has
              serious implications.
              <br /><br />
              The question is not whether you are competent. The question is whether the work you do can be done at scale by
              machines.
              <br /><br />
              If the answer is yes, then your{" "}
              <strong style={{ color: "var(--gold)", fontWeight: 500 }}>salary is under negotiation</strong> — even if no one
              has told you yet.
            </p>
          </div>

          {/* Right Column - Questions */}
          <div
            style={{
              background: "#101010",
              border: "1px solid var(--border)",
              padding: "32px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "20px",
              }}
            >
              Questions to Answer
            </div>

            <ul style={{ listStyle: "none" }}>
              {[
                "What percentage of my day is spent producing intelligence vs. using judgment?",
                "Am I making decisions — or executing someone else's?",
                "Could my last three deliverables be auto-generated?",
                "Is my compensation anchored to scarcity — or just seniority?",
              ].map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    color: "var(--white-dim)",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      color: "var(--gold)",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
