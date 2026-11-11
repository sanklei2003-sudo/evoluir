import { useState } from "react";
import { Trash2 } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useAppData } from "../../context/AppDataContext";
import { formatDatePt } from "../../lib/date";
import { OUTCOME_OPTIONS, outcomeMeta } from "../../data/decisionOptions";

export default function DecisionModal({ decisionId, onClose }) {
  const { decisions, reviewDecision, removeDecision } = useAppData();
  const decision = decisions.find((d) => d.id === decisionId);

  const [actualOutcome, setActualOutcome] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);
  const [learning, setLearning] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!decision) return null;

  const reviewed = decision.status === "reviewed";

  function handleClose() {
    setActualOutcome("");
    setComparisonResult(null);
    setLearning("");
    setConfirmDelete(false);
    onClose();
  }

  function handleReview(e) {
    e.preventDefault();
    if (!actualOutcome.trim() || !comparisonResult) return;
    reviewDecision(decision.id, { actualOutcome, comparisonResult, learning });
    handleClose();
  }

  function handleDelete() {
    removeDecision(decision.id);
    handleClose();
  }

  return (
    <Modal open={!!decisionId} onClose={handleClose} maxWidth="max-w-lg">
      <h2 className="font-display text-lg font-semibold text-ink mb-4">{decision.title}</h2>

      <div className="space-y-3 mb-5 text-sm">
        <Recap label="Motivo" value={decision.reasoning} />
        <Recap label="Expectativa" value={decision.expectation} />
        <Recap
          label={reviewed ? "Revisada em" : "Data de revisão"}
          value={formatDatePt(reviewed ? decision.reviewedAt : decision.reviewDate)}
        />
      </div>

      {reviewed ? (
        <div className="space-y-3 text-sm border-t border-border pt-4">
          <Recap label="O que realmente aconteceu" value={decision.actualOutcome} />
          <div className="flex items-center gap-2">
            <span className="text-muted">Resultado:</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-ink text-xs">
              {outcomeMeta(decision.comparisonResult)?.emoji} {outcomeMeta(decision.comparisonResult)?.label}
            </span>
          </div>
          {decision.learning && <Recap label="Aprendizado" value={decision.learning} />}
        </div>
      ) : (
        <form onSubmit={handleReview} className="space-y-4 border-t border-border pt-4">
          <Field label="O que realmente aconteceu?">
            <textarea
              autoFocus
              value={actualOutcome}
              onChange={(e) => setActualOutcome(e.target.value)}
              rows={2}
              placeholder="Compare com o que você esperava..."
              className="input resize-none"
            />
          </Field>

          <Field label="Como você avalia essa decisão?">
            <div className="flex gap-2">
              {OUTCOME_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.value}
                  onClick={() => setComparisonResult(o.value)}
                  className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                    comparisonResult === o.value
                      ? "border-decision bg-decision/15 text-ink"
                      : "border-border text-muted hover:text-ink"
                  }`}
                >
                  {o.emoji} {o.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="O que você aprende com isso? (opcional)">
            <textarea
              value={learning}
              onChange={(e) => setLearning(e.target.value)}
              rows={2}
              placeholder="Uma lição para a próxima decisão parecida"
              className="input resize-none"
            />
          </Field>

          <div className="flex justify-end">
            <Button type="submit" disabled={!actualOutcome.trim() || !comparisonResult}>
              Salvar revisão
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 pt-4 border-t border-border flex justify-end">
        {confirmDelete ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Remover esta decisão?</span>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
              Cancelar
            </Button>
            <Button variant="ghost" className="text-red-400" onClick={handleDelete}>
              Remover
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-xs text-muted hover:text-red-400 flex items-center gap-1"
          >
            <Trash2 size={13} /> remover decisão
          </button>
        )}
      </div>
    </Modal>
  );
}

function Recap({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-ink mt-0.5">{value}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-muted block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
