import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import DecisionCard from "../components/decisions/DecisionCard";
import AddDecisionModal from "../components/decisions/AddDecisionModal";
import DecisionModal from "../components/decisions/DecisionModal";
import { OUTCOME_OPTIONS } from "../data/decisionOptions";

export default function Decisions() {
  const { decisions, addDecision } = useAppData();
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const pending = useMemo(
    () =>
      decisions
        .filter((d) => d.status === "pending")
        .sort((a, b) => a.reviewDate.localeCompare(b.reviewDate)),
    [decisions]
  );
  const reviewed = useMemo(
    () =>
      decisions
        .filter((d) => d.status === "reviewed")
        .sort((a, b) => (b.reviewedAt ?? "").localeCompare(a.reviewedAt ?? "")),
    [decisions]
  );

  const counts = useMemo(() => {
    const base = { acerto: 0, parcial: 0, erro: 0 };
    reviewed.forEach((d) => {
      if (base[d.comparisonResult] !== undefined) base[d.comparisonResult] += 1;
    });
    return base;
  }, [reviewed]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gradient-decision">Decisões</h1>
          <p className="text-sm text-muted mt-1">Aprenda com suas próprias escolhas.</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Nova
        </Button>
      </div>

      {decisions.length === 0 ? (
        <EmptyState
          icon="⚖️"
          title="Nenhuma decisão registrada"
          subtitle="Registre uma decisão importante, sua expectativa, e uma data para revisitá-la."
          action={
            <Button onClick={() => setAddOpen(true)}>
              <Plus size={16} /> Registrar a primeira
            </Button>
          }
        />
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-muted mb-3">Para revisar</h2>
              <div className="space-y-3">
                {pending.map((d) => (
                  <DecisionCard key={d.id} decision={d} onClick={() => setSelectedId(d.id)} />
                ))}
              </div>
            </section>
          )}

          {reviewed.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted">Histórico</h2>
                <div className="flex gap-3 text-xs text-muted">
                  {OUTCOME_OPTIONS.map((o) => (
                    <span key={o.value}>
                      {o.emoji} {counts[o.value]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {reviewed.map((d) => (
                  <DecisionCard key={d.id} decision={d} onClick={() => setSelectedId(d.id)} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <AddDecisionModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addDecision} />
      <DecisionModal key={selectedId} decisionId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
}
