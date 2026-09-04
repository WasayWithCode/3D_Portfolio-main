import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ProjectPreview from "./ProjectPreview";

/* ── icons ─────────────────────────────────────────────── */
const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205
             11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04
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

/* ── ProjectCard ────────────────────────────────────────── */
const ProjectCard = ({
  index, slug, name, description, tags,
  screenshot, live_demo_link, source_code_link,
}) => {
  const navigate = useNavigate();

  /* clicking the card body (not a button) → detail page */
  const goToDetail = () => navigate(`/projects/${slug}`);

  /* keep all external-link clicks isolated from the card handler */
  const stop = (e) => e.stopPropagation();

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.12, 0.55)}
      className="w-full sm:w-[345px] lg:w-[360px]"
    >
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.012}
            transitionSpeed={600} className="h-full">
        {/*
          Card shell — onClick navigates to the detail page.
          Individual buttons/links call stop(e) to prevent bubbling.
        */}
        <div
          role="article"
          onClick={goToDetail}
          className="rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
          style={{
            background: "linear-gradient(160deg,#0c1e35 0%,#060f1e 100%)",
            border: "1px solid rgba(56,189,248,0.1)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
            transition: "border-color 0.25s, box-shadow 0.25s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(56,189,248,0.32)";
            e.currentTarget.style.boxShadow   = "0 20px 50px rgba(14,165,233,0.14)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(56,189,248,0.1)";
            e.currentTarget.style.boxShadow   = "0 4px 24px rgba(0,0,0,0.4)";
          }}
        >
          {/* Screenshot — stop propagation so the inner hover-overlay <a> works */}
          <div
            onClick={stop}
            className="flex-shrink-0 overflow-hidden"
            style={{ height: 200, borderRadius: "16px 16px 0 0" }}
          >
            <ProjectPreview screenshot={screenshot} url={live_demo_link} name={name} />
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">

            {/* Title + number badge */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-bold text-[17px] leading-snug
                             hover:text-[#7dd3fc] transition-colors duration-200 flex-1">
                {name}
              </h3>
              <span
                className="text-[10px] font-bold tracking-widest px-2 py-0.5
                           rounded-full flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(14,165,233,0.12)",
                  border: "1px solid rgba(56,189,248,0.25)",
                  color: "#38bdf8",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Description */}
            <p className="text-[#94a3b8] text-[13px] leading-relaxed flex-1">
              {description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {tags.map(tag => (
                <span key={tag.name} className={`tag-pill ${tag.color}`}>
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* CTA row — stop propagation on the whole row so no click reaches card */}
            <div
              className="flex items-center gap-2 pt-3 mt-auto"
              style={{ borderTop: "1px solid rgba(56,189,248,0.08)" }}
              onClick={stop}
            >
              {/* View Case Study → internal navigation */}
              <button
                onClick={() => navigate(`/projects/${slug}`)}
                className="flex items-center justify-center gap-1.5 flex-1 py-2.5 px-3
                           rounded-lg font-semibold text-[12px] text-white
                           transition-all duration-200 hover:opacity-88 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#0ea5e9,#0284c7)",
                  boxShadow: "0 2px 14px rgba(14,165,233,0.28)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Inter,Poppins,sans-serif",
                }}
              >
                View Case Study <ArrowRightIcon />
              </button>

              {/* Live Demo — new tab */}
              <a
                href={live_demo_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} live demo in a new tab`}
                onClick={stop}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3
                           rounded-lg font-semibold text-[12px] text-[#7dd3fc]
                           hover:text-white active:scale-95 transition-all duration-200"
                style={{
                  border: "1px solid rgba(56,189,248,0.28)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = "rgba(56,189,248,0.1)";
                  e.currentTarget.style.borderColor  = "rgba(56,189,248,0.5)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = "transparent";
                  e.currentTarget.style.borderColor  = "rgba(56,189,248,0.28)";
                }}
              >
                <ExternalIcon /> Demo
              </a>

              {/* GitHub — new tab, icon-only */}
              <a
                href={source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name} source code on GitHub`}
                onClick={stop}
                className="flex items-center justify-center p-2.5 rounded-lg
                           text-[#4a6a88] hover:text-[#7dd3fc] active:scale-95
                           transition-all duration-200"
                style={{
                  border: "1px solid rgba(56,189,248,0.18)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = "rgba(56,189,248,0.08)";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,0.35)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = "transparent";
                  e.currentTarget.style.borderColor = "rgba(56,189,248,0.18)";
                }}
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────────────────── */
const Works = () => (
  <>
    {/* anchor that #projects nav-link and View Projects hero button target */}
    <span id="projects" className="hash-span">&nbsp;</span>

    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>My work</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
      <div className="section-divider mt-3" />
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-5 text-[#94a3b8] text-[15px] max-w-2xl leading-[30px]"
    >
      Real projects with live demos and full case-study pages. Click any card
      to read the full breakdown, or hit Demo to see it live.
    </motion.p>

    <div className="mt-12 flex flex-wrap gap-7">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} index={index} {...project} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, "");
