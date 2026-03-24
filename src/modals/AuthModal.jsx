import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { T } from "../styles/tokens";
import { registerUser } from "../services/api";

const s = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, backdropFilter: "blur(6px)",
  },
  modal: {
    background: T.surface, borderRadius: 20, padding: "36px 32px",
    width: "100%", maxWidth: 420, position: "relative",
    border: `1px solid ${T.border}`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
    maxHeight: "90vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },
  input: {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    border: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)",
    color: T.white, fontSize: 14, outline: "none",
    fontFamily: "'Poppins',sans-serif", boxSizing: "border-box",
    transition: "all 0.2s",
  },
  label: {
    color: T.muted, fontSize: 11, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "'Poppins',sans-serif",
  },
  btnPrimary: {
    width: "100%", padding: "14px", borderRadius: 12,
    background: T.green, color: T.black, fontWeight: 700,
    fontSize: 15, border: "none", cursor: "pointer",
    fontFamily: "'Poppins',sans-serif", marginTop: 8,
    transition: "opacity 0.2s",
  },
  close: {
    position: "absolute", top: 16, right: 16, background: "transparent",
    border: "none", color: T.muted, fontSize: 20, cursor: "pointer",
    zIndex: 2,
  },
  divider: { display: "flex", alignItems: "center", gap: 12, margin: "16px 0" },
  divLine: { flex: 1, height: 1, background: T.border },
  divText: { color: T.muted, fontSize: 12, fontFamily: "'Poppins',sans-serif" },
};

function ModalInner({ mode, onClose, onLogin, addToast, switchMode }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const isRegister = mode === "register" || mode === "signup";

  const focusStyle = (e) => {
    e.currentTarget.style.borderColor = T.green;
    e.currentTarget.style.background = "rgba(93,214,44,0.03)";
  };
  const blurStyle = (e) => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
  };

  // ── Google Sign-In ────────────────────────────────────────
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        name:       decoded.name,
        email:      decoded.email,
        picture:    decoded.picture,
        authMethod: "google",
      };
      const result = await registerUser(userData);
      if (result.success) {
        // Pass isNew flag so App.jsx can show correct toast
        onLogin(userData, result.isNew);
        onClose();
      } else {
        addToast("Something went wrong. Try again.", "!");
      }
    } catch (err) {
      console.error(err);
      addToast("Google sign-in failed. Try again.", "!");
    } finally {
      setLoading(false);
    }
  };

  // ── Email/Password Form ───────────────────────────────────
  const handleManualSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && (!name.trim() || !email.trim() || !password.trim())) {
      addToast("Please fill all fields", "!"); return;
    }
    if (!isRegister && (!email.trim() || !password.trim())) {
      addToast("Please fill all fields", "!"); return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const result = await registerUser({
          name, email, picture: "", authMethod: "email",
        });
        if (result.success) {
          onLogin({ name, email, picture: "" }, true); // true = new user
          onClose();
        } else {
          addToast("Registration failed. Try again.", "!");
        }
      } else {
        // Login — sign in by email (no password stored in sheets)
        onLogin({ name: email.split("@")[0], email, picture: "" }, false);
        onClose();
      }
    } catch (err) {
      console.error(err);
      addToast("Something went wrong. Try again.", "!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.modal}>
      <button style={s.close} onClick={onClose}>✕</button>

      {/* ── Logo — clean, no broken image ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 34, height: 34, background: T.green, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ color: T.black, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>L</span>
        </div>
        <span style={{
          color: T.white, fontWeight: 800, fontSize: 16,
          fontFamily: "'Poppins',sans-serif", letterSpacing: "-0.02em",
        }}>LoftyLearn</span>
      </div>

      {/* Heading */}
      <h2 style={{
        color: T.white, fontFamily: "'Poppins',sans-serif",
        fontWeight: 800, fontSize: 26, margin: "0 0 4px", letterSpacing: "-0.03em",
      }}>
        {isRegister ? "Join LoftyLearn." : "Welcome back."}
      </h2>
      <p style={{
        color: T.muted, fontSize: 13, marginBottom: 24,
        fontFamily: "'Poppins',sans-serif",
      }}>
        {isRegister ? "Register your account today." : "Continue your learning journey."}
      </p>

      {/* Google Sign-In */}
      <div style={{ width: "100%", marginBottom: 4 }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => addToast("Google login failed", "!")}
          width="356"
          text={isRegister ? "continue_with" : "signin_with"}
          shape="rectangular"
          theme="filled_black"
        />
      </div>

      {/* Divider */}
      <div style={s.divider}>
        <div style={s.divLine} />
        <span style={s.divText}>or</span>
        <div style={s.divLine} />
      </div>

      {/* Manual Form */}
      <form onSubmit={handleManualSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {isRegister && (
          <div>
            <label style={s.label}>Full Name</label>
            <input
              style={{ ...s.input, marginTop: 6 }}
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              onFocus={focusStyle} onBlur={blurStyle}
            />
          </div>
        )}

        <div>
          <label style={s.label}>Email</label>
          <input
            style={{ ...s.input, marginTop: 6 }}
            type="email" placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={focusStyle} onBlur={blurStyle}
          />
        </div>

        <div>
          <label style={s.label}>Password</label>
          <input
            style={{ ...s.input, marginTop: 6 }}
            type="password"
            placeholder={isRegister ? "Choose a strong password" : "••••••••"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={focusStyle} onBlur={blurStyle}
          />
          {!isRegister && (
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <span style={{
                color: T.green, fontSize: 13, cursor: "pointer",
                fontFamily: "'Poppins',sans-serif",
              }}>Forgot?</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
          disabled={loading}
        >
          {loading ? "Please wait..." : isRegister ? "Create account →" : "Sign in →"}
        </button>
      </form>

      {/* Switch Mode */}
      <p style={{
        textAlign: "center", color: T.muted, fontSize: 13,
        fontFamily: "'Poppins',sans-serif", marginTop: 18,
      }}>
        {isRegister ? "Already have an account? " : "No account? "}
        <span
          style={{ color: T.green, cursor: "pointer", fontWeight: 600 }}
          onClick={() => switchMode(isRegister ? "login" : "register")}
        >
          {isRegister ? "Sign in" : "Create one free"}
        </span>
      </p>
    </div>
  );
}

export default function AuthModal({ mode, onClose, onLogin, addToast }) {
  const [currentMode, setCurrentMode] = useState(mode);

  if (!currentMode) return null;

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalInner
        mode={currentMode}
        onClose={onClose}
        onLogin={onLogin}
        addToast={addToast}
        switchMode={setCurrentMode}
      />
    </div>
  );
}
