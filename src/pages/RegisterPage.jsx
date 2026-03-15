import React, { useState } from "react";
import { T } from "../styles/tokens";

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins',sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.white,
    lineHeight: 1.1,
    ...extra,
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
    fontFamily: "'Poppins',sans-serif",
  },
  card: {
    padding: 24,
    borderRadius: 16,
    background: T.surface,
    border: `1px solid ${T.border}`,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
};

export default function RegisterPage({ workshop, onSubmit }) {
  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = T.green;
    e.currentTarget.style.background = "rgba(197, 209, 199,0.02)";
  };
  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <h2 style={s.display(36)}>{workshop?.title || "Workshop"}</h2>
        <div style={{ color: T.muted2, fontSize: 16 }}>{workshop?.date}</div>
      </div>

      <div style={{ background: T.surface, padding: 40, borderRadius: 24, border: `1px solid ${T.borderHi}` }}>
        <form
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
          onSubmit={(e) => {
            e.preventDefault();
            // here you would normally validate/submit to API
            onSubmit();
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Jane Doe"
              style={s.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@domain.com"
              style={s.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: T.muted2, marginLeft: 4 }}>Phone (optional)</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="(123) 456‑7890"
              style={s.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button
            style={{
              padding: "14px 28px",
              borderRadius: 14,
              background: T.green,
              color: T.black,
              fontSize: 15,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 10px 20px ${T.green}22`,
              transition: "transform 0.2s",
              alignSelf: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Continue to Payment →
          </button>
        </form>
      </div>
    </div>
  );
}