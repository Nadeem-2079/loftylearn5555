import { useState } from "react";
import { T } from "../../styles/tokens";

const s = {
  card: (extra = {}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
  display: (size = 32, extra = {}) => ({ fontFamily: "'Poppins',sans-serif", fontSize: size, fontWeight: 800, letterSpacing: "-0.02em", color: T.white, lineHeight: 1.1, ...extra }),
  mono: (size = 12, extra = {}) => ({ fontFamily: "'Roboto Mono',monospace", fontSize: size, ...extra }),
  muted: (size = 13) => ({ fontSize: size, color: T.muted }),
};

export default function CourseCard({ course, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const badgeStyle = {
    bs: { background: T.green, color: T.black, label: "Bestseller" },
    free: { background: "transparent", border: `1px solid ${T.green}`, color: T.green, label: "Free" },
    new: { background: T.surface3, color: T.muted, border: `1px solid ${T.border}`, label: "New" },
  };
  const b = course.badge ? badgeStyle[course.badge] : null;

  return (
    <div
      className="card-hover premium-card glass-panel"
      onClick={() => onClick(course.id)}
      style={{
        ...s.card(),
        background: T.surface,
        overflow: "hidden", cursor: "pointer", position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spotlight Overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: hovered ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)` : "transparent",
        transition: "background 0.3s"
      }} />

      {/* Thumb */}
      <div style={{ height: 180, background: T.surface2, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${T.border}`, overflow: "hidden", zIndex: 1 }}>
        <img
          src={course.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80"}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)", transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
        {b && <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, padding: "4px 9px", borderRadius: 100, fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Roboto Mono',monospace", ...b }}>{b.label}</div>}
      </div>
      {/* Body */}
      <div style={{ padding: "16px 18px 14px", position: "relative", zIndex: 1 }}>
        <div style={{ ...s.mono(10.5), color: T.green, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>{course.cat}</div>
        <div style={{ ...s.display(14.5, { marginBottom: 5, lineHeight: 1.35 }) }}>{course.title}</div>
        <div style={{ fontSize: 12.5, color: T.muted2, marginBottom: 12 }}>{course.instructor}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ color: T.green, fontSize: 12, letterSpacing: -1 }}>{"★".repeat(Math.floor(course.rating))}</span>
          <span style={{ ...s.mono(12), color: T.white, fontWeight: 500 }}>{course.rating}</span>
          <span style={{ fontSize: 11.5, color: T.muted2 }}>({course.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
          {course.price === 0
            ? <span style={{ ...s.mono(12), color: T.green, background: "rgba(93,214,44,0.1)", padding: "4px 9px", borderRadius: 100, border: `1px solid rgba(93,214,44,0.2)` }}>FREE</span>
            : <span style={{ ...s.display(18) }}>₹{course.price}</span>
          }
          <span style={{ fontSize: 12, color: T.muted2 }}>⏱ {course.dur}</span>
        </div>
      </div>
    </div>
  );
}