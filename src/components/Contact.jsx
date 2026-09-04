import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn, fadeIn } from "../utils/motion";

const contactLinks = [
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "abdulwasay434329@gmail.com",
    href: "mailto:abdulwasay434329@gmail.com",
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577
                 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
                 -1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997
                 .108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22
                 -.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405
                 c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176
                 .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
                 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12
                 c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    label: "github.com/WasayWithCode",
    href: "https://github.com/WasayWithCode",
    external: true,
  },
  {
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Karachi, Pakistan",
    href: null,
  },
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      { from_name: form.name, to_name: "Abdul Wasay",
        from_email: form.email, to_email: "abdulwasay434329@gmail.com",
        message: form.message },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setLoading(false); setSent(true);
      setForm({ name:"", email:"", message:"" });
      setTimeout(() => setSent(false), 5000);
    }).catch((err) => {
      setLoading(false); console.error(err);
      alert("Something went wrong. Please try again.");
    });
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">

      {/* Form panel */}
      <motion.div
        variants={slideIn("left","tween",0.2,1)}
        className="flex-[0.75] rounded-2xl p-8 flex flex-col gap-6"
        style={{ background:"linear-gradient(145deg,rgba(10,22,40,0.9),rgba(4,11,23,0.95))",
                 border:"1px solid rgba(56,189,248,0.1)" }}
      >
        <div>
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>
          <div className="section-divider mt-3" />
        </div>

        {/* Quick links */}
        <motion.div variants={fadeIn("","",0.1,1)} className="flex flex-col gap-3">
          {contactLinks.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[#38bdf8]"
                   style={{ background:"rgba(14,165,233,0.1)", border:"1px solid rgba(56,189,248,0.2)" }}>
                {item.icon}
              </div>
              {item.href ? (
                <a href={item.href}
                   target={item.external ? "_blank" : undefined}
                   rel={item.external ? "noopener noreferrer" : undefined}
                   className="text-[#64748b] text-[13px] hover:text-white transition-colors duration-200 break-all">
                  {item.label}
                </a>
              ) : (
                <span className="text-[#64748b] text-[13px]">{item.label}</span>
              )}
            </div>
          ))}
        </motion.div>

        <div className="h-px" style={{ background:"rgba(56,189,248,0.1)" }} />

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
          {[
            { label:"Your Name",      name:"name",    type:"text",  placeholder:"What's your name?"       },
            { label:"Email Address",  name:"email",   type:"email", placeholder:"your@email.com"           },
          ].map((f) => (
            <label key={f.name} className="flex flex-col gap-2">
              <span className="text-[#94a3b8] text-[13px] font-semibold tracking-wide">{f.label}</span>
              <input type={f.type} name={f.name} value={form[f.name]}
                     onChange={handleChange} placeholder={f.placeholder} required
                     className="input-field" />
            </label>
          ))}

          <label className="flex flex-col gap-2">
            <span className="text-[#94a3b8] text-[13px] font-semibold tracking-wide">Message</span>
            <textarea rows={5} name="message" value={form.message}
                      onChange={handleChange} placeholder="What would you like to say?"
                      required className="input-field resize-none" />
          </label>

          {sent && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium text-emerald-300"
                 style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.22)" }}>
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Message sent! I'll get back to you soon.
            </div>
          )}

          <button type="submit" disabled={loading}
                  className="btn-primary w-fit disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send Message
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Earth canvas */}
      <motion.div
        variants={slideIn("right","tween",0.2,1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[300px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
