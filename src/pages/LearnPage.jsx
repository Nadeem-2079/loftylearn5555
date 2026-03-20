import React, { useState, useEffect } from "react";
import { CURRICULUM } from "../data/curriculum";
import { T } from "../styles/tokens";
import Eyebrow from "../components/primitives/Eyebrow";

export default function LearnPage({ course, enrolled, toast, setEnrolled }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [completed, setCompleted] = useState({}); // { lessonIndex: boolean }

  // Flat list of all lessons for easy progression math
  const allLessons = CURRICULUM.flatMap((sec, sIdx) =>
    sec.lessons.map((l, lIdx) => ({ ...l, id: `${sIdx}-${lIdx}` }))
  );

  useEffect(() => {
    if (allLessons.length > 0 && !activeVideo) {
      setActiveVideo(allLessons[0]);
    }
  }, [allLessons, activeVideo]);

  // Sync overall progress back to App state
  useEffect(() => {
    if (!course) return;
    const total = allLessons.length;
    const doneCount = Object.values(completed).filter(Boolean).length;
    const prog = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    setEnrolled(prev => prev.map(e =>
      e.id === course.id ? { ...e, prog } : e
    ));
  }, [completed, course, setEnrolled, allLessons.length]);

  const handleComplete = (id) => {
    setCompleted(prev => ({ ...prev, [id]: true }));
    toast("Lesson completed!", "✅");

    // Auto-advance if possible
    const currentIdx = allLessons.findIndex(l => l.id === id);
    if (currentIdx > -1 && currentIdx < allLessons.length - 1) {
      setActiveVideo(allLessons[currentIdx + 1]);
    }
  };

  const progressPercent = allLessons.length === 0 ? 0 : Math.round((Object.values(completed).filter(Boolean).length / allLessons.length) * 100);

  if (!course) return <div style={{ padding: 100, textAlign: "center", color: T.white }}>No course selected.</div>;

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.white, paddingTop: 60 }}>
      {/* Top Bar */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Eyebrow style={{ color: T.green }}>Learning Environment</Eyebrow>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0 0" }}>{course.title}</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: T.muted2, fontWeight: 700, letterSpacing: 1 }}>PROGRESS</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.green }}>{progressPercent}%</div>
          </div>
          <div style={{ width: 100, height: 6, background: T.surface2, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ width: `${progressPercent}%`, height: "100%", background: T.green, transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 340px", minHeight: "calc(100vh - 120px)" }}>

        {/* Main Video Area */}
        <div className="mob-pad" style={{ padding: 32, display: "flex", flexDirection: "column" }}>

          {progressPercent === 100 ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", background: `linear-gradient(135deg, ${T.surface} 0%, #0a140a 100%)`, borderRadius: 24, border: `1px solid ${T.green}44`, padding: 40, textAlign: "center", boxShadow: `0 20px 60px ${T.green}11` }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🏆</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: T.white, marginBottom: 16 }}>Course Completed!</h2>
              <p style={{ fontSize: 18, color: T.muted, maxWidth: 500, marginBottom: 40, lineHeight: 1.6 }}>
                You have successfully completed all modules for <strong>{course.title}</strong>.
                Your certificate of completion has been generated.
              </p>

              {/* Certificate Ribbon UI */}
              <div style={{ background: "#FFF", color: "#000", padding: "40px 60px", borderRadius: 16, border: `4px solid ${T.green}`, position: "relative" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#888", letterSpacing: 2, marginBottom: 20 }}>CERTIFICATE OF COMPLETION</div>
                <div style={{ fontSize: 28, fontFamily: "serif", fontStyle: "italic", marginBottom: 30 }}>This certifies that the user has completed:</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: T.green, marginBottom: 30 }}>{course.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #EEE", paddingTop: 20 }}>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>Instructed by:</div>
                    <div style={{ fontSize: 16 }}>{course.instructor}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>Date:</div>
                    <div style={{ fontSize: 16 }}>{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Mock Video Player */}
              <div style={{ width: "100%", aspectRatio: "16/9", background: "#000", borderRadius: 16, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", border: `1px solid rgba(255,255,255,0.05)` }}>
                <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,0.6)", padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: T.white, backdropFilter: "blur(10px)" }}>
                  {activeVideo?.title || "Loading..."}
                </div>

                <button
                  onClick={() => handleComplete(activeVideo?.id)}
                  style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(93,214,44,0.2)", border: `2px solid ${T.green}`, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill={T.green}><path d="M8 5v14l11-7z" /></svg>
                </button>
              </div>

              <div className="mob-col mob-col-center" style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <h2 className="mob-text-h3" style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{activeVideo?.title}</h2>
                  <p style={{ color: T.muted }}>Length: {activeVideo?.dur}</p>
                </div>
                {!completed[activeVideo?.id] && (
                  <button
                    onClick={() => handleComplete(activeVideo?.id)}
                    style={{ padding: "12px 24px", background: T.surface, color: T.white, border: `1px solid ${T.border}`, borderRadius: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </>
          )}

        </div>

        {/* Sidebar Syllabus */}
        <div style={{ background: T.surface, borderLeft: `1px solid ${T.border}`, padding: 24, overflowY: "auto" }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>Course Content</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CURRICULUM.map((section, sIdx) => (
              <div key={sIdx}>
                <h4 style={{ fontSize: 13, color: T.muted2, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{section.title}</h4>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {section.lessons.map((l, lIdx) => {
                    const id = `${sIdx}-${lIdx}`;
                    const isActive = activeVideo?.id === id;
                    const isDone = completed[id];
                    return (
                      <div
                        key={lIdx}
                        onClick={() => setActiveVideo({ ...l, id })}
                        style={{
                          padding: "12px 16px", borderRadius: 8, cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start",
                          background: isActive ? "rgba(93,214,44,0.1)" : "transparent",
                          borderLeft: `2px solid ${isActive ? T.green : "transparent"}`,
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.02)" }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                          background: isDone ? T.green : "transparent",
                          border: `2px solid ${isDone ? T.green : T.muted2}`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#000"
                        }}>
                          {isDone ? "✓" : isActive ? "▶" : ""}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isActive ? T.green : T.white, marginBottom: 4 }}>{l.title}</div>
                          <div style={{ fontSize: 12, color: T.muted }}>{l.dur}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}