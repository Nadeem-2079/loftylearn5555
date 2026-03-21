import React from "react";
import { INSTRUCTORS } from "../data/instructors";
import { T } from "../styles/tokens";
import Eyebrow from "../components/primitives/Eyebrow";
import GridBg from "../components/primitives/GridBg";

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
  card: (extra = {}) => ({
    background: T.surface,
    borderRadius: 24,
    border: `1px solid ${T.border}`,
    ...extra
  })
};

export default function InstructorPage() {
  return (
    <div style={{ background: T.bg, color: T.white, minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <section style={{ padding: "140px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -150, left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", background: `radial-gradient(circle, ${T.green}15 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
        <GridBg opacity={0.05} />
        
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Eyebrow style={{ justifyContent: "center" }}>Elite Faculty</Eyebrow>
          <h1 style={{ ...s.display(64), marginTop: 24, marginBottom: 24, letterSpacing: "-0.04em" }}>
            Learn from <br /> <span style={{ color: T.green }}>Industry Architects</span>
          </h1>
          <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
            Our meticulously selected instructors aren't just academics. They are senior engineering leads who have built real-world embedded systems and automotive paradigms at global scale.
          </p>
        </div>
      </section>

      {/* INSTRUCTORS LIST */}
      <section style={{ padding: "40px 24px 120px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {INSTRUCTORS.map((inst, idx) => (
            <div key={inst.name} className="glass-panel" style={{ ...s.card({ padding: 0, overflow: "hidden" }), display: "flex", flexWrap: "wrap", flexDirection: idx % 2 !== 0 ? "row-reverse" : "row" }}>
              
              {/* Profile Image/Badge Placeholder */}
              <div style={{ flex: "1 1 300px", minHeight: 400, background: `linear-gradient(to ${idx % 2 !== 0 ? "top right" : "bottom right"}, ${T.surface2} 0%, #0a0a0a 100%)`, position: "relative", borderRight: idx % 2 === 0 ? `1px solid ${T.border}` : "none", borderLeft: idx % 2 !== 0 ? `1px solid ${T.border}` : "none", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ textAlign: "center", zIndex: 2 }}>
                  <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800, color: T.black, margin: "0 auto 24px", boxShadow: `0 10px 30px rgba(93,214,44,0.3)` }}>
                    {inst.init}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted2, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>Faculty Profile</div>
                </div>
                {/* Visual accents */}
                <div style={{ position: "absolute", top: -40, right: idx % 2 === 0 ? -40 : "auto", left: idx % 2 !== 0 ? -40 : "auto", width: 140, height: 140, background: `radial-gradient(circle, ${T.green}18 0%, transparent 70%)` }} />
              </div>

              {/* Bio Content */}
              <div style={{ flex: "2 1 400px", padding: "48px 5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ ...s.display(36, { marginBottom: 10 }) }}>{inst.name}</h2>
                <div style={{ color: T.green, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 24 }}>{inst.role}</div>
                
                <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8, marginBottom: 32 }}>
                  {inst.bio || "Industry veteran with extensive experience in system architecture and hardware programming."}
                </p>

                {/* Stats */}
                <div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
                  {[
                    { val: inst.courses, label: "Advanced Courses" },
                    { val: inst.students, label: "Engineers Trained" },
                    { val: inst.rating + " ★", label: "Student Rating" }
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: T.white, marginBottom: 4 }}>{stat.val}</div>
                      <div style={{ fontSize: 12, color: T.muted2, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}