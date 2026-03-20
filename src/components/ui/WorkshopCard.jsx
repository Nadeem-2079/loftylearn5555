import { useState } from "react";
import { T } from "../../styles/tokens";

const s = {
  card: (extra = {}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
  display: (size = 32, extra = {}) => ({ fontFamily: "'Poppins',sans-serif", fontSize: size, fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.08, ...extra }),
  btnPrimary: (extra = {}) => ({
    padding: "10px 22px", borderRadius: 10, background: T.green, color: T.black,
    fontSize: 13.5, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
    letterSpacing: "-0.01em", cursor: "pointer", border: "none",
    transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", ...extra
  }),
};

export default function WorkshopCard({ w, onRegister }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="card-hover premium-card glass-panel"
      style={{ ...s.card(), background: hov ? "rgba(255,255,255,0.02)" : "rgba(20,20,20,0.6)", overflow: "hidden", cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div style={{ padding: 20, background: T.surface2, borderBottom: `1px solid ${T.border}`, position: "relative" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>{w.emoji}</div>
        <div style={{ ...s.display(15, { marginBottom: 5 }) }}>{w.title}</div>
        <div style={{ fontSize: 11, color: T.muted2 }}>{w.date}</div>
        {w.live && (
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "pulse 1.5s infinite" }} />
            <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 500, letterSpacing: "0.06em" }}>LIVE</span>
          </div>
        )}
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "'Roboto Mono',monospace", color: T.muted, flexShrink: 0 }}>
            {w.instructor.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{w.instructor}</div>
            <div style={{ fontSize: 11, color: T.muted2 }}>{w.role}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: T.muted2 }}><span style={{ color: T.green, fontWeight: 600 }}>{w.spots}</span> spots left</div>
          <button
            style={{ ...s.btnPrimary({ padding: "7px 14px", fontSize: 12.5, fontFamily: "'Poppins',sans-serif" }) }}
            onClick={e => { e.stopPropagation(); onRegister(w.title); }}
          >{w.live ? "▶ Join" : "Register"}</button>
        </div>
      </div>
    </div>
  );
}