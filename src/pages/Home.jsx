import { useMemo } from "react";
import { Plus } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import { getSkillProgress } from "../lib/leveling";
import { daysUntil, formatDatePt } from "../lib/date";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProgressRing from "../components/ui/ProgressRing";
import CheckInCard from "../components/patterns/CheckInCard";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Home({ onNavigate }) {
  const { skills, decisions } = useAppData();

  const topSkills = useMemo(
    () =>
      [...skills]
        .sort((a, b) => getSkillProgress(b).xp - getSkillProgress(a).xp)
        .slice(0, 6),
    [skills]
  );

  const dueDecisions = useMemo(
    () =>
      decisions
        .filter((d) => d.status === "pending" && daysUntil(d.reviewDate) <= 0)
        .sort((a, b) => a.reviewDate.localeCompare(b.reviewDate)),
    [decisions]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{greeting()}</h1>
        <p className="text-sm text-muted mt-1">
          {formatDatePt(new Date().toISOString().slice(0, 10))}
        </p>
      </div>

      <CheckInCard />

      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="font-display font-semibold text-gradient-skill">Habilidades</p>
          <button onClick={() => onNavigate("skills")} className="text-xs text-muted hover:text-ink">
            ver todas →
          </button>
        </div>

        {topSkills.length === 0 ? (
          <EmptyRow
            text="Nenhuma habilidade cadastrada ainda."
            actionLabel="Criar habilidade"
            onAction={() => onNavigate("skills")}
          />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-1 -mx-1 px-1">
            {topSkills.map((s) => {
              const { level, progressPct } = getSkillProgress(s);
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate("skills")}
                  className="flex flex-col items-center gap-1.5 shrink-0 w-16"
                >
                  <ProgressRing progress={progressPct} size={52} strokeWidth={4}>
                    <span className="text-xl">{s.emoji}</span>
                  </ProgressRing>
                  <span className="text-[11px] text-ink text-center line-clamp-1">{s.name}</span>
                  <span className="text-[10px] text-muted">nível {level}</span>
                </button>
              );
            })}
          </div>
        )}
      </Card>

      <Card>
        <p className="font-display font-semibold text-gradient-decision mb-4">
          Decisões para revisar
        </p>
        {dueDecisions.length === 0 ? (
          <EmptyRow text="Nenhuma decisão esperando revisão agora. Tudo em dia." />
        ) : (
          <div className="space-y-2">
            {dueDecisions.slice(0, 3).map((d) => (
              <button
                key={d.id}
                onClick={() => onNavigate("decisions")}
                className="w-full text-left rounded-xl px-3 py-2.5 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p className="text-sm font-medium text-ink truncate">{d.title}</p>
                <p className="text-xs text-decision mt-0.5">
                  {daysUntil(d.reviewDate) === 0
                    ? "revisar hoje"
                    : `atrasada ${Math.abs(daysUntil(d.reviewDate))} dia(s)`}
                </p>
              </button>
            ))}
            {dueDecisions.length > 3 && (
              <button
                onClick={() => onNavigate("decisions")}
                className="text-xs text-muted hover:text-ink"
              >
                +{dueDecisions.length - 3} outras
              </button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

function EmptyRow({ text, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-muted">{text}</p>
      {actionLabel && (
        <Button variant="ghost" onClick={onAction}>
          <Plus size={14} /> {actionLabel}
        </Button>
      )}
    </div>
  );
}
