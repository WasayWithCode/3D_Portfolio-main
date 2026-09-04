import { motion } from "framer-motion";
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
  "Tailwind CSS", "Git & GitHub", "MongoDB", "Responsive Design",
  "WordPress", "Elementor",
];

const AboutSection = () => (
  <section style={{ padding: "80px 0" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>

      {/* Heading */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 48 }}>
        <span className="section-label">About me</span>
        <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(28px,4vw,48px)",
                     fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>
          Who I Am
        </h2>
      </motion.div>

      {/* Two-col: bio + facts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,420px),1fr))",
                    gap: 16, marginBottom: 32 }}>
        <motion.div {...fadeUp(0.06)}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: 14, padding: "24px 26px", height: "100%" }}>
            <span className="section-label">Introduction</span>
            <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: 18, fontWeight: 700,
                         color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 14 }}>
              Front-End Web Developer
            </h3>
            <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, lineHeight: 1.78,
                         color: "var(--text-sub)", margin: 0 }}>
              Passionate frontend developer with skills in{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>HTML5, CSS3, JavaScript (ES6+)</span>,{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>React.js</span>, and{" "}
              <span style={{ color: "var(--text-accent)", fontWeight: 500 }}>Tailwind CSS</span>.
              Currently pursuing a Diploma in Software Development at Aptech, Karachi.
              Always learning, always building.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                        borderRadius: 14, padding: "24px 26px", height: "100%" }}>
            <span className="section-label">Quick facts</span>
            <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: 18, fontWeight: 700,
                         color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 18 }}>
              At a Glance
            </h3>
            {[
              { k: "Location", v: "Karachi, Pakistan" },
              { k: "Email",    v: "abdulwasay434329@gmail.com", href: "mailto:abdulwasay434329@gmail.com" },
              { k: "GitHub",   v: "WasayWithCode", href: "https://github.com/WasayWithCode", ext: true },
              { k: "Status",   v: "Open to opportunities ✓" },
            ].map(({ k, v, href, ext }) => (
              <div key={k} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "baseline" }}>
                <span style={{ minWidth: 72, fontFamily: "'Inter',system-ui", fontSize: 10,
                               fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em",
                               textTransform: "uppercase", flexShrink: 0 }}>
                  {k}
                </span>
                {href ? (
                  <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                     style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                              color: "var(--accent-light)", textDecoration: "none", wordBreak: "break-all",
                              transition: "color 0.18s" }}
                     onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                     onMouseLeave={e => e.currentTarget.style.color = "var(--accent-light)"}
                  >{v}</a>
                ) : (
                  <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5, color: "var(--text-sub)" }}>{v}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div {...fadeUp(0.04)} style={{ marginBottom: 32 }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: 14, padding: "24px 26px" }}>
          <span className="section-label">Technologies</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SKILLS.map(s => <span key={s} className="skill-badge">{s}</span>)}
          </div>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 8 }}>
        <span className="section-label">Education</span>
        <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(20px,2.5vw,30px)",
                     fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em",
                     margin: "0 0 20px" }}>
          My Journey
        </h3>
      </motion.div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {experiences.map((exp, i) => (
          <motion.div key={i} {...fadeUp(i * 0.07)}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                          borderRadius: 14, padding: "20px 24px",
                          transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-acc)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 9,
                               background: exp.iconBg ?? "var(--bg-card2)",
                               border: "1px solid rgba(129,140,248,0.15)",
                               display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={exp.icon} alt="" style={{ width: "55%", height: "55%", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                    <h4 style={{ fontFamily: "'Inter',system-ui", fontSize: 15, fontWeight: 700,
                                  color: "var(--text)", margin: 0 }}>{exp.title}</h4>
                    <span style={{ fontFamily: "'Inter',system-ui", fontSize: 11, fontWeight: 600,
                                   color: "var(--accent)" }}>{exp.date}</span>
                  </div>
                  <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 12, fontWeight: 600,
                               color: "var(--accent)", margin: "4px 0 8px" }}>{exp.company_name}</p>
                  {exp.points.slice(0, 2).map((pt, j) => (
                    <div key={j} style={{ display: "flex", gap: 7, marginBottom: 4 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-faint)",
                                      flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13,
                                      color: "var(--text-sub)", lineHeight: 1.65 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
