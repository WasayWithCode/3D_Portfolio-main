/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        /* ── base ── */
        primary:   "#0a0a0f",   /* near-black background              */
        surface:   "#111118",   /* card / panel surface               */
        "surface2":"#18181f",   /* elevated surface                   */
        border:    "rgba(255,255,255,0.08)",
        /* ── text ── */
        "text-primary":  "#f0f0ec",  /* near-white                   */
        "text-secondary":"#8a8a9a",  /* muted body                   */
        "text-tertiary": "#4a4a5a",  /* placeholders / faint labels  */
        /* ── accent – indigo/violet (softer than cyan) ── */
        accent:        "#818cf8",   /* indigo-400                     */
        "accent-dark": "#6366f1",   /* indigo-500                     */
        "accent-light":"#a5b4fc",   /* indigo-300                     */
        "accent-dim":  "#312e81",   /* indigo-900 for tinted surfaces */
        /* ── status ── */
        success: "#34d399",
        error:   "#f87171",
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "card":  "0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)",
        "card-lg":"0 4px 24px rgba(0,0,0,0.5)",
        "inset": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      screens: { xs: "450px" },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
