import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const metrics = [
  {
    value: "25%",
    label: "Page Load Improvement",
    desc:  "Faster load via SEO best practices & performance optimisation.",
    color: "from-[#0ea5e9] to-[#22d3ee]",
  },
  {
    value: "95%",
    label: "Mobile Device Coverage",
    desc:  "Responsive UI compatible across virtually all devices.",
    color: "from-[#10b981] to-[#34d399]",
  },
  {
    value: "30%",
    label: "User Engagement Boost",
    desc:  "User-friendly web apps driving measurable engagement.",
    color: "from-[#6366f1] to-[#a5b4fc]",
  },
  {
    value: "40%",
    label: "UI Error Reduction",
    desc:  "Efficient debugging & problem-solving cutting UI issues.",
    color: "from-[#f59e0b] to-[#fcd34d]",
  },
];

const MetricCard = ({ value, label, desc, color, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.6)}
    className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-3 card-hover xs:w-[210px] w-full"
    style={{ background: "linear-gradient(145deg,rgba(10,22,40,0.92),rgba(4,11,23,0.96))" }}
  >
    <p
      className={`text-[48px] font-black leading-none bg-gradient-to-r ${color} bg-clip-text`}
      style={{ WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}
    >
      {value}
    </p>
    <p className="text-white font-semibold text-[14px] leading-snug">{label}</p>
    <div className={`w-8 h-[2px] rounded bg-gradient-to-r ${color} opacity-60`} />
    <p className="text-[#64748b] text-[12px] leading-relaxed">{desc}</p>
  </motion.div>
);

const Feedbacks = () => (
  <div className="mt-12 rounded-2xl overflow-hidden"
       style={{ background:"linear-gradient(145deg,#060f1e,#040b17)" }}>
    {/* Header */}
    <div className="rounded-2xl px-8 py-10 relative overflow-hidden"
         style={{ background:"linear-gradient(135deg,#0a1a2e 0%,#060f1e 100%)" }}>
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full pointer-events-none opacity-15"
           style={{ background:"radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />

      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I've accomplished</p>
        <h2 className={styles.sectionHeadText}>Key Achievements.</h2>
        <div className="section-divider mt-3" />
      </motion.div>

      <motion.p
        variants={fadeIn("","",0.1,1)}
        className="mt-4 text-[#64748b] text-[14px] max-w-xl leading-relaxed"
      >
        Measurable results from real frontend projects — performance, quality,
        and user experience improvements.
      </motion.p>
    </div>

    {/* Cards */}
    <div className="px-8 pb-12 -mt-6 flex flex-wrap gap-5">
      {metrics.map((m, i) => <MetricCard key={m.label} {...m} index={i} />)}
    </div>
  </div>
);

export default SectionWrapper(Feedbacks, "");
