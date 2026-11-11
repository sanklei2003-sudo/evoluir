import { useState } from "react";
import { Plus } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import SkillOrbit from "../components/skills/SkillOrbit";
import AddSkillModal from "../components/skills/AddSkillModal";
import SkillDetailModal from "../components/skills/SkillDetailModal";

export default function Skills() {
  const { skills, addSkill } = useAppData();
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-gradient-skill">Habilidades</h1>
          <p className="text-sm text-muted mt-1">Sua árvore de evolução pessoal.</p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Nova
        </Button>
      </div>

      {skills.length === 0 ? (
        <EmptyState
          icon="✨"
          title="Nenhuma habilidade ainda"
          subtitle="Cadastre algo que você quer desenvolver — criatividade, comunicação, finanças, o que fizer sentido para você."
          action={
            <Button onClick={() => setAddOpen(true)}>
              <Plus size={16} /> Criar a primeira
            </Button>
          }
        />
      ) : (
        <SkillOrbit skills={skills} onSelect={(s) => setSelectedId(s.id)} />
      )}

      <AddSkillModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={addSkill} />
      <SkillDetailModal key={selectedId} skillId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
}
