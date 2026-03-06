import React from "react";
import { T } from "../styles/tokens";
import GridBg from "../components/primitives/GridBg";
import Eyebrow from "../components/primitives/Eyebrow";

const s = {
  display: (size = 28, extra = {}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontSize: size,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: T.white,
    lineHeight: 1.1,
    ...extra
  }),
  faqItem: (isOpen) => ({
    background: isOpen ? "rgba(255,255,255,0.02)" : T.surface,
    borderRadius: 20,
    border: `1px solid ${isOpen ? T.green : T.border}`,
    padding: "32px",
    marginBottom: 20,
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    transform: isOpen ? "scale(1.02)" : "scale(1)",
  }),
  question: {
    fontSize: 19,
    fontWeight: 700,
    color: T.white,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  answer: (isOpen) => ({
    fontSize: 15,
    color: T.muted,
    lineHeight: 1.7,
    maxHeight: isOpen ? "300px" : "0",
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    marginTop: isOpen ? 20 : 0,
  }),
  icon: (isOpen) => ({
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: isOpen ? T.green : "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: isOpen ? T.black : T.green,
    fontSize: 22,
    transition: "all 0.3s ease",
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
    flexShrink: 0
  })
};

export default function FAQPage({ onNav }) {
  const [openIndex, setOpenIndex] = React.useState(0); // Default first one open for better UX

  const faqs = [
    {
      question: "Which hardware platforms are covered in the curriculum?",
      answer: "We focus on industry-standard silicon including ARM Cortex-M (STM32, Tiva C), ESP32 for IoT, and RISC-V architectures. Our courses are designed to be hardware-agnostic where possible, focusing on register-level mastery that applies across all vendors."
    },
    {
      question: "Does the certification carry industry weight?",
      answer: "Absolutely. LoftyLearn certificates signify that you have completed rigorous, project-based training in low-level systems. Our alumni work at top-tier firms in automotive, aerospace, and consumer electronics, using these projects in their professional portfolios."
    },
    {
      question: "Are the live workshops recorded for later access?",
      answer: "Yes. Every live session is recorded in high definition and added to your student dashboard within 24 hours. You'll also get access to the complete codebase, schematic files, and Q&A transcripts from the session."
    },
    {
      question: "Can I upgrade from a single course to a Full-Access Track?",
      answer: "Yes, you can upgrade at any time. We apply a pro-rated discount based on your previous purchases, so you only pay the difference to unlock the full 'Systems Architect' roadmap and mentorship benefits."
    }
  ];

  return (
    <section style={{ position: "relative", background: T.bg, padding: "100px 24px", minHeight: "80vh" }}>
      <GridBg opacity={0.03} />

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* HEADER AREA */}
        <div style={{ marginBottom: 80, textAlign: "left" }}>
          <Eyebrow>Assistance & Clarity</Eyebrow>
          <h1 style={s.display(52, { marginTop: 16, marginBottom: 20 })}>
            Frequently Asked <span style={{ color: T.green }}>Questions.</span>
          </h1>
          <p style={{ color: T.muted, fontSize: 18, maxWidth: 550, lineHeight: 1.6 }}>
            Everything you need to know about our technical pedagogy and platform mechanics.
          </p>
        </div>

        {/* TOP 4 FAQ ITEMS */}
        <div style={{ marginBottom: 80 }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={s.faqItem(isOpen)}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div style={s.question}>
                  <span>{faq.question}</span>
                  <div style={s.icon(isOpen)}>+</div>
                </div>
                <div style={s.answer(isOpen)}>
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPACT CONTACT CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 40px",
          background: `linear-gradient(90deg, ${T.surface} 0%, rgba(93,214,44,0.03) 100%)`,
          borderRadius: 24,
          border: `1px solid ${T.border}`,
          gap: 30,
          flexWrap: "wrap"
        }}>
          <div>
            <h3 style={s.display(22, { marginBottom: 8 })}>Still have a specific query?</h3>
            <p style={{ color: T.muted, fontSize: 14 }}>Our engineering support team usually responds within 12 hours.</p>
          </div>
          <button style={{
            padding: "14px 28px",
            borderRadius: 12,
            background: T.green,
            color: T.black,
            fontSize: 14,
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            Open Support Ticket
          </button>
        </div>

      </div>
    </section>
  );
}