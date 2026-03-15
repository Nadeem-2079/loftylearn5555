import { T } from "../../styles/tokens";

const s = {
  btnPrimary: (extra = {}) => ({
    padding: "10px 22px", borderRadius: 10, background: T.primaryGrad, color: T.black,
    fontSize: 13.5, fontWeight: 700, fontFamily: "'Instrument Sans',sans-serif",
    letterSpacing: "-0.01em", cursor: "pointer", border: "none",
    transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", ...extra
  }),
  btnGhost: (extra = {}) => ({
    padding: "9px 18px", borderRadius: 10, background: "transparent",
    border: `1px solid ${T.border}`, color: T.muted, fontSize: 13.5, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", ...extra
  }),
};

export default function Nav({ page, user, onNav, onAuth, onLogout }) {
  return (
    <nav style={{ position: "fixed", top: 14, left: 0, right: 0, zIndex: 500, height: 56, margin: "0 auto", maxWidth: "calc(100% - 40px)", marginLeft: 20, marginRight: 20, background: "rgba(11,43,16,0.95)", backdropFilter: "blur(40px) saturate(2.2)", borderRadius: 32, border: `1px solid rgba(248,248,248,0.12)`, boxShadow: "0 16px 64px rgba(0,0,0,0.4)" }}>
      <div style={{ maxWidth: 1500, margin: "0 auto", padding: "0 16px", height: 56, display: "flex", alignItems: "center", width: "100%", position: "relative" }}>
        {/* Logo - Far Left */}
        <button onClick={() => onNav("home")} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: T.white, letterSpacing: "-0.04em", background: "none", border: "none", cursor: "pointer", transition: "all 0.3s", padding: "8px 12px", borderRadius: 12 }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}>
          <div style={{ width: 32, height: 32, background: T.green, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={18} height={18} viewBox="0 0 16 16" fill={T.black}><path d="M2 12 L8 3 L14 12 Z" /></svg>
          </div>
          <span>Lofty<span style={{ color: T.green }}>Learn</span></span>
        </button>

        {/* Pages - Perfectly Centered */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
          {[["Courses", "courses"], ["Live", "workshops"], ["Dashboard", "dashboard"], ["About", "about"]].map(([l, p]) => (
            <button key={p} onClick={() => onNav(p)} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: page === p ? T.white : T.muted, background: page === p ? "rgba(197, 209, 199,0.12)" : "transparent", border: page === p ? `1px solid rgba(197, 209, 199,0.3)` : "1px solid transparent", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer" }}
              onMouseEnter={e => { if (page !== p) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = T.white; } else { e.currentTarget.style.boxShadow = "0 0 16px rgba(197, 209, 199,0.2)"; } }}
              onMouseLeave={e => { if (page !== p) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; } else { e.currentTarget.style.boxShadow = "none"; } }}>{l}</button>
          ))}
        </div>

        {/* Right Section - Auth */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>

          {/* Auth Buttons */}
          {user ? (
            <>
              <button onClick={() => onNav("dashboard")} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: T.muted, border: `1px solid rgba(248,248,248,0.12)`, background: "transparent", transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.2)"; e.currentTarget.style.color = T.white; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)"; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>Dashboard</button>
              <button onClick={onLogout} style={s.btnPrimary({ padding: "9px 20px", borderRadius: 10 })}>Sign out</button>
            </>
          ) : (
            <>
              <button onClick={() => onAuth("login")} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: T.muted, border: `1px solid rgba(248,248,248,0.12)`, background: "transparent", transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.2)"; e.currentTarget.style.color = T.white; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)"; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>Sign in</button>
              <button onClick={() => onAuth("signup")} style={s.btnPrimary({ padding: "9px 22px", borderRadius: 10 })}>Get started</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}