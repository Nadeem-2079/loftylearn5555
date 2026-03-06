import React, { useState } from "react";
import { T } from "../styles/tokens";

const s = {
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: `1px solid ${T.border}`,
    background: "rgba(255,255,255,0.02)",
    color: T.white,
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s",
  },
  btnPrimary: (extra = {}) => ({
    padding: "14px 28px",
    borderRadius: 12,
    background: T.green,
    color: T.black,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
    ...extra,
  }),
};

export default function PaymentPage({ course, workshop, user, onComplete, onAuth }) {
  const item = workshop || course;
  const isWorkshop = !!workshop;
  const label = isWorkshop ? "registering for" : "purchasing";

  // Require authentication
  if (!user) {
    return (
      <div style={{ padding: "100px 24px", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: T.white, marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>
          Sign In Required
        </h1>
        <p style={{ color: T.muted2, fontSize: 16, marginBottom: 40 }}>
          You need to be signed in to complete your {label.toLowerCase()}.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            onClick={() => onAuth && onAuth("login")}
            style={s.btnPrimary()}
          >
            Sign In
          </button>
          <button
            onClick={() => onAuth && onAuth("signup")}
            style={{
              ...s.btnPrimary(),
              background: "transparent",
              border: `1px solid ${T.border}`,
              color: T.white,
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onComplete && onComplete(item?.id);
    }, 1000);
  };

  const total = item?.price || 0;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + tax;

  return (
    <div style={{ padding: "60px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: T.white, marginBottom: 40, fontFamily: "'Poppins', sans-serif" }}>
        Secure Checkout
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: 40 }}>

        {/* LEFT: FORM */}
        <div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* ITEM DETAILS */}
            <div style={{ padding: 24, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 12 }}>Order Summary</h3>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 60, height: 60, background: T.green, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 24 }}>📚</span>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: T.white }}>{item?.title}</div>
                  <div style={{ fontSize: 14, color: T.muted2 }}>{item?.instructor}</div>
                </div>
              </div>
              <div style={{ marginTop: 16, fontSize: 18, fontWeight: 700, color: T.green }}>
                ₹{item?.price?.toFixed(2) || "Free"}
              </div>
            </div>

            {/* USER INFO */}
            <div style={{ padding: 24, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 20 }}>Contact Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={s.input}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  style={s.input}
                  required
                />
              </div>
            </div>

            {/* PAYMENT INFO */}
            <div style={{ padding: 24, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 20 }}>Payment Details</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  style={s.input}
                  required
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <input
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    style={s.input}
                    required
                  />
                  <input
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    style={s.input}
                    required
                  />
                </div>
              </div>
            </div>

            {/* BILLING ADDRESS */}
            <div style={{ padding: 24, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}` }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 20 }}>Billing Address</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input
                  name="billingAddress"
                  placeholder="Street Address"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  style={s.input}
                  required
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    style={s.input}
                    required
                  />
                  <input
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleChange}
                    style={s.input}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" style={s.btnPrimary()}>
              Complete Payment - ₹{finalTotal.toFixed(2)}
            </button>

          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ padding: 24, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}` }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 20 }}>Order Summary</h3>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: T.muted2 }}>{item?.title}</span>
              <span style={{ color: T.white }}>₹{total.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: T.muted2 }}>Tax (8%)</span>
              <span style={{ color: T.white }}>₹{tax.toFixed(2)}</span>
            </div>

            <hr style={{ border: "none", borderTop: `1px solid ${T.border}`, margin: "16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700 }}>
              <span style={{ color: T.white }}>Total</span>
              <span style={{ color: T.green }}>₹{finalTotal.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: 20, fontSize: 12, color: T.muted2 }}>
              🔒 Secure payment powered by Stripe. Your information is encrypted and protected.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}