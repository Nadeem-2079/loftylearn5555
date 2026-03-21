import React from "react";
import { T } from "../styles/tokens";
import GridBg from "../components/primitives/GridBg";
import Eyebrow from "../components/primitives/Eyebrow";

const s = {
  display: (size = 28, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.white,
    lineHeight: 1.1,
    ...extra
  }),
  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: `1px solid ${T.border}`,
    background: "rgba(255,255,255,0.02)",
    color: T.white,
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    padding: 24,
    borderRadius: 16,
    background: T.surface,
    border: `1px solid ${T.border}`,
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
};

export default function ContactPage() {
  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = T.green;
    e.currentTarget.style.background = "rgba(93,214,44,0.02)";
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
  };

  return (
    <section style={{ position: "relative", background: T.bg, padding: "60px 24px" }}>
      <GridBg opacity={0.03} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* HEADER AREA */}
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <Eyebrow>Contact Us</Eyebrow>
          <h1 style={s.display(48, { marginTop: 12, marginBottom: 16 })}>
            Let’s start a <span style={{ color: T.green }}>Conversation.</span>
          </h1>
          <p style={{ color: T.muted, fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            Whether you're looking for enterprise training or have a quick question about a course, our team is here to help.
          </p>
        </div>

        <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>

          {/* LEFT COLUMN: INFO TILES */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            <div style={s.card}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div style={{ fontWeight: 700, color: T.white, fontSize: 16 }}>General Support</div>
              <div style={{ color: T.muted2, fontSize: 14 }}>For billing and account queries.</div>
              <a href="mailto:support@learningos.com" style={{ color: T.green, fontSize: 14, textDecoration: "none", fontWeight: 600 }}>support@learningos.com</a>
            </div>

            <div style={s.card}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22"/><line x1="15" y1="22" x2="15" y2="22"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="12" y1="6" x2="12" y2="6"/><line x1="9" y1="18" x2="9" y2="18"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="18" x2="15" y2="18"/><line x1="15" y1="14" x2="15" y2="14"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="15" y1="6" x2="15" y2="6"/></svg>
              <div style={{ fontWeight: 700, color: T.white, fontSize: 16 }}>Global Headquarters</div>
              <div style={{ color: T.muted2, fontSize: 14, lineHeight: 1.5 }}>
                123 Tech Plaza, Suite 500<br />
                San Francisco, CA 94105
              </div>
            </div>

            <div style={s.card}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <div style={{ fontWeight: 700, color: T.white, fontSize: 16 }}>Response Time</div>
              <div style={{ color: T.muted2, fontSize: 14 }}>
                We typically respond within <strong>4–8 hours</strong> during business days.
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map(platform => (
                <div key={platform} style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  border: `1px solid ${T.border}`,
                  fontSize: 12,
                  color: T.muted,
                  cursor: "pointer",
                  transition: "0.2s"
                }} onMouseEnter={e => e.currentTarget.style.borderColor = T.green}>
                  {platform}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: THE FORM */}
          <div style={{
            background: T.surface,
            padding: 40,
            borderRadius: 24,
            border: `1px solid ${T.borderHi}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <form style={{ display: "flex", flexDirection: "column", gap: 24 }} onSubmit={e => e.preventDefault()}>
              <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Full Name</label>
                  <input type="text" placeholder="Jane Doe" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Work Email</label>
                  <input type="email" placeholder="jane@company.com" style={s.input} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Inquiry Type</label>
                <select
                  style={{
                    ...s.input,
                    appearance: "none",
                    cursor: "pointer",
                    paddingRight: "40px",
                    backgroundColor: T.surface,
                    background: `${T.surface} url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path fill='${encodeURIComponent(T.muted2)}' d='M0 0l6 8 6-8z'/></svg>") no-repeat right 14px center`,
                    backgroundSize: "12px 8px",
                    color: T.white,
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option style={{ background: T.surface, color: T.white }}>General Question</option>
                  <option style={{ background: T.surface, color: T.white }}>Enterprise / Team Training</option>
                  <option style={{ background: T.surface, color: T.white }}>Technical Support</option>
                  <option style={{ background: T.surface, color: T.white }}>Partnership Opportunity</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={5}
                  style={{ ...s.input, resize: "none" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <button style={{
                padding: "16px 32px",
                borderRadius: 14,
                background: T.green,
                color: T.black,
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 10px 20px ${T.green}22`,
                transition: "transform 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                Submit Inquiry →
              </button>

              <p style={{ fontSize: 11, color: T.muted2, textAlign: "center", marginTop: 10 }}>
                By submitting this form, you agree to our Privacy Policy.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}