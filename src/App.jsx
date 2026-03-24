import { useState, useEffect } from "react";
import Lenis from "lenis";

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
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import FloatingTools from "./components/ui/FloatingTools";

/* modal */
import AuthModal from "./modals/AuthModal";

/* primitive */
import Toast from "./components/primitives/Toast";

/* data */
import { COURSES } from "./data/courses";

export default function App() {
  const [page, setPage]                   = useState("home");
  const [history, setHistory]             = useState([]);
  const [user, setUser]                   = useState(null);
  const [enrolled, setEnrolled]           = useState([]);
  const [saved, setSaved]                 = useState([]);
  const [currentCourse, setCurrentCourse] = useState(COURSES[0]);
  const [authMode, setAuthMode]           = useState(null);
  const [searchQuery, setSearchQuery]     = useState("");
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [badges] = useState([
    { name: "Fast Learner",  desc: "5 lessons in a day",   earned: false },
    { name: "First Win",     desc: "Complete a course",    earned: false },
    { name: "Quick Start",   desc: "Finish first lesson",  earned: false },
    { name: "Diamond",       desc: "10 courses done",      earned: false },
    { name: "Star Student",  desc: "100% on a quiz",       earned: false },
    { name: "Rocket",        desc: "30-day streak",        earned: false },
  ]);
  const [toasts, addToast] = useToasts();

  // ── Inject global styles ─────────────────────────────────
  useEffect(() => {
    const id = "loftylearn-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);

  // ── Smooth scrolling ─────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // ── Navigation ───────────────────────────────────────────
  const nav = (p) => {
    if (page !== p) setHistory(prev => [...prev, page]);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevPage = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setPage(prevPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Handlers ─────────────────────────────────────────────
  const handleSearch = (q) => { setSearchQuery(q); nav("courses"); };

  const openCourse = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to view course details", <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>); return; }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("detail");
  };

  const openWorkshop = (w) => {
    if (!user) { openAuth("login"); addToast("Sign in to register for workshops", <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>); return; }
    setCurrentWorkshop(w);
    nav("register");
  };

  const openAuth  = (mode) => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  // ── Login — single toast source of truth ─────────────────
  const handleLogin = (u, isNew = false) => {
    setUser(u);
    if (isNew) {
      addToast(`Welcome to LoftyLearn, ${u.name}!`, "✓");
    } else {
      addToast(`Welcome back, ${u.name}!`, "✓");
    }
  };

  const handleLogout = () => {
    setUser(null);
    nav("home");
    addToast("Signed out", "✓");
  };

  const handleEnroll = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to enroll", "!"); return; }
    if (!enrolled.some(e => e.id === id)) setEnrolled(prev => [...prev, { id, prog: 0 }]);
    nav("success");
    addToast("Enrolled successfully", "✓");
  };

  const handlePay = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to purchase", "!"); return; }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("payment");
  };

  const handlePayComplete = (id) => {
    if (!enrolled.some(e => e.id === id)) setEnrolled(prev => [...prev, { id, prog: 0 }]);
    nav("success");
    addToast("Payment confirmed", "✓");
  };

  const handleSave = (id) => {
    if (saved.includes(id)) {
      setSaved(prev => prev.filter(x => x !== id));
      addToast("Removed from saved", "✓");
    } else {
      setSaved(prev => [...prev, id]);
      addToast("Saved for later", "✓");
    }
    setCurrentCourse(c => c.id === id ? { ...c } : c);
  };

  const handleLearn = (id) => {
    if (!user) { openAuth("login"); addToast("Sign in to access content", <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>); return; }
    if (!enrolled.some(e => e.id === id)) {
      const c = COURSES.find(x => x.id === id);
      if (c?.price === 0) {
        handleEnroll(id);
        setTimeout(() => nav("learn"), 100);
        return;
      }
      handlePay(id);
      addToast("Course locked. Please purchase to unlock content.", "!");
      return;
    }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("learn");
  };

  return (
    <div style={{ background: T.black, minHeight: "100vh", position: "relative" }}>

      <Nav
        page={page} user={user}
        onNav={nav} onAuth={openAuth}
        onLogout={handleLogout} onSearch={handleSearch}
      />

      <div style={{ paddingTop: page === "home" ? 0 : 90 }}>
        {page === "home"       && <HomePage onCourse={openCourse} onAuth={openAuth} onNav={nav} toast={addToast} />}
        {page === "courses"    && <CoursesPage onCourse={openCourse} />}
        {page === "workshops"  && <WorkshopsPage toast={addToast} onRegister={openWorkshop} />}
        {page === "detail"     && <DetailPage course={currentCourse} enrolled={enrolled.map(e => e.id).includes(currentCourse?.id)} saved={saved.includes(currentCourse?.id)} onEnroll={handleEnroll} onSave={handleSave} onPay={handlePay} onLearn={handleLearn} />}
        {page === "learn"      && <LearnPage course={currentCourse} enrolled={enrolled} toast={addToast} setEnrolled={setEnrolled} />}
        {page === "dashboard"  && <DashboardPage user={user} setUser={setUser} enrolled={enrolled} saved={saved} badges={badges} streak={0} onCourse={openCourse} onLearn={handleLearn} onAuth={openAuth} toast={addToast} onExplore={() => nav("courses")} />}
        {page === "instructor" && <InstructorPage toast={addToast} />}
        {page === "payment"    && <PaymentPage course={currentCourse} workshop={currentWorkshop} user={user} onComplete={handlePayComplete} />}
        {page === "success"    && <SuccessPage onLearn={() => nav("learn")} onDash={() => nav("dashboard")} />}
        {page === "contact"    && <ContactPage onNav={nav} />}
        {page === "faq"        && <FAQPage onNav={nav} />}
        {page === "about"      && <AboutPage onNav={nav} />}
        {page === "register"   && <RegisterPage workshop={currentWorkshop} onSubmit={() => nav("payment")} />}
      </div>
      
      {!["faq", "contact"].includes(page) && <FAQPage onNav={nav} />}
      {!["faq", "contact"].includes(page) && <ContactPage onNav={nav} />}


      <Footer onNav={nav} />

      {/* ── Auth Modal ── */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onLogin={(u, isNew) => { handleLogin(u, isNew); closeAuth(); }}
          addToast={addToast}
        />
      )}

      {/* ── Toasts ── */}
      <div style={{
        position: "fixed", bottom: 90, right: 24,
        zIndex: 700, display: "flex", flexDirection: "column", gap: 8,
      }}>
        {toasts.map((t, i) => (
          <Toast key={`${t.id}-${i}`} message={t.message} icon={t.icon} />
        ))}
      </div>

      {/* ── Back Button ── */}
      {history.length > 0 && page !== "home" && (
        <div style={{ position: "fixed", top: 86, left: 24, zIndex: 600 }}>
          <button
            onClick={handleBack}
            style={{
              background: "none", border: "none", color: T.muted,
              fontSize: 14, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
              display: "flex", alignItems: "center", gap: 6,
              cursor: "pointer", transition: "all 0.2s",
              padding: "8px 12px", borderRadius: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.green; e.currentTarget.style.transform = "translateX(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* ── Floating Tools (WhatsApp + ChatBot + ScrollTop) ── */}
      <FloatingTools />

    </div>
  );
}
