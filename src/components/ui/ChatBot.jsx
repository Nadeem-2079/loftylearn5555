import React, { useState, useRef, useEffect } from "react";
import { T } from "../../styles/tokens";

const PREDEFINED_QAS = [
    { q: "What is LoftyLearn?", a: "LoftyLearn is an advanced embedded systems learning portal for engineers." },
    { q: "Do you provide certificates?", a: "Yes, we provide industry-recognized certificates upon course completion." },
    { q: "What architectures are covered?", a: "We cover ARM Cortex-M, ESP32, and RISC-V architectures." },
    { q: "Is there hardware required?", a: "We recommend specific dev boards per course, detailed in the course syllabus." },
    { q: "Are courses recorded?", a: "All live workshops are recorded and available in your dashboard." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee if you are unsatisfied." },
    { q: "Can I upgrade my plan?", a: "Yes, you can upgrade to a Full-Access Track at any time for a pro-rated fee." },
    { q: "Are the courses for beginners?", a: "We assume basic C programming knowledge, but build embedded concepts from the ground up." },
    { q: "How long is access?", a: "Purchasing a course grants lifetime access to its materials." },
    { q: "How do I get support?", a: "You can open a support ticket from the FAQ page or directly email our engineers." }
];

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: "bot", text: "Hello! I'm the LoftyLearn AI Assistant. How can I help you today?" }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleAsk = (qa) => {
        // Add user message
        setMessages(prev => [...prev, { type: "user", text: qa.q }]);

        // Simulate typing delay before bot answers
        setTimeout(() => {
            setMessages(prev => [...prev, { type: "bot", text: qa.a }]);
        }, 600);
    };

    return (
        <>
            {/* Bot Chat Window */}
            {isOpen && (
                <div style={{
                    position: "fixed", bottom: 90, right: 90, width: 340, height: 500,
                    background: "rgba(11,43,16,0.95)", backdropFilter: "blur(20px)", borderRadius: 24,
                    border: `1px solid rgba(255,255,255,0.1)`, display: "flex", flexDirection: "column",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)", zIndex: 800, overflow: "hidden"
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "16px 20px", borderBottom: `1px solid rgba(255,255,255,0.1)`,
                        display: "flex", justifyContent: "space-between", alignItems: "center", background: T.surface
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green }}></div>
                            <span style={{ color: T.white, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{
                            background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 20
                        }}>×</button>
                    </div>

                    {/* Chat Messages */}
                    <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.type === "user" ? "flex-end" : "flex-start",
                                background: m.type === "user" ? T.green : "rgba(255,255,255,0.05)",
                                color: m.type === "user" ? T.black : T.white,
                                padding: "10px 14px", borderRadius: 16, maxWidth: "80%",
                                fontSize: 14, lineHeight: 1.4,
                                borderBottomRightRadius: m.type === "user" ? 4 : 16,
                                borderBottomLeftRadius: m.type === "bot" ? 4 : 16
                            }}>
                                {m.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    <div style={{ padding: 12, borderTop: `1px solid rgba(255,255,255,0.1)`, background: T.surface }}>
                        <div style={{ fontSize: 12, color: T.muted, marginBottom: 8, textAlign: "center" }}>Ask a question:</div>
                        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
                            {PREDEFINED_QAS.map((qa, i) => (
                                <button key={i} onClick={() => handleAsk(qa)} style={{
                                    whiteSpace: "nowrap", padding: "8px 12px", borderRadius: 16,
                                    background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`,
                                    color: T.white, fontSize: 13, cursor: "pointer", transition: "all 0.2s flex-shrink-0"
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = T.green}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                                >
                                    {qa.q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Bot Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: 44, height: 44, borderRadius: "50%", background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.1)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: `0 8px 24px rgba(0,0,0,0.6)`, transition: "all 0.3s"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                title="AI Assistant"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>
                </svg>
            </button>
        </>
    );
}
