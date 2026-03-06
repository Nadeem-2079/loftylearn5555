import { useState } from "react";
import { T } from "../../styles/tokens";

const s = {
  card: (extra = {}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
};

export default function TestiCard({ t }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="premium-card glass-panel" style={{ ...s.card(), background: hov ? "rgba(255,255,255,0.02)" : "rgba(20,20,20,0.6)", padding: 24, position: "relative", overflow: "hidden", transition: "border-color 0.2s" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: "absolute", top: 10, right: 18, fontSize: 80, fontWeight: 800, color: T.green, opacity: 0.06, lineHeight: 1 }}>"</div>
      <div style={{ color: T.green, fontSize: 13, marginBottom: 12, letterSpacing: -0.5 }}>★★★★★</div>
      <p style={{ fontSize: 14, lineHeight: 1.75, color: T.muted, marginBottom: 18 }}>{t.text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: T.green, flexShrink: 0 }}>{t.init}</div>
        <div><div style={{ fontSize: 13, fontWeight: 600, color: T.white }}>{t.name}</div><div style={{ fontSize: 11.5, color: T.muted2 }}>{t.role}</div></div>
      </div>
    </div>
  );
}