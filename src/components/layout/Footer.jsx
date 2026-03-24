import { T } from "../../styles/tokens";

export default function Footer({ onNav }) {
  return (
    <footer style={{
      background: "linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(8,8,8,1) 100%)",
      borderTop: `1px solid rgba(248,248,248,0.08)`,
      padding: "100px 32px 48px", position: "relative",
    }}>
      {/* Background accent */}
      <div style={{
        position: "absolute", top: 0, right: -200, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(93,214,44,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Main Footer Content ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 80, marginBottom: 80 }}>

          {/* Brand Section */}
          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <button
              onClick={() => onNav("home")}
              style={{
                display: "flex", alignItems: "center",
                background: "none", border: "none",
                cursor: "pointer", padding: 0,
                marginBottom: 20
              }}
            >
              <img src="/logo.png" alt="LoftyLearn Logo" style={{ height: 60, width: "auto", objectFit: "contain" }} />
            </button>

            <p style={{
              fontSize: 14, color: "rgba(248,248,248,0.6)", lineHeight: 1.6,
              maxWidth: 260, marginBottom: 20,
            }}>
              Advanced Embedded Systems & Computer Architecture training for the modern engineering professional.
            </p>
            <p style={{
              fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 20,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              Learn Today. Build Tomorrow. Lead Always.
            </p>

            {/* Social Icons — Twitter, LinkedIn, YouTube only */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  label: "Twitter", href: "#",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn", href: "#",
                  icon: <span style={{ fontWeight: 800, fontSize: 14 }}>in</span>,
                },
                {
                  label: "YouTube", href: "#",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label} href={href}
                  target="_blank" rel="noopener noreferrer" title={label}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(248,248,248,0.06)",
                    border: `1px solid rgba(248,248,248,0.12)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, color: "rgba(248,248,248,0.7)",
                    cursor: "pointer", transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = T.green;
                    e.currentTarget.style.color = T.green;
                    e.currentTarget.style.background = "rgba(93,214,44,0.12)";
                    e.currentTarget.style.boxShadow = `0 0 20px rgba(93,214,44,0.3)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)";
                    e.currentTarget.style.color = "rgba(248,248,248,0.7)";
                    e.currentTarget.style.background = "rgba(248,248,248,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {[
            ["Platform", [["All Courses", "courses"], ["Live Workshops", "workshops"], ["Dashboard", "dashboard"], ["Pricing", null]]],
            ["Company", [["About Us", "about"], ["FAQ", "faq"], ["Contact", "contact"]]],
            ["Resources", [["Help Center / Support", "contact"], ["Security", null], ["Status", null], ["Community", null]]],
          ].map(([title, links]) => (
            <div key={title} style={{ flex: "1 1 140px", minWidth: 0 }}>
              <div style={{
                fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
                color: T.green, marginBottom: 24, fontWeight: 700, opacity: 0.9,
              }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {links.map(([l, p]) => (
                  <button
                    key={l}
                    onClick={() => p && onNav(p)}
                    style={{
                      fontSize: 14, color: "rgba(248,248,248,0.7)",
                      background: "none", border: "none",
                      cursor: p ? "pointer" : "default",
                      transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
                      padding: 0, textAlign: "left", fontWeight: 500,
                      fontFamily: "'Poppins',sans-serif",
                    }}
                    onMouseEnter={e => { if (p) { e.currentTarget.style.color = T.white; e.currentTarget.style.transform = "translateX(4px)"; } }}
                    onMouseLeave={e => { if (p) { e.currentTarget.style.color = "rgba(248,248,248,0.7)"; e.currentTarget.style.transform = "translateX(0)"; } }}
                  >{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div style={{
          borderTop: `1px solid rgba(248,248,248,0.08)`, paddingTop: 32,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 20,
        }}>

          {/* Legal links */}
          <div style={{ display: "flex", gap: 20, fontSize: 12, flexWrap: "wrap" }}>
            {[["Privacy Policy", null], ["Terms of Service", null], ["Cookie Policy", null]].map(([l, p]) => (
              <button
                key={l}
                onClick={() => p && onNav(p)}
                style={{
                  color: "rgba(248,248,248,0.5)", background: "none", border: "none",
                  cursor: "pointer", transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
                  fontWeight: 500, fontFamily: "'Poppins',sans-serif",
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.green}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(248,248,248,0.5)"}
              >{l}</button>
            ))}
          </div>

          {/* Copyright — center */}
          <div style={{
            fontSize: 13, color: "rgba(248,248,248,0.5)", fontWeight: 500,
            textAlign: "center", flex: "1", fontFamily: "'Poppins',sans-serif",
          }}>
            © 2026 LoftyLearn. All rights reserved.
          </div>

          {/* Made by — shifted left */}
          <div style={{
            fontSize: 13, color: "rgba(248,248,248,0.5)",
            fontWeight: 500, fontFamily: "'Poppins',sans-serif",
            marginRight: 80,
          }}>
            Developed by{" "}
            <a
              href="https://www.ausdauergroups.in"
              target="_blank" rel="noopener noreferrer"
              style={{
                color: T.green, textDecoration: "none",
                fontWeight: 600, transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Ausdauer Groups
            </a>.
          </div>

        </div>
      </div>
    </footer>
  );
}
