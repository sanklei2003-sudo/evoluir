import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { SKILL_EMOJIS, SKILL_SUGGESTIONS, guessEmoji } from "../../data/skillPresets";

export default function AddSkillModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(SKILL_EMOJIS[0]);

  function reset() {
    setName("");
    setEmoji(SKILL_EMOJIS[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), emoji);
    reset();
    onClose();
  }

  function pickSuggestion(s) {
    setName(s.name);
    setEmoji(s.emoji);
  }

  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} title="Nova habilidade">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-muted block mb-2">Sugestões rápidas</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_SUGGESTIONS.map((s) => (
              <button
                type="button"
                key={s.name}
                onClick={() => pickSuggestion(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:text-ink hover:border-skill/60 transition-colors"
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm text-muted block mb-2">Nome da habilidade</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value && emoji === SKILL_EMOJIS[0]) setEmoji(guessEmoji(e.target.value));
            }}
            placeholder="Ex: Oratória"
            className="w-full rounded-xl bg-surface-2 border border-border px-4 py-2.5 text-ink placeholder:text-muted focus:outline-none focus:border-skill"
          />
        </div>

        <div>
          <label className="text-sm text-muted block mb-2">Ícone</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_EMOJIS.map((e) => (
              <button
                type="button"
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-colors ${
                  emoji === e ? "border-skill bg-skill/15" : "border-border hover:border-skill/50"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted">
          Vamos sugerir 3 pequenos desafios iniciais para começar — sem exageros.
        </p>

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" type="button" onClick={() => { reset(); onClose(); }}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Criar habilidade
          </Button>
        </div>
      </form>
    </Modal>
  );
}
