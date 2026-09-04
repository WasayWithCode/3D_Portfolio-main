import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "linear-gradient(145deg,#0a1a2e,#060f1e)",
      color: "#fff",
      borderRadius: "14px",
      border: "1px solid rgba(56,189,248,0.12)",
      boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
      padding: "26px 30px",
    }}
    contentArrowStyle={{ borderRight: "7px solid #0a1a2e" }}
    date={
      <span className="text-[#38bdf8] font-semibold text-[13px] tracking-wide">
        {experience.date}
      </span>
    }
    iconStyle={{
      background: experience.iconBg,
      boxShadow: "0 0 0 4px #0ea5e9, 0 0 18px rgba(14,165,233,0.35)",
    }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img src={experience.icon} alt={experience.company_name}
             className="w-[55%] h-[55%] object-contain" />
      </div>
    }
  >
    <div className="flex flex-col gap-1">
      <h3 className="text-white text-[19px] font-bold leading-tight">{experience.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
        <p className="text-[#38bdf8] text-[13px] font-semibold tracking-wide">{experience.company_name}</p>
      </div>
    </div>
    <ul className="mt-4 space-y-2.5">
      {experience.points.map((point, i) => (
        <li key={i} className="text-[#94a3b8] text-[13px] leading-relaxed flex gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0ea5e9] flex-shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>Education &amp; Background</p>
      <h2 className={`${styles.sectionHeadText} text-center`}>My Journey.</h2>
      <div className="section-divider mx-auto mt-3" />
    </motion.div>

    <div className="mt-16">
      <VerticalTimeline lineColor="rgba(14,165,233,0.25)">
        {experiences.map((exp, i) => (
          <ExperienceCard key={`exp-${i}`} experience={exp} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "work");
