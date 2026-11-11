import { motion } from "framer-motion";
import ProgressRing from "../ui/ProgressRing";
import { getSkillProgress } from "../../lib/leveling";

export default function SkillNode({ skill, onClick, style, delay = 0 }) {
  const { level, progressPct } = getSkillProgress(skill);

  return (
    <motion.button
      onClick={onClick}
      style={style}
      className="absolute flex flex-col items-center gap-1.5 w-20 -translate-x-1/2 -translate-y-1/2 group"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
    >
      <ProgressRing progress={progressPct} size={60} strokeWidth={4}>
        <span className="text-2xl">{skill.emoji}</span>
      </ProgressRing>
      <span className="text-[11px] font-semibold text-ink leading-tight text-center line-clamp-1">
        {skill.name}
      </span>
      <span className="text-[10px] text-muted">nível {level}</span>
    </motion.button>
  );
}
