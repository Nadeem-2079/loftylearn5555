import { T } from "../../styles/tokens";

const s = {
  card: (extra={}) => ({ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, ...extra }),
};

export default function HeroCardStack() {
  return (
    <div style={{ position:"relative", width:360, height:420 }}>
      {/* Back card */}
      <div style={{ position:"absolute", width:300, top:16, left:30, opacity:0.5, animation:"floatB 6s ease-in-out infinite", ...s.card(), overflow:"hidden" }}>
        <div style={{ height:140, background:T.surface2, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", background: "transparent", backgroundSize:"48px 48px" }} />
          <span style={{ fontSize:44, position:"relative", zIndex:1 }}>🎨</span>
        </div>
        <div style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:T.green, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>UI/UX Design</div>
          <div style={{ fontSize:14, fontWeight:600, color:T.white }}>Design Systems Mastery</div>
        </div>
      </div>
      {/* Main card */}
      <div style={{ position:"absolute", width:320, top:0, left:20, animation:"floatA 6s ease-in-out infinite", ...s.card(), overflow:"hidden" }}>
        <div style={{ height:150, background:T.surface2, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", background: "transparent", backgroundSize:"48px 48px" }} />
          <span style={{ fontSize:48, position:"relative", zIndex:1 }}>🤖</span>
        </div>
        <div style={{ padding:"16px 18px" }}>
          <div style={{ fontSize:10, color:T.green, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Machine Learning</div>
          <div style={{ fontSize:14, fontWeight:600, color:T.white, marginBottom:12 }}>ML A-Z: Python & Applied AI</div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:11.5, color:T.muted2 }}>Progress</span>
            <span style={{ fontSize:11.5, color:T.green, fontWeight:500 }}>68%</span>
          </div>
          <div style={{ height:3, background:T.surface3, borderRadius:2, overflow:"hidden", marginBottom:12 }}>
            <div style={{ height:"100%", width:"68%", background:T.green, borderRadius:2 }} />
          </div>
          {[{t:"Neural Network Intro",done:true},{t:"Regression Models",done:true},{t:"Deep Learning Basics",done:false,current:true}].map(l => (
            <div key={l.t} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 9px", borderRadius:6, marginBottom:4, fontSize:12.5, background: l.current ? "rgba(93,214,44,0.06)" : T.surface2, border:`1px solid ${l.current ? "rgba(93,214,44,0.2)" : "transparent"}`, color: l.done ? T.muted2 : T.white }}>
              <div style={{ width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, flexShrink:0, background: l.done ? T.green : "transparent", border: l.done ? "none" : l.current ? `1.5px solid rgba(93,214,44,0.4)` : `1.5px solid ${T.border}`, color: l.done ? T.black : T.green, fontWeight:700 }}>{l.done ? "✓" : l.current ? "▶" : ""}</div>
              {l.t}
            </div>
          ))}
        </div>
      </div>
      {/* Badge */}
      <div style={{ position:"absolute", bottom:20, right:-10, animation:"floatBadge 4s ease-in-out infinite", ...s.card(), padding:"12px 16px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 12px 40px rgba(0,0,0,0.6)", zIndex:10, whiteSpace:"nowrap" }}>
        <span style={{ fontSize:22 }}>🔥</span>
        <div>
          <div style={{ fontSize:10.5, color:T.muted2, marginBottom:1 }}>Learning streak</div>
          <div style={{ fontSize:14, fontWeight:600, color:T.green }}>14 days active</div>
        </div>
      </div>
    </div>
  );
}