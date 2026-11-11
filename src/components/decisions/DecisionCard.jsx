import { Clock } from "lucide-react";
import Card from "../ui/Card";
import { daysUntil } from "../../lib/date";
import { outcomeMeta } from "../../data/decisionOptions";

export default function DecisionCard({ decision, onClick }) {
  const outcome = outcomeMeta(decision.comparisonResult);

  return (
    <Card
      as="button"
      onClick={onClick}
      className="w-full text-left hover:border-decision/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-ink truncate">{decision.title}</p>
          {decision.expectation && (
            <p className="text-sm text-muted mt-1 line-clamp-2">{decision.expectation}</p>
          )}
        </div>
        {outcome ? (
          <span className="text-xs shrink-0 px-2.5 py-1 rounded-full bg-white/5 text-ink">
            {outcome.emoji} {outcome.label}
          </span>
        ) : (
          <StatusBadge reviewDate={decision.reviewDate} />
        )}
      </div>
    </Card>
  );
}

function StatusBadge({ reviewDate }) {
  const diff = daysUntil(reviewDate);
  let text = `revisar em ${diff} dia${diff === 1 ? "" : "s"}`;
  let tone = "text-muted";
  if (diff === 0) {
    text = "revisar hoje";
    tone = "text-decision";
  } else if (diff < 0) {
    text = `atrasada ${Math.abs(diff)} dia${Math.abs(diff) === 1 ? "" : "s"}`;
    tone = "text-decision";
  }
  return (
    <span className={`text-xs shrink-0 flex items-center gap-1 ${tone}`}>
      <Clock size={12} />
      {text}
    </span>
  );
}
