import React from "react";
import { T } from "../styles/tokens";
import Eyebrow from "../components/primitives/Eyebrow";

export default function WorkshopsPage() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Abstract Background Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 50%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
        <Eyebrow style={{ color: T.green, justifyContent: "center", marginBottom: 24 }}>Live Sessions Setup</Eyebrow>
        
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 56, fontWeight: 900, color: T.white, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.1 }}>
          Interactive Workshops<br/>
          <span style={{ color: T.green }}>Coming Soon.</span>
        </h1>
        
        <p style={{ fontSize: 18, color: T.muted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Our hardware integrations and real-time streaming infrastructure for live interactive workshops are being finalized. Get ready for hands-on engineering.
        </p>

        {/* Animated Loading Element */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.green, animation: "pulse 1.5s ease-in-out infinite" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.green, animation: "pulse 1.5s ease-in-out infinite 0.2s" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: T.green, animation: "pulse 1.5s ease-in-out infinite 0.4s" }} />
        </div>

        <div style={{ marginTop: 40, fontSize: 14, color: T.muted2, fontFamily: "'Roboto Mono', monospace", textTransform: "uppercase", letterSpacing: 2 }}>
          Status: Establishing Uplink...
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.5); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 1; box-shadow: 0 0 15px ${T.green}; }
        }
      `}</style>
    </div>
  );
}