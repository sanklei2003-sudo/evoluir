const MIN_TOTAL = 5;
const MIN_GROUP = 3;
const MIN_DIFF = 0.4;

export function computeInsights(checkins) {
  if (checkins.length < MIN_TOTAL) return [];
  const results = [
    ...correlateMetric(checkins, "concentracao", "concentração"),
    ...correlateMetric(checkins, "disposicao", "disposição"),
  ];
  return results;
}

function correlateMetric(checkins, key, label) {
  const withProd = checkins.filter((c) => typeof c.produtividade === "number");
  const high = withProd.filter((c) => c[key] >= 4);
  const low = withProd.filter((c) => c[key] <= 2);
  if (high.length < MIN_GROUP || low.length < MIN_GROUP) return [];

  const avg = (arr) => arr.reduce((sum, c) => sum + c.produtividade, 0) / arr.length;
  const avgHigh = avg(high);
  const avgLow = avg(low);
  const diff = avgHigh - avgLow;
  if (Math.abs(diff) < MIN_DIFF) return [];

  const direction = diff > 0 ? "maior" : "menor";
  return [
    {
      id: key,
      text: `Nos dias em que sua ${label} foi alta, sua produtividade média foi ${avgHigh.toFixed(
        1
      )} — ${direction} do que ${avgLow.toFixed(1)} nos dias de ${label} baixa. Pode ser um padrão, não uma certeza.`,
    },
  ];
}
