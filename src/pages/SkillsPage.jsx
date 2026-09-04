import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { technologies } from "../constants";
import { BallCanvas } from "../components/canvas";

const E = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.48, ease: E, delay },
});

const GROUPS = [
  {
    label: "Front-End",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Responsive Design"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS", "CSS Animations", "Flexbox", "CSS Grid"],
  },
  {
    label: "Tools",
    items: ["Git & GitHub", "VS Code", "Vercel", "GitHub Pages"],
  },
  {
    label: "Database",
    items: ["MongoDB"],
  },
  {
    label: "CMS",
    items: ["WordPress", "Elementor", "Theme Customisation"],
  },
  {
    label: "UI/UX",
    items: ["Figma", "UI/UX Principles", "Wireframing", "Accessibility"],
  },
];

const BARS = [
  { skill: "HTML5 & CSS3",      pct: 92 },
  { skill: "JavaScript (ES6+)", pct: 82 },
  { skill: "React.js",          pct: 78 },
  { skill: "Tailwind CSS",      pct: 88 },
  { skill: "Git & GitHub",      pct: 75 },
  { skill: "Responsive Design", pct: 90 },
  { skill: "WordPress",         pct: 70 },
  { skill: "MongoDB",           pct: 55 },
];

const Panel = ({ children, style = {} }) => (
  <div style={{
    background: "#111118",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "24px 24px",
    ...style,
  }}>{children}</div>
);

const SkillsPage = () => (
  <div className="page-root">
    <Navbar />
    <main className="page-main">

      {/* ── Heading ── */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, ease: E }}>
          <span className="section-label">What I work with</span>
          <h1 style={{
            fontFamily: "'Inter',system-ui", fontSize: "clamp(32px,5vw,60px)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.0,
            color: "#f0f0ec", margin: 0,
          }}>
            Tech Stack
          </h1>
          <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 15, lineHeight: 1.7,
                       color: "#8a8a9a", maxWidth: 440, marginTop: 14 }}>
            Technologies I use daily to build fast, accessible web experiences.
          </p>
        </motion.div>
      </section>

      {/* ── 3D Tech balls ── */}
      <section className="page-section" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp(0)}>
          <Panel>
            <span className="section-label">Interactive</span>
            <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                         color: "#f0f0ec", letterSpacing: "-0.02em", margin: "0 0 24px" }}>
              Core Technologies
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center",
                           gap: "24px 32px" }}>
              {technologies.map((tech, i) => (
                <motion.div key={tech.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, ease: E, delay: i * 0.04 }}
                  style={{ display: "flex", flexDirection: "column",
                           alignItems: "center", gap: 6 }}
                >
                  <div style={{ width: 80, height: 80 }}>
                    <BallCanvas icon={tech.icon} />
                  </div>
                  <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 11,
                                  fontWeight: 500, color: "#4a4a5a",
                                  textAlign: "center", letterSpacing: "0.04em" }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </section>

      {/* ── Skill areas ── */}
      <section className="page-section" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp(0)} style={{ marginBottom: 20 }}>
          <span className="section-label">Grouped by category</span>
          <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(22px,3vw,34px)",
                       fontWeight: 800, color: "#f0f0ec",
                       letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Skill Areas
          </h2>
        </motion.div>

        <div style={{ display: "grid",
                       gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))",
                       gap: 12 }}>
          {GROUPS.map((g, i) => (
            <motion.div key={g.label} {...fadeUp(i * 0.05)}>
              <div style={{
                background: "#111118",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "18px 20px",
                height: "100%",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(129,140,248,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <p style={{ fontFamily: "'Inter',system-ui", fontSize: 12, fontWeight: 700,
                              color: "#818cf8", letterSpacing: "0.08em",
                              textTransform: "uppercase", marginBottom: 12 }}>
                  {g.label}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 7, listStyle: "none",
                              padding: 0, margin: 0 }}>
                  {g.items.map(it => (
                    <li key={it} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%",
                                      background: "rgba(129,140,248,0.5)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                      color: "#8a8a9a" }}>
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Proficiency bars ── */}
      <section className="page-section" style={{ paddingBottom: 80 }}>
        <motion.div {...fadeUp(0)} style={{ marginBottom: 20 }}>
          <span className="section-label">Self-assessed proficiency</span>
          <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(22px,3vw,34px)",
                       fontWeight: 800, color: "#f0f0ec",
                       letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            Proficiency Levels
          </h2>
        </motion.div>

        <Panel style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,400px),1fr))",
          gap: "18px 40px",
        }}>
          {BARS.map(({ skill, pct }, i) => (
            <motion.div key={skill} {...fadeUp(i * 0.04)}>
              <div style={{ display: "flex", justifyContent: "space-between",
                             marginBottom: 6 }}>
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13,
                                fontWeight: 400, color: "#8a8a9a" }}>
                  {skill}
                </span>
                <span style={{ fontFamily: "'Inter',system-ui", fontSize: 11.5,
                                fontWeight: 700, color: "#818cf8" }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: 4, borderRadius: 99,
                             background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, ease: [0.22,1,0.36,1], delay: i * 0.04 + 0.15 }}
                  style={{ height: "100%", borderRadius: 99,
                            background: "linear-gradient(to right,#6366f1,#a5b4fc)" }}
                />
              </div>
            </motion.div>
          ))}
        </Panel>
      </section>
    </main>

    <footer className="page-footer">
      © {new Date().getFullYear()} <span>Abdul Wasay</span> — Front-End Web Developer
    </footer>
  </div>
);

export default SkillsPage;
