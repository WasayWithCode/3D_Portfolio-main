import { useState } from "react";

/* ──────────────────────────────────────────────────────────
   ProjectPreview
   Shows a real screenshot inside a browser-chrome frame.
   - screenshot  : path to the static JPG in /public/projects/
   - url         : live site URL shown in the address bar
   - name        : project name (used for alt text)
   No external API calls. No "Preview unavailable".
────────────────────────────────────────────────────────── */

/* Traffic-light dots */
const Dot = ({ color }) => (
  <span
    style={{
      width: 10, height: 10,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
      display: "inline-block",
    }}
  />
);

/* External-link icon used on hover overlay */
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const ProjectPreview = ({ screenshot, url, name }) => {
  const [hovered, setHovered] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  /* Clean display domain for the URL bar */
  const displayUrl = url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .split("/")[0];   // only the hostname

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#0a1628",
        borderRadius: "inherit",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Browser chrome bar ─────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          height: 32,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
          background: "linear-gradient(to right,#0b1a2e,#0d1f38)",
          borderBottom: "1px solid rgba(56,189,248,0.1)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Dot color="#ff5f57" />
          <Dot color="#febc2e" />
          <Dot color="#28c840" />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            height: 20,
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0 8px",
            borderRadius: 5,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(129,140,248,0.14)",
            overflow: "hidden",
          }}
        >
          {/* Lock icon */}
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
               stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
               style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{
            fontSize: 9.5,
            color: "#64748b",
            fontFamily: "Inter, Poppins, sans-serif",
            fontWeight: 500,
            letterSpacing: "0.02em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {displayUrl}
          </span>
        </div>

        {/* Live badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 7px",
          borderRadius: 999,
          background: "rgba(16,185,129,0.1)",
          border: "1px solid rgba(16,185,129,0.25)",
          flexShrink: 0,
        }}>
          <span style={{
            width: 5, height: 5,
            borderRadius: "50%",
            background: "#34d399",
            display: "inline-block",
          }} />
          <span style={{
            fontSize: 8.5,
            fontWeight: 700,
            color: "#34d399",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "Inter, Poppins, sans-serif",
          }}>
            Live
          </span>
        </div>
      </div>

      {/* ── Screenshot area ────────────────────────── */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden", minHeight: 0 }}>

        {/* Skeleton shown until image paints */}
        {!loaded && (
          <div
            className="shimmer"
            style={{ position: "absolute", inset: 0, zIndex: 2 }}
          />
        )}

        {/* Real screenshot — always present so it loads eagerly */}
        <img
          src={screenshot}
          alt={`${name} website screenshot`}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            opacity: loaded ? 1 : 0,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "opacity 0.35s ease, transform 0.5s ease",
          }}
        />

        {/* Hover overlay — "Open Live Site" CTA */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} live site in new tab`}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,13,26,0.6)",
            backdropFilter: hovered ? "blur(2px)" : "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
            textDecoration: "none",
          }}
          /* stop tilt from interfering */
          onClick={e => e.stopPropagation()}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              background: "linear-gradient(135deg,#6366F1,#7C3AED)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "Inter, Poppins, sans-serif",
              letterSpacing: "0.02em",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.3s ease",
              pointerEvents: "none",   /* the <a> handles the click */
            }}
          >
            <ExternalIcon />
            Open Live Site
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectPreview;
