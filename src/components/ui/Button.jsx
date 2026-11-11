const VARIANTS = {
  primary: "bg-ink text-bg hover:opacity-90",
  ghost: "bg-white/5 text-ink hover:bg-white/10 border border-border",
  subtle: "bg-transparent text-muted hover:text-ink",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  title,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
