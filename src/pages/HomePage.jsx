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
import educator from "../assets/educator.png";

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

  const zoomScale = 1 + scrollY * 0.0003;

  const featuredCats = [
    { icon: Icons.Cpu("#111"), name: "ARM Architecture", desc: "Instruction sets & Cortex-M internals", count: 88 },
    { icon: Icons.Zap("#111"), name: "RTOS & Kernels", desc: "FreeRTOS, threading & scheduling", count: 64 },
    { icon: Icons.Code("#111"), name: "Embedded C/C++", desc: "Bare-metal & hardware abstraction", count: 142 },
    { icon: Icons.Layers("#111"), name: "Microcontrollers", desc: "STM32, ESP32 & AVR interfacing", count: 112 },
  ];

  return (
    <div style={{ background: T.bg, color: T.white }}>

      {/* HERO SECTION */}
      <section ref={heroRef} style={{
        width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url(${loftybg})`, backgroundSize: `${zoomScale * 100}%`,
        backgroundPosition: 'center', position: 'relative', overflow: 'hidden',
        paddingTop: 80, transition: 'background-size 0.05s ease-out'
      }}>
        {/* Dark Overlay for the background image */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.75)', zIndex: 0 }} />

        {/* Soft Radial Glow over the image */}
        <div style={{ position: 'absolute', top: "10%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "80vw", background: `radial-gradient(circle, ${T.green}18 0%, transparent 60%)`, pointerEvents: "none", zIndex: 1 }} />

        <div className="mob-col mob-pad-y-lg mob-pad" style={{
          maxWidth: 1200, width: '100%', padding: '60px 24px', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 2
        }}>
          <div style={{ position: "relative", zIndex: 10 }}>
            <div style={{ marginBottom: 24 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, color: T.green, letterSpacing: "0.15em",
                textTransform: "uppercase", background: "rgba(93,214,44,0.1)",
                padding: "6px 12px", borderRadius: 8, border: `1px solid ${T.green}22`
              }}>Professional Systems Academy</span>
            </div>
            <h1 className="mob-text-hero" style={{ ...s.display(64), marginBottom: 24 }}>
              Master the Machine. <br />
              <span style={{ color: T.green }}>Bare-Metal Mastery.</span>
            </h1>
            <p style={{ fontSize: 13, fontWeight: 800, color: T.green, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Knowledge is Power</p>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: T.muted, maxWidth: 440, marginBottom: 16 }}>
              Deep-dive into Embedded Systems and Computer Architecture with curriculum designed for industry engineers.
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: T.green, marginBottom: 40, letterSpacing: "0.02em", fontFamily: "'Poppins', sans-serif" }}>
              Learn Today. Build Tomorrow. Lead Always.
            </p>
            <div style={{ ...s.row(16) }}>
              <button style={s.btnPrimary({ boxShadow: `0 10px 20px ${T.green}22` })} onClick={() => onAuth("signup")}>Start Learning Free</button>
              <button style={s.btnGhost()} onClick={() => onNav("courses")}>Browse Curriculum</button>
            </div>
          </div>

          {/* RIGHT: PROFESSIONAL IMAGE */}
          <div className="mob-hero-img" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: 550, zIndex: 1 }}>
            {/* Subtle backlight glow */}
            <div style={{ position: "absolute", width: "80%", height: "80%", background: `radial-gradient(circle, ${T.green}15 0%, transparent 70%)`, filter: "blur(60px)", zIndex: 0 }} />
            
            <img 
              src={educator} 
              alt="Professional Systems Educator" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: 550, 
                maxHeight: 550, 
                objectFit: 'contain', 
                position: 'relative', 
                zIndex: 2,
                filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5)) contrast(1.1) brightness(1.1) saturate(1.1)',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }} 
            />
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
                  {c.count} MODULES AVAILABLE
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <Eyebrow style={{ color: T.green }}>Core Programs</Eyebrow>
              <h2 style={s.display(42, { color: T.white })}>Featured Curriculum</h2>
            </div>
            <button style={{ ...s.btnGhost() }} onClick={() => onNav("courses")}>View Library</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {COURSES.slice(0, 4).map(c => <CourseCard key={c.id} course={c} onClick={onCourse} />)}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {INSTRUCTORS.map(i => <InstructorCard key={i.name} inst={i} />)}
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
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.7, fontWeight: 400 }}>
              LoftyLearn is an elite educational platform strictly dedicated to bridging the gap between academic theory and hardcore industry execution in Embedded Systems and Computer Architecture.
            </p>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 40, lineHeight: 1.7, fontWeight: 400 }}>
              Founded by industry veterans V. Rameshkumar and R Aravindan, we provide hands-on, real-time industrial experiences. Our pathways dive straight into bare-metal C formatting, RTOS integrations, custom hardware driver development, and deep-level logic engineering.
            </p>
            <button style={{ ...s.btnPrimary(), padding: "14px 32px", boxShadow: `0 12px 30px rgba(93,214,44,0.15)` }} onClick={() => onNav("about")}>
              Read Our Full Story
            </button>
          </div>

          {/* Right: Abstract Graphic */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
            {/* Base Glowing Ring */}
            <div style={{
              position: "absolute", width: 340, height: 340, borderRadius: "50%",
              border: `2px dashed rgba(255,255,255,0.1)`,
              animation: "spin 40s linear infinite"
            }} />
            <div style={{
              position: "absolute", width: 260, height: 260, borderRadius: "50%",
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