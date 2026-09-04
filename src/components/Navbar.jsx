import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo, menu, close } from "../assets";
import { useTheme } from "../context/ThemeContext";

/* ── Icons ──────────────────────────────────────────────── */
const GHIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
const DlIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── Nav items ──────────────────────────────────────────── */
const NAV = [
  { label: "Home",     type: "link",   to: "/"         },
  { label: "Projects", type: "link",   to: "/projects" },
  { label: "Contact",  type: "link",   to: "/contact"  },
];

/* ════════════════════════════════════════════════════════ */
const Navbar = () => {
  const { toggle, isDark, t } = useTheme();
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome   = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const frosted = scrolled || !isHome;

  const isActive = useCallback((item) => {
    if (item.to === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.to);
  }, [location.pathname]);

  /* ── Desktop link style ───────────────────────────────── */
  const desktopLinkStyle = (active) => ({
    position: "relative",
    display: "block",
    padding: "8px 16px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: active ? 600 : 500,
    letterSpacing: "-0.01em",
    color: active ? t.text : t.textSub,
    background: active
      ? (isDark ? "rgba(129, 140, 248, 0.10)" : "rgba(99, 102, 241, 0.08)")
      : "transparent",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    fontFamily: "Inter, system-ui, sans-serif",
    transition: "color 0.2s ease, background 0.2s ease",
  });

  /* ── Hover handlers for nav links ─────────────────────── */
  const linkHoverIn = (e, active) => {
    if (active) return;
    e.currentTarget.style.color = t.text;
    e.currentTarget.style.background = isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(99,102,241,0.05)";
  };
  const linkHoverOut = (e, active) => {
    if (active) return;
    e.currentTarget.style.color = t.textSub;
    e.currentTarget.style.background = "transparent";
  };

  /* ── Button hover helpers ─────────────────────────────── */
  const iconBtnStyle = {
    width: 38, height: 38, borderRadius: 10,
    border: `1px solid ${t.border}`,
    background: "transparent",
    color: t.textSub, textDecoration: "none", cursor: "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    transition: "color 0.2s, background 0.2s, border-color 0.2s",
  };
  const iconBtnHoverIn = (e) => {
    e.currentTarget.style.color = t.text;
    e.currentTarget.style.borderColor = t.borderAcc;
    e.currentTarget.style.background = isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(99,102,241,0.05)";
  };
  const iconBtnHoverOut = (e) => {
    e.currentTarget.style.color = t.textSub;
    e.currentTarget.style.borderColor = t.border;
    e.currentTarget.style.background = "transparent";
  };

  /* ── Navbar container styles ──────────────────────────── */
  const outerPadTop = scrolled ? "8px" : "12px";
  const innerPill = {
    background: frosted ? "var(--bg-nav)" : "transparent",
    backdropFilter: frosted ? "blur(20px) saturate(1.4)" : "none",
    WebkitBackdropFilter: frosted ? "blur(20px) saturate(1.4)" : "none",
    border: `1px solid ${frosted ? t.border : "transparent"}`,
    borderRadius: 16,
    boxShadow: frosted
      ? `0 8px 32px -12px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(15,23,42,0.10)"}`
      : "none",
    transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, backdrop-filter 0.25s ease",
  };

  return (
    <>
      <style>{`
        /* Responsive display — pure CSS, no inline/style conflict */
        .nav-desktop-only { display: none !important; }
        .nav-mobile-only  { display: inline-flex !important; }
        @media (min-width: 1024px) {
          .nav-desktop-only { display: flex !important; }
          .nav-mobile-only  { display: none !important; }
        }
      `}</style>

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        paddingTop: outerPadTop,
        paddingBottom: scrolled ? "8px" : "12px",
        paddingLeft: "clamp(12px, 2vw, 20px)",
        paddingRight: "clamp(12px, 2vw, 20px)",
        transition: "padding 0.25s ease",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 clamp(12px, 2vw, 20px)",
          height: 56,
          position: "relative",
          display: "flex", alignItems: "center",
          gap: 8,
          ...innerPill,
        }}>
          {/* ── LEFT: Logo ───────────────────────────────── */}
          <Link
            to="/"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              textDecoration: "none", flexShrink: 0,
              zIndex: 2,
            }}
          >
            <img
              src={logo}
              alt="Abdul Wasay"
              style={{
                width: 34, height: 34, objectFit: "contain",
                borderRadius: 9,
                background: isDark ? "rgba(129,140,248,0.08)" : "rgba(99,102,241,0.06)",
                padding: 3,
              }}
            />
            <span style={{
              fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em",
              color: t.text, fontFamily: "Inter, system-ui, sans-serif",
              lineHeight: 1,
            }}>
              Abdul{" "}
              <span style={{
                background: "linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Wasay</span>
            </span>
          </Link>

          {/* ── CENTER: Desktop nav (>= 1024px) ──────────── */}
          <ul
            className="nav-desktop-only"
            style={{
              position: "absolute",
              left: "50%", transform: "translateX(-50%)",
              alignItems: "center", gap: 2,
              listStyle: "none", margin: 0, padding: 0,
              zIndex: 1,
            }}
          >
            {NAV.map(item => {
              const active = isActive(item);
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    style={desktopLinkStyle(active)}
                    onMouseEnter={(e) => linkHoverIn(e, active)}
                    onMouseLeave={(e) => linkHoverOut(e, active)}
                  >
                    {item.label}
                    {active && (
                      <span style={{
                        position: "absolute", bottom: 4, left: "50%",
                        transform: "translateX(-50%)",
                        width: 3, height: 3, borderRadius: "50%",
                        background: t.accent, display: "block",
                      }} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── RIGHT: Desktop actions (>= 1024px) ────────── */}
          <div
            className="nav-desktop-only"
            style={{
              marginLeft: "auto",
              alignItems: "center", gap: 8,
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/WasayWithCode"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={iconBtnStyle}
              onMouseEnter={iconBtnHoverIn}
              onMouseLeave={iconBtnHoverOut}
            >
              <GHIcon />
            </a>

            {/* CV */}
            <a
              href="/Abdul-Wasay-CV.pdf"
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                height: 38, padding: "0 16px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
                color: "#fff", fontSize: 13, fontWeight: 600,
                letterSpacing: "-0.01em",
                textDecoration: "none",
                fontFamily: "Inter, system-ui, sans-serif",
                boxShadow: "0 2px 12px rgba(99, 102, 241, 0.35)",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <DlIcon /> Download CV
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                ...iconBtnStyle,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.text;
                e.currentTarget.style.borderColor = t.borderAcc;
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(99,102,241,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.textSub;
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)";
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* ── Mobile group (< 1024px): theme + hamburger ── */}
          <div
            className="nav-mobile-only"
            style={{
              marginLeft: "auto",
              alignItems: "center", gap: 8,
              flexShrink: 0,
              zIndex: 2,
            }}
          >
            {/* Theme Toggle — MOBILE */}
            <button
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                ...iconBtnStyle,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.text;
                e.currentTarget.style.borderColor = t.borderAcc;
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(99,102,241,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.textSub;
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.02)";
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{
                ...iconBtnStyle,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.text;
                e.currentTarget.style.borderColor = t.borderAcc;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.textSub;
                e.currentTarget.style.borderColor = t.border;
              }}
            >
              <img
                src={open ? close : menu}
                alt=""
                aria-hidden="true"
                style={{
                  width: 18, height: 18, objectFit: "contain",
                  filter: isDark ? "none" : "invert(0.5)",
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer (< 1024px) ─────────────────────── */}
        <div
          className="nav-mobile-only"
          style={{
            position: "fixed",
            top: scrolled ? "72px" : "80px",
            right: 12, left: 12,
            maxWidth: 380, marginLeft: "auto",
            background: "var(--bg-drawer)",
            border: `1px solid ${t.border}`,
            borderRadius: 16,
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            boxShadow: `0 20px 60px -10px ${isDark ? "rgba(0,0,0,0.6)" : "rgba(15,23,42,0.18)"}`,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)",
            pointerEvents: open ? "auto" : "none",
            transition: "opacity 0.22s ease, transform 0.22s ease",
            transformOrigin: "top right",
            zIndex: 49,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", padding: 10, gap: 2 }}>
            {/* Nav links */}
            {NAV.map(item => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{
                    position: "relative",
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 11,
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    letterSpacing: "-0.01em",
                    color: active ? t.text : t.textSub,
                    background: active
                      ? (isDark ? "rgba(129,140,248,0.10)" : "rgba(99,102,241,0.08)")
                      : "transparent",
                    textDecoration: "none",
                    fontFamily: "Inter, system-ui, sans-serif",
                    transition: "color 0.18s, background 0.18s",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div style={{ height: 1, background: t.sep, margin: "8px 6px" }} />

            {/* GitHub row */}
            <a
              href="https://github.com/WasayWithCode"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px", borderRadius: 11,
                color: t.textSub, textDecoration: "none",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 14, fontWeight: 500,
                transition: "background 0.18s, color 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.text;
                e.currentTarget.style.background = isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(99,102,241,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.textSub;
                e.currentTarget.style.background = "transparent";
              }}
            >
              <GHIcon /> GitHub
            </a>

            {/* CV */}
            <div style={{ padding: "4px 6px 8px" }}>
              <a
                href="/Abdul-Wasay-CV.pdf"
                download
                onClick={() => setOpen(false)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  width: "100%", justifyContent: "center",
                  height: 40, padding: "0 16px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
                  color: "#fff", fontSize: 13.5, fontWeight: 600,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  fontFamily: "Inter, system-ui, sans-serif",
                  boxShadow: "0 2px 12px rgba(99, 102, 241, 0.35)",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                <DlIcon /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
