import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { experiences } from "../constants";

const E = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.48, ease: E, delay },
});

const SKILLS = [
  "React.js", "JavaScript (ES6+)", "HTML5", "CSS3",
  "Tailwind CSS", "Git & GitHub", "MongoDB",
  "Responsive Design", "WordPress", "Elementor",
];

/* ── Minimal divider line ── */
const Rule = () => (
  <div style={{ width: 28, height: 2, background: "#818cf8", borderRadius: 2, marginTop: 12 }} />
);

/* ── Clean card surface ── */
const Panel = ({ children, style = {} }) => (
  <div style={{
    background: "#111118",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14,
    padding: "24px 26px",
    transition: "border-color 0.2s",
    ...style,
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(129,140,248,0.2)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
  >
    {children}
  </div>
);

const AboutPage = () => (
  <div className="page-root">
    <Navbar />
    <main className="page-main">

      {/* ── Heading ── */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.48, ease: E }}>
          <span className="section-label">About me</span>
          <h1 style={{
            fontFamily: "'Inter',system-ui", fontSize: "clamp(32px,5vw,60px)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.0,
            color: "#f0f0ec", margin: 0,
          }}>
            Abdul Wasay
          </h1>
          <Rule />
        </motion.div>
      </section>

      {/* ── Bio + Quick facts ── */}
      <section className="page-section" style={{
        paddingBottom: 40,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,440px),1fr))",
        gap: 16,
      }}>
        <motion.div {...fadeUp(0.06)}>
          <Panel style={{ height: "100%" }}>
            <span className="section-label">Introduction</span>
            <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                         color: "#f0f0ec", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
              Front-End Web Developer
            </h2>
            <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, lineHeight: 1.78,
                         color: "#8a8a9a", margin: 0 }}>
              Passionate frontend developer with skills in{" "}
              <span style={{ color: "#c8caf5", fontWeight: 500 }}>HTML5, CSS3, JavaScript (ES6+)</span>,{" "}
              <span style={{ color: "#c8caf5", fontWeight: 500 }}>React.js</span>, and{" "}
              <span style={{ color: "#c8caf5", fontWeight: 500 }}>Tailwind CSS</span>.
              I bring strong communication and problem-solving abilities to every project.
              Currently pursuing a Diploma in Software Development at Aptech, Karachi —
              always learning, always shipping.
            </p>
          </Panel>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Panel style={{ height: "100%" }}>
            <span className="section-label">Quick facts</span>
            <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                         color: "#f0f0ec", letterSpacing: "-0.02em", margin: "0 0 18px" }}>
              At a Glance
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { k: "Name",     v: "Abdul Wasay"                        },
                { k: "Role",     v: "Front-End Web Developer"            },
                { k: "Location", v: "Karachi, Pakistan"                  },
                { k: "Email",    v: "abdulwasay434329@gmail.com",
                                 href: "mailto:abdulwasay434329@gmail.com" },
                { k: "GitHub",   v: "WasayWithCode",
                                 href: "https://github.com/WasayWithCode", ext: true },
                { k: "Status",   v: "Open to opportunities ✓"            },
              ].map(({ k, v, href, ext }) => (
                <div key={k} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                  <span style={{ flexShrink: 0, minWidth: 72, fontFamily: "'Inter',system-ui",
                                 fontSize: 10.5, fontWeight: 700, color: "#818cf8",
                                 letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {k}
                  </span>
                  {href ? (
                    <a href={href} target={ext ? "_blank" : undefined}
                       rel={ext ? "noopener noreferrer" : undefined}
                       style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                color: "#a5b4fc", textDecoration: "none",
                                transition: "color 0.18s", wordBreak: "break-all" }}
                       onMouseEnter={e => e.currentTarget.style.color = "#f0f0ec"}
                       onMouseLeave={e => e.currentTarget.style.color = "#a5b4fc"}
                    >{v}</a>
                  ) : (
                    <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                   color: "#8a8a9a" }}>{v}</span>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </motion.div>
      </section>

      {/* ── Skills ── */}
      <section className="page-section" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp(0)}>
          <Panel>
            <span className="section-label">Technologies</span>
            <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                         color: "#f0f0ec", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              Skills Overview
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map(s => (
                <span key={s} className="skill-badge">{s}</span>
              ))}
            </div>
          </Panel>
        </motion.div>
      </section>

      {/* ── Education ── */}
      <section className="page-section" style={{ paddingBottom: 40 }}>
        <motion.div {...fadeUp(0)} style={{ marginBottom: 20 }}>
          <span className="section-label">Education & background</span>
          <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(22px,3vw,34px)",
                       fontWeight: 800, color: "#f0f0ec",
                       letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
            My Journey
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {experiences.map((exp, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}>
              <Panel>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    flexShrink: 0, width: 40, height: 40, borderRadius: 10,
                    background: exp.iconBg ?? "#16161e",
                    border: "1px solid rgba(129,140,248,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img src={exp.icon} alt={exp.company_name}
                         style={{ width: "55%", height: "55%", objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between",
                                  flexWrap: "wrap", gap: 4, marginBottom: 2 }}>
                      <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: 16,
                                   fontWeight: 700, color: "#f0f0ec", margin: 0 }}>
                        {exp.title}
                      </h3>
                      <span style={{ fontFamily: "'Inter',system-ui", fontSize: 11.5,
                                     fontWeight: 600, color: "#818cf8", letterSpacing: "0.05em" }}>
                        {exp.date}
                      </span>
                    </div>
                    <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 12.5,
                                fontWeight: 600, color: "#818cf8", marginBottom: 10 }}>
                      {exp.company_name}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {exp.points.map((pt, j) => (
                        <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ flexShrink: 0, marginTop: 6, width: 4, height: 4,
                                         borderRadius: "50%", background: "#4a4a5a" }} />
                          <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                         lineHeight: 1.68, color: "#8a8a9a" }}>
                            {pt}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="page-section" style={{ paddingBottom: 80 }}>
        <motion.div {...fadeUp(0)}
          style={{
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(129,140,248,0.16)",
            borderRadius: 14, padding: "28px 28px",
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "space-between", gap: 20,
          }}
        >
          <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 15,
                      lineHeight: 1.65, color: "#8a8a9a", maxWidth: 420, margin: 0 }}>
            Interested in working together? View my projects or get in touch.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <Link to="/projects" className="btn-primary" style={{ textDecoration: "none" }}>
              View Projects
            </Link>
            <Link to="/contact" className="btn-outline" style={{ textDecoration: "none" }}>
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>
    </main>

    <footer className="page-footer">
      © {new Date().getFullYear()} <span>Abdul Wasay</span> — Front-End Web Developer
    </footer>
  </div>
);

export default AboutPage;
