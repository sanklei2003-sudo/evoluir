export default function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-10 px-4">
      {icon && <div className="text-4xl">{icon}</div>}
      <div>
        <p className="font-display font-semibold text-ink">{title}</p>
        {subtitle && <p className="text-sm text-muted mt-1 max-w-xs">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
