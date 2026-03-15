import React from "react";
import { WORKSHOPS } from "../data/workshops";
import WorkshopCard from "../components/ui/WorkshopCard";
import { T } from "../styles/tokens";
import Eyebrow from "../components/primitives/Eyebrow";


const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.white,
    lineHeight: 1.1,
    ...extra
  }),
  liveIndicator: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 100,
    background: "rgba(197, 209, 199,0.1)",
    border: `1px solid ${T.green}33`,
    fontSize: 12,
    fontWeight: 700,
    color: T.green,
    marginBottom: 16
  }
};

export default function WorkshopsPage({ toast, onRegister }) {
  // Assume the first workshop in the array is the most recent/featured
  const featured = WORKSHOPS[0];

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>


      <div style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* HEADER & FEATURED SECTION */}
        <section style={{ marginBottom: 80 }}>
          <div style={s.liveIndicator}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.green, animation: "pulse 2s infinite" }} />
            LIVE SESSIONS
          </div>
          <h1 style={s.display(48, { marginBottom: 40 })}>Interactive <span style={{ color: T.green }}>Workshops</span></h1>

          {featured && (
            <div className="mob-col" style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              background: T.surface,
              border: `1px solid ${T.borderHi}`,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              <div style={{ padding: 48 }}>
                <Eyebrow>Next Up: {featured.date || "March 15th"}</Eyebrow>
                <h2 style={s.display(32, { marginTop: 12, marginBottom: 20 })}>{featured.title}</h2>
                <p style={{ color: T.muted, fontSize: 16, lineHeight: 1.6, marginBottom: 32, maxWidth: 500 }}>
                  {featured.description || "Join this hands-on session where we deep dive into architecture and systems. Bring your questions for the live Q&A."}
                </p>
                <div style={{ display: "flex", gap: 16 }}>
                  <button
                    onClick={() => onRegister(featured)}
                    style={{ padding: "14px 28px", borderRadius: 12, background: T.primaryGrad, color: T.black, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: `0 8px 24px rgba(197, 209, 199,0.2)` }}
                  >
                    Secure Your Spot
                  </button>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontSize: 12, color: T.muted2, fontWeight: 700 }}>LIMITED SEATS</span>
                    <span style={{ fontSize: 13, color: T.white }}>12 spots remaining</span>
                  </div>
                </div>
              </div>
              <div style={{ background: T.surface2, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid ${T.border}` }}>
                {/* Placeholder for Workshop Visual/Thumbnail */}
                <div style={{ fontSize: 80 }}>⚡</div>
              </div>
            </div>
          )}
        </section>

        {/* WORKSHOP GRID */}
        <section>
          <div className="mob-col" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 16 }}>
            <div>
              <h3 style={s.display(24)}>All Upcoming Events</h3>
              <p style={{ color: T.muted2, fontSize: 14, marginTop: 4 }}>Hands-on training led by industry veterans.</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Embedded", "Architecture", "IoT"].map(cat => (
                <button key={cat} style={{ background: "transparent", border: `1px solid ${T.border}`, padding: "6px 14px", borderRadius: 8, fontSize: 12, color: T.muted, cursor: "pointer" }}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {WORKSHOPS.map((w, i) => (
              <WorkshopCard key={i} w={w} onRegister={() => onRegister(w)} />
            ))}
          </div>
        </section>

        {/* BOTTOM NOTIFY BOX */}
        <section style={{ marginTop: 80, padding: 60, borderRadius: 24, background: `linear-gradient(135deg, ${T.surface} 0%, rgba(197, 209, 199,0.05) 100%)`, border: `1px solid ${T.border}`, textAlign: "center" }}>
          <h3 style={s.display(28, { marginBottom: 12 })}>Missing a topic?</h3>
          <p style={{ color: T.muted, marginBottom: 24 }}>Suggest a workshop or request a private team training session.</p>
          <button style={{ background: "transparent", border: `1px solid ${T.white}`, color: T.white, padding: "12px 24px", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>
            Contact Education Team
          </button>
        </section>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}