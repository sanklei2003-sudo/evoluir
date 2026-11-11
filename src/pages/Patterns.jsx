import CheckInCard from "../components/patterns/CheckInCard";
import TrendChart from "../components/patterns/TrendChart";
import InsightCard from "../components/patterns/InsightCard";

export default function Patterns() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gradient-pattern">Padrões</h1>
        <p className="text-sm text-muted mt-1">Entenda o que influencia seus dias.</p>
      </div>

      <div className="space-y-5">
        <CheckInCard />
        <TrendChart />
        <InsightCard />
      </div>
    </div>
  );
}
