import { useState } from "react";
import { Check, Circle, Plus, Sparkles, Trash2, X } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import ProgressRing from "../ui/ProgressRing";
import { useAppData } from "../../context/AppDataContext";
import { getSkillProgress } from "../../lib/leveling";

export default function SkillDetailModal({ skillId, onClose }) {
  const { skills, toggleChallenge, addChallenge, suggestNextChallenge, removeChallenge, removeSkill } =
    useAppData();
  const [newText, setNewText] = useState("");
  const [adding, setAdding] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const skill = skills.find((s) => s.id === skillId);

  if (!skill) return null;

  const { level, xpIntoLevel, xpForNext, progressPct } = getSkillProgress(skill);
  const pending = skill.challenges.filter((c) => !c.done);
  const done = skill.challenges.filter((c) => c.done);

  function handleAddChallenge(e) {
    e.preventDefault();
    if (!newText.trim()) return;
    addChallenge(skill.id, newText);
    setNewText("");
    setAdding(false);
  }

  function handleDelete() {
    removeSkill(skill.id);
    onClose();
  }

  function handleClose() {
    setAdding(false);
    setConfirmDelete(false);
    onClose();
  }

  return (
    <Modal open={!!skillId} onClose={handleClose} maxWidth="max-w-lg">
      <div className="flex items-center gap-4 mb-5">
        <ProgressRing progress={progressPct} size={72} strokeWidth={5}>
          <span className="text-3xl">{skill.emoji}</span>
        </ProgressRing>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">{skill.name}</h2>
          <p className="text-sm text-muted">
            Nível {level} · {xpIntoLevel}/{xpForNext} XP
          </p>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        {pending.length === 0 && done.length === 0 && (
          <p className="text-sm text-muted py-2">Nenhum desafio ainda.</p>
        )}

        {pending.map((c) => (
          <ChallengeRow
            key={c.id}
            challenge={c}
            onToggle={() => toggleChallenge(skill.id, c.id)}
            onRemove={() => removeChallenge(skill.id, c.id)}
          />
        ))}

        {done.length > 0 && (
          <details className="pt-1" open={pending.length === 0}>
            <summary className="text-xs text-muted cursor-pointer select-none py-1">
              {done.length} concluído{done.length > 1 ? "s" : ""}
            </summary>
            <div className="space-y-1 mt-1">
              {done.map((c) => (
                <ChallengeRow
                  key={c.id}
                  challenge={c}
                  onToggle={() => toggleChallenge(skill.id, c.id)}
                  onRemove={() => removeChallenge(skill.id, c.id)}
                />
              ))}
            </div>
          </details>
        )}
      </div>

      {pending.length === 0 ? (
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => suggestNextChallenge(skill.id)}
        >
          <Sparkles size={16} /> Sugerir próximo desafio
        </Button>
      ) : adding ? (
        <form onSubmit={handleAddChallenge} className="flex gap-2">
          <input
            autoFocus
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Escreva seu próprio desafio"
            className="flex-1 rounded-xl bg-surface-2 border border-border px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-skill"
          />
          <Button type="submit">OK</Button>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-muted hover:text-ink flex items-center gap-1.5"
        >
          <Plus size={14} /> adicionar um desafio seu
        </button>
      )}

      <div className="mt-6 pt-4 border-t border-border flex justify-end">
        {confirmDelete ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Remover esta habilidade?</span>
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
            <Trash2 size={13} /> remover habilidade
          </button>
        )}
      </div>
    </Modal>
  );
}

function ChallengeRow({ challenge, onToggle, onRemove }) {
  return (
    <div className="group flex items-start gap-2.5 rounded-xl px-3 py-2 hover:bg-white/5">
      <button onClick={onToggle} className="mt-0.5 shrink-0">
        {challenge.done ? (
          <Check size={18} className="text-skill" />
        ) : (
          <Circle size={18} className="text-muted" />
        )}
      </button>
      <span className={`text-sm flex-1 ${challenge.done ? "text-muted line-through" : "text-ink"}`}>
        {challenge.text}
      </span>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
