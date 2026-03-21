import { useState } from "react";
import { T } from "../styles/tokens";

const s = {
  card: (extra={}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
  display: (size=32, extra={}) => ({ fontFamily:"'Poppins',sans-serif", fontSize:size, fontWeight:800, letterSpacing:"-0.04em", color:T.white, lineHeight:1.08, ...extra }),
  btnPrimary: (extra={}) => ({
    padding:"10px 22px", borderRadius:10, background:T.green, color:T.black,
    fontSize:13.5, fontWeight:700, fontFamily:"'Poppins',sans-serif",
    letterSpacing:"-0.01em", cursor:"pointer", border:"none",
    transition:"all 0.2s cubic-bezier(0.16,1,0.3,1)", ...extra
  }),
  btnGhost: (extra={}) => ({
    padding:"9px 18px", borderRadius:10, background:"transparent",
    border:`1px solid ${T.border}`, color:T.muted, fontSize:13.5, fontWeight:600,
    cursor:"pointer", transition:"all 0.2s", ...extra
  }),
  input: { width:"100%", padding:"11px 14px", background:T.surface2, border:`1px solid ${T.border}`, borderRadius:10, color:T.white, fontSize:14, outline:"none" },
};

export default function AuthModal({ mode, onClose, onLogin }) {
  const [view, setView] = useState(mode);
  const [nm, setNm] = useState(""); const [em, setEm] = useState(""); const [pw, setPw] = useState("");

  const doAuth = (name, email) => {
    onLogin({ name, email });
    onClose();
  };

  const logoMark = <div style={{ width:26, height:26, background:T.green, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><svg width={14} height={14} viewBox="0 0 16 16" fill={T.black}><path d="M2 12 L8 3 L14 12 Z"/></svg></div>;

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(12px)", zIndex:600, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ ...s.card(), width:"100%", maxWidth:420, padding:36, boxShadow:"0 12px 40px rgba(0,0,0,0.6)", position:"relative", animation:"fadeUp 0.25s cubic-bezier(0.16,1,0.3,1) both", maxHeight:"90vh", overflowY:"auto" }}>
        <button onClick={onClose} style={{ position:"absolute", top:18, right:18, width:30, height:30, borderRadius:6, border:`1px solid ${T.border}`, color:T.muted2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, cursor:"pointer", transition:"all 0.2s" }}>✕</button>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:24, fontFamily:"'Poppins',sans-serif", fontSize:17, fontWeight:800, color:T.white }}>
          {logoMark} LoftyLearn
        </div>
        {view==="login" ? (
          <>
            <h2 style={s.display(24, { marginBottom:5 })}>Welcome back.</h2>
            <p style={{ fontSize:13.5, color:T.muted2, marginBottom:24 }}>Continue your learning journey.</p>
            <button style={{ width:"100%", ...s.btnGhost({ padding:11, fontSize:14, fontWeight:600, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }) }}
              onClick={() => doAuth("Demo User","demo@loftylearn.com")}>
              <span style={{ fontSize:16 }}>⊕</span> Continue with Google
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"0 0 18px", color:T.muted2 }}>
              <div style={{ flex:1, height:1, background:T.border }} />
              <span style={{ fontSize:10.5 }}>or</span>
              <div style={{ flex:1, height:1, background:T.border }} />
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:10.5, letterSpacing:"0.08em", textTransform:"uppercase", color:T.muted2, display:"block", marginBottom:7 }}>Email</label>
              <input style={s.input} type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:10.5, letterSpacing:"0.08em", textTransform:"uppercase", color:T.muted2, display:"block", marginBottom:7 }}>Password</label>
              <input style={s.input} type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" />
              <div style={{ textAlign:"right", marginTop:5 }}><span style={{ fontSize:11, color:T.green, cursor:"pointer" }} onClick={() => setView("forgot")}>Forgot?</span></div>
            </div>
            <button style={{ width:"100%", ...s.btnPrimary({ padding:13, fontSize:14.5, borderRadius:12, fontFamily:"'Poppins',sans-serif" }) }} onClick={() => em&&pw ? doAuth(em.split("@")[0], em) : null}>Sign in →</button>
            <div style={{ textAlign:"center", fontSize:13.5, color:T.muted2, marginTop:18 }}>No account? <span style={{ color:T.green, cursor:"pointer" }} onClick={() => setView("signup")}>Create one free</span></div>
          </>
        ) : view==="signup" ? (
          <>
            <h2 style={s.display(24, { marginBottom:5 })}>Join LoftyLearn.</h2>
            <p style={{ fontSize:13.5, color:T.muted2, marginBottom:24 }}>Register your account today.</p>
            <button style={{ width:"100%", ...s.btnGhost({ padding:11, fontSize:14, fontWeight:600, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }) }}
              onClick={() => doAuth("Demo User","demo@loftylearn.com")}>
              <span style={{ fontSize:16 }}>⊕</span> Continue with Google
            </button>
            <div style={{ display:"flex", alignItems:"center", gap:12, margin:"0 0 18px", color:T.muted2 }}>
              <div style={{ flex:1, height:1, background:T.border }} />
              <span style={{ fontSize:10.5 }}>or</span>
              <div style={{ flex:1, height:1, background:T.border }} />
            </div>
            {[["Full Name",nm,setNm,"text","Your name"],["Email",em,setEm,"email","you@example.com"],["Password",pw,setPw,"password","Choose a strong password"]].map(([label,val,set,type,ph]) => (
              <div key={label} style={{ marginBottom:14 }}>
                <label style={{ fontSize:10.5, letterSpacing:"0.08em", textTransform:"uppercase", color:T.muted2, display:"block", marginBottom:7 }}>{label}</label>
                <input style={s.input} type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph} />
              </div>
            ))}
            <button style={{ width:"100%", ...s.btnPrimary({ padding:13, fontSize:14.5, borderRadius:12, fontFamily:"'Poppins',sans-serif", marginTop:6 }) }} onClick={() => nm&&em&&pw ? doAuth(nm,em) : null}>Create account →</button>
            <div style={{ textAlign:"center", fontSize:13.5, color:T.muted2, marginTop:18 }}>Already have an account? <span style={{ color:T.green, cursor:"pointer" }} onClick={() => setView("login")}>Sign in</span></div>
          </>
        ) : (
          <>
            <h2 style={s.display(24, { marginBottom:5 })}>Reset password.</h2>
            <p style={{ fontSize:13.5, color:T.muted2, marginBottom:24 }}>Enter your email. We'll send a reset link.</p>
            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:10.5, letterSpacing:"0.08em", textTransform:"uppercase", color:T.muted2, display:"block", marginBottom:7 }}>Email</label>
              <input style={s.input} type="email" placeholder="you@example.com" />
            </div>
            <button style={{ width:"100%", ...s.btnPrimary({ padding:13, fontSize:14.5, borderRadius:12, fontFamily:"'Poppins',sans-serif" }) }} onClick={onClose}>Send reset link →</button>
            <div style={{ textAlign:"center", fontSize:13.5, color:T.muted2, marginTop:18 }}><span style={{ color:T.green, cursor:"pointer" }} onClick={() => setView("login")}>← Back to sign in</span></div>
          </>
        )}
      </div>
    </div>
  );
}