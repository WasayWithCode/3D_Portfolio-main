import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Navbar, Hero } from "./components";
import ScrollToTop from "./components/ScrollToTop";
import { useTheme } from "./context/ThemeContext";

/* ── Lazy sections (loaded when scrolled to / after Hero paint) ── */
const AboutSection   = lazy(() => import("./sections/AboutSection"));
const SkillsSection  = lazy(() => import("./sections/SkillsSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const ContactSection  = lazy(() => import("./sections/ContactSection"));

/* ── Lazy standalone pages ── */
const ProjectsPage  = lazy(() => import("./pages/ProjectsPage"));
const ContactPage   = lazy(() => import("./pages/ContactPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

/* ── Spinner ── */
const Fallback = () => {
  const { t } = useTheme();
  return (
    <div style={{ minHeight: "100vh", background: t.bg,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="canvas-loader" />
    </div>
  );
};

const SectionFallback = () => {
  const { t } = useTheme();
  return (
    <div style={{ minHeight: 200, display: "flex", alignItems: "center",
                  justifyContent: "center", background: t.bg }}>
      <div className="canvas-loader" />
    </div>
  );
};

/* ── Page transition ── */
const PT = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ── Thin section separator ── */
const Sep = () => {
  const { t } = useTheme();
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
      <div style={{ height: 1, background: t.sep }} />
    </div>
  );
};

/* ── Shared footer ── */
const Footer = () => {
  const { t } = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.sep}`, padding: "24px",
                     textAlign: "center", fontSize: 12, color: t.footerText,
                     letterSpacing: "-0.01em" }}>
      © {new Date().getFullYear()}{" "}
      <span style={{ color: t.footerSpan, fontWeight: 500 }}>Abdul Wasay</span>
      {" "}— Front-End Web Developer · Karachi
    </footer>
  );
};

/* ══════════════════════════════════════════════════════════
   Home page — Hero + About + Skills + Projects CTA + Contact CTA
══════════════════════════════════════════════════════════ */
const HomePage = () => {
  const location = useLocation();

  /* Scroll to hash section after paint if navigated with hash */
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 68;
        window.scrollTo({ top, behavior: "smooth" });
      }, 120);
    }
  }, [location.hash]);

  return (
    <PT>
      <div style={{ background: "var(--bg)" }}>
        <Navbar />
        <Hero />

        {/* About */}
        <section id="about">
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </section>

        <Sep />

        {/* Skills */}
        <section id="skills">
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
          </Suspense>
        </section>

        <Sep />

        {/* Featured projects teaser */}
        <section id="projects-preview">
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
        </section>

        <Sep />

        {/* Contact CTA */}
        <section id="contact">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </section>

        <Footer />
      </div>
    </PT>
  );
};

/* ── Animated routes ── */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<HomePage />} />
        <Route path="/projects"        element={
          <Suspense fallback={<Fallback />}>
            <PT><ProjectsPage /></PT>
          </Suspense>
        } />
        <Route path="/projects/:slug"  element={
          <Suspense fallback={<Fallback />}>
            <PT><ProjectDetail /></PT>
          </Suspense>
        } />
        <Route path="/contact"         element={
          <Suspense fallback={<Fallback />}>
            <PT><ContactPage /></PT>
          </Suspense>
        } />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AnimatedRoutes />
  </BrowserRouter>
);

export default App;
