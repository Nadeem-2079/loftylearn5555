import { useState } from "react";
import { COURSES } from "../data/courses";
import CourseCard from "../components/ui/CourseCard";
import Eyebrow from "../components/primitives/Eyebrow";
import { T } from "../styles/tokens";

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: "#000",
    lineHeight: 1.08,
    ...extra
  }),
  mono: (size = 11, extra = {}) => ({
    fontFamily: "'Roboto Mono', monospace",
    fontSize: size,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    ...extra
  }),
  // Selection highlight for headings
  headingHighlight: {
    background: T.green,
    color: "#000",
    padding: "0 14px",
    display: "inline-block",
    transform: "rotate(-1.5deg)",
    borderRadius: "4px",
    boxShadow: "0 4px 15px rgba(93, 214, 44, 0.3)"
  },
  // Filter Panel (Reverted to original dark/blurred style)
  filterPanel: {
    background: "rgba(20, 20, 20, 0.6)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: 24,
    color: "#FFF",
    padding: "12px",
    position: "sticky",
    top: 100, // accommodate nav
    minWidth: 280,
    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  },
  // We will let the CourseCard handle its own hover, so cardWrapper is just a layout tool
  cardWrapper: {
    position: "relative",
  }
};

export default function CoursesPage({ onCourse }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [filters, setFilters] = useState({ cat: [], lvl: [], price: [] });
  const [visible, setVisible] = useState(12);

  const toggleF = (type, val) => {
    setFilters(f => {
      const arr = f[type];
      return { ...f, [type]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const filtered = COURSES.filter(c => {
    if (q && !c.title.toLowerCase().includes(q.toLowerCase()) && !c.cat.toLowerCase().includes(q.toLowerCase())) return false;
    if (filters.cat.length && !filters.cat.includes(c.cat)) return false;
    if (filters.lvl.length && !filters.lvl.includes(c.level)) return false;
    if (filters.price.length) {
      const ok = filters.price.some(p =>
        (p === "Free" && c.price === 0) || (p === "Under ₹50" && c.price > 0 && c.price < 50) || (p === "₹50–₹100" && c.price >= 50 && c.price <= 100) || (p === "Over ₹100" && c.price > 100)
      );
      if (!ok) return false;
    }
    return true;
  }).sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.students - a.students);

  const filterSection = (label, type, opts) => (
    <div style={{ padding: "24px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ ...s.mono(11), color: "#AAA", marginBottom: 16 }}>{label}</div>
      {opts.map(o => (
        <div key={o} onClick={() => toggleF(type, o)} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "8px 0",
          fontSize: 13, color: filters[type].includes(o) ? T.green : "#999",
          cursor: "pointer", transition: "all 0.2s"
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 6,
            border: `1px solid ${filters[type].includes(o) ? T.green : "#444"}`,
            background: filters[type].includes(o) ? T.green : "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 800
          }}>
            {filters[type].includes(o) ? "✓" : ""}
          </div>
          {o}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: T.bg, minHeight: "100vh", position: "relative" }}>
      {/* Background glowing effects */}
      <div style={{ position: "absolute", top: -200, left: "20%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
      <div className="mob-pad" style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 40px", position: "relative", zIndex: 1 }}>

        {/* Header Section */}
        <div style={{ marginBottom: 60 }}>
          <Eyebrow style={{ color: "#888", marginBottom: 12 }}>Curriculum Library</Eyebrow>
          <h1 style={s.display(52)}>
            <span style={s.headingHighlight}>All Courses</span>
          </h1>
          <div style={{ ...s.mono(12), color: "#888", marginTop: 24 }}>
            System Integrity Check: <span style={{ color: "#000", fontWeight: 800 }}>{filtered.length} UNITS_AVAILABLE</span>
          </div>
        </div>

        {/* Search & Sort Toolbar */}
        <div className="mob-col" style={{ display: "flex", gap: 16, marginBottom: 48, alignItems: "center" }}>
          <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "center", gap: 12, background: "#F8F8F8", borderRadius: 16, padding: "0 20px", height: 56, border: "1px solid #EEE" }}>
            <span style={{ color: "#AAA", fontSize: 20 }}>⌕</span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Query system modules..."
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: "#000", fontWeight: 500 }}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              width: "100%", height: 56, padding: "0 24px", background: "#FFF", border: `2px solid #EEE`,
              borderRadius: 16, color: "#000", fontSize: 14, fontWeight: 700, outline: "none", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)", transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#EEE"}
          >
            <option value="popular">POPULARITY</option>
            <option value="rating">TOP RATED</option>
            <option value="price-asc">COST: LOW TO HIGH</option>
            <option value="price-desc">COST: HIGH TO LOW</option>
          </select>
        </div>

        <div className="mob-col" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

          {/* FILTER PANEL */}
          <aside style={s.filterPanel}>
            <div style={{ padding: "24px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ ...s.display(16), fontWeight: 900, color: "#FFF", textTransform: "uppercase" }}>Filters</span>
              <span
                style={{ fontSize: 11, color: T.green, cursor: "pointer", fontWeight: 800, padding: "4px 8px", borderRadius: 6, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(93,214,44,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                onClick={() => setFilters({ cat: [], lvl: [], price: [] })}
              >
                Reset All
              </span>
            </div>
            {filterSection("Discipline", "cat", [...new Set(COURSES.map(c => c.cat))])}
            {filterSection("Experience Level", "lvl", ["Beginner", "Intermediate", "Advanced"])}
            {filterSection("Investment", "price", ["Free", "Under ₹50", "₹50–₹100", "Over ₹100"])}
          </aside>

          {/* MAIN GRID */}
          <main style={{ flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "100px 0", border: "1px solid #EEE", borderRadius: 32, background: "#FAFAFA" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>∅</div>
                <p style={{ color: "#888", fontWeight: 600, fontFamily: "monospace" }}>NO_MATCHING_DATA_FOUND</p>
              </div>
            ) : (
              <>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "32px"
                }}>
                  {filtered.slice(0, visible).map(c => (
                    <div
                      key={c.id}
                      style={s.cardWrapper}
                    >
                      {/* Course Card component stays inside the black frame */}
                      <CourseCard course={c} onClick={onCourse} />

                      {/* Sub-card technical accent */}
                      <div style={{
                        position: "absolute", bottom: 12, right: 12,
                        width: 4, height: 4, borderRadius: "50%", background: T.green,
                        boxShadow: `0 0 8px ${T.green}`
                      }} />
                    </div>
                  ))}
                </div>

                {visible < filtered.length && (
                  <div style={{ textAlign: "center", marginTop: 64 }}>
                    <button
                      style={{
                        background: "#000", color: "#FFF", padding: "18px 48px",
                        borderRadius: 14, border: "none", fontWeight: 800,
                        cursor: "pointer", fontSize: 13, letterSpacing: "0.1em",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      onClick={() => setVisible(v => v + 6)}
                    >
                      FETCH MORE MODULES
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}