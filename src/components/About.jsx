import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const skills = [
  "React.js", "JavaScript (ES6+)", "HTML5", "CSS3",
  "Tailwind CSS", "Git & GitHub", "MongoDB",
  "Responsive Design", "WordPress", "Elementor",
];

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[210px] w-full" tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.6)}
      className="w-full p-[1px] rounded-2xl shadow-card"
      style={{ background: "linear-gradient(135deg,#0ea5e9,#22d3ee)" }}
    >
      <div className="rounded-2xl py-7 px-7 min-h-[185px] flex flex-col justify-center items-center gap-4 card-hover"
           style={{ background: "linear-gradient(145deg,#0a1628,#060f1e)" }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
             style={{ background:"rgba(14,165,233,0.1)", border:"1px solid rgba(56,189,248,0.22)" }}>
          <img src={icon} alt={title} className="w-7 h-7 object-contain" />
        </div>
        <h3 className="text-white text-[15px] font-semibold text-center leading-snug">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
      <div className="section-divider mt-3" />
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-6 text-[#94a3b8] text-[15px] max-w-3xl leading-[32px]"
    >
      Passionate Frontend Developer with skills in{" "}
      <span className="text-white font-semibold">HTML5, CSS3, JavaScript (ES6+)</span>,{" "}
      <span className="text-white font-semibold">React.js</span>, and{" "}
      <span className="text-white font-semibold">Tailwind CSS</span>. I bring
      strong communication and problem-solving abilities to every project, and
      I'm committed to building user-friendly, responsive web applications that
      look great on every device. Currently pursuing a Diploma in Software
      Development at Aptech, Karachi — always learning, always shipping.
    </motion.p>

    {/* Skill badges */}
    <motion.div variants={fadeIn("", "", 0.2, 1)} className="mt-5 flex flex-wrap gap-2">
      {skills.map((skill, i) => (
        <span key={i} className="skill-badge">{skill}</span>
      ))}
    </motion.div>

    {/* Service cards */}
    <div className="mt-14 flex flex-wrap gap-5">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
  </>
);

export default SectionWrapper(About, "about");
