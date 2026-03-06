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
            We're on a mission to democratize deep technical knowledge in embedded systems,
            empowering engineers to build the next generation of intelligent devices.
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
              { number: "4.9★", label: "Average Rating", desc: "Student satisfaction" }
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
        </div>
        <div style={{ ...s.card(), maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 18, color: T.muted, lineHeight: 1.7, marginBottom: 24 }}>
            LoftyLearn was founded with a simple belief: that mastery of embedded systems should be
            accessible to every engineer, not just those with access to elite institutions or corporate training budgets.
          </p>
          <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.6 }}>
            We bridge the gap between theoretical computer science and practical embedded engineering,
            providing hands-on, project-based learning that prepares students for real-world challenges
            in automotive, IoT, aerospace, and consumer electronics industries.
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
              { icon: "🎯", title: "Practical Focus", desc: "Every lesson is designed around real-world applications, not abstract theory." },
              { icon: "🔬", title: "Rigorous Standards", desc: "We maintain academic-level depth while ensuring accessibility for working professionals." },
              { icon: "🤝", title: "Community First", desc: "Learning is collaborative - our platform fosters knowledge sharing and peer support." },
              { icon: "🚀", title: "Innovation Mindset", desc: "We continuously evolve our curriculum to stay ahead of industry trends and technologies." }
            ].map(value => (
              <div key={value.title} style={{ ...s.card(), textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{value.icon}</div>
                <h3 style={{ ...s.display(24), marginBottom: 16 }}>{value.title}</h3>
                <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Eyebrow>Leadership</Eyebrow>
          <h2 style={{ ...s.display(48), marginTop: 16 }}>Meet Our Founder</h2>
        </div>
        <div className="mob-col" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.green} 0%, #76E05B 100%)`,
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              fontWeight: 800,
              color: T.black
            }}>
              AL
            </div>
            <h3 style={{ ...s.display(28), marginBottom: 8 }}>Alexandra Liu</h3>
            <p style={{ color: T.green, fontSize: 16, fontWeight: 600 }}>Founder & CEO</p>
          </div>
          <div>
            <div style={{ ...s.card(), marginBottom: 24 }}>
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Alexandra Liu is a seasoned embedded systems engineer with over 15 years of experience
                at leading semiconductor companies. She holds a PhD in Electrical Engineering from UC Berkeley
                and has contributed to projects ranging from autonomous vehicle systems to medical devices.
              </p>
              <p style={{ fontSize: 16, color: T.muted, lineHeight: 1.7 }}>
                Frustrated by the lack of comprehensive, practical training in embedded systems, Alexandra
                founded LoftyLearn in 2020 to create a platform that combines rigorous academic depth with
                industry-relevant projects. Her vision is to train the next generation of systems architects
                who can bridge the gap between hardware and software.
              </p>
            </div>
            <div style={{ ...s.card(), background: `linear-gradient(135deg, rgba(93,214,44,0.05) 0%, rgba(93,214,44,0.02) 100%)`, borderColor: T.green + "33" }}>
              <blockquote style={{ fontSize: 18, fontStyle: "italic", color: T.white, lineHeight: 1.6, marginBottom: 16 }}>
                "The future belongs to those who understand both the elegance of algorithms and the harsh realities of hardware constraints."
              </blockquote>
              <cite style={{ fontSize: 14, color: T.green, fontWeight: 600 }}>— Alexandra Liu</cite>
            </div>
          </div>
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