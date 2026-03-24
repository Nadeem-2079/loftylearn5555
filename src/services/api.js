const SHEET_URL = "https://script.google.com/macros/s/AKfycbyfQ2WudbWQkpbKoFJChR53CEIvqse_9RvIwOwnt1raURaDofVr0iP9NsuZMKUIzFt9/exec";

const post = async (data) => {
  const res = await fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ── Register new user (Google Sign-In) ──
export const registerUser = (userData) =>
  post({ type: "register", ...userData });

// ── Login check ──
export const loginUser = (email) =>
  post({ type: "login", email });

// ── Update profile from Dashboard ──
export const updateUserInSheet = (user) =>
  post({
    type:    "updateProfile",
    email:   user.email,
    name:    user.name,
    age:     user.age    || "",
    role:    user.role   || "",
    picture: user.picture || user.image || "",
  });

// ── Contact / Inquiry form ──
export const submitContact = (formData) =>
  post({ type: "contact", ...formData });

// ── Workshop registration ──
export const submitWorkshop = (workshopData) =>
  post({ type: "workshop", ...workshopData });
