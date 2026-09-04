import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { projects } from "../constants";
import ProjectPreview from "../components/ProjectPreview";

const E = [0.22, 1, 0.36, 1];

/* ── Icons ────────────────────────────────────────────────── */
const IcoExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IcoGH = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387
             .6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04
             -3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
             -1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237
             1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605
             -2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22
             -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23
             a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405
             2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176
             .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92
             .42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286
             0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12
             c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
       stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════
   ProjectCard
   Equal-height cards: screenshot → number/title → description
   → tech pills → feature bullets → action buttons
   The card body uses flex-col so the button row is always
   pushed to the bottom regardless of content length.
══════════════════════════════════════════════════════════ */
const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  const {
    slug, name, description, tech, features,
    screenshot, live_demo_link, source_code_link,
  } = project;

  /* prevent button/link clicks from bubbling to the card wrapper */
  const stop = (e) => e.stopPropagation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.48, ease: E, delay: index * 0.06 }}
      style={{ display: "flex", height: "100%" }}
    >
      <div
        role="article"
        onClick={() => navigate(`/projects/${slug}`)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)";
          e.currentTarget.style.boxShadow = "0 12px 40px var(--shadow)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* ── Screenshot ──────────────────────────────── */}
        <div
          onClick={stop}
          style={{ height: 200, flexShrink: 0, overflow: "hidden" }}
        >
          <ProjectPreview screenshot={screenshot} url={live_demo_link} name={name} />
        </div>

        {/* ── Body — flex-1 so it fills remaining height ── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px 22px",
          gap: 0,
        }}>

          {/* Number + Name */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
            <span style={{
              fontFamily: "'Inter',system-ui",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.14em",
              color: "var(--accent)", flexShrink: 0,
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 style={{
              fontFamily: "'Inter',system-ui",
              fontSize: 17, fontWeight: 700,
              color: "var(--text)", lineHeight: 1.25,
              letterSpacing: "-0.02em", margin: 0,
            }}>
              {name}
            </h2>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "system-ui,sans-serif",
            fontSize: 13, lineHeight: 1.7,
            color: "var(--text-sub)", margin: "0 0 14px",
          }}>
            {description}
          </p>

          {/* Tech stack pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {tech.map(t => (
              <span key={t} style={{
                fontFamily: "'Inter',system-ui",
                fontSize: 10.5, fontWeight: 600,
                padding: "3px 9px", borderRadius: 999,
                background: "rgba(129,140,248,0.08)",
                border: "1px solid rgba(129,140,248,0.2)",
                color: "var(--accent-light)",
                letterSpacing: "0.01em",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Key features — 4 bullet points */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 7,
            padding: "14px 0",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            marginBottom: 16,
            flex: 1,   /* pushes button row to bottom */
          }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{
                  flexShrink: 0, marginTop: 2,
                  width: 18, height: 18, borderRadius: 5,
                  background: "rgba(129,140,248,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IcoCheck />
                </span>
                <span style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: 12.5, lineHeight: 1.55,
                  color: "var(--text-muted)",
                }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* ── Action buttons — always at the bottom ── */}
          <div
            onClick={stop}
            style={{
              display: "flex", gap: 7,
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* View Details — primary */}
            <button
              onClick={() => navigate(`/projects/${slug}`)}
              style={{
                flex: 1,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 5, height: 36, borderRadius: 8, border: "none",
                cursor: "pointer",
                background: "var(--accent-dark)", color: "#fff",
                fontFamily: "'Inter',system-ui", fontSize: 12.5, fontWeight: 600,
                letterSpacing: "-0.01em", whiteSpace: "nowrap",
                boxShadow: "0 2px 10px rgba(99,102,241,0.32)",
                transition: "background 0.18s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#4f46e5"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--accent-dark)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Details
            </button>

            {/* Live Demo */}
            <a
              href={live_demo_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — open live demo`}
              onClick={stop}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 5, height: 36, padding: "0 12px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.13)",
                color: "var(--text)", textDecoration: "none",
                fontFamily: "'Inter',system-ui", fontSize: 12.5, fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "background 0.18s, border-color 0.18s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--sep)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <IcoExternal /> Demo
            </a>

            {/* GitHub */}
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — GitHub repository`}
              onClick={stop}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 5, height: 36, padding: "0 11px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-sub)", textDecoration: "none",
                fontFamily: "'Inter',system-ui", fontSize: 12, fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "color 0.18s, background 0.18s, border-color 0.18s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--sep)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-sub)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <IcoGH /> Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ══════════════════════════════════════════════════════════
   ProjectsPage
══════════════════════════════════════════════════════════ */
const ProjectsPage = () => (
  <div className="page-root">
    <Navbar />
    <main className="page-main">

      {/* Heading */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
        >
          <span className="section-label">Selected work</span>
          <h1 style={{
            fontFamily: "'Inter',system-ui",
            fontSize: "clamp(32px,5vw,60px)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            color: "var(--text)",
            margin: 0,
          }}>
            Projects
          </h1>
          <p style={{
            fontFamily: "system-ui,sans-serif",
            fontSize: 15, lineHeight: 1.7,
            color: "var(--text-sub)", maxWidth: 480, marginTop: 14,
          }}>
            Real projects with live demos and full case studies.
            Every card shows the tech stack and key features at a glance.
          </p>
        </motion.div>
      </section>

      {/* Grid — uniform 2-col, equal-height cards */}
      <section
        className="page-section"
        style={{
          paddingBottom: 96,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
          gap: 20,
          alignItems: "start",  /* don't stretch — card flex handles equal height internally */
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>
    </main>

    <footer className="page-footer">
      © {new Date().getFullYear()} <span>Abdul Wasay</span> — Front-End Web Developer
    </footer>
  </div>
);

export default ProjectsPage;
