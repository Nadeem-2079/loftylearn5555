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
          <div style={{ color: T.white, opacity: 0.6 }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.928 0 1.72-.619 1.94-1.512a1.001 1.001 0 0 1 1.06-.788H18a3 3 0 0 0 3-3v-4.131a1 1 0 0 0-.293-.707l-2.121-2.121a1 1 0 0 0-.707-.293H15.5a1 1 0 0 1-1-1V4.5a1 1 0 0 0-1-1H12V2z"/></svg>
          </div>
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
          <div style={{ color: T.white, opacity: 0.8 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
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
        <div style={{ color: T.green }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.291 1-3a4 4 0 0 0 2.5 2.5z"/></svg>
        </div>
        <div>
          <div style={{ fontSize:10.5, color:T.muted2, marginBottom:1 }}>Learning streak</div>
          <div style={{ fontSize:14, fontWeight:600, color:T.green }}>14 days active</div>
        </div>
      </div>
    </div>
  );
}