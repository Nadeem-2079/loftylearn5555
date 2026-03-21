import React, { useState, useEffect, useRef } from "react";
import { COURSES } from "../data/courses";
import { INSTRUCTORS } from "../data/instructors";
import { CATS } from "../data/categories";

import CourseCard from "../components/ui/CourseCard";
import InstructorCard from "../components/ui/InstructorCard";
import MarqueeStrip from "../components/hero/MarqueeStrip";
import Eyebrow from "../components/primitives/Eyebrow";
import GridBg from "../components/primitives/GridBg";

import { T } from "../styles/tokens";
import loftybg from "../assets/loftybg.png";
import heroImage from "../assets/hero_image.png";

const Icons = {
  Cpu: (color) => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M15 2v2" /><path d="M9 2v2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 20v2" /><path d="M15 20v2" /><path d="M2 9h2" /><path d="M2 15h2" /></svg>,
  Zap: (color) => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  Layers: (color) => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  Code: (color) => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
};

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif", fontSize: size, fontWeight: 800,
    letterSpacing: "-0.03em", color: T.white, lineHeight: 1.1, ...extra
  }),
  row: (gap = 12, extra = {}) => ({ display: "flex", alignItems: "center", gap, ...extra }),
  btnPrimary: (extra = {}) => ({
    padding: "12px 26px", borderRadius: 12, background: T.green, color: T.black,
    fontSize: 14, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
    cursor: "pointer", border: "none", transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)", ...extra
  }),
  btnGhost: (extra = {}) => ({
    padding: "11px 22px", borderRadius: 12, background: "rgba(255,255,255,0.03)",
    border: `1px solid ${T.border}`, color: T.muted, fontSize: 13.5, fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", ...extra
  }),
  highlight: {
    background: T.green,
    color: T.black,
    padding: "2px 10px",
    borderRadius: "4px",
    display: "inline-block",
    transform: "rotate(-1.5deg)",
    boxShadow: "0 4px 12px rgba(93, 214, 44, 0.2)"
  }
};

export default function HomePage({ onCourse, onAuth, onNav, toast }) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredCats = [
    { icon: Icons.Cpu("#111"), name: "ARM Architecture", desc: "Instruction sets & Cortex-M internals" },
    { icon: Icons.Zap("#111"), name: "RTOS & Kernels", desc: "FreeRTOS, threading & scheduling" },
    { icon: Icons.Code("#111"), name: "Embedded C/C++", desc: "Bare-metal & hardware abstraction" },
    { icon: Icons.Layers("#111"), name: "Microcontrollers", desc: "STM32, ESP32 & AVR interfacing" },
  ];

  return (
    <div style={{ background: T.bg, color: T.white }}>

      {/* HERO SECTION */}
      <section ref={heroRef} style={{
        width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url(${loftybg})`, backgroundSize: 'cover',
        backgroundPosition: 'center', position: 'relative', overflow: 'hidden',
        paddingTop: 80
      }}>
        {/* Dark Overlay for the background image */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.75)', zIndex: 0 }} />

        {/* Soft Radial Glow over the image */}
        <div style={{ position: 'absolute', top: "10%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 60%)`, pointerEvents: "none", zIndex: 1 }} />

        <div className="mob-grid mob-pad-y-lg mob-pad" style={{
          maxWidth: 1200, width: '100%', padding: '60px 24px', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2
        }}>
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            <div style={{ marginBottom: 20 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: "0.15em",
                textTransform: "uppercase", background: "rgba(93,214,44,0.1)",
                padding: "6px 14px", borderRadius: 100, border: `1px solid ${T.green}33`
              }}>Professional Systems Academy</span>
            </div>
            
            {/* Main Headline */}
            <h1 style={{
              ...s.display(60),
              marginBottom: 20,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              textShadow: `0 15px 30px rgba(0,0,0,0.5)`
            }}>
              <span style={{ background: `linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Master the Machine.</span><br />
              <span style={{ background: `linear-gradient(135deg, ${T.green} 0%, #A3FF85 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 20px rgba(93,214,44,0.3))` }}>Bare-Metal Mastery.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: 17,
              color: T.muted,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 520
            }}>
              Architect robust embedded systems with an elite curriculum built strictly for hardcore industry engineers and system developers.
            </p>
            
            {/* Glass Pill Callout */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.03)", padding: "16px 24px", borderRadius: 16, border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: "blur(10px)" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${T.green}22`, display: "flex", alignItems: "center", justifyContent: "center", color: T.green }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em", fontFamily: "'Poppins', sans-serif" }}>
                Learn Today. Build Tomorrow. Lead Always.
              </span>
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL IMAGE + BUTTONS */}
          <div className="mob-col-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          
            {/* Hero Image Container */}
            <div className="mob-hero-img" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end", height: 400, zIndex: 1, paddingBottom: 16 }}>
              
              {/* Bright core backlight glow */}
              <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "90%", height: "90%", background: `radial-gradient(circle, ${T.green}20 0%, transparent 70%)`, filter: "blur(50px)", zIndex: 0 }} />

              {/* The Framed Person Card */}
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: 320,
                height: 400,
                borderRadius: 24,
                border: `1px solid rgba(255,255,255,0.12)`,
                background: `linear-gradient(to bottom, rgba(20,20,20,0.4) 0%, rgba(10,10,10,0.8) 100%)`,
                backdropFilter: "blur(20px)",
                overflow: "hidden",
                boxShadow: `0 40px 80px rgba(0,0,0,1.0), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -15px 40px ${T.green}18`,
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}>
                <img
                  src={heroImage}
                  alt="Professional Systems Educator"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 10%',
                    filter: 'contrast(1.05) brightness(1.05)',
                  }}
                />
                {/* Internal Bottom Fade blending image into frame */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: "linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 100%)", pointerEvents: "none" }} />
                
                {/* Top reflection highlight */}
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)`, pointerEvents: "none" }} />
              </div>

              {/* R. Aravindan Badge */}
            <div style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(24px)",
              border: `1px solid rgba(255,255,255,0.18)`,
              padding: "10px 24px",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: `0 20px 40px rgba(0,0,0,0.9), 0 0 40px rgba(93,214,44,0.25)`,
              zIndex: 10,
              whiteSpace: "nowrap"
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.green, boxShadow: `0 0 12px ${T.green}` }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ color: T.white, fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>R. Aravindan</span>
                <span style={{ color: T.green, fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.9 }}>Lead Teacher</span>
              </div>
            </div>
          </div>

          {/* CTA BUTTONS MOVED BELOW IMAGE */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 10 }}>
            <button style={{ ...s.btnPrimary({ padding: "14px 28px", fontSize: 14 }), boxShadow: `0 12px 24px rgba(93,214,44,0.2)` }} onClick={() => onAuth("signup")}>Register Now</button>
            <button style={{ ...s.btnGhost({ padding: "13px 28px", fontSize: 14 }) }} onClick={() => onNav("courses")}>Browse Curriculum</button>
          </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* TRACKS SECTION */}
      <section style={{ padding: "120px 0", background: T.surface, position: "relative" }}>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div className="mob-col-center" style={{ textAlign: "center", marginBottom: 80 }}>
            <Eyebrow style={{ color: T.muted }}>Specialized Learning Tracks</Eyebrow>
            <h2 className="mob-text-h3" style={{ ...s.display(48, { color: T.white, marginTop: 16 }) }}>
              Build the foundation of <span style={s.highlight}>Modern Systems.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {featuredCats.map(c => (
              <div key={c.name} onClick={() => onNav("courses")}
                style={{
                  background: T.surface2, padding: "48px 40px", borderRadius: 24, cursor: "pointer",
                  border: `1px solid ${T.border}`, transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex", flexDirection: "column", alignItems: "flex-start"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ marginBottom: 24 }}>{React.cloneElement(c.icon, { stroke: T.white })}</div>
                <div style={{ ...s.display(24, { color: T.white, marginBottom: 12 }) }}>{c.name}</div>
                <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6, marginBottom: 32 }}>{c.desc}</p>
                <div style={{ fontSize: 11, color: T.green, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" }}>
                  COMING SOON
                </div>
              </div>
            ))}

            <div onClick={() => onNav("courses")}
              style={{
                background: "#111", padding: "48px 40px", borderRadius: 24, cursor: "pointer",
                display: "flex", flexDirection: "column", justifyContent: "center", transition: "all 0.3s ease"
              }}>
              <div style={{ color: "#FFF", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Explore All Units</div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginBottom: 32 }}>From Device Drivers to Digital Logic</p>
              <div style={{ padding: "12px 24px", borderRadius: 100, background: T.green, color: T.black, fontSize: 13, fontWeight: 800, textAlign: "center" }}>
                Know More →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LIBRARY - DARK GREEN BACKGROUND */}
      <section style={{ padding: "100px 0", background: `linear-gradient(to bottom, ${T.black}, #051405)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="mob-col-center" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, gap: 24 }}>
            <div className="mob-col-center">
              <Eyebrow style={{ color: T.green }}>Core Programs</Eyebrow>
              <h2 className="mob-text-h2" style={s.display(42, { color: T.white })}>Featured Curriculum</h2>
            </div>
            <button 
              style={{ ...s.btnGhost({ padding: "12px 28px", borderRadius: 100, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }), background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.15)`, color: T.white }} 
              onMouseEnter={e => { e.currentTarget.style.background = T.white; e.currentTarget.style.color = T.black; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = T.white; e.currentTarget.style.transform = "scale(1)"; }}
              onClick={() => onNav("courses")}>
              View Full Library →
            </button>
          </div>
          <div style={{ textAlign: "center", padding: "80px 24px", background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)`, borderRadius: 24, position: "relative", overflow: "hidden" }}>
             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", background: `radial-gradient(circle, ${T.green}18 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
             
             <div style={{ position: "relative", zIndex: 1 }}>
               <h3 style={{ fontSize: 28, fontWeight: 800, color: T.white, marginBottom: 12 }}>Curriculum Modules</h3>
               <p style={{ fontSize: 16, color: T.muted, marginBottom: 32 }}>We are currently engineering highly specialized, industry-grade modules for bare-metal mastery.</p>
               
               {/* Animated Loading Element */}
               <div style={{ display: "flex", justifyContent: "center" }}>
                 <div style={{ position: "relative", width: 60, height: 60 }}>
                   <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px dashed rgba(255,255,255,0.2)`, animation: "spin 10s linear infinite" }} />
                   <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: `2px solid ${T.green}`, borderTopColor: "transparent", borderBottomColor: "transparent", animation: "spin 3s ease-in-out infinite reverse", boxShadow: `0 0 20px ${T.green}44` }} />
                   <div style={{ position: "absolute", inset: 24, borderRadius: "50%", background: T.green, boxShadow: `0 0 15px ${T.green}` }} />
                 </div>
               </div>

               <div style={{ marginTop: 24, fontSize: 12, color: T.green, fontFamily: "'Roboto Mono', monospace", textTransform: "uppercase", letterSpacing: 2 }}>
                 Status: Compiling Syllabus... Coming Soon
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* FACULTY SECTION - DARK THEMED */}
      <section style={{ padding: "100px 0", background: T.black }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Eyebrow style={{ color: T.muted }}>Expert Instruction</Eyebrow>
            <h2 style={s.display(48, { color: T.white })}>Architects of Innovation.</h2>
          </div>
          <div className="mob-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {INSTRUCTORS.slice(0, 2).map((inst, idx) => (
              <div key={inst.name} className="glass-panel" style={{ background: "rgba(20,20,20,0.6)", borderRadius: 24, padding: 40, border: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 24, position: "relative", overflow: "hidden", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 250, height: 250, background: `radial-gradient(circle, ${T.green}1A 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: T.black, boxShadow: `0 10px 30px rgba(93,214,44,0.2)` }}>{inst.init}</div>
                  <div>
                    <h3 style={{ ...s.display(24, { marginBottom: 4 }) }}>{inst.name}</h3>
                    <div style={{ color: T.green, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>{inst.role}</div>
                  </div>
                </div>
                <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.7, flex: 1 }}>{inst.bio.substring(0, 140)}...</p>
                <div style={{ display: "flex", gap: 32, borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: 20 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: T.white }}>{inst.courses}</div>
                    <div style={{ fontSize: 10, color: T.muted2, textTransform: "uppercase", letterSpacing: 1 }}>Courses</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: T.white }}>{inst.students}</div>
                    <div style={{ fontSize: 10, color: T.muted2, textTransform: "uppercase", letterSpacing: 1 }}>Engineers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button style={s.btnGhost({ padding: "14px 32px", fontSize: 15 })} onClick={() => onNav("instructor")}>View Full Engineering Faculty</button>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION - Replaces CTA */}
      <section className="mob-pad-y-lg" style={{ padding: "140px 24px", background: `linear-gradient(135deg, ${T.surface} 0%, ${T.bg} 100%)`, position: "relative", overflow: "hidden" }}>
        {/* Subtle SVG PCB Circuit background on About Us */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h20v20h-20z' fill='none' stroke='%235DD62C' stroke-opacity='0.05' stroke-width='2'/%3E%3Cpath d='M20 30v40h60v-40' fill='none' stroke='%235DD62C' stroke-opacity='0.1' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%235DD62C' fill-opacity='0.1'/%3E%3C/svg%3E")`, opacity: 0.2, pointerEvents: "none", zIndex: 1 }} />

        <div className="mob-col mob-pad" style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

          {/* Left: Content */}
          <div className="mob-col-center">
            <Eyebrow style={{ color: T.green }}>About Us</Eyebrow>
            <h2 className="mob-text-h2" style={{ ...s.display(48, { color: T.white }), marginBottom: 24, marginTop: 12 }}>
              Industry Expertise <br className="mob-nav-hide" /> <span style={s.highlight}>Since 2017.</span>
            </h2>
            <p className="mob-text-p" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 20, lineHeight: 1.7, fontWeight: 400, maxWidth: 480 }}>
              LoftyLearn is an elite platform bridging the gap between academic theory and hardcore industry execution in Embedded Systems and Computer Architecture.
            </p>
            <p className="mob-text-p" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 40, lineHeight: 1.7, fontWeight: 400, maxWidth: 480 }}>
              Founded by industry veterans V. Rameshkumar and R. Aravindan, we provide hands-on, real-time industrial experiences spanning bare-metal C mapping to custom hardware driver development.
            </p>
            <button style={{ ...s.btnPrimary(), padding: "14px 32px", boxShadow: `0 12px 30px rgba(93,214,44,0.15)` }} onClick={() => onNav("about")}>
              Read Our Full Story
            </button>
          </div>

          {/* Right: Abstract Graphic */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "min(400px, 80vw)", width: "100%" }}>
            {/* Base Glowing Ring */}
            <div style={{
              position: "absolute", width: "min(340px, 75vw)", height: "min(340px, 75vw)", borderRadius: "50%",
              border: `2px dashed rgba(255,255,255,0.1)`,
              animation: "spin 40s linear infinite"
            }} />
            <div style={{
              position: "absolute", width: "min(260px, 55vw)", height: "min(260px, 55vw)", borderRadius: "50%",
              border: `1px solid ${T.green}44`,
              animation: "spin 20s linear infinite reverse"
            }} />

            {/* Center Node */}
            <div style={{
              width: 140, height: 140, background: T.surface2, borderRadius: "50%",
              border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 60px ${T.green}22`, zIndex: 10
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>

            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>

        </div>
      </section>

    </div>
  );
}