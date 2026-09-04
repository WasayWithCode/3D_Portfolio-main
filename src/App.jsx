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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <span>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: t.footerSpan, fontWeight: 500 }}>Abdul Wasay</span>
          {" "}— Front-End Web Developer · Karachi
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[
            {
              href: "https://github.com/WasayWithCode",
              label: "GitHub",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              ),
            },
            {
              href: "https://www.linkedin.com/in/abdulwasay-frontend/",
              label: "LinkedIn",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ),
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: t.footerText,
                display: "inline-flex", alignItems: "center",
                textDecoration: "none",
                transition: "color 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = t.accent}
              onMouseLeave={e => e.currentTarget.style.color = t.footerText}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
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
