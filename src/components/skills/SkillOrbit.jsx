import { orbitPositions } from "../../lib/orbit";
import SkillNode from "./SkillNode";

export default function SkillOrbit({ skills, onSelect }) {
  const positions = orbitPositions(skills.length);

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto my-4">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {positions.map((p, i) => (
          <line
            key={skills[i].id}
            x1={50}
            y1={50}
            x2={p.x}
            y2={p.y}
            stroke="var(--color-border)"
            strokeWidth="0.6"
          />
        ))}
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center w-20 h-20 rounded-full -translate-x-1/2 -translate-y-1/2 border border-border bg-surface-2 text-center"
        style={{ left: "50%", top: "50%" }}
      >
        <span className="text-lg font-display font-bold text-ink">{skills.length}</span>
        <span className="text-[10px] text-muted">habilidades</span>
      </div>

      {positions.map((p, i) => (
        <SkillNode
          key={skills[i].id}
          skill={skills[i]}
          delay={i * 0.04}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          onClick={() => onSelect(skills[i])}
        />
      ))}
    </div>
  );
}
