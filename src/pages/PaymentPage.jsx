import React, { useState } from "react";
import { T } from "../styles/tokens";

const s = {
  input: {
    width: "100%",
    padding: "16px 20px",
    borderRadius: 12,
    border: `2px solid ${T.border}`,
    background: "rgba(255,255,255,0.02)",
    color: T.white,
    fontSize: 16,
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "monospace",
    letterSpacing: 2
  },
  btnPrimary: (extra = {}) => ({
    padding: "16px 32px",
    borderRadius: 12,
    background: T.green,
    color: T.black,
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
    ...extra,
  }),
  btnWhatsApp: {
    padding: "16px 32px",
    borderRadius: 12,
    background: "#25D366", // Official WhatsApp green
    color: "#FFF",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    transition: "all 0.2s",
    textDecoration: "none"
  }
};

export default function PaymentPage({ course, workshop, user, onComplete, onAuth }) {
  const item = workshop || course;
  const label = workshop ? "registering for" : "enrolling in";

  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  // Require authentication
  if (!user) {
    return (
      <div style={{ padding: "100px 24px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: T.white, marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>
          Sign In Required
        </h1>
        <p style={{ color: T.muted2, fontSize: 16, marginBottom: 40 }}>
          You need to be signed in to complete your request.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button onClick={() => onAuth && onAuth("login")} style={s.btnPrimary()}>Sign In</button>
        </div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello LoftyLearn, I would like to request an access token for the course: "${item?.title}". My registered email is: ${user?.email}`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (token.trim().toUpperCase() === "GRANTED" || token.length > 5) {
      setError("");
      onComplete && onComplete(item?.id);
    } else {
      setError("Invalid Access Token. Please contact support via WhatsApp.");
    }
  };

  return (
    <div style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto", position: "relative" }}>
      
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, 0)", width: "50vw", height: "50vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 50%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `rgba(93,214,44,0.1)`, border: `1px solid ${T.green}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: T.green }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 900, color: T.white, marginBottom: 16, fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em" }}>
          Request Access
        </h1>
        <p style={{ fontSize: 18, color: T.muted, marginBottom: 48, lineHeight: 1.6 }}>
          You're requesting access to <strong>{item?.title}</strong>. <br/> Access to our advanced modules is granted directly via our backend.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, maxWidth: 500, margin: "0 auto" }}>
          
          {/* Step 1: Request via WhatsApp */}
          <div style={{ padding: 32, borderRadius: 24, background: T.surface, border: `1px solid ${T.border}`, boxShadow: `0 20px 40px rgba(0,0,0,0.4)` }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginBottom: 8 }}>1. Get Access Token</h3>
            <p style={{ color: T.muted2, marginBottom: 24, fontSize: 14 }}>Message us on WhatsApp to verify your profile and receive your unique access token.</p>
            
            <button onClick={handleWhatsApp} style={s.btnWhatsApp}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Request Token via WhatsApp
            </button>
          </div>

          {/* Step 2: Verify Token */}
          <div style={{ padding: 32, borderRadius: 24, background: T.surface, border: `1px solid ${T.border}`, boxShadow: `0 20px 40px rgba(0,0,0,0.4)` }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginBottom: 8 }}>2. Verify Token</h3>
            <p style={{ color: T.muted2, marginBottom: 24, fontSize: 14 }}>Enter the token received from our team to unlock the course material instantly.</p>
            
            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                placeholder="e.g. GRANTED"
                value={token}
                onChange={e => setToken(e.target.value)}
                style={{ ...s.input, borderColor: error ? "#ff4444" : T.border }}
                onFocus={e => e.currentTarget.style.borderColor = T.green}
                onBlur={e => e.currentTarget.style.borderColor = error ? "#ff4444" : T.border}
              />
              {error && <div style={{ color: "#ff4444", fontSize: 13, textAlign: "left" }}>{error}</div>}
              
              <button type="submit" style={{ ...s.btnPrimary(), width: "100%", marginTop: 8 }}>
                Unlock Course
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}