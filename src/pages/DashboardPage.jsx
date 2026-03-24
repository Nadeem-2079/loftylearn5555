import React from "react";
import { COURSES } from "../data/courses";
import { T } from "../styles/tokens";
import GridBg from "../components/primitives/GridBg";
import Eyebrow from "../components/primitives/Eyebrow";
import { updateUserInSheet } from "../services/api";

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size, fontWeight: 800,
    letterSpacing: "-0.04em", color: T.white,
    lineHeight: 1.1, ...extra,
  }),
  card: (extra = {}) => ({
    background: T.surface, border: `1px solid ${T.border}`,
    borderRadius: 20, padding: 24,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    position: "relative", overflow: "hidden", ...extra,
  }),
  btnPrimary: (extra = {}) => ({
    padding: "12px 24px", borderRadius: 12,
    background: T.green, color: T.black,
    fontSize: 14, fontWeight: 700,
    cursor: "pointer", border: "none",
    fontFamily: "'Poppins',sans-serif", ...extra,
  }),
  input: {
    background: "rgba(0,0,0,0.2)", border: `1px solid ${T.border}`,
    padding: "14px 16px", borderRadius: 12, color: T.white,
    outline: "none", fontSize: 15, width: "100%",
    boxSizing: "border-box", fontFamily: "'Poppins',sans-serif",
    transition: "border-color 0.2s",
  },
};

function ProgressCard({ course, prog, onLearn }) {
  return (
    <div
      style={s.card({ cursor: "pointer", minWidth: 300, flex: 1 })}
      onClick={() => onLearn(course.id)}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, background: T.surface2, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}>
          {course.categoryIcon || (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          )}
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

export default function DashboardPage({
  user, setUser, enrolled, saved, badges,
  streak, onCourse, onLearn, onAuth, toast, onExplore,
}) {
  const [isEditing, setIsEditing]   = React.useState(false);
  const [saving, setSaving]         = React.useState(false);
  const [formData, setFormData]     = React.useState({
    name:   user?.name  || "",
    age:    user?.age   || "",
    role:   user?.role  || "Systems Engineer",
    image:  user?.image || "",
  });

  // Sync formData if user prop changes externally
  React.useEffect(() => {
    if (user) {
      setFormData({
        name:  user.name  || "",
        age:   user.age   || "",
        role:  user.role  || "Systems Engineer",
        image: user.image || "",
      });
    }
  }, [user]);

  // ── Save profile → update local state + Google Sheets ──
  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast("Name cannot be empty", "!"); return;
    }
    setSaving(true);
    try {
      const updatedUser = { ...user, ...formData };

      // 1. Update Google Sheets
      const result = await updateUserInSheet(updatedUser);

      if (result.success) {
        // 2. Update local state
        if (setUser) setUser(updatedUser);
        setIsEditing(false);
        toast("Profile updated successfully ✓", "✓");
      } else {
        toast("Failed to sync. Try again.", "!");
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong. Try again.", "!");
    } finally {
      setSaving(false);
    }
  };

  // ── Not logged in ──────────────────────────────────────
  if (!user) {
    return (
      <div style={{ padding: "120px 24px", textAlign: "center", position: "relative" }}>
        <GridBg opacity={0.05} />
        <h1 style={s.display(48, { marginBottom: 16 })}>Your Journey Starts Here</h1>
        <p style={{
          fontSize: 18, color: T.muted, marginBottom: 40,
          maxWidth: 500, margin: "0 auto 40px",
        }}>
          Sign in to access your personalized learning path, track streaks, and earn badges.
        </p>
        <button style={s.btnPrimary({ padding: "16px 40px" })} onClick={() => onAuth("login")}>
          Access Dashboard
        </button>
      </div>
    );
  }

  const enrolledCourses = enrolled.map(e => ({
    ...COURSES.find(c => c.id === e.id), prog: e.prog,
  }));
  const savedCourses = saved.map(id => COURSES.find(c => c.id === id)).filter(Boolean);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>
      <GridBg opacity={0.02} />

      <div style={{ padding: "60px 24px", maxWidth: 1240, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <header style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 48,
        }}>
          <div>
            <Eyebrow>{isEditing ? "Account Settings" : "Learning Dashboard"}</Eyebrow>
            <h1 style={s.display(42, { marginTop: 8 })}>
              {isEditing ? "Edit Profile" : `Welcome back, ${user.name.split(" ")[0]}!`}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                ...s.btnPrimary(),
                background: isEditing ? T.surface : T.surface,
                color: isEditing ? T.green : T.white,
                border: `1px solid ${isEditing ? T.green : T.border}`,
              }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "← Back to Dashboard" : "Edit Profile"}
            </button>
            {!isEditing && (
              <button style={s.btnPrimary()} onClick={onExplore}>Explore More</button>
            )}
          </div>
        </header>

        <div className="mob-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 320px",
          gap: 40, alignItems: "start",
        }}>

          {/* ── Main ── */}
          <main style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {isEditing ? (

              /* ── Edit Profile Form ── */
              <section style={s.card({ padding: 32 })}>
                <div style={{
                  display: "flex", gap: 40, alignItems: "flex-start",
                  flexWrap: "wrap", flexDirection: "row-reverse", justifyContent: "flex-end",
                }}>
                  {/* Avatar Preview */}
                  <div style={{
                    width: 140, height: 140, borderRadius: "50%",
                    background: T.surface2, border: `2px solid ${T.green}44`,
                    overflow: "hidden", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    {formData.image
                      ? <img src={formData.image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                      : <div style={{ color: T.white, opacity: 0.5 }}><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                    }
                  </div>

                  {/* Form Fields */}
                  <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 20 }}>

                    {/* Email — read only */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Email (cannot change)</label>
                      <input
                        type="email"
                        value={user.email || ""}
                        disabled
                        style={{ ...s.input, opacity: 0.5, cursor: "not-allowed" }}
                      />
                    </div>

                    {/* Full Name */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={s.input}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>

                    {/* Age */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Age</label>
                      <input
                        type="number" min="15" max="100"
                        value={formData.age}
                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                        style={{ ...s.input, fontFamily: "'Roboto Mono', monospace" }}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>

                    {/* Professional Role */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Professional Role</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                        style={s.input}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>

                    {/* Profile Image URL */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: T.muted2, textTransform: "uppercase" }}>Profile Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                        style={s.input}
                        onFocus={e => e.currentTarget.style.borderColor = T.green}
                        onBlur={e => e.currentTarget.style.borderColor = T.border}
                      />
                    </div>

                    <button
                      style={{
                        ...s.btnPrimary({ marginTop: 12, alignSelf: "flex-start", padding: "16px 32px" }),
                        opacity: saving ? 0.7 : 1,
                      }}
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes →"}
                    </button>
                  </div>
                </div>
              </section>

            ) : (
              <>
                {/* ── Continue Learning ── */}
                <section>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <h2 style={s.display(24)}>Continue Learning</h2>
                    <span style={{ fontSize: 13, color: T.muted }}>{enrolled.length} Courses active</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    {enrolledCourses.length > 0 ? (
                      enrolledCourses.slice(0, 2).map(c => (
                        <ProgressCard key={c.id} course={c} prog={c.prog} onLearn={onLearn} />
                      ))
                    ) : (
                      <div style={s.card({ width: "100%", textAlign: "center", borderStyle: "dashed" })}>
                        <p style={{ color: T.muted }}>You haven't started any courses yet.</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* ── Watchlist ── */}
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

          {/* ── Sidebar ── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* User Card */}
            <div style={s.card({ textAlign: "center", padding: 28 })}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: T.surface2, border: `2px solid ${T.green}44`,
                overflow: "hidden", margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {user.picture || user.image
                  ? <img src={user.picture || user.image} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                  : <span style={{ color: T.white, opacity: 0.5 }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                }
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.white, marginBottom: 4 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>{user.email}</div>
              {user.role && <div style={{ fontSize: 12, color: T.green, fontWeight: 600 }}>{user.role}</div>}
            </div>

            {/* Quick Links */}
            <div style={s.card()}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: T.white, marginBottom: 16, letterSpacing: 1 }}>QUICK LINKS</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Browse Course Library", "Upcoming Webinars"].map(link => (
                  <div
                    key={link}
                    style={{
                      fontSize: 13, color: T.muted, cursor: "pointer",
                      padding: "8px 0", borderBottom: `1px solid rgba(255,255,255,0.05)`,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = T.green}
                    onMouseLeave={e => e.currentTarget.style.color = T.muted}
                    onClick={link === "Browse Course Library" ? onExplore : undefined}
                  >
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
