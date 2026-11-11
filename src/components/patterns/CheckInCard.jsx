import { useState } from "react";
import { Check, Pencil } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { todayISO } from "../../lib/date";
import ScalePicker from "../ui/ScalePicker";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function CheckInCard() {
  const { getCheckin, upsertCheckin } = useAppData();
  const today = todayISO();
  const existing = getCheckin(today);

  const [editing, setEditing] = useState(!existing);
  const [disposicao, setDisposicao] = useState(existing?.disposicao ?? null);
  const [concentracao, setConcentracao] = useState(existing?.concentracao ?? null);
  const [produtividade, setProdutividade] = useState(existing?.produtividade ?? null);
  const [nota, setNota] = useState(existing?.nota ?? "");

  const canSave = disposicao && concentracao && produtividade;

  function handleSave() {
    upsertCheckin({ date: today, disposicao, concentracao, produtividade, nota });
    setEditing(false);
  }

  function handleEdit() {
    setDisposicao(existing?.disposicao ?? null);
    setConcentracao(existing?.concentracao ?? null);
    setProdutividade(existing?.produtividade ?? null);
    setNota(existing?.nota ?? "");
    setEditing(true);
  }

  if (!editing && existing) {
    return (
      <Card className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-pattern/15 flex items-center justify-center text-pattern shrink-0">
            <Check size={18} />
          </div>
          <div>
            <p className="text-sm font-medium text-ink">Check-in de hoje registrado</p>
            <p className="text-xs text-muted">
              Disposição {existing.disposicao} · Concentração {existing.concentracao} · Produtividade{" "}
              {existing.produtividade}
            </p>
          </div>
        </div>
        <button onClick={handleEdit} className="text-muted hover:text-ink shrink-0">
          <Pencil size={16} />
        </button>
      </Card>
    );
  }

  return (
    <Card>
      <p className="font-display font-semibold text-ink mb-1">Check-in de hoje</p>
      <p className="text-xs text-muted mb-4">Leva menos de um minuto.</p>
      <div className="space-y-4">
        <ScalePicker
          label="Disposição"
          value={disposicao}
          onChange={setDisposicao}
          lowLabel="Exausto"
          highLabel="Energizado"
        />
        <ScalePicker
          label="Concentração"
          value={concentracao}
          onChange={setConcentracao}
          lowLabel="Dispersa"
          highLabel="Afiada"
        />
        <ScalePicker
          label="Produtividade"
          value={produtividade}
          onChange={setProdutividade}
          lowLabel="Baixa"
          highLabel="Alta"
        />
        <div>
          <label className="text-sm font-medium text-ink block mb-2">Observação (opcional)</label>
          <input
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Algo rápido sobre o seu dia..."
            maxLength={140}
            className="w-full rounded-xl bg-surface-2 border border-border px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-pattern"
          />
        </div>
        <div className="flex justify-end gap-2">
          {existing && <Button variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>}
          <Button disabled={!canSave} onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </div>
    </Card>
  );
}
