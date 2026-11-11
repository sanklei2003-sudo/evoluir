import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppData } from "../../context/AppDataContext";
import { formatDateShortPt, lastNDaysISO } from "../../lib/date";
import Card from "../ui/Card";

const SERIES = [
  { key: "disposicao", name: "Disposição", color: "var(--color-pattern-2)" },
  { key: "concentracao", name: "Concentração", color: "var(--color-skill)" },
  { key: "produtividade", name: "Produtividade", color: "var(--color-decision)" },
];

export default function TrendChart({ days = 14 }) {
  const { checkins } = useAppData();
  const range = lastNDaysISO(days);
  const data = range.map((date) => {
    const c = checkins.find((k) => k.date === date);
    return {
      label: formatDateShortPt(date),
      disposicao: c?.disposicao ?? null,
      concentracao: c?.concentracao ?? null,
      produtividade: c?.produtividade ?? null,
    };
  });

  const hasAny = data.some((d) => d.disposicao || d.concentracao || d.produtividade);

  return (
    <Card>
      <p className="font-display font-semibold text-ink mb-4">Últimos {days} dias</p>
      {!hasAny ? (
        <p className="text-sm text-muted py-10 text-center">
          Faça seu primeiro check-in para ver o gráfico aparecer aqui.
        </p>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="var(--color-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="var(--color-muted)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={24}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: "var(--color-ink)" }}
              />
              {SERIES.map((s) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: s.color, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="flex gap-4 mt-3 justify-center flex-wrap">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-muted">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            {s.name}
          </div>
        ))}
      </div>
    </Card>
  );
}
