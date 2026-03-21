import React from "react";
import { COURSES } from "../data/courses";
import { T } from "../styles/tokens";
import GridBg from "../components/primitives/GridBg";
import Eyebrow from "../components/primitives/Eyebrow";

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: T.white,
    lineHeight: 1.1,
    ...extra
  }),
  card: (extra = {}) => ({
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 20,
    padding: 24,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    position: "relative",
    overflow: "hidden",
    ...extra
  }),
  btnPrimary: (extra = {}) => ({
    padding: "12px 24px", borderRadius: 12, background: T.green, color: T.black,
    fontSize: 14, fontWeight: 700, cursor: "pointer", border: "none", ...extra
  }),
};

function StatBlock({ label, value, icon, color = T.green }) {
  return (
    <div style={s.card({ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 4 })}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.muted2, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={s.display(28, { color })}>{value}</div>
    </div>
  );
}

function ProgressCard({ course, prog, onLearn }) {
  return (
    <div
      style={s.card({ cursor: "pointer", minWidth: 300, flex: 1 })}
      onClick={() => onLearn(course.id)}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, background: T.surface2, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {course.categoryIcon || "📚"}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.green }}>{prog}%</div>
          <div style={{ fontSize: 10, color: T.muted2 }}>COMPLETE</div>
        </div>
      </div>
      <div style={s.display(18, { marginBottom: 4 })}>{course.title}</div>
      <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>{course.instructor}</div>

      <div style={{ width: "100%", height: 6, background: T.surface2, borderRadius: 10, marginBottom: 12 }}>
        <div style={{ width: `${prog}%`, height: "100%", background: T.green, borderRadius: 10 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: T.muted2 }}>Next: {course.nextLesson || "Deep Learning Basics"}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.white }}>Resume →</span>
      </div>
    </div>
  );
}

export default function DashboardPage({ user, setUser, enrolled, saved, badges, streak, onCourse, onLearn, onAuth, toast, onExplore }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    age: user?.age || "",
    role: user?.role || "Systems Engineer",
    image: user?.image || ""
  });

  const handleSave = () => {
    if (setUser) setUser({ ...user, ...formData });
    setIsEditing(false);
    toast("Profile updated successfully", "✓");
  };
  if (!user) {
    return (
      <div style={{ padding: "120px 24px", textAlign: "center", position: "relative" }}>
        <GridBg opacity={0.05} />
        <h1 style={s.display(48, { marginBottom: 16 })}>Your Journey Starts Here</h1>
        <p style={{ fontSize: 18, color: T.muted, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Sign in to access your personalized learning path, track streaks, and earn industry-recognized badges.</p>
        <button style={s.btnPrimary({ padding: "16px 40px" })} onClick={() => onAuth("login")}>Access Dashboard</button>
      </div>
    );
  }

  const enrolledCourses = enrolled.map(e => ({ ...COURSES.find(c => c.id === e.id), prog: e.prog }));
  const savedCourses = saved.map(id => COURSES.find(c => c.id === id)).filter(Boolean);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>
      <GridBg opacity={0.02} />

      <div style={{ padding: "60px 24px", maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* TOP BAR: USER GREETING */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <Eyebrow>{isEditing ? "Account Settings" : "Learning Dashboard"}</Eyebrow>
            <h1 style={s.display(42, { marginTop: 8 })}>
              {isEditing ? "Edit Profile" : `Welcome back, ${user.name.split(' ')[0]}!`}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...s.btnPrimary(), background: isEditing ? T.green : T.surface, color: isEditing ? T.black : T.white, border: `1px solid ${isEditing ? T.green : T.border}` }} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "View Learning Path" : "Edit Profile"}
            </button>
            <button style={s.btnPrimary()} onClick={onExplore}>Explore More</button>
          </div>
        </header>

        <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "start" }}>

          {/* MAIN CONTENT AREA */}
          <main style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {isEditing ? (
              <section style={s.card({ padding: 32 })}>
                <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap", flexDirection: "row-reverse", justifyContent: "flex-end" }}>
                  <div style={{ width: 140, height: 140, borderRadius: "50%", background: T.surface2, border: `2px solid ${T.green}44`, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {formData.image ? <img src={formData.image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ fontSize: 40, color: T.muted }}>👤</div>}
                  </div>
                  <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Full Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${T.border}`, padding: "14px 16px", borderRadius: 12, color: T.white, outline: "none", fontSize: 15 }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Age</label>
                      <input type="number" min="15" max="100" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${T.border}`, padding: "14px 16px", borderRadius: 12, color: T.white, outline: "none", fontSize: 15, fontFamily: "'Roboto Mono', monospace" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Professional Role</label>
                      <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${T.border}`, padding: "14px 16px", borderRadius: 12, color: T.white, outline: "none", fontSize: 15 }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Profile Image URL (JPG/PNG)</label>
                      <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${T.border}`, padding: "14px 16px", borderRadius: 12, color: T.white, outline: "none", fontSize: 15 }} />
                    </div>
                    <button style={{ ...s.btnPrimary(), marginTop: 12, alignSelf: "flex-start", padding: "16px 32px" }} onClick={handleSave}>Save Changes</button>
                  </div>
                </div>
              </section>
            ) : (
              <>
            {/* 1. PROGRESS SECTION */}
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={s.display(24)}>Continue Learning</h2>
                <span style={{ fontSize: 13, color: T.muted }}>{enrolled.length} Courses active</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.slice(0, 2).map(c => <ProgressCard key={c.id} course={c} prog={c.prog} onLearn={onLearn} />)
                ) : (
                  <div style={s.card({ width: "100%", textAlign: "center", borderStyle: "dashed" })}>
                    <p style={{ color: T.muted }}>You haven't started any courses yet.</p>
                  </div>
                )}
              </div>
            </section>

            {/* 2. SAVED COURSES (HORIZONTAL SCROLL OR GRID) */}
            <section>
              <h2 style={s.display(24, { marginBottom: 24 })}>Your Watchlist</h2>
              <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {savedCourses.length > 0 ? (
                  savedCourses.map(c => (
                    <div
                      key={c.id}
                      style={s.card({ display: "flex", alignItems: "center", gap: 16, padding: 16, cursor: "pointer" })}
                      onClick={() => onCourse(c.id)}
                    >
                      <div style={{ width: 60, height: 60, background: T.surface2, borderRadius: 12, flexShrink: 0 }} />
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.white, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{c.title}</div>
                        <div style={{ fontSize: 12, color: T.muted2 }}>{c.instructor}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={s.card({ width: "100%", gridColumn: "1 / -1", textAlign: "center", borderStyle: "dashed" })}>
                    <p style={{ color: T.muted }}>Your watchlist is empty. Browse the curriculum to save courses.</p>
                  </div>
                )}
              </div>
            </section>
              </>
            )}

          </main>

          {/* SIDEBAR AREA */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* QUICK LINKS */}
            <div style={s.card()}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: T.white, marginBottom: 16, letterSpacing: 1 }}>QUICK LINKS</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {['Browse Course Library', 'Community Forum', 'Upcoming Webinars'].map(link => (
                  <div key={link} style={{ fontSize: 13, color: T.muted, cursor: "pointer", padding: "8px 0", borderBottom: `1px solid rgba(255,255,255,0.05)` }} onMouseEnter={e => e.currentTarget.style.color = T.green} onMouseLeave={e => e.currentTarget.style.color = T.muted} onClick={link === 'Browse Course Library' ? onExplore : undefined}>
                    {link} →
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}