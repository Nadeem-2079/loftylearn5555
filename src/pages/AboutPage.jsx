import React from "react";
import { INSTRUCTORS } from "../data/instructors";
import InstructorCard from "../components/ui/InstructorCard";
import Eyebrow from "../components/primitives/Eyebrow";
import GridBg from "../components/primitives/GridBg";
import { T } from "../styles/tokens";

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

export default function AboutPage() {
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

      {/* STATS SECTION */}
      <section style={{ padding: "60px 24px", background: T.surface, borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, textAlign: "center" }}>
            {[
              { number: "50K+", label: "Students Trained", desc: "Engineers worldwide" },
              { number: "150+", label: "Projects Completed", desc: "Real-world applications" },
              { number: "95%", label: "Job Placement Rate", desc: "Within 6 months" },
              { number: "4.9", label: "Average Rating", desc: "Student satisfaction" }
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ ...s.display(48, { color: T.green }), marginBottom: 8 }}>{stat.number}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 14, color: T.muted }}>{stat.desc}</div>
              </div>
            ))}
          </div>
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
            LoftyLearn is an elite educational platform strictly dedicated to providing hands-on, real-time industrial experiences to students and industry professionals. 
            Initiated in December 2017, our platform was born from a vision to ensure that no aspiring engineer has to face the financial and time-consuming hurdles that often plague deep technical learning.
          </p>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7 }}>
            We specialize in high-level electronics and systems engineering, including DSP, Control Systems, Automotive Electronics, and Real-Time Operating Systems (RTOS). 
            Our methodology is simple: strip away the noise and focus on real-world hardware implementation.
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
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
          {/* V. Rameshkumar */}
          <div style={s.card()}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: T.black }}>VR</div>
              <div>
                <h3 style={{ ...s.display(24) }}>V. Rameshkumar MBA</h3>
                <p style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>Founder & Leader</p>
              </div>
            </div>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 16 }}>
              V Rameshkumar is a visionary entrepreneur and ERP Software Developer who has made significant impacts in the educational sector, managing nearly 500 schools in delivering sophisticated software solutions.
            </p>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7 }}>
              His journey was inspired by the gaps he saw in technical education. He founded LoftyLearn to ensure the next generation of engineers receives a worth-for-spending experience, saving them from the loss of time and money he once faced.
            </p>
          </div>

          {/* R Aravindan */}
          <div style={s.card()}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: T.black }}>RA</div>
              <div>
                <h3 style={{ ...s.display(24) }}>R Aravindan M.E</h3>
                <p style={{ color: T.green, fontSize: 14, fontWeight: 600 }}>Co-Founder & Lead Trainer</p>
              </div>
            </div>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 16 }}>
              R Aravindan brings over 25 years of extensive experience in Automotive Electronics R&D. His expertise spans both application software and hardware design and development.
            </p>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7 }}>
              Having worked with world-renowned automotive organizations like Bosch, Continental, TVS, and ZF-WABCO, he specializes in high-stakes systems like Braking Systems, Vehicle Dynamics, ABS, and Level 1 ADAS.
            </p>
          </div>
        </div>

        <div style={{ ...s.card(), marginTop: 40, background: `linear-gradient(135deg, rgba(93,214,44,0.05) 0%, rgba(93,214,44,0.02) 100%)`, borderColor: T.green + "33", textAlign: "center" }}>
          <blockquote style={{ fontSize: 18, fontStyle: "italic", color: T.white, lineHeight: 1.6, marginBottom: 16 }}>
            "What we have learned technically and technologically must be transferred to the next generation of industrial professionals."
          </blockquote>
          <cite style={{ fontSize: 14, color: T.green, fontWeight: 600 }}>— The LoftyLearn Philosophy</cite>
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section style={{ padding: "100px 24px", background: T.surface, borderTop: `1px solid ${T.border}`, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Eyebrow>Expert Faculty</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16 }}>Our Instructors</h2>
          <p style={{ fontSize: 18, color: T.muted, maxWidth: 600, margin: "16px auto 0", lineHeight: 1.6 }}>
            Learn from industry veterans who've built real systems at scale.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {INSTRUCTORS.map(i => <InstructorCard key={i.name} inst={i} />)}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Eyebrow>Behind the Scenes</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16 }}>The Team</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { name: "Marcus Chen", role: "Head of Curriculum", desc: "Former firmware lead at Tesla, designs our project-based learning modules." },
            { name: "Dr. Priya Sharma", role: "Technical Director", desc: "PhD in Computer Engineering, ensures technical accuracy across all content." },
            { name: "David Kim", role: "Platform Engineer", desc: "Builds the interactive coding environments and assessment systems." },
            { name: "Lisa Wong", role: "Student Success", desc: "Guides learners through complex topics and career transitions." },
            { name: "Raj Patel", role: "Content Producer", desc: "Creates video lectures and technical illustrations for complex concepts." },
            { name: "Sarah Johnson", role: "Operations Lead", desc: "Manages partnerships and enterprise training programs." }
          ].map(member => (
            <div key={member.name} style={s.teamCard()}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`,
                margin: "0 auto 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                color: T.black
              }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 style={{ ...s.display(20), marginBottom: 4 }}>{member.name}</h4>
              <p style={{ color: T.green, fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{member.role}</p>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.5 }}>{member.desc}</p>
            </div>
          ))}
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
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            Explore Courses →
          </button>
        </div>
      </section>
    </div>
  );
}