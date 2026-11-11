import { Activity, Home, Scale, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Início", icon: Home },
  { id: "skills", label: "Habilidades", icon: Sparkles },
  { id: "patterns", label: "Padrões", icon: Activity },
  { id: "decisions", label: "Decisões", icon: Scale },
];

export default function Layout({ current, onNavigate, children }) {
  return (
    <div className="min-h-screen bg-aurora flex">
      <aside className="hidden sm:flex flex-col w-60 shrink-0 border-r border-border px-5 py-6 gap-8">
        <div>
          <p className="font-display text-xl font-bold text-ink">Evoluir</p>
          <p className="text-xs text-muted mt-0.5">seu progresso, sem pressão</p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              active={current === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sm:hidden flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="font-display text-lg font-bold text-ink">Evoluir</p>
        </header>

        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 pb-24 sm:pb-8 max-w-5xl w-full mx-auto">
          {children}
        </main>

        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center border-t border-border bg-surface/95 backdrop-blur safe-bottom py-2">
          {NAV_ITEMS.map((item) => (
            <MobileNavButton
              key={item.id}
              item={item}
              active={current === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

function NavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active ? "bg-white/10 text-ink" : "text-muted hover:text-ink hover:bg-white/5"
      }`}
    >
      <Icon size={18} />
      {item.label}
    </button>
  );
}

function MobileNavButton({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
        active ? "text-ink" : "text-muted"
      }`}
    >
      <Icon size={20} />
      {item.label}
    </button>
  );
}
