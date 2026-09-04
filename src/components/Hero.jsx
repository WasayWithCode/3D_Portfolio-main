/**
 * Hero — rebuilt from scratch.
 *
 * Architecture:
 *   <HeroSection>              ← full-viewport, dark bg, overflow hidden
 *     <HeroBg />               ← layered ambient glows + diagonal rule
 *     <HeroGrid>               ← CSS grid 42/58, height 100svh
 *       <HeroLeft />           ← badge → name → role → desc → CTAs → GH
 *       <HeroRight>            ← canvas column + floating tech card
 *         <GlowDisc />
 *         <ComputersCanvas />
 *         <TechCard />
 *       </HeroRight>
 *     </HeroGrid>
 *     <ScrollLine />           ← pulsing vertical line at the bottom
 *   </HeroSection>
 *
 * 3-D sizing strategy (fixes the "model looks small" problem):
 *   The canvas column is given a fixed, roughly-square size
 *   (width ≈ 58% of the viewport, height capped to that width).
 *   AutoCamera then sees a near-1:1 aspect ratio, so hHalf ≈ vHalf
 *   and the model fills the frame properly on both axes.
 *   PADDING = 1.05 keeps 5% breathing room.
 */

import { motion }           from "framer-motion";
import { useState, useEffect } from "react";
import { ComputersCanvas }  from "./canvas";

/* ── Data from CV only ─────────────────────────────────────── */
const DATA = {
  first:    "Abdul",
  last:     "Wasay",
  role:     "Front-End Web Developer",
  desc:     "Building fast, accessible and visually polished web experiences with React.js and modern CSS.",
  location: "Karachi, Pakistan",
  github:   "https://github.com/WasayWithCode",
  cv:       "/Abdul-Wasay-CV.pdf",
  projects: "/projects",
};

/* ── Animation presets ─────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];
const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const SLIDE = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.46, ease: EASE } },
};

/* ── Minimal inline SVG icons ──────────────────────────────── */
const Ico = ({ d, w = 13, fill, stroke = "currentColor", sw = 2.2, lc = "round", lj = "round" }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill={fill ?? "none"}
       stroke={stroke} strokeWidth={sw} strokeLinecap={lc} strokeLinejoin={lj}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const FolderIco = () => (
  <Ico d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
);
const DownIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const GHIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
const ArrowIco = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   HeroBg — all decorative background layers
   Uses data-theme-aware opacity via CSS property so the glows
   are visible in dark mode but very subtle in light mode.
══════════════════════════════════════════════════════════════ */
const HeroBg = () => (
  <>
    {/* Diagonal hairline texture — uses CSS variable opacity */}
    <div aria-hidden style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage:
        "repeating-linear-gradient(135deg," +
        "rgba(99,102,241,0.04) 0px,rgba(99,102,241,0.04) 1px," +
        "transparent 1px,transparent 52px)",
    }} />

    {/* Main model glow — right side */}
    <div aria-hidden style={{
      position: "absolute", zIndex: 0, pointerEvents: "none",
      top: "50%", right: "3%",
      transform: "translateY(-50%)",
      width: "min(680px, 55vw)",
      height: "min(680px, 55vw)",
      borderRadius: "50%",
      background:
        "radial-gradient(circle," +
        "rgba(109,40,217,0.13) 0%,rgba(99,102,241,0.08) 38%,transparent 70%)",
      filter: "blur(52px)",
    }} />

    {/* Secondary accent — top-right */}
    <div aria-hidden style={{
      position: "absolute", zIndex: 0, pointerEvents: "none",
      top: "-15%", right: "-8%",
      width: "min(500px, 40vw)",
      height: "min(500px, 40vw)",
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(139,92,246,0.09) 0%,transparent 68%)",
      filter: "blur(36px)",
    }} />

    {/* Left ambient */}
    <div aria-hidden style={{
      position: "absolute", zIndex: 0, pointerEvents: "none",
      top: "20%", left: "-5%",
      width: "min(340px, 28vw)",
      height: "min(340px, 28vw)",
      borderRadius: "50%",
      background: "radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)",
      filter: "blur(40px)",
    }} />

    {/* Bottom page-blend */}
    <div aria-hidden style={{
      position: "absolute", zIndex: 4, pointerEvents: "none",
      bottom: 0, left: 0, right: 0, height: 110,
      background: "linear-gradient(to top,var(--bg),transparent)",
    }} />
  </>
);

/* ══════════════════════════════════════════════════════════════
   HeroLeft — text content block
══════════════════════════════════════════════════════════════ */
const HeroLeft = ({ compact }) => {
  const nameSz = compact
    ? "clamp(34px, 7.5vw, 48px)"
    : "clamp(40px, 4.2vw, 64px)";

  return (
    <motion.div
      variants={STAGGER}
      initial="hidden"
      animate="show"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* ── 1. Availability badge ── */}
      <motion.div variants={SLIDE} style={{ marginBottom: compact ? 20 : 26 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px 5px 8px", borderRadius: 999,
          background: "rgba(99,102,241,0.09)",
          border: "1px solid rgba(99,102,241,0.22)",
        }}>
          {/* Ping dot */}
          <span style={{ position: "relative", display: "flex", width: 7, height: 7, flexShrink: 0 }}>
            <motion.span
              animate={{ scale: [1,2.2,1], opacity: [0.55,0,0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: 0,
                borderRadius: "50%", background: "#6366F1",
              }}
            />
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366F1", display: "block" }} />
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#6366F1",
            letterSpacing: "0.09em", textTransform: "uppercase",
          }}>
            Available for opportunities
          </span>
        </span>
      </motion.div>

      {/* ── 2. Eyebrow ── */}
      <motion.div variants={SLIDE} style={{ marginBottom: compact ? 12 : 14 }}>
        <p style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: "0.28em",
          textTransform: "uppercase", color: "var(--text-faint)",
          margin: "0 0 7px",
        }}>
          Hello, I'm
        </p>

        {/* Display name */}
        <h1 style={{
          fontSize: nameSz,
          fontWeight: 900, lineHeight: 0.93,
          letterSpacing: "-0.04em", margin: 0,
        }}>
          <span style={{ color: "var(--text)", display: "block" }}>{DATA.first}</span>
          <span style={{
            display: "block",
            background: "linear-gradient(118deg,#818cf8 0%,#a78bfa 46%,#c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {DATA.last}
          </span>
        </h1>
      </motion.div>

      {/* ── 3. Role ── */}
      <motion.div variants={SLIDE} style={{ marginBottom: compact ? 14 : 18 }}>
        <p style={{
          fontSize: compact ? 14 : "clamp(14px,1.35vw,17px)",
          fontWeight: 500, color: "var(--text-sub)",
          letterSpacing: "-0.01em", margin: "0 0 9px",
        }}>
          {DATA.role}
        </p>
        {/* Accent underline */}
        <div style={{
          width: 28, height: 1.5, borderRadius: 2,
          background: "linear-gradient(to right,#818cf8,transparent)",
        }} />
      </motion.div>

      {/* ── 4. Description ── */}
      <motion.p variants={SLIDE} style={{
        fontSize: compact ? 13 : 14, lineHeight: 1.72,
        color: "var(--text-sub)",
        maxWidth: compact ? "none" : 330,
        margin: compact ? "0 0 22px" : "0 0 28px",
      }}>
        {DATA.desc}
      </motion.p>

      {/* ── 5. CTAs ── */}
      <motion.div variants={SLIDE} style={{
        display: "flex", flexWrap: "wrap", gap: 9,
        marginBottom: compact ? 14 : 18,
      }}>
        <Btn href={DATA.projects} variant="fill">
          <FolderIco /> View Projects
        </Btn>
        <Btn href={DATA.cv} download variant="outline">
          <DownIco /> Download CV
        </Btn>
      </motion.div>

      {/* ── 6. GitHub ghost ── */}
      <motion.div variants={SLIDE}>
        <a
          href={DATA.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-ghost-link"
        >
          <GHIco /> github.com/WasayWithCode <ArrowIco />
        </a>
      </motion.div>
    </motion.div>
  );
};

/* ── Button helper ─────────────────────────────────────────── */
const Btn = ({ href, download, variant, children }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7,
    height: 44, padding: "0 22px", borderRadius: 11,
    fontWeight: 600, fontSize: 13.5, letterSpacing: "-0.01em",
    textDecoration: "none", whiteSpace: "nowrap",
    transition: "opacity .16s, transform .16s",
  };
  const fill = {
    background: "linear-gradient(135deg,#6366f1,#7c3aed)",
    color: "#fff",
    boxShadow: "0 2px 20px rgba(99,102,241,0.46),inset 0 1px 0 rgba(255,255,255,0.12)",
  };
  /* Outline uses CSS variables so it works in both themes */
  const outline = {
    background: "var(--bg-card2)",
    border: "1px solid var(--border-hover)",
    color: "var(--text)",
  };

  return (
    <a
      href={href}
      download={download}
      style={{ ...base, ...(variant === "fill" ? fill : outline) }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = ".86";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
};

/* ══════════════════════════════════════════════════════════════
   HeroRight — 3D canvas + floating tech card

   Key sizing decision:
   The canvas div is given width:"100%" inside the 58% grid cell,
   and height derived from the cell width using aspect-ratio "4/5".
   This gives a portrait-ish canvas (taller than wide), so the
   vertical FOV becomes the tighter axis and the model fills ~95%
   of the frame uniformly.  alignSelf:"center" vertically centres
   the square block inside the stretched grid cell.
══════════════════════════════════════════════════════════════ */
const HeroRight = ({ bp }) => {
  const isTablet = bp === "tablet";
  const isMobile = bp === "mobile";

  /* Canvas container size */
  const canvasStyle = isMobile
    ? { width: "100%", height: "clamp(260px,78vw,340px)", marginTop: 24 }
    : isTablet
    ? { width: "100%", height: "clamp(340px,56vw,480px)", marginTop: 32 }
    : {
        /* Desktop: fill the grid cell width, height = width × 0.9 */
        width: "100%",
        /* paddingBottom hack gives aspect-based height */
        aspectRatio: "10 / 9",
        /* Never taller than the available grid row */
        maxHeight: "calc(100svh - 68px - 48px)",
        position: "relative",
        alignSelf: "center",
        /* Bleed 24px past right grid edge → immersive feel */
        marginRight: -24,
      };

  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", ...canvasStyle }}
    >
      {/* Glow disc — centred behind the model */}
      <div aria-hidden style={{
        position: "absolute",
        top: "10%", left: "8%", right: "8%", bottom: "10%",
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse at 50% 55%," +
          "rgba(109,40,217,0.20) 0%,rgba(99,102,241,0.10) 40%,transparent 68%)",
        filter: "blur(46px)",
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <ComputersCanvas />
      </div>

      {/* Floating tech card — only on desktop + tablet */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.52, ease: EASE, delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: isTablet ? "8%" : "13%",
            left:   isTablet ? "6%"  : "4%",
            zIndex: 22,
            background: "var(--bg-nav)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid var(--border-acc)",
            borderRadius: 14,
            padding: "13px 17px",
            boxShadow: "0 12px 36px var(--shadow)",
            minWidth: 190,
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            {/* Pulsing dot */}
            <span style={{ position: "relative", display: "flex", width: 6, height: 6, flexShrink: 0 }}>
              <motion.span
                animate={{ scale: [1,1.9,1], opacity: [0.65,0,0.65] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#818cf8" }}
              />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", display: "block" }} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-light)", letterSpacing: "0.01em" }}>
              Frontend Developer
            </span>
          </div>

          {/* Stack row */}
          <p style={{ fontSize: 10.5, color: "var(--text-muted)", letterSpacing: "0.03em", margin: "0 0 9px" }}>
            React.js &nbsp;·&nbsp; JavaScript &nbsp;·&nbsp; Tailwind
          </p>

          {/* Location row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            paddingTop: 8, borderTop: "1px solid var(--sep)",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                 stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              {DATA.location}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ScrollLine — minimal scroll indicator at the bottom
══════════════════════════════════════════════════════════════ */
const ScrollLine = () => (
  <div style={{
    position: "absolute", bottom: 22, left: "50%",
    transform: "translateX(-50%)", zIndex: 20,
  }}>
    <a
      href="#about"
      aria-label="Scroll to About"
      onClick={e => {
        e.preventDefault();
        const el = document.getElementById("about");
        if (el) window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 68,
          behavior: "smooth",
        });
      }}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6, textDecoration: "none",
      }}
    >
      <motion.div
        animate={{ opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 1, height: 40,
          background:
            "linear-gradient(to bottom,transparent,rgba(129,140,248,0.65),transparent)",
        }}
      />
      <span style={{
        fontSize: 8, fontWeight: 700, letterSpacing: "0.24em",
        textTransform: "uppercase", color: "var(--text-vfaint)",
      }}>
        scroll
      </span>
    </a>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   Hero — root
══════════════════════════════════════════════════════════════ */
const Hero = () => {
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    return window.innerWidth >= 1024 ? "desktop"
         : window.innerWidth >= 640  ? "tablet"
                                     : "mobile";
  });

  useEffect(() => {
    const upd = () =>
      setBp(window.innerWidth >= 1024 ? "desktop"
          : window.innerWidth >= 640  ? "tablet" : "mobile");
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <HeroBg />

      {/* ══ DESKTOP ══════════════════════════════════════════ */}
      {bp === "desktop" && (
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 1440, margin: "0 auto",
          height: "100svh",
          display: "grid",
          /* Left 42%, Right 58% */
          gridTemplateColumns: "42% 58%",
          alignItems: "center",
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: "clamp(36px,5vw,96px)",
          paddingRight: 0,
        }}>
          <div style={{ paddingRight: "clamp(20px,3vw,52px)" }}>
            <HeroLeft compact={false} />
          </div>
          <HeroRight bp="desktop" />
        </div>
      )}

      {/* ══ TABLET ═══════════════════════════════════════════ */}
      {bp === "tablet" && (
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 760, margin: "0 auto",
          minHeight: "100svh",
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: 116, paddingBottom: 48,
          paddingLeft: "clamp(24px,5vw,48px)",
          paddingRight: "clamp(24px,5vw,48px)",
        }}>
          <HeroLeft compact={true} />
          <HeroRight bp="tablet" />
        </div>
      )}

      {/* ══ MOBILE ═══════════════════════════════════════════ */}
      {bp === "mobile" && (
        <div style={{
          position: "relative", zIndex: 10,
          paddingTop: 104, paddingBottom: 64,
          paddingLeft: 22, paddingRight: 22,
          display: "flex", flexDirection: "column",
        }}>
          <HeroLeft compact={true} />
          <HeroRight bp="mobile" />
        </div>
      )}

      <ScrollLine />
    </section>
  );
};

export default Hero;
