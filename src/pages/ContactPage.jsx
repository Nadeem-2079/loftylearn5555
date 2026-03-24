import React, { useState } from "react";
import { T } from "../styles/tokens";
import GridBg from "../components/primitives/GridBg";
import Eyebrow from "../components/primitives/Eyebrow";
import { submitContact } from "../services/api";

const s = {
  display: (size = 28, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif", fontSize: size, fontWeight: 800,
    letterSpacing: "-0.03em", color: T.white, lineHeight: 1.1, ...extra,
  }),
  input: {
    width: "100%", padding: "14px 18px", borderRadius: 12,
    border: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)",
    color: T.white, fontSize: 14, outline: "none",
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: "'Poppins', sans-serif", boxSizing: "border-box",
  },
  card: {
    padding: 24, borderRadius: 16, background: T.surface,
    border: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 8,
  },
};

export default function ContactPage({ onNav }) {
  const [form, setForm] = useState({
    name: "", email: "", inquiryType: "General Question", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = T.green;
    e.currentTarget.style.background = "rgba(93,214,44,0.02)";
  };
  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
  };

  const handleChange = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields."); return;
    }
    setStatus("loading");
    try {
      const result = await submitContact(form);
      if (result.success) {
        setStatus("success");
        setForm({ name: "", email: "", inquiryType: "General Question", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: T.bg }}>
      <GridBg />
      <div className="mob-pad mob-pad-y-lg" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <Eyebrow>Contact Us</Eyebrow>
          <h1 className="mob-text-h2" style={s.display(42, { marginTop: 12 })}>Let's start a Conversation.</h1>
          <p className="mob-text-p" style={{ color: T.muted, fontSize: 15, marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
            Whether you're looking for enterprise training or have a quick question, our team is here.
          </p>
        </div>

        <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32 }}>

          {/* Left Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={s.card}>
              <div style={{ color: T.white, marginBottom: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <span style={{ color: T.white, fontWeight: 700, fontSize: 15,
                fontFamily: "'Poppins',sans-serif" }}>General Support</span>
              <span style={{ color: T.muted, fontSize: 13 }}>For billing and account queries.</span>
              <span style={{ color: T.green, fontSize: 13 }}>support@loftylearn.com</span>
            </div>
            <div style={s.card}>
              <div style={{ color: T.white, marginBottom: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span style={{ color: T.white, fontWeight: 700, fontSize: 15,
                fontFamily: "'Poppins',sans-serif" }}>Global Headquarters</span>
              <span style={{ color: T.muted, fontSize: 13 }}>LoftyLearn Academy<br />Coimbatore, India</span>
            </div>
            <div style={s.card}>
              <div style={{ color: T.white, marginBottom: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span style={{ color: T.white, fontWeight: 700, fontSize: 15,
                fontFamily: "'Poppins',sans-serif" }}>Response Time</span>
              <span style={{ color: T.muted, fontSize: 13 }}>
                We typically respond within 4–8 hours during business days.
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Twitter", "LinkedIn", "YouTube"].map(p => (
                <button key={p} style={{ padding: "8px 16px", borderRadius: 8,
                  background: "transparent", border: `1px solid ${T.border}`,
                  color: T.muted, fontSize: 13, cursor: "pointer",
                  fontFamily: "'Poppins',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit} style={{ ...s.card, gap: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              <div>
                <label style={{ color: T.muted, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "'Poppins',sans-serif" }}>Full Name</label>
                <input style={{ ...s.input, marginTop: 6 }} placeholder="Enter your name"
                  value={form.name} onChange={handleChange("name")}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={{ color: T.muted, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "'Poppins',sans-serif" }}>Work Email</label>
                <input style={{ ...s.input, marginTop: 6 }} type="email" placeholder="Enter your email"
                  value={form.email} onChange={handleChange("email")}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div>
              <label style={{ color: T.muted, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: "'Poppins',sans-serif" }}>Inquiry Type</label>
              <select style={{ ...s.input, marginTop: 6, appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23777' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                backgroundSize: "12px 8px" }}
                value={form.inquiryType} onChange={handleChange("inquiryType")}
                onFocus={handleFocus} onBlur={handleBlur}>
                <option>General Question</option>
                <option>Enterprise / Team Training</option>
                <option>Technical Support</option>
                <option>Partnership Opportunity</option>
              </select>
            </div>

            <div>
              <label style={{ color: T.muted, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: "'Poppins',sans-serif" }}>Message</label>
              <textarea style={{ ...s.input, marginTop: 6, minHeight: 120, resize: "vertical" }}
                placeholder="How can we help you?"
                value={form.message} onChange={handleChange("message")}
                onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            <button type="submit" disabled={status === "loading"}
              style={{ width: "100%", padding: "15px", borderRadius: 12,
                background: status === "success" ? "#2d7d0f" : T.green,
                color: T.black, fontWeight: 700, fontSize: 15,
                border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif",
                transition: "all 0.2s" }}>
              {status === "loading" ? "Sending..." :
               status === "success" ? "✓ Message Sent!" : "Submit Inquiry →"}
            </button>

            {status === "error" && (
              <p style={{ color: "#ff4d4d", fontSize: 13, textAlign: "center",
                fontFamily: "'Poppins',sans-serif" }}>
                Something went wrong. Please try again.
              </p>
            )}
            <p style={{ color: T.muted, fontSize: 12, textAlign: "center",
              fontFamily: "'Poppins',sans-serif" }}>
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
