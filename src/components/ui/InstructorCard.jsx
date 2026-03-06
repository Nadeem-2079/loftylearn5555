import { useState } from "react";
import { T } from "../../styles/tokens";

const s = {
  card: (extra = {}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
  display: (size = 32, extra = {}) => ({ fontFamily: "'Poppins',sans-serif", fontSize: size, fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.08, ...extra }),
};

export default function InstructorCard({ inst }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="card-hover premium-card glass-panel" style={{ ...s.card(), background: hov ? "rgba(255,255,255,0.02)" : "rgba(20,20,20,0.6)", padding: 24, textAlign: "center" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 14px", background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", ...s.display(24, { color: T.green }) }}>{inst.init}</div>
      <div style={{ ...s.display(15, { marginBottom: 4 }) }}>{inst.name}</div>
      <div style={{ fontSize: 12, color: T.muted2, marginBottom: 16 }}>{inst.role}</div>
      <div style={{ display: "flex", justifyContent: "space-around", paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
        {[[inst.courses, "Courses"], [inst.students, "Students"], [inst.rating, "Rating"]].map(([v, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: T.white }}>{v}</div>
            <div style={{ fontSize: 11, color: T.muted2, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}