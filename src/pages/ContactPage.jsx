import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";

const E = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.48, ease: E, delay },
});

const Panel = ({ children, style = {} }) => (
  <div style={{
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: "28px 28px",
    ...style,
  }}>{children}</div>
);

const LINKS = [
  {
    label: "Email",
    value: "abdulwasay434329@gmail.com",
    href:  "mailto:abdulwasay434329@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/WasayWithCode",
    href:  "https://github.com/WasayWithCode",
    ext:   true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
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
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abdulwasay-frontend",
    href:  "https://www.linkedin.com/in/abdulwasay-frontend/",
    ext:   true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037
                 -1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046
                 c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z
                 M5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065z
                 m1.782 13.019H3.555V9h3.564v11.452z
                 M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451
                 C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Karachi, Pakistan",
    href:  null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

const ContactPage = () => {
  const formRef  = useRef();
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [err, setErr]         = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true); setErr(false);
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      { from_name: form.name, to_name: "Abdul Wasay",
        from_email: form.email, to_email: "abdulwasay434329@gmail.com",
        message: form.message },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
    ).then(() => {
      setLoading(false); setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    }).catch(() => {
      setLoading(false); setErr(true);
      setTimeout(() => setErr(false), 6000);
    });
  };

  return (
    <div className="page-root">
      <Navbar />
      <main className="page-main">

        {/* ── Heading ── */}
        <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.48, ease: E }}>
            <span className="section-label">Get in touch</span>
            <h1 style={{
              fontFamily: "'Inter',system-ui", fontSize: "clamp(32px,5vw,60px)",
              fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.0,
              color: "var(--text)", margin: 0,
            }}>
              Contact
            </h1>
            <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 15, lineHeight: 1.7,
                         color: "var(--text-sub)", maxWidth: 440, marginTop: 14 }}>
              Open to frontend roles, freelance and collaboration.
              Send a message and I'll respond promptly.
            </p>
          </motion.div>
        </section>

        {/* ── Two-col layout ── */}
        <section className="page-section" style={{
          paddingBottom: 80,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,360px),1fr))",
          gap: 16,
        }}>
          {/* Info panel */}
          <motion.div {...fadeUp(0.06)}>
            <Panel style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <span className="section-label">Contact info</span>
              <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                           color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 20px" }}>
                Reach Out
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
                {LINKS.map(({ label, value, href, ext, icon }) => (
                  <div key={label} style={{ display: "flex", gap: 12 }}>
                    <div style={{
                      flexShrink: 0, width: 36, height: 36, borderRadius: 9,
                      background: "rgba(129,140,248,0.08)",
                      border: "1px solid rgba(129,140,248,0.16)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--accent)",
                    }}>
                      {icon}
                    </div>
                    <div style={{ paddingTop: 2 }}>
                      <p style={{ fontFamily: "'Inter',system-ui", fontSize: 10.5,
                                   fontWeight: 700, color: "var(--accent)",
                                   letterSpacing: "0.1em", textTransform: "uppercase",
                                   marginBottom: 3 }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} target={ext ? "_blank" : undefined}
                           rel={ext ? "noopener noreferrer" : undefined}
                           style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                    color: "var(--text-sub)", textDecoration: "none",
                                    transition: "color 0.18s", wordBreak: "break-all" }}
                           onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                           onMouseLeave={e => e.currentTarget.style.color = "var(--text-sub)"}
                        >{value}</a>
                      ) : (
                        <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13.5,
                                        color: "var(--text-sub)" }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div style={{
                marginTop: 24, padding: "12px 14px", borderRadius: 10,
                background: "rgba(52,211,153,0.06)",
                border: "1px solid rgba(52,211,153,0.18)",
                display: "flex", alignItems: "center", gap: 9,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%",
                               background: "#34d399", flexShrink: 0 }} />
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 13,
                               color: "#34d399", fontWeight: 500 }}>
                  Available for new opportunities
                </span>
              </div>
            </Panel>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.1)}>
            <Panel>
              <span className="section-label">Send a message</span>
              <h2 style={{ fontFamily: "'Inter',system-ui", fontSize: 20, fontWeight: 700,
                           color: "var(--text)", letterSpacing: "-0.02em", margin: "0 0 22px" }}>
                Drop Me a Line
              </h2>

              <form ref={formRef} onSubmit={onSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { l: "Your Name",     n: "name",    t: "text",  p: "What's your name?"  },
                  { l: "Email Address", n: "email",   t: "email", p: "your@email.com"      },
                ].map(f => (
                  <label key={f.n} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontFamily: "'Inter',system-ui", fontSize: 12,
                                   fontWeight: 600, color: "var(--text-sub)", letterSpacing: "0.04em" }}>
                      {f.l}
                    </span>
                    <input type={f.t} name={f.n} value={form[f.n]}
                           onChange={onChange} placeholder={f.p} required
                           className="input-field" />
                  </label>
                ))}

                <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontFamily: "'Inter',system-ui", fontSize: 12,
                                 fontWeight: 600, color: "var(--text-sub)", letterSpacing: "0.04em" }}>
                    Message
                  </span>
                  <textarea rows={5} name="message" value={form.message}
                            onChange={onChange} placeholder="What would you like to say?"
                            required className="input-field" style={{ resize: "none" }} />
                </label>

                {sent && (
                  <div style={{
                    padding: "10px 14px", borderRadius: 9,
                    background: "rgba(52,211,153,0.07)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    fontFamily: "system-ui,sans-serif", fontSize: 13,
                    color: "#34d399", fontWeight: 500,
                  }}>
                    ✓ Message sent — I'll get back to you soon.
                  </div>
                )}
                {err && (
                  <div style={{
                    padding: "10px 14px", borderRadius: 9,
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    fontFamily: "system-ui,sans-serif", fontSize: 13,
                    color: "#fca5a5", fontWeight: 500,
                  }}>
                    ✗ Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary"
                        style={{ alignSelf: "flex-start", opacity: loading ? 0.6 : 1 }}>
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </Panel>
          </motion.div>
        </section>
      </main>

      <footer className="page-footer">
        © {new Date().getFullYear()} <span>Abdul Wasay</span> — Front-End Web Developer
      </footer>
    </div>
  );
};

export default ContactPage;
