import React from "react";
import { T } from "../../styles/tokens";

/**
 * PROFESSIONAL SYSTEMS MARQUEE
 * Focus: High-level Architecture, Embedded Engineering, and Performance
 */
export default function MarqueeStrip() {
  const items = [
    { label: "ARCH", text: "Distributed Systems Architecture" },
    { label: "CORE", text: "Embedded Firmware Engineering" },
    { label: "KERN", text: "Real-Time OS Fundamentals" },
    { label: "CHIP", text: "Microcontroller Logic Design" },
    { label: "SYNC", text: "Hardware-Software Co-Design" },
    { label: "AUTO", text: "Low-Level System Optimization" },
    { label: "FLOW", text: "System Design Patterns" },
    { label: "EDGE", text: "Scalable IoT Infrastructure" },
    { label: "PROJ", text: "Industry-Standard Implementation" },
    { label: "DATA", text: "Signal Processing & Analysis" }
  ];

  // Triple items for an infinite, seamless loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div style={{ 
      borderTop: `1px solid ${T.border}`, 
      borderBottom: `1px solid ${T.border}`, 
      padding: "18px 0", 
      overflow: "hidden", 
      background: T.bg, // Solid background for a cleaner, professional look
      position: "relative"
    }}>
      {/* Soft Vignette Edges */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: `linear-gradient(90deg, ${T.bg} 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, ${T.bg} 100%)`
      }} />

      <div style={{ 
        display: "flex", 
        gap: 0, 
        animation: "marquee-smooth 40s linear infinite", 
        width: "max-content" 
      }}>
        {marqueeItems.map((item, i) => (
          <div key={i} style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 16, 
            padding: "0 50px", 
            whiteSpace: "nowrap"
          }}>
            {/* Minimalist Technical Tag */}
            <span style={{ 
                color: T.green, 
                fontSize: 9, 
                fontWeight: 800,
                letterSpacing: "0.1em",
                background: `${T.green}08`, 
                padding: "3px 8px", 
                borderRadius: 4,
                border: `1px solid ${T.green}20`,
                fontFamily: "monospace"
            }}>
                {item.label}
            </span> 
            
            <span style={{
                fontSize: 13, 
                fontWeight: 500, 
                fontFamily: "'Poppins', sans-serif",
                color: T.muted,
                letterSpacing: "-0.01em"
            }}>
                {item.text}
            </span>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee-smooth {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}
      </style>
    </div>
  );
}