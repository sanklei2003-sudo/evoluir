import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { addDaysISO, todayISO } from "../../lib/date";
import { REVIEW_SHORTCUTS } from "../../data/decisionOptions";

const DEFAULT_REVIEW = addDaysISO(todayISO(), 30);

export default function AddDecisionModal({ open, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [expectation, setExpectation] = useState("");
  const [reviewDate, setReviewDate] = useState(DEFAULT_REVIEW);

  function reset() {
    setTitle("");
    setReasoning("");
    setExpectation("");
    setReviewDate(DEFAULT_REVIEW);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !reviewDate) return;
    onAdd({ title, reasoning, expectation, reviewDate });
    reset();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Nova decisão">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="O que você está decidindo?">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Investir em um curso de inglês"
            className="input"
          />
        </Field>

        <Field label="Por que está tomando essa decisão?">
          <textarea
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            rows={2}
            placeholder="Seus motivos, o contexto..."
            className="input resize-none"
          />
        </Field>

        <Field label="O que você acredita que vai acontecer?">
          <textarea
            value={expectation}
            onChange={(e) => setExpectation(e.target.value)}
            rows={2}
            placeholder="Sua expectativa sobre o resultado"
            className="input resize-none"
          />
        </Field>

        <Field label="Quando revisitar essa decisão?">
          <div className="flex flex-wrap gap-2 mb-2">
            {REVIEW_SHORTCUTS.map((s) => (
              <button
                type="button"
                key={s.label}
                onClick={() => setReviewDate(addDaysISO(todayISO(), s.days))}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:text-ink hover:border-decision/60 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={reviewDate}
            onChange={(e) => setReviewDate(e.target.value)}
            className="input"
          />
        </Field>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            Registrar decisão
          </Button>
        </div>
      </form>
    </Modal>
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
