import { useState } from "react";
import { T } from "../../styles/tokens";

const s = {
  btnPrimary: (extra = {}) => ({
    padding: "10px 22px", borderRadius: 40, background: T.green, color: T.black,
    fontSize: 13.5, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
    letterSpacing: "-0.01em", cursor: "pointer", border: "none",
    transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", ...extra
  }),
  btnGhost: (extra = {}) => ({
    padding: "9px 18px", borderRadius: 40, background: "transparent",
    border: `1px solid ${T.border}`, color: T.muted, fontSize: 13.5, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", ...extra
  }),
};

export default function Nav({ page, user, onNav, onAuth, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (p) => {
    setIsOpen(false);
    onNav(p);
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 500, height: 56, width: "calc(100% - 32px)", maxWidth: 1000, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", borderRadius: 50, border: `1px solid rgba(248,248,248,0.12)`, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
        <div style={{ padding: "0 16px 0 20px", height: "100%", display: "flex", alignItems: "center", width: "100%", position: "relative" }}>
          {/* Logo - Far Left */}
          <button onClick={() => handleNav("home")} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins',sans-serif", fontSize: 17, fontWeight: 800, color: T.white, letterSpacing: "-0.04em", background: "none", border: "none", cursor: "pointer", transition: "all 0.3s", padding: "6px 10px", borderRadius: 12 }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}>
            <div style={{ width: 28, height: 28, background: T.green, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={16} height={16} viewBox="0 0 16 16" fill={T.black}><path d="M2 12 L8 3 L14 12 Z" /></svg>
            </div>
            <span>Lofty<span style={{ color: T.green }}>Learn</span></span>
          </button>

          {/* Pages - Perfectly Centered, Hidden on Mobile */}
          <div className="mob-nav-hide" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 4 }}>
            {[["Home", "home"], ["Courses", "courses"], ["Live", "workshops"], ["About", "about"]].map(([l, p]) => (
              <button key={p} onClick={() => handleNav(p)} style={{ padding: "8px 16px", borderRadius: 30, fontSize: 13, fontWeight: 600, color: page === p ? T.white : T.muted, background: page === p ? "rgba(93,214,44,0.12)" : "transparent", border: page === p ? `1px solid rgba(93,214,44,0.3)` : "1px solid transparent", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer" }}
                onMouseEnter={e => { if (page !== p) { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = T.white; } else { e.currentTarget.style.boxShadow = "0 0 16px rgba(93,214,44,0.2)"; } }}
                onMouseLeave={e => { if (page !== p) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; } else { e.currentTarget.style.boxShadow = "none"; } }}>{l}</button>
            ))}
          </div>

          {/* Right Section - Auth */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Auth Buttons */}
            {user ? (
              <>
                <button onClick={() => handleNav("dashboard")} className="mob-hide" style={{ padding: "8px 16px", borderRadius: 40, fontSize: 13, fontWeight: 600, color: T.muted, border: `1px solid rgba(248,248,248,0.12)`, background: "transparent", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.2)"; e.currentTarget.style.color = T.white; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)"; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>Dashboard</button>
                <button onClick={() => { setIsOpen(false); onLogout(); }} className="mob-hide" style={s.btnPrimary({ padding: "8px 18px" })}>Sign out</button>
              </>
            ) : (
              <>
                <button onClick={() => onAuth("login")} className="mob-hide" style={{ padding: "8px 16px", borderRadius: 40, fontSize: 13, fontWeight: 600, color: T.muted, border: `1px solid rgba(248,248,248,0.12)`, background: "transparent", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.2)"; e.currentTarget.style.color = T.white; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)"; e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>Sign in</button>
                <button onClick={() => onAuth("signup")} className="mob-hide" style={s.btnPrimary({ padding: "8px 18px" })}>Get started</button>
              </>
            )}

            {/* Hamburger Menu (Mobile Only) */}
            <button className="mob-show" onClick={() => setIsOpen(true)} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`, color: T.white, display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Premium Half-Dropdown Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div onClick={() => setIsOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", animation: "fadeIn 0.3s ease", display: "block" }} />
          
          {/* Dropdown Menu Container */}
          <div style={{ position: "fixed", top: 12, left: 12, right: 12, zIndex: 1000, background: "rgba(18,18,18,0.95)", backdropFilter: "blur(24px)", borderRadius: 32, border: `1px solid rgba(255,255,255,0.08)`, padding: "24px", display: "flex", flexDirection: "column", gap: 24, boxShadow: `0 30px 60px rgba(0,0,0,0.9), 0 0 40px ${T.green}11`, animation: "slideDown 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
            
            {/* Header / Close */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins',sans-serif", fontSize: 18, fontWeight: 800, color: T.white }}>
                <div style={{ width: 32, height: 32, background: T.green, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={18} height={18} viewBox="0 0 16 16" fill={T.black}><path d="M2 12 L8 3 L14 12 Z" /></svg>
                </div>
                <span>Lofty<span style={{ color: T.green }}>Learn</span></span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {[["Home", "home"], ["Courses", "courses"], ["Live Workshops", "workshops"], ["About Us", "about"]].map(([l, p], i) => (
                <button key={p} style={{ animation: `fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both`, padding: "14px 20px", borderRadius: 16, background: page === p ? "rgba(93,214,44,0.12)" : "transparent", color: page === p ? T.green : T.white, fontSize: 18, fontWeight: page === p ? 800 : 600, textAlign: "left", letterSpacing: "-0.02em", transition: "all 0.2s" }} onClick={() => handleNav(p)}>{l}</button>
              ))}
            </div>

            {/* Auth/Dash */}
            <div style={{ animation: `fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.2s both`, borderTop: `1px solid rgba(255,255,255,0.08)`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {user ? (
                <>
                  <button onClick={() => handleNav("dashboard")} style={s.btnPrimary({ width: "100%", padding: "16px 0", fontSize: 16, borderRadius: 16 })}>Go to Dashboard</button>
                  <button onClick={() => { setIsOpen(false); onLogout(); }} style={s.btnGhost({ width: "100%", padding: "16px 0", fontSize: 16, border: "none", color: "#ff6b6b", background: "rgba(255,100,100,0.05)", borderRadius: 16 })}>Sign out securely</button>
                </>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <button onClick={() => { setIsOpen(false); onAuth("login"); }} style={s.btnGhost({ padding: "16px 0", fontSize: 15, borderRadius: 16 })}>Sign in</button>
                  <button onClick={() => { setIsOpen(false); onAuth("signup"); }} style={s.btnPrimary({ padding: "16px 0", fontSize: 15, borderRadius: 16 })}>Register Now</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}