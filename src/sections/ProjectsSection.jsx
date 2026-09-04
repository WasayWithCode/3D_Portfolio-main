import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { projects } from "../constants";
import ProjectPreview from "../components/ProjectPreview";

const E = [0.22, 1, 0.36, 1];

const IcoArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IcoExternal = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IcoCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
       stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* Teaser card — same fields as the full card, slightly more compact */
const TeaserCard = ({ p, index }) => {
  const navigate = useNavigate();
  const stop = (e) => e.stopPropagation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: E, delay: index * 0.08 }}
      style={{ display: "flex", height: "100%" }}
    >
      <div
        onClick={() => navigate(`/projects/${p.slug}`)}
        style={{
          display: "flex", flexDirection: "column",
          width: "100%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 14, overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.22s, box-shadow 0.22s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(129,140,248,0.28)"; e.currentTarget.style.boxShadow = "0 10px 36px var(--shadow)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        {/* Screenshot */}
        <div onClick={stop} style={{ height: 170, flexShrink: 0, overflow: "hidden" }}>
          <ProjectPreview screenshot={p.screenshot} url={p.live_demo_link} name={p.name} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "18px 20px" }}>

          {/* Number + title */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "'Inter',system-ui", fontSize: 9.5, fontWeight: 700,
                           letterSpacing: "0.14em", color: "var(--accent)", flexShrink: 0 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: 15, fontWeight: 700,
                         color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0 }}>
              {p.name}
            </h3>
          </div>

          {/* Description */}
          <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 12.5,
                       lineHeight: 1.65, color: "var(--text-sub)", margin: "0 0 12px" }}>
            {p.description}
          </p>

          {/* Tech pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
            {p.tech.map(t => (
              <span key={t} style={{
                fontFamily: "'Inter',system-ui", fontSize: 10, fontWeight: 600,
                padding: "2px 8px", borderRadius: 999,
                background: "rgba(129,140,248,0.08)",
                border: "1px solid rgba(129,140,248,0.2)",
                color: "var(--accent-light)",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Features — first 3 only to keep cards compact */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 6,
            padding: "12px 0", marginBottom: 12,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            flex: 1,
          }}>
            {p.features.slice(0, 3).map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                <span style={{
                  flexShrink: 0, marginTop: 2,
                  width: 16, height: 16, borderRadius: 4,
                  background: "rgba(129,140,248,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <IcoCheck />
                </span>
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 12,
                                lineHeight: 1.5, color: "var(--text-muted)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div onClick={stop} style={{ display: "flex", gap: 7,
                                       paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => navigate(`/projects/${p.slug}`)}
              style={{
                flex: 1, display: "inline-flex", alignItems: "center",
                justifyContent: "center", height: 34, borderRadius: 7,
                border: "none", cursor: "pointer",
                background: "var(--accent-dark)", color: "#fff",
                fontFamily: "'Inter',system-ui", fontSize: 12, fontWeight: 600,
                boxShadow: "0 1px 8px rgba(99,102,241,0.3)",
                transition: "background 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#4f46e5"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--accent-dark)"}
            >
              View Details
            </button>
            <a
              href={p.live_demo_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} live demo`}
              onClick={stop}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 4, height: 34, padding: "0 12px", borderRadius: 7,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--text)", textDecoration: "none",
                fontFamily: "'Inter',system-ui", fontSize: 12, fontWeight: 500,
                transition: "background 0.18s, border-color 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--sep)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            >
              <IcoExternal /> Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────── */
const ProjectsSection = () => (
  <section style={{ padding: "80px 0" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.48, ease: E }}
        style={{ display: "flex", justifyContent: "space-between",
                 alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}
      >
        <div>
          <span className="section-label">Selected work</span>
          <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(28px,4vw,48px)",
                       fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>
            Projects
          </h2>
        </div>
        <Link
          to="/projects"
          style={{ display: "inline-flex", alignItems: "center", gap: 6,
                   fontFamily: "'Inter',system-ui", fontSize: 13, fontWeight: 600,
                   color: "var(--accent)", textDecoration: "none", transition: "color 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--accent)"}
        >
          View all projects <IcoArrow />
        </Link>
      </motion.div>

      {/* Cards — 3-up grid, equal height */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: 16,
        alignItems: "start",
      }}>
        {projects.slice(0, 3).map((p, i) => (
          <TeaserCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
