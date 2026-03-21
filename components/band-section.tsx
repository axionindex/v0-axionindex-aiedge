"use client";

const pillItems = [
  "AI Replaceability Index",
  "The Three Shifts",
  "Quick Mirror",
  "Full Diagnostic",
  "Salary Defensibility Score",
  "Brainpower Density",
  "Judgment Economics",
  "Decision Architecture",
  "AI Edge Diagnostic",
  "ORG AI DARS",
];

const quoteItems = [
  { text: "Intelligence is becoming abundant. Your job is next.", emphasis: true },
  { text: "How much of your role is already being done by AI?", emphasis: false },
  { text: "When intelligence is cheap, judgment becomes the only premium left.", emphasis: true },
  { text: "Is your current salary defensible in 2027?", emphasis: false },
  { text: "Organisations that don't redesign work will be redesigned by the market.", emphasis: true },
  { text: "Are you building judgment capital — or skills AI already owns?", emphasis: false },
  { text: "The question is not whether AI replaces you. It is whether you move first.", emphasis: true },
  { text: "What percentage of your role is genuinely AI-proof?", emphasis: false },
];

export function BandSection() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid #181818",
        borderBottom: "1px solid #181818",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 40%, rgba(201,168,76,0.6) 50%, rgba(201,168,76,0.4) 60%, transparent)",
        }}
      />

      {/* Row 1 - Pills scrolling left */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          padding: "11px 0",
          background: "#060606",
        }}
      >
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100px",
            background: "linear-gradient(90deg, #060606, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "100px",
            background: "linear-gradient(270deg, #060606, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="band-track"
          style={{
            display: "flex",
            width: "max-content",
            whiteSpace: "nowrap",
            animation: "tickerL 52s linear infinite",
          }}
        >
          {[...pillItems, ...pillItems].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "3px 30px",
                borderRight: "1px solid rgba(255,255,255,0.02)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: idx % 2 === 0 ? "var(--gold)" : "rgba(201,168,76,0.5)",
                  fontWeight: idx % 2 === 0 ? 500 : 400,
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: "1px",
                  height: "9px",
                  background: "rgba(201,168,76,0.2)",
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #1e1e1e 30%, #242424 50%, #1e1e1e 70%, transparent)",
        }}
      />

      {/* Row 2 - Quotes scrolling right */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          padding: "11px 0",
          background: "#101010",
        }}
      >
        {/* Fade masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100px",
            background: "linear-gradient(90deg, #101010, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "100px",
            background: "linear-gradient(270deg, #101010, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="band-track"
          style={{
            display: "flex",
            width: "max-content",
            whiteSpace: "nowrap",
            animation: "tickerR 58s linear infinite",
          }}
        >
          {[...quoteItems, ...quoteItems].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                padding: "3px 36px",
                borderRight: "1px solid rgba(255,255,255,0.018)",
              }}
            >
              <span
                style={{
                  width: "14px",
                  height: "1px",
                  background: "rgba(201,168,76,0.22)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  color: item.emphasis ? "var(--gold)" : "rgba(201,168,76,0.48)",
                  fontWeight: item.emphasis ? 700 : 400,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .band-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
