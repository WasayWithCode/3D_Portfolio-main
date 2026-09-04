import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const E = [0.22, 1, 0.36, 1];

const ContactSection = () => (
  <section style={{ padding: "80px 0" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,72px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.48, ease: E }}
        style={{
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(129,140,248,0.15)",
          borderRadius: 16, padding: "clamp(28px,4vw,48px)",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 24,
        }}
      >
        <div>
          <span className="section-label">Get in touch</span>
          <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: "clamp(22px,3vw,36px)",
                       fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)",
                       margin: "0 0 10px" }}>
            Let's Work Together
          </h2>
          <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 14, lineHeight: 1.7,
                       color: "var(--text-sub)", maxWidth: 420, margin: 0 }}>
            Open to frontend roles, freelance projects and collaboration.
            Send me a message — I'll respond promptly.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/contact" className="btn-primary" style={{ textDecoration: "none" }}>
            Contact Me
          </Link>
          <a href="mailto:abdulwasay434329@gmail.com" className="btn-outline"
             style={{ textDecoration: "none" }}>
            abdulwasay434329@gmail.com
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
