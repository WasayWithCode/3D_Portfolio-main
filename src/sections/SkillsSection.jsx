import { motion } from "framer-motion";
import { technologies } from "../constants";
import { BallCanvas } from "../components/canvas";

const E = [0.22, 1, 0.36, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, ease: E, delay: d },
});

const GROUPS = [
  { label: "Front-End",  items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Responsive Design"] },
  { label: "Styling",    items: ["Tailwind CSS", "CSS Animations", "Flexbox", "CSS Grid"] },
  { label: "Tools",      items: ["Git & GitHub", "VS Code", "Vercel", "GitHub Pages"] },
  { label: "Database",   items: ["MongoDB"] },
  { label: "CMS",        items: ["WordPress", "Elementor", "Theme Customisation"] },
  { label: "UI/UX",      items: ["Figma", "UI/UX Principles", "Wireframing", "Accessibility"] },
];

const SkillsSection = () => (
  <section style={{ padding: "80px 0" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>

      <motion.div {...fadeUp(0)} style={{ marginBottom: 48 }}>
        <span className="section-label">What I work with</span>
        <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(28px,4vw,48px)",
                     fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)", margin: 0 }}>
          Tech Stack
        </h2>
      </motion.div>

      {/* 3D balls */}
      <motion.div {...fadeUp(0.04)} style={{ marginBottom: 32 }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                      borderRadius: 14, padding: "28px" }}>
          <span className="section-label">Interactive</span>
          <h3 style={{ fontFamily: "'Inter',system-ui", fontSize: 18, fontWeight: 700,
                       color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 24 }}>
            Core Technologies
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px 28px" }}>
            {technologies.map((tech, i) => (
              <motion.div key={tech.name}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.3, ease: E, delay: i * 0.04 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 72, height: 72 }}>
                  <BallCanvas icon={tech.icon} />
                </div>
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 10.5, fontWeight: 500,
                                color: "var(--text-muted)", textAlign: "center" }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skill groups */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,230px),1fr))", gap: 12 }}>
        {GROUPS.map((g, i) => (
          <motion.div key={g.label} {...fadeUp(i * 0.05)}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)",
                          borderRadius: 12, padding: "18px 18px", height: "100%",
                          transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-acc)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <p style={{ fontFamily: "'Inter',system-ui", fontSize: 11, fontWeight: 700,
                           color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase",
                           marginBottom: 12 }}>
                {g.label}
              </p>
              {g.items.map(it => (
                <div key={it} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%",
                                  background: "rgba(129,140,248,0.4)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, color: "var(--text-sub)" }}>
                    {it}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
