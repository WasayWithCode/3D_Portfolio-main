import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../constants";
import Navbar from "../components/Navbar";

/* ── animation helpers ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});
const fadeLeft = (delay = 0) => ({
  initial:    { opacity: 0, x: -24 },
  animate:    { opacity: 1, x: 0   },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});
const fadeRight = (delay = 0) => ({
  initial:    { opacity: 0, x: 24 },
  animate:    { opacity: 1, x: 0  },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

/* ── icon components ────────────────────────────────── */
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387
             .6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04
             -3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756
             -1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84
             1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997
             .108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466
             -5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523
             .105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3
             -.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23
             3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91
             1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096
             .81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825
             .57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

/* ── shared section heading ─────────────────────────── */
const SectionHeading = ({ label, title }) => (
  <div className="mb-6">
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "var(--accent)",
                fontFamily: "Inter,Poppins,sans-serif", marginBottom: 6 }}>
      {label}
    </p>
    <h2 style={{ fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 800,
                 color: "var(--text)", fontFamily: "Inter,Poppins,sans-serif",
                 letterSpacing: "-0.02em", lineHeight: 1.2 }}>
      {title}
    </h2>
    <div style={{ width: 40, height: 3, marginTop: 10, borderRadius: 2,
                  background: "linear-gradient(to right,#6366f1,#a5b4fc)" }} />
  </div>
);

/* ── card wrapper ───────────────────────────────────── */
const Card = ({ children, style = {} }) => (
  <div style={{
    background: "linear-gradient(145deg,#16161e,#111118)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: "28px 28px",
    ...style,
  }}>
    {children}
  </div>
);

/* ══════════════════════════════════════════════════════
   ProjectDetail page
══════════════════════════════════════════════════════ */
const ProjectDetail = () => {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const project   = projects.find(p => p.slug === slug);

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  /* 404 state */
  if (!project) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--bg-page)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 20,
      }}>
        <p style={{ color: "var(--text-sub)", fontSize: 18, fontFamily: "Inter,Poppins,sans-serif" }}>
          Project not found.
        </p>
        <Link to="/" className="btn-primary" style={{ textDecoration: "none" }}>
          <ArrowLeft /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const {
    name, tagline, screenshot, overview, goal,
    features, tech, role, live_demo_link, source_code_link, tags,
  } = project;

  /* adjacent projects for prev/next */
  const idx  = projects.findIndex(p => p.slug === slug);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", color: "var(--text)" }}>

      {/* ── fixed navbar (context-aware) ── */}
      <Navbar />

      {/* ── subtle grid bg ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(129,140,248,0.018) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(129,140,248,0.018) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />

      {/* ── ambient glow ── */}
      <div className="fixed pointer-events-none" style={{ zIndex: 0,
        top: "10%", left: "-5%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════════════════
            HERO STRIP
        ════════════════════════════════════════════ */}
        <section style={{
          paddingTop: 100, paddingBottom: 0,
          maxWidth: 1160, margin: "0 auto",
          padding: "100px clamp(20px,5vw,80px) 0",
        }}>

          {/* Back button */}
          <motion.div {...fadeLeft(0)}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                fontSize: 13, fontWeight: 600, color: "var(--text-muted)",
                fontFamily: "Inter,Poppins,sans-serif",
                background: "none", border: "none", cursor: "pointer",
                padding: "6px 0", marginBottom: 32,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <ArrowLeft /> Back to Projects
            </button>
          </motion.div>

          {/* Tag row */}
          <motion.div {...fadeUp(0.05)}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {tags.map(t => (
              <span key={t.name} className={`tag-pill ${t.color}`}
                style={{ fontSize: 11, padding: "4px 12px" }}>
                #{t.name}
              </span>
            ))}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 700, padding: "4px 10px",
              borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase",
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
              color: "#34d399",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%",
                             background: "#34d399", display: "inline-block" }} />
              Live
            </span>
          </motion.div>

          {/* Name + tagline */}
          <motion.h1 {...fadeUp(0.1)} style={{
            fontSize: "clamp(32px,5vw,68px)", fontWeight: 900,
            letterSpacing: "-0.03em", lineHeight: 1.0,
            fontFamily: "Inter,Poppins,sans-serif", marginBottom: 14,
          }}>
            <span style={{ color: "var(--text)" }}>{name.split(" ")[0]} </span>
            <span style={{
              background: "linear-gradient(135deg,#818cf8,#a5b4fc,#67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 18px rgba(129,140,248,0.3))",
            }}>
              {name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p {...fadeUp(0.15)} style={{
            fontSize: "clamp(15px,1.6vw,18px)", color: "var(--accent-light)",
            fontFamily: "Inter,Poppins,sans-serif", fontWeight: 500,
            marginBottom: 32, maxWidth: 600,
          }}>
            {tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.2)}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            <a href={live_demo_link} target="_blank" rel="noopener noreferrer"
               className="btn-primary" style={{ textDecoration: "none" }}>
              <ExternalIcon /> Live Demo
            </a>
            <a href={source_code_link} target="_blank" rel="noopener noreferrer"
               className="btn-outline" style={{ textDecoration: "none" }}>
              <GitHubIcon /> View Code
            </a>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════
            SCREENSHOT — browser frame
        ════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1], delay: 0.25 }}
          style={{
            maxWidth: 1160, margin: "0 auto",
            padding: "0 clamp(20px,5vw,80px) 64px",
          }}
        >
          {/* Browser chrome wrapper */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(129,140,248,0.18)",
            boxShadow:
              "0 0 0 1px rgba(129,140,248,0.06)," +
              "0 32px 80px rgba(0,0,0,0.6)," +
              "0 0 60px rgba(129,140,248,0.08)",
          }}>
            {/* Chrome bar */}
            <div style={{
              height: 38, display: "flex", alignItems: "center", gap: 8,
              padding: "0 16px",
              background: "linear-gradient(to right,#0b1a2e,#0d2040)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: 6 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c => (
                  <span key={c} style={{ width: 12, height: 12, borderRadius: "50%",
                                         background: c, display: "inline-block" }} />
                ))}
              </div>
              {/* URL bar */}
              <div style={{
                flex: 1, maxWidth: 520, height: 24, margin: "0 8px",
                display: "flex", alignItems: "center", gap: 6,
                padding: "0 10px", borderRadius: 6,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                {/* Lock */}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                     stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span style={{
                  fontSize: 10.5, color: "var(--text-muted)",
                  fontFamily: "Inter,Poppins,sans-serif", fontWeight: 500,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {live_demo_link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </div>
              {/* Live badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: 4,
                padding: "2px 8px", borderRadius: 999,
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                marginLeft: "auto",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%",
                               background: "#34d399", display: "inline-block" }} />
                <span style={{
                  fontSize: 9, fontWeight: 700, color: "#34d399",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  fontFamily: "Inter,Poppins,sans-serif",
                }}>Live</span>
              </div>
            </div>

            {/* Screenshot image — clickable, opens live site */}
            <a href={live_demo_link} target="_blank" rel="noopener noreferrer"
               style={{ display: "block", cursor: "pointer" }}>
              <img
                src={screenshot}
                alt={`${name} website screenshot`}
                style={{
                  width: "100%", display: "block",
                  objectFit: "cover", objectPosition: "top center",
                  maxHeight: 560,
                  transition: "transform 0.5s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.015)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </a>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            MAIN CONTENT — 2-col on desktop
        ════════════════════════════════════════════ */}
        <section style={{
          maxWidth: 1160, margin: "0 auto",
          padding: "0 clamp(20px,5vw,80px) 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,520px),1fr))",
          gap: "32px 48px",
        }}>

          {/* ── Overview ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          >
            <Card>
              <SectionHeading label="Project Overview" title="What is this project?" />
              <p style={{
                fontSize: 14.5, lineHeight: 1.8, color: "var(--text-sub)",
                fontFamily: "Poppins,sans-serif",
              }}>
                {overview}
              </p>
            </Card>
          </motion.div>

          {/* ── Goal ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.08 }}
          >
            <Card>
              <SectionHeading label="Problem / Goal" title="What was I solving?" />
              <p style={{
                fontSize: 14.5, lineHeight: 1.8, color: "var(--text-sub)",
                fontFamily: "Poppins,sans-serif",
              }}>
                {goal}
              </p>
            </Card>
          </motion.div>

          {/* ── Key Features ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.04 }}
          >
            <Card>
              <SectionHeading label="Key Features" title="What does it do?" />
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {features.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      flexShrink: 0, marginTop: 3,
                      width: 22, height: 22, borderRadius: 6,
                      background: "rgba(129,140,248,0.1)",
                      border: "1px solid rgba(129,140,248,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <CheckIcon />
                    </span>
                    <span style={{
                      fontSize: 14, lineHeight: 1.65, color: "var(--text-sub)",
                      fontFamily: "Poppins,sans-serif",
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* ── Tech Stack + Role stacked in same column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.12 }}
            >
              <Card>
                <SectionHeading label="Technologies" title="Built with" />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {tech.map((t, i) => (
                    <span key={i} style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "6px 14px", borderRadius: 999,
                      fontSize: 12.5, fontWeight: 600,
                      fontFamily: "Inter,Poppins,sans-serif",
                      color: "var(--accent-light)",
                      background: "rgba(129,140,248,0.08)",
                      border: "1px solid rgba(129,140,248,0.22)",
                      letterSpacing: "0.02em",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* My Role */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.16 }}
            >
              <Card>
                <SectionHeading label="My Contribution" title="My role" />
                <p style={{
                  fontSize: 14.5, lineHeight: 1.8, color: "var(--text-sub)",
                  fontFamily: "Poppins,sans-serif",
                }}>
                  {role}
                </p>
              </Card>
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════
            CTA STRIP
        ════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          style={{
            maxWidth: 1160, margin: "0 auto",
            padding: "0 clamp(20px,5vw,80px) 64px",
          }}
        >
          <div style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(129,140,248,0.14)",
            borderRadius: 20,
            padding: "36px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}>
            <div>
              <p style={{
                fontSize: 11, fontWeight: 700, color: "var(--accent)",
                letterSpacing: "0.22em", textTransform: "uppercase",
                fontFamily: "Inter,Poppins,sans-serif", marginBottom: 8,
              }}>
                Ready to explore?
              </p>
              <h3 style={{
                fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 800,
                color: "var(--text)", fontFamily: "Inter,Poppins,sans-serif",
                letterSpacing: "-0.02em",
              }}>
                See {name} in action
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href={live_demo_link} target="_blank" rel="noopener noreferrer"
                 className="btn-primary" style={{ textDecoration: "none" }}>
                <ExternalIcon /> Live Demo
              </a>
              <a href={source_code_link} target="_blank" rel="noopener noreferrer"
                 className="btn-outline" style={{ textDecoration: "none" }}>
                <GitHubIcon /> View Code
              </a>
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            PREV / NEXT NAVIGATION
        ════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            maxWidth: 1160, margin: "0 auto",
            padding: "0 clamp(20px,5vw,80px) 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Previous */}
          {prev ? (
            <Link to={`/projects/${prev.slug}`} style={{ textDecoration: "none" }}>
              <div className="glass-card-hover" style={{
                background: "linear-gradient(145deg,#16161e,#111118)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "20px 20px",
                cursor: "pointer", transition: "border-color 0.25s,box-shadow 0.25s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(129,140,248,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <p style={{ fontSize: 10.5, color: "#3a3a48", fontWeight: 600,
                             letterSpacing: "0.14em", textTransform: "uppercase",
                             fontFamily: "Inter,Poppins,sans-serif", marginBottom: 6 }}>
                  ← Previous
                </p>
                <p style={{ fontSize: 14, color: "var(--accent-light)", fontWeight: 700,
                             fontFamily: "Inter,Poppins,sans-serif" }}>
                  {prev.name}
                </p>
              </div>
            </Link>
          ) : <div />}

          {/* Next */}
          {next ? (
            <Link to={`/projects/${next.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "linear-gradient(145deg,#16161e,#111118)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "20px 20px",
                cursor: "pointer", textAlign: "right",
                transition: "border-color 0.25s,box-shadow 0.25s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(129,140,248,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <p style={{ fontSize: 10.5, color: "#3a3a48", fontWeight: 600,
                             letterSpacing: "0.14em", textTransform: "uppercase",
                             fontFamily: "Inter,Poppins,sans-serif", marginBottom: 6 }}>
                  Next →
                </p>
                <p style={{ fontSize: 14, color: "var(--accent-light)", fontWeight: 700,
                             fontFamily: "Inter,Poppins,sans-serif" }}>
                  {next.name}
                </p>
              </div>
            </Link>
          ) : <div />}
        </motion.section>

        {/* ════════════════════════════════════════════
            BACK TO PROJECTS BUTTON
        ════════════════════════════════════════════ */}
        <div style={{
          maxWidth: 1160, margin: "0 auto",
          padding: "40px clamp(20px,5vw,80px) 80px",
          display: "flex", justifyContent: "center",
        }}>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <button className="btn-outline" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <GridIcon /> Back to All Projects
            </button>
          </Link>
        </div>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center", padding: "20px",
        }}>
          <p style={{ fontSize: 12, color: "var(--text-faint)",
                      fontFamily: "Poppins,sans-serif" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#3a3a48", fontWeight: 500 }}>Abdul Wasay</span>
            {" "}— Built with React.js &amp; Three.js
          </p>
        </footer>

      </div>
    </div>
  );
};

export default ProjectDetail;
