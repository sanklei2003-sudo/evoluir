export const OUTCOME_OPTIONS = [
  { value: "acerto", label: "Acertei", emoji: "✅" },
  { value: "parcial", label: "Parcial", emoji: "➗" },
  { value: "erro", label: "Errei", emoji: "❌" },
];

export function outcomeMeta(value) {
  return OUTCOME_OPTIONS.find((o) => o.value === value) ?? null;
}

export const REVIEW_SHORTCUTS = [
  { label: "1 semana", days: 7 },
  { label: "1 mês", days: 30 },
  { label: "3 meses", days: 90 },
];
