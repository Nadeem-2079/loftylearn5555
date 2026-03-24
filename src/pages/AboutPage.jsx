import React from "react";
import { INSTRUCTORS } from "../data/instructors";
import InstructorCard from "../components/ui/InstructorCard";
import Eyebrow from "../components/primitives/Eyebrow";
import GridBg from "../components/primitives/GridBg";
import { T } from "../styles/tokens";
import heroImage from "../assets/hero_image.png";

const s = {
  display: (size = 32, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.white,
    lineHeight: 1.1,
    ...extra
  }),
  row: (gap = 12, extra = {}) => ({ display: "flex", alignItems: "center", gap, ...extra }),
  card: (extra = {}) => ({
    background: T.surface,
    borderRadius: 24,
    border: `1px solid ${T.border}`,
    padding: 32,
    ...extra
  }),
  teamCard: (extra = {}) => ({
    background: T.surface,
    borderRadius: 16,
    border: `1px solid ${T.border}`,
    padding: 24,
    textAlign: "center",
    ...extra
  }),
};

export default function AboutPage({ onNav }) {
  return (
    <div style={{ background: T.bg, color: T.white }}>
      {/* HERO SECTION */}
      <section style={{ padding: "160px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: "70vw", height: "70vw", background: `radial-gradient(circle, ${T.green}15 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
        <GridBg opacity={0.06} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Eyebrow>About LoftyLearn</Eyebrow>
          <h1 style={{ ...s.display(64), marginTop: 24, marginBottom: 32, letterSpacing: "-0.05em" }}>
            The Elite Academy for <br /> <span style={{ color: T.green }}>Systems Engineers</span>
          </h1>
          <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Bridging the gap between academic theory and hardcore industry execution in Embedded Systems and Computer Architecture since December 2017.
          </p>
        </div>
      </section>


      {/* WHO WE ARE */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Eyebrow>Our Mission</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16 }}>Who We Are</h2>
          <p style={{ fontSize: 20, color: T.green, fontWeight: 700, marginTop: 16 }}>Knowledge is Power</p>
        </div>
        <div style={{ ...s.card(), maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.7, marginBottom: 24 }}>
            LoftyLearn is an elite educational platform dedicated to providing hands-on, real-time industrial experiences to the student communities, and industrial delegates.
            Initiated in December 2017, our platform was born from a vision to ensure that no aspiring engineer has to face the financial and time-consuming hurdles that often plague deep technical learning.
          </p>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7, marginBottom: 24 }}>
            We specialize in high-level electronics and systems engineering, including DSP, Control Systems, Analog & Digital Electronics, Physics, Mathematics, Microcontrollers & Processors, Embedded C & C++, and Free RTOS, with a specific focus on Automotive Electronics Braking Systems Design, Vehicle Dynamics, Weight Transfer Calculations, ABS, ESP, and Level 1 ADAS.
          </p>
          <p style={{ fontSize: 16, color: T.green, lineHeight: 1.7, fontWeight: 600 }}>
            What we have learned technically and technologically, we want to transfer to students and industry professionals. We strip away the noise and focus on real-world hardware implementation.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "80px 24px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Eyebrow>Our Principles</Eyebrow>
            <h2 style={{ ...s.display(48), marginTop: 16 }}>What Drives Us</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {[
              { title: "Practical Focus", desc: "Every lesson is designed around real-world applications, not abstract theory." },
              { title: "Rigorous Standards", desc: "We maintain academic-level depth while ensuring accessibility for working professionals." },
              { title: "Community First", desc: "Learning is collaborative - our platform fosters knowledge sharing and peer support." },
              { title: "Innovation Mindset", desc: "We continuously evolve our curriculum to stay ahead of industry trends and technologies." }
            ].map(value => (
              <div key={value.title} style={{ ...s.card(), textAlign: "center" }}>
                <h3 style={{ ...s.display(24), marginBottom: 16 }}>{value.title}</h3>
                <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Eyebrow>Leadership</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16 }}>The Architects Behind LoftyLearn</h2>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* V. Rameshkumar */}
          <div className="glass-panel" style={{ ...s.card({ padding: 0, overflow: "hidden" }), display: "flex", flexWrap: "wrap", border: `1px solid ${T.border}` }}>
            {/* Image Placeholder */}
            <div style={{ flex: "1 1 300px", minHeight: 400, background: `linear-gradient(135deg, ${T.surface2} 0%, #111 100%)`, position: "relative", borderRight: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 20, left: 20, padding: "6px 14px", background: "rgba(0,0,0,0.6)", borderRadius: 20, fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: 2, border: `1px solid ${T.green}44`, backdropFilter: "blur(8px)", zIndex: 10 }}>FOUNDER</div>
              
              <div style={{ textAlign: "center", color: T.muted2, zIndex: 2 }}>
                <div style={{ color: T.white, marginBottom: 16 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }}>Profile Image Slot</div>
                <div style={{ fontSize: 10, color: T.border, marginTop: 8 }}>(Ready for upload)</div>
              </div>

              {/* Decorative accents */}
              <div style={{ position: "absolute", bottom: 20, right: 20, width: 6, height: 6, borderRadius: "50%", background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
              <div style={{ position: "absolute", top: -50, right: -50, width: 150, height: 150, background: `radial-gradient(circle, ${T.green}11 0%, transparent 70%)` }} />
            </div>
            
            {/* Text Payload */}
            <div style={{ flex: "2 1 400px", padding: "48px 5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ ...s.display(36, { marginBottom: 10 }) }}>V. Rameshkumar <span style={{fontSize: 20, color: T.muted2, fontWeight: 500}}>MBA</span></h3>
              <p style={{ color: T.green, fontSize: 14, fontWeight: 800, marginBottom: 28, letterSpacing: 2, textTransform: "uppercase" }}>Founder & Leader</p>
              
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>
                An Entrepreneur and ERP software Developer who successfully managed nearly 500 schools delivering high-end enterprise solutions.
              </p>
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8 }}>
                Through personal experiences of spending immense resources on learning Microcontrollers and DSP without full practical realization, Rameshkumar initiated this academy to guarantee the next generation of engineers receives uncompromising, real-world value for their time.
              </p>
            </div>
          </div>

          {/* R Aravindan */}
          <div className="glass-panel" style={{ ...s.card({ padding: 0, overflow: "hidden" }), display: "flex", flexWrap: "wrap", flexDirection: "row-reverse", border: `1px solid ${T.border}` }}>
            {/* Image Container */}
            <div style={{ flex: "1 1 300px", minHeight: 400, background: `linear-gradient(225deg, ${T.surface2} 0%, #111 100%)`, position: "relative", borderLeft: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 20, right: 20, padding: "6px 14px", background: "rgba(0,0,0,0.6)", borderRadius: 20, fontSize: 11, fontWeight: 800, color: T.green, letterSpacing: 2, border: `1px solid ${T.green}44`, backdropFilter: "blur(8px)", zIndex: 10 }}>CO-FOUNDER</div>
              
              <img 
                src={heroImage} 
                alt="R. Aravindan" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  filter: 'contrast(1.05) brightness(1.1)'
                }} 
              />

              {/* Internal Bottom Fade blending image into frame */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #111 0%, transparent 100%)", pointerEvents: "none" }} />

              {/* Decorative accents */}
              <div style={{ position: "absolute", bottom: 20, left: 20, width: 6, height: 6, borderRadius: "50%", background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
              <div style={{ position: "absolute", top: -50, left: -50, width: 150, height: 150, background: `radial-gradient(circle, ${T.green}11 0%, transparent 70%)` }} />
            </div>
            
            {/* Text Payload */}
            <div style={{ flex: "2 1 400px", padding: "48px 5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ ...s.display(36, { marginBottom: 10 }) }}>R Aravindan <span style={{fontSize: 20, color: T.muted2, fontWeight: 500}}>M.E</span></h3>
              <p style={{ color: T.green, fontSize: 14, fontWeight: 800, marginBottom: 28, letterSpacing: 2, textTransform: "uppercase" }}>Co-Founder & Lead Trainer</p>
              
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>
                Extensive experience of nearly 25+ years in Automotive Electronics R&D, designing and developing high-performance Application Software and complex Hardware architectures.
              </p>
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.8 }}>
                He has led critical engineering teams across world-reputed Automotive Organizations including <span style={{color: T.white, fontWeight: 600}}>TVS, Bosch, Continental Automotives, ZF-WABCO, L&T Technologies,</span> and <span style={{color: T.white, fontWeight: 600}}>UCAL Fuel Systems Ltd.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Block */}
        <div style={{ ...s.card(), marginTop: 60, background: `linear-gradient(135deg, rgba(93,214,44,0.05) 0%, rgba(93,214,44,0.01) 100%)`, borderColor: T.green + "44", textAlign: "center", boxShadow: `0 20px 40px rgba(0,0,0,0.2)` }}>
          <blockquote style={{ fontSize: 24, fontStyle: "italic", color: T.white, lineHeight: 1.6, marginBottom: 16, fontWeight: 300 }}>
            "What we have learned technically and technologically want to be Transferred to Students and Industrial people."
          </blockquote>
          <cite style={{ fontSize: 14, color: T.green, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>— The LoftyLearn Philosophy</cite>
        </div>
      </section>

      {/* INSTRUCTORS CTA */}
      <section style={{ padding: "120px 24px", background: `linear-gradient(180deg, ${T.surface} 0%, ${T.bg} 100%)`, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `rgba(93,214,44,0.1)`, border: `1px solid ${T.green}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: T.green }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path d="M12 14v7"/><path d="M22 9v6a2 2 0 01-2 2h-1.5"/></svg>
          </div>
          <Eyebrow style={{ justifyContent: "center" }}>Elite Faculty</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16, marginBottom: 24 }}>Meet Our Instructors</h2>
          <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.6, marginBottom: 40 }}>
            Learn directly from senior engineering leads who have built real-world embedded systems and automotive paradigms at global scale.
          </p>
          <button style={{ 
            padding: "16px 36px", 
            borderRadius: 12, 
            background: T.green, 
            color: T.black, 
            fontSize: 16, 
            fontWeight: 700, 
            border: "none", 
            cursor: "pointer", 
            transition: "all 0.2s" 
          }} onClick={() => onNav && onNav("instructor")}>
            View Faculty Profiles →
          </button>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ ...s.display(40), marginBottom: 20 }}>Ready to Join Our Community?</h2>
          <p style={{ fontSize: 18, color: T.muted, marginBottom: 32, lineHeight: 1.6 }}>
            Start your journey into embedded systems mastery with our comprehensive curriculum.
          </p>
          <button style={{
            padding: "16px 32px",
            borderRadius: 12,
            background: T.green,
            color: T.black,
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
            onClick={() => onNav && onNav("courses")}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            Explore Courses →
          </button>
        </div>
      </section>
    </div>
  );
}