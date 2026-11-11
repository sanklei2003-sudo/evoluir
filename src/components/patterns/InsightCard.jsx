import { Lightbulb } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { computeInsights } from "../../lib/insights";
import Card from "../ui/Card";

export default function InsightCard() {
  const { checkins } = useAppData();
  const insights = computeInsights(checkins);

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-pattern" />
        <p className="font-display font-semibold text-ink">Possíveis padrões</p>
      </div>
      {insights.length === 0 ? (
        <p className="text-sm text-muted">
          {checkins.length < 5
            ? "Continue fazendo check-ins — com mais alguns dias registrados, podemos começar a notar padrões."
            : "Nada se destacou nos seus dados até agora. Isso também é uma informação."}
        </p>
      ) : (
        <ul className="space-y-2">
          {insights.map((i) => (
            <li key={i.id} className="text-sm text-muted leading-relaxed">
              {i.text}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
