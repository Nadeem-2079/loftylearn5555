import React, { useState, useEffect } from "react";
import { T } from "../../styles/tokens";
import Eyebrow from "../primitives/Eyebrow";

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
    card: {
        padding: 32,
        borderRadius: 24,
        background: T.surface,
        border: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        margin: "0 auto",
        maxWidth: 700,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    }
};

const REVIEWS = [
    { text: "The low-level systems training transformed our engineering workflows. Highly recommended curriculum.", author: "Sarah Jenkins, Senior Firmware Engineer" },
    { text: "Bridging the gap between theory and hardware reality. The IoT modules alone are worth the price.", author: "David Chen, IoT Architect" },
    { text: "Best technical pedagogy I've experienced. Clear, concise, and incredibly deep without being overwhelming.", author: "Priya Sharma, Lead Developer" },
    { text: "Finally, a learning platform that treats embedded systems with the modern UI and depth it deserves.", author: "Alex Torres, Hardware Specialist" }
];

export default function ReviewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{ padding: "80px 24px", background: T.bg, textAlign: "center" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                <Eyebrow>Student Success</Eyebrow>
                <h2 style={s.display(48, { marginTop: 16, marginBottom: 40 })}>
                    What Our <span style={{ color: T.green }}>Alumni Say</span>
                </h2>

                <div style={{ position: "relative", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {REVIEWS.map((review, idx) => {
                        const isActive = idx === currentIndex;
                        return (
                            <div
                                key={idx}
                                style={{
                                    ...s.card,
                                    position: "absolute",
                                    opacity: isActive ? 1 : 0,
                                    transform: isActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                                    pointerEvents: isActive ? "auto" : "none",
                                    zIndex: isActive ? 2 : 1
                                }}
                            >
                                <div style={{ color: T.green, fontSize: 32 }}>"</div>
                                <p style={{ fontSize: 18, color: T.white, lineHeight: 1.6, fontStyle: "italic" }}>
                                    {review.text}
                                </p>
                                <div style={{ fontSize: 14, color: T.muted2, fontWeight: 600, marginTop: 8 }}>
                                    — {review.author}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dots */}
                <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
                    {REVIEWS.map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: idx === currentIndex ? 24 : 8,
                                height: 8,
                                borderRadius: 4,
                                background: idx === currentIndex ? T.green : T.surface2,
                                transition: "all 0.3s"
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
