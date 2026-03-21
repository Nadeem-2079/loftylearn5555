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
import ChatBot from "./components/ui/ChatBot";

/* modal */
import AuthModal from "./modals/AuthModal";

/* primitive */
import Toast from "./components/primitives/Toast";

/* data */
import { COURSES } from "./data/courses";

export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState([]);
  const [saved, setSaved] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(COURSES[0]);
  const [authMode, setAuthMode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [badges] = useState([
    { name: "Fast Learner", desc: "5 lessons in a day", earned: false },
    { name: "First Win", desc: "Complete a course", earned: false },
    { name: "Quick Start", desc: "Finish first lesson", earned: false },
    { name: "Diamond", desc: "10 courses done", earned: false },
    { name: "Star Student", desc: "100% on a quiz", earned: false },
    { name: "Rocket", desc: "30-day streak", earned: false },
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

  // Initialize smooth scrolling
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
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const nav = (p) => {
    if (page !== p) {
      setHistory(prev => [...prev, page]);
    }
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

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    nav("courses");
  };

  const openCourse = (id) => {
    if (!user) {
      openAuth("login");
      addToast("Sign in to view course details", "🔐");
      return;
    }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("detail");
  };

  const openWorkshop = (w) => {
    if (!user) {
      openAuth("login");
      addToast("Sign in to register for workshops", "🔐");
      return;
    }
    setCurrentWorkshop(w);
    nav("register");
  };

  const openAuth = (mode) => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  const handleLogin = (u) => {
    setUser(u);
    addToast(`Welcome, ${u.name}`, "✓");
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
    if (!user) { openAuth("login"); addToast("Sign in to access content", "🔐"); return; }
    if (!enrolled.some(e => e.id === id)) {
      const c = COURSES.find(x => x.id === id);
      if (c?.price === 0) {
        handleEnroll(id);
        setTimeout(() => nav("learn"), 100); // delay to let state settle
        return;
      }
      handlePay(id);
      addToast("Course locked. Please purchase to unlock content.", "!");
      return;
    }
    setCurrentCourse(COURSES.find(c => c.id === id) || COURSES[0]);
    nav("learn");
  };

  // always show footer (contact should be reachable on every page)
  const showFooter = true;

  return (
    <div style={{ background: T.black, minHeight: "100vh", position: "relative" }}>
      <Nav page={page} user={user} onNav={nav} onAuth={openAuth} onLogout={handleLogout} onSearch={handleSearch} />

      <div style={{ paddingTop: page === "home" ? 0 : 90 }}>
        {page === "home" && <HomePage onCourse={openCourse} onAuth={openAuth} onNav={nav} toast={addToast} />}
        {page === "courses" && <CoursesPage onCourse={openCourse} />}
        {page === "workshops" && <WorkshopsPage toast={addToast} onRegister={openWorkshop} />}
        {page === "detail" && <DetailPage course={currentCourse} enrolled={enrolled.map(e => e.id).includes(currentCourse?.id)} saved={saved.includes(currentCourse?.id)} onEnroll={handleEnroll} onSave={handleSave} onPay={handlePay} onLearn={handleLearn} />}
        {page === "learn" && <LearnPage course={currentCourse} enrolled={enrolled} toast={addToast} setEnrolled={setEnrolled} />}
        {page === "dashboard" && <DashboardPage user={user} setUser={setUser} enrolled={enrolled} saved={saved} badges={badges} streak={0} onCourse={openCourse} onLearn={handleLearn} onAuth={openAuth} toast={addToast} onExplore={() => nav("courses")} />}
        {page === "instructor" && <InstructorPage toast={addToast} />}
        {page === "payment" && <PaymentPage course={currentCourse} workshop={currentWorkshop} user={user} onComplete={handlePayComplete} />}
        {page === "success" && <SuccessPage onLearn={() => nav("learn")} onDash={() => nav("dashboard")} />}
        {page === "contact" && <ContactPage onNav={nav} />}
        {page === "faq" && <FAQPage onNav={nav} />}
        {page === "about" && <AboutPage onNav={nav} />}

        {page === "register" && <RegisterPage workshop={currentWorkshop} onSubmit={() => nav("payment")} />}
      </div>

      {page !== "faq" && <FAQPage onNav={nav} />}
      {page !== "contact" && <ContactPage onNav={nav} />}

      {showFooter && <Footer onNav={nav} />}

      {authMode && <AuthModal mode={authMode} onClose={closeAuth} onLogin={handleLogin} />}

      {/* Toasts - adjusted bottom to not clash with WhatsApp */}
      <div style={{ position: "fixed", bottom: 90, right: 24, zIndex: 700, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map(t => <Toast key={t.id} {...t} />)}
      </div>

      {/* Global Top-Left Back Button (Text Style) */}
      {history.length > 0 && page !== "home" && (
        <div style={{ position: "fixed", top: 86, left: 24, zIndex: 600 }}>
          <button
            onClick={handleBack}
            style={{
              background: "none", border: "none", color: T.muted, fontSize: 14, fontWeight: 700,
              fontFamily: "'Poppins', sans-serif", display: "flex", alignItems: "center", gap: 6,
              cursor: "pointer", transition: "all 0.2s", padding: "8px 12px", borderRadius: 8
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.green; e.currentTarget.style.transform = "translateX(-4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* Global Navigation Controls - Bottom Left */}
      <div style={{ position: "fixed", bottom: 24, left: 24, zIndex: 700, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Empty container on left now, just the padding/alignment wrapper if further buttons were needed */}

        {/* Bottom Right Floating Controls */}
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <ChatBot />
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: 44, height: 44, borderRadius: "50%", background: T.green,
              color: T.black, display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", boxShadow: `0 8px 24px rgba(93,214,44,0.4)`,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1) rotate(-4deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0)"}
            title="Chat on WhatsApp"
          >
            {/* WhatsApp SVG Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>

          {/* Top Button Below WhatsApp */}
          <button
            className="mob-hide"
            onClick={handleTop}
            style={{
              width: 50, height: 50, borderRadius: "50%", background: "rgba(10,10,10,0.8)",
              border: `1px solid rgba(255,255,255,0.1)`, color: T.white, fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              backdropFilter: "blur(12px)", transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = T.green;
              e.currentTarget.style.color = T.black;
              e.currentTarget.style.transform = "translateY(-4px) scale(1.05)";
              e.currentTarget.style.boxShadow = `0 10px 20px rgba(93,214,44,0.3)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(10,10,10,0.8)";
              e.currentTarget.style.color = T.white;
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            title="Scroll to Top"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}