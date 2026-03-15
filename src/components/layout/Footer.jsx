import { T } from "../../styles/tokens";

export default function Footer({ onNav }) {
  return (
    <footer style={{ background: `linear-gradient(180deg, #111111 0%, #050505 100%)`, borderTop: `1px solid ${T.border}`, padding: "100px 32px 48px", position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Background accent */}
      <div style={{ position: "absolute", top: 0, right: -200, width: 400, height: 400, background: `radial-gradient(circle, ${T.green}18 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }}></div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Main Footer Content */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 80, marginBottom: 80 }}>
          {/* Brand Section */}
          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <button onClick={() => onNav("home")} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: T.white, marginBottom: 20, background: "none", border: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.2)"}
              onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}>
              <div style={{ width: 40, height: 40, background: T.green, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 8px 24px rgba(197, 209, 199,0.2)` }}>
                <svg width={20} height={20} viewBox="0 0 16 16" fill={T.black}><path d="M2 12 L8 3 L14 12 Z" /></svg>
              </div>
              <span>Lofty<span style={{ color: T.green }}>Learn</span></span>
            </button>
            <p style={{ fontSize: 14, color: "rgba(248,248,248,0.6)", lineHeight: 1.8, maxWidth: 280, marginBottom: 20 }}>Empowering professionals to master new skills and advance their careers with world-class learning experiences.</p>
            {/* Quick Social Icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {[{ icon: "𝕏", label: "Twitter" }, { icon: "in", label: "LinkedIn" }, { icon: "▶", label: "YouTube" }].map(({ icon, label }) => (
                <div key={label} title={label} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(248,248,248,0.06)", border: `1px solid rgba(248,248,248,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "rgba(248,248,248,0.7)", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.color = T.green; e.currentTarget.style.background = "rgba(197, 209, 199,0.15)"; e.currentTarget.style.boxShadow = `0 0 20px rgba(197, 209, 199,0.3)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)"; e.currentTarget.style.color = "rgba(248,248,248,0.7)"; e.currentTarget.style.background = "rgba(248,248,248,0.06)"; e.currentTarget.style.boxShadow = "none"; }}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {[["Platform", [["All Courses", "courses"], ["Live Workshops", "workshops"], ["Dashboard", "dashboard"], ["Pricing", null]]], ["Company", [["About Us", null], ["Become Teacher", "instructor"], ["Blog", null], ["FAQ", "faq"], ["Contact", "contact"]]], ["Resources", [["Help Center", null], ["Security", null], ["Status", null], ["Community", null]]]].map(([title, links]) => (
            <div key={title} style={{ flex: "1 1 140px", minWidth: 0 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: T.green, marginBottom: 24, fontWeight: 700, opacity: 0.9 }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {links.map(([l, p]) => (
                  <button key={l} onClick={() => p && onNav(p)} style={{ fontSize: 14, color: "rgba(248,248,248,0.7)", background: "none", border: "none", cursor: p ? "pointer" : "default", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", paddingLeft: 0, padding: 0, textAlign: "left", fontWeight: 500 }}
                    onMouseEnter={e => { if (p) { e.currentTarget.style.color = T.white; e.currentTarget.style.transform = "translateX(4px)"; } }}
                    onMouseLeave={e => { if (p) { e.currentTarget.style.color = "rgba(248,248,248,0.7)"; e.currentTarget.style.transform = "translateX(0)"; } }}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div style={{ borderTop: `1px solid rgba(248,248,248,0.08)`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          {/* Left: legal links */}
          <div style={{ display: "flex", gap: 20, fontSize: 12, flexWrap: "wrap" }}>
            {[["Privacy Policy", null], ["Terms of Service", null], ["Cookie Policy", null]].map(([l, p]) => (
              <button key={l} onClick={() => p && onNav(p)} style={{ color: "rgba(248,248,248,0.5)", background: "none", border: "none", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.color = T.green}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(248,248,248,0.5)"}>{l}</button>
            ))}
          </div>
          {/* Center: copyright */}
          <div style={{ fontSize: 13, color: "rgba(248,248,248,0.5)", fontWeight: 500, textAlign: "center", flex: "1" }}>© 2024 LoftyLearn. All rights reserved.</div>
          {/* Right: author */}
          <div style={{ fontSize: 13, color: "rgba(248,248,248,0.5)", fontWeight: 500, textAlign: "right" }}>Made by <a href="https://www.ausdauergroups.in" target="_blank" rel="noopener noreferrer" style={{ color: T.green, textDecoration: "none", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", fontWeight: 600 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Ausdauer Groups</a>.</div>
        </div>
      </div>
    </footer>
  );
}