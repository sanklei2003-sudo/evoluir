export default function ScalePicker({ label, value, onChange, lowLabel = "Baixo", highLabel = "Alto" }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-ink">{label}</span>
        {value && <span className="text-xs text-pattern font-semibold">{value}/5</span>}
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${label}: ${n} de 5`}
            className={`flex-1 h-10 rounded-xl border text-sm font-semibold transition-all ${
              value === n
                ? "border-transparent bg-gradient-to-br from-pattern to-pattern-2 text-bg scale-105"
                : "border-border text-muted hover:text-ink hover:border-pattern/50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1 text-[11px] text-muted">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
