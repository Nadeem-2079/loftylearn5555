import { useState, useEffect } from "react";

import { T } from "./styles/tokens";
import { GLOBAL_CSS } from "./styles/globalStyles";

import useToasts from "./hooks/useToasts";

/* pages */
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import DetailPage from "./pages/DetailPage";
import LearnPage from "./pages/LearnPage";
import DashboardPage from "./pages/DashboardPage";
import InstructorPage from "./pages/InstructorPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
/* layout */
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

/* modal */
import AuthModal from "./modals/AuthModal";

/* primitive */
import Toast from "./components/primitives/Toast";
import FloatingTools from "./components/ui/FloatingTools";

/* data */
import { COURSES } from "./data/courses";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState([{ id: 1, prog: 68 }, { id: 9, prog: 23 }]);
  const [saved, setSaved] = useState([3, 5]);
  const [currentCourse, setCurrentCourse] = useState(COURSES[0]);
  const [authMode, setAuthMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [badges] = useState([
    { icon: "🔥", name: "Fast Learner", desc: "5 lessons in a day", earned: true },
    { icon: "🏆", name: "First Win", desc: "Complete a course", earned: true },
    { icon: "⚡", name: "Quick Start", desc: "Finish first lesson", earned: true },
    { icon: "💎", name: "Diamond", desc: "10 courses done", earned: false },
    { icon: "🌟", name: "Star Student", desc: "100% on a quiz", earned: false },
    { icon: "🚀", name: "Rocket", desc: "30-day streak", earned: false },
  ]);
  const [toasts, addToast] = useToasts();
  const [currentWorkshop, setCurrentWorkshop] = useState(null);  // added state for workshop registration

  // Inject global styles
  useEffect(() => {
    const id = "loftylearn-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
    return () => { };
  }, []);

  const nav = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleSearch = (q) => {
    setSearchQuery(q);
    nav("courses");
  };

  const openCourse = (id) => {
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("detail");
  };

  const openWorkshop = (w) => {
    setCurrentWorkshop(w);
    nav("register");
  };

  const openAuth = (mode) => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  const handleLogin = (u) => {
    setUser(u);
    addToast(`Welcome, ${u.name} ✦`, "◈");
  };

  const handleLogout = () => {
    setUser(null);
    nav("home");
    addToast("Signed out", "◎");
  };

  const handleEnroll = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to enroll", "🔐"); return; }
    if (!enrolled.some(e => e.id === id)) setEnrolled(prev => [...prev, { id, prog: 0 }]);
    nav("success");
    addToast("Enrolled! ✦", "✦");
  };

  const handlePay = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to purchase", "🔐"); return; }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("payment");
  };

  const handlePayComplete = (id) => {
    if (!enrolled.some(e => e.id === id)) setEnrolled(prev => [...prev, { id, prog: 0 }]);
    nav("success");
    addToast("Payment confirmed! ✦", "✓");
  };

  const handleSave = (id) => {
    if (saved.includes(id)) {
      setSaved(prev => prev.filter(x => x !== id));
      addToast("Removed", "♡");
    } else {
      setSaved(prev => [...prev, id]);
      addToast("Saved", "♥");
    }
    setCurrentCourse(c => c.id === id ? { ...c } : c);
  };

  const handleLearn = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to access content", "🔐"); return; }
    if (!enrolled.some(e => e.id === id)) {
      const c = COURSES.find(x => x.id === id);
      if (c?.price === 0) { handleEnroll(id); return; }
      handlePay(id); return;
    }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("learn");
  };

  // always show footer (contact should be reachable on every page)
  const showFooter = true;

  return (
    <div style={{ background: T.black, minHeight: "100vh", position: "relative" }}>
      {/* Noise */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.025, pointerEvents: "none", zIndex: 9999 }} />

      <Nav page={page} user={user} onNav={nav} onAuth={openAuth} onLogout={handleLogout} onSearch={handleSearch} />

      <div style={{ paddingTop: page === "home" ? 0 : 68 }}>
        {page === "home" && <HomePage onCourse={openCourse} onAuth={openAuth} onNav={nav} toast={addToast} />}
        {page === "courses" && <CoursesPage onCourse={openCourse} />}
        {page === "workshops" && <WorkshopsPage toast={addToast} onRegister={openWorkshop} />}
        {page === "detail" && <DetailPage course={currentCourse} enrolled={enrolled} saved={saved} onEnroll={handleEnroll} onSave={handleSave} onPay={handlePay} onLearn={handleLearn} />}
        {page === "learn" && <LearnPage course={currentCourse} enrolled={enrolled} toast={addToast} />}
        {page === "dashboard" && <DashboardPage user={user} enrolled={enrolled} saved={saved} badges={badges} streak={14} onCourse={openCourse} onLearn={handleLearn} onAuth={openAuth} toast={addToast} />}
        {page === "instructor" && <InstructorPage toast={addToast} />}
        {page === "payment" && <PaymentPage course={currentCourse} workshop={currentWorkshop} user={user} onComplete={handlePayComplete} />}
        {page === "success" && <SuccessPage onLearn={() => nav("learn")} onDash={() => nav("dashboard")} />}
        {page === "contact" && <ContactPage />}
        {page === "faq" && <FAQPage />}
        {page === "about" && <AboutPage />}

        {/* register page for workshops */}
        {page === "register" && <RegisterPage workshop={currentWorkshop} onSubmit={() => nav("payment")} />}

        {/* faq section always visible under current page */}
        <FAQPage />

        {/* contact section always visible under current page */}
        <ContactPage />
      </div>

      {showFooter && <Footer onNav={nav} />}

      {authMode && <AuthModal mode={authMode} onClose={closeAuth} onLogin={handleLogin} />}

      {/* Floating Action Buttons */}
      <FloatingTools />

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 24, left: 24, zIndex: 700, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map(t => <Toast key={t.id} {...t} />)}
      </div>
    </div>
  );
}