import React from "react";
import { T } from "../styles/tokens";
import Eyebrow from "../components/primitives/Eyebrow";

export default function CoursesPage() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Abstract Background Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 50%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px" }}>
        <Eyebrow style={{ color: T.green, justifyContent: "center", marginBottom: 24 }}>System Initialization</Eyebrow>
        
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 56, fontWeight: 900, color: T.white, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.1 }}>
          Curriculum Modules<br/>
          <span style={{ color: T.green }}>Coming Soon.</span>
        </h1>
        
        <p style={{ fontSize: 18, color: T.muted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>
          We are currently engineering highly specialized, industry-grade modules for bare-metal mastery and system architecture. The curriculum is compiling.
        </p>

        {/* Animated Loading Element */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 80, height: 80 }}>
            {/* Outer spinning dashed ring */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px dashed rgba(255,255,255,0.2)`, animation: "spin 10s linear infinite" }} />
            {/* Inner green glowing ring */}
            <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: `2px solid ${T.green}`, borderTopColor: "transparent", borderBottomColor: "transparent", animation: "spin 3s ease-in-out infinite reverse", boxShadow: `0 0 20px ${T.green}44` }} />
            {/* Core dot */}
            <div style={{ position: "absolute", inset: 32, borderRadius: "50%", background: T.green, boxShadow: `0 0 20px ${T.green}` }} />
          </div>
        </div>

        <div style={{ marginTop: 40, fontSize: 14, color: T.muted2, fontFamily: "'Roboto Mono', monospace", textTransform: "uppercase", letterSpacing: 2 }}>
          Status: Compiling Syllabus...
        </div>
      </div>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}