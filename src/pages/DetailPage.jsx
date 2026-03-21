import React, { useState } from "react";
import EnrollCard from "../components/ui/EnrollCard";
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
  sectionTitle: { fontSize: 20, fontWeight: 700, color: T.white, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 },
  capsule: { padding: "4px 12px", borderRadius: 6, background: T.surface2, border: `1px solid ${T.border}`, fontSize: 12, color: T.muted2, fontWeight: 600 }
};

export default function DetailPage({ course, enrolled, saved, onEnroll, onSave, onPay, onLearn }) {
  const [openModule, setOpenModule] = useState(0);

  if (!course) return null;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative", width: "100%" }}>
      <GridBg opacity={0.02} />

      {/* HERO HEADER */}
      <div style={{ borderBottom: `1px solid ${T.border}`, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <span style={s.capsule}>{course.category || "Professional Track"}</span>
            <span style={s.capsule}>★ {course.rating || "4.9"}</span>
            <span style={s.capsule}>{course.level || "Intermediate"}</span>
          </div>

          <h1 style={s.display(52, { marginBottom: 20, maxWidth: 800 })}>
            {course.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.green }} />
            <p style={{ fontSize: 16, color: T.muted }}>
              Lead Instructor: <span style={{ color: T.white, fontWeight: 600 }}>{course.instructor}</span>
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="mob-grid mob-pad" style={{ padding: "60px 5%", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, width: "100%" }}>

        {/* LEFT COLUMN: DETAILS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

          {/* OVERVIEW */}
          <section>
            <h3 style={s.sectionTitle}><span>◎</span> Course Overview</h3>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.muted }}>
              {course.description || "This intensive program is designed to bridge the gap between academic theory and industry practice. You will work through real-world datasets and architectural patterns used by top-tier engineering teams."}
            </p>
          </section>

          {/* WHAT YOU'LL LEARN */}
          <section style={{ background: T.surface, padding: 32, borderRadius: 20, border: `1px solid ${T.border}` }}>
            <h3 style={s.sectionTitle}>What you'll achieve</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                "Master industry-standard workflows",
                "Build a production-ready portfolio",
                "Understand scalable architecture",
                "Direct mentorship & code reviews"
              ].map(item => (
                <div key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: T.muted }}>
                  <span style={{ color: T.green }}>✓</span> {item}
                </div>
              ))}
            </div>
          </section>

          {/* CURRICULUM */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={s.sectionTitle}>Curriculum</h3>
              <span style={{ fontSize: 12, color: T.muted2 }}>{course.lessons || 12} Modules • {course.duration || "14"} Hours</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Introduction & Fundamentals", "Deep Dive: Core Concepts", "Advanced Implementation", "Final Capstone Project"].map((module, i) => {
                const isOpen = openModule === i;
                return (
                  <div key={module} style={{
                    background: T.surface,
                    border: `1px solid ${isOpen ? T.green : T.border}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    transition: "all 0.3s"
                  }}>
                    <div
                      onClick={() => setOpenModule(isOpen ? null : i)}
                      style={{
                        padding: "20px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        background: isOpen ? "rgba(255,255,255,0.02)" : "transparent"
                      }}
                    >
                      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: isOpen ? T.green : T.muted2 }}>0{i + 1}</span>
                        <span style={{ fontWeight: 600, color: isOpen ? T.white : T.muted }}>{module}</span>
                      </div>
                      <span style={{ fontSize: 20, color: isOpen ? T.white : T.muted2, transition: "transform 0.3s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                    </div>

                    {/* Expanded Content View */}
                    <div style={{
                      maxHeight: isOpen ? "400px" : "0",
                      padding: isOpen ? "0 24px 24px 50px" : "0 24px 0 50px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", color: T.muted2, fontSize: 14 }}>
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                              <span style={{ color: T.green, fontSize: 16 }}>▶</span> Lesson {i + 1}.{idx + 1} content
                            </div>
                            <span>12 Min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PREREQUISITES */}
          <section>
            <h3 style={s.sectionTitle}>Requirements</h3>
            <ul style={{ color: T.muted, lineHeight: 2, fontSize: 15 }}>
              <li>Basic understanding of professional workflows</li>
              <li>A high-speed internet connection</li>
              <li>Willingness to commit 5+ hours per week</li>
            </ul>
          </section>
        </div>

        {/* RIGHT COLUMN: ENROLL CARD (STICKY) */}
        <div style={{ position: "sticky", top: 100, height: "fit-content" }}>
          <EnrollCard
            course={course}
            isEnrolled={enrolled}
            isSaved={saved}
            onEnroll={onEnroll}
            onPay={onPay}
            onSave={onSave}
            onLearn={onLearn}
          />

          <div style={{ marginTop: 24, padding: 20, borderRadius: 16, border: `1px solid ${T.border}`, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: T.muted2, marginBottom: 12 }}>Guaranteed safe checkout</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, opacity: 0.5 }}>
              <span>VISA</span>
              <span>MC</span>
              <span>PAYPAL</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}