import { T } from "../../styles/tokens";

const s = {
  card2: (extra = {}) => ({ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
  display: (size = 32, extra = {}) => ({ fontFamily: "'Poppins',sans-serif", fontSize: size, fontWeight: 800, letterSpacing: "-0.04em", color: T.white, lineHeight: 1.08, ...extra }),
  btnPrimary: (extra = {}) => ({
    padding: "10px 22px", borderRadius: 10, background: T.green, color: T.black,
    fontSize: 13.5, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
    letterSpacing: "-0.01em", cursor: "pointer", border: "none",
    transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", ...extra
  }),
  btnGhost: (extra = {}) => ({
    padding: "9px 18px", borderRadius: 10, background: "transparent",
    border: `1px solid ${T.border}`, color: T.muted, fontSize: 13.5, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", ...extra
  }),
};

export default function EnrollCard({ course, isEnrolled, isSaved, onEnroll, onPay, onSave, onLearn }) {
  return (
    <div className="premium-card glass-panel" style={{ ...s.card2(), overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.6)", position: "sticky", top: 84, background: "rgba(20,20,20,0.6)" }}>
      <div style={{ height: 190, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderBottom: `1px solid ${T.border}`, cursor: "pointer", overflow: "hidden" }} onClick={() => onLearn(course.id)}>
        <img
          src={course.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80"}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <div style={{ position: "absolute", inset: 0, backgrFwhatsaound: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", zIndex: 2, width: 72, height: 72, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: T.black, fontWeight: 700, transition: "transform 0.2s" }}>▶</div>
      </div>
      <div style={{ padding: 22 }}>
        {course.price === 0 ? <div style={{ fontSize: 16, color: T.green, marginBottom: 16 }}>FREE</div>
          : <div style={{ ...s.display(32, { marginBottom: 16 }) }}>₹{course.price}</div>}
        {isEnrolled
          ? <button style={{ width: "100%", ...s.btnPrimary({ padding: 14, fontSize: 15, borderRadius: 12, marginBottom: 10, background: T.forest, border: `1px solid ${T.green}`, color: T.green }) }} onClick={() => onLearn(course.id)}>▶ Continue learning</button>
          : <button style={{ width: "100%", ...s.btnPrimary({ padding: 14, fontSize: 15, borderRadius: 12, marginBottom: 10, fontFamily: "'Poppins',sans-serif" }) }} onClick={() => onPay(course.id)}>Request Access</button>
        }
        <button style={{ width: "100%", ...s.btnGhost({ padding: 13, fontSize: 14, borderRadius: 12, marginBottom: 0 }) }} onClick={() => onSave(course.id)}>{isSaved ? "♥ Saved" : "♡ Save for later"}</button>
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted2, marginBottom: 12 }}>Includes</div>
          {[`On-demand video: ${course.dur}`, "Downloadable resources", "Mobile + desktop access", "Certificate of completion", "Lifetime access"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: T.muted, marginBottom: 8 }}>
              <div style={{ width: 3, height: 3, borderRadius: "50%", background: T.green, flexShrink: 0 }} />{item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}