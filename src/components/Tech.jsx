import React from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";

const Tech = () => (
  <>
    <motion.div variants={textVariant()} className="text-center mb-12">
      <p className={styles.sectionSubText}>What I work with</p>
      <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      <div className="section-divider mx-auto mt-3" />
    </motion.div>

    <motion.div
      variants={fadeIn("", "", 0.1, 1)}
      className="flex flex-row flex-wrap justify-center gap-x-8 gap-y-10"
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full transition-all duration-300
                            bg-[rgba(14,165,233,0.06)] group-hover:bg-[rgba(14,165,233,0.14)]
                            group-hover:shadow-[0_0_18px_rgba(56,189,248,0.2)]" />
            <BallCanvas icon={tech.icon} />
          </div>
          <span className="text-[11px] text-[#64748b] group-hover:text-[#7dd3fc]
                           transition-colors duration-200 font-medium tracking-wide text-center">
            {tech.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </>
);

export default SectionWrapper(Tech, "tech");
