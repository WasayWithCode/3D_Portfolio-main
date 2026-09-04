/**
 * ThemeContext — single source of truth for dark/light mode.
 *
 * Usage:
 *   const { theme, toggle, isDark, t } = useTheme();
 *
 * `t` is a token object; use t.bg, t.text, t.card etc. in inline styles.
 * CSS classes (.card, .btn-primary, etc.) pick up values via CSS variables
 * defined in index.css — they update automatically when data-theme changes.
 */
import { createContext, useContext, useEffect, useState } from "react";

/* ── Dark theme tokens ──────────────────────────────────── */
export const DARK = {
  /* backgrounds */
  bg:          "#070A12",
  bgPage:      "#0B1020",
  bgCard:      "#111827",
  bgCard2:     "#0F172A",
  bgInput:     "#1E293B",
  bgNav:       "rgba(7, 10, 18, 0.85)",
  bgDrawer:    "rgba(11, 16, 32, 0.97)",
  /* text */
  text:        "#FFFFFF",
  textSub:     "#94A3B8",
  textMuted:   "#64748B",
  textFaint:   "#475569",
  textVFaint:  "#334155",
  textAccent:  "#C7D2FE",
  /* accent */
  accent:      "#818CF8",
  accentDark:  "#6366F1",
  accentLight: "#A5B4FC",
  /* borders / separators */
  border:      "rgba(148, 163, 184, 0.10)",
  borderHover: "rgba(148, 163, 184, 0.18)",
  borderAcc:  "rgba(129, 140, 248, 0.25)",
  sep:         "rgba(148, 163, 184, 0.08)",
  /* misc */
  shadow:      "rgba(0, 0, 0, 0.5)",
  scrollThumb: "#334155",
  footerText:  "#475569",
  footerSpan:  "#64748B",
};

/* ── Light theme tokens ─────────────────────────────────── */
export const LIGHT = {
  bg:          "#F8FAFC",
  bgPage:      "#F1F5F9",
  bgCard:      "#FFFFFF",
  bgCard2:     "#F1F5F9",
  bgInput:     "#FFFFFF",
  bgNav:       "rgba(248, 250, 252, 0.92)",
  bgDrawer:    "rgba(255, 255, 255, 0.98)",
  text:        "#111827",
  textSub:     "#64748B",
  textMuted:   "#475569",
  textFaint:   "#94A3B8",
  textVFaint:  "#CBD5E1",
  textAccent:  "#3730A3",
  accent:      "#6366F1",
  accentDark:  "#4F46E5",
  accentLight: "#818CF8",
  border:      "#E2E8F0",
  borderHover: "#CBD5E1",
  borderAcc:  "rgba(99, 102, 241, 0.28)",
  sep:         "#E2E8F0",
  shadow:      "rgba(15, 23, 42, 0.08)",
  scrollThumb: "#CBD5E1",
  footerText:  "#94A3B8",
  footerSpan:  "#64748B",
};

/* ── Read initial theme ─────────────────────────────────── */
function getInitial() {
  try {
    const s = localStorage.getItem("portfolio-theme");
    if (s === "dark" || s === "light") return s;
  } catch (_) {}
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light" : "dark";
}

const Ctx = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitial);

  /* Apply data-theme to <html> every time theme changes */
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    /* Let color-scheme know for native scrollbars etc. */
    html.style.colorScheme = theme;
  }, [theme]);

  const toggle = () => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("portfolio-theme", next); } catch (_) {}
      return next;
    });
  };

  const isDark = theme === "dark";
  const t = isDark ? DARK : LIGHT;

  return <Ctx.Provider value={{ theme, toggle, isDark, t }}>{children}</Ctx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
