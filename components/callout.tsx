type CalloutProps = {
  title: string;
  tone?: "steel" | "warn";
  children: React.ReactNode;
};

export function Callout({ title, tone = "steel", children }: CalloutProps) {
  const styles =
    tone === "warn"
      ? "border-amp bg-warn-soft text-warn"
      : "border-steel bg-steel-soft text-ink-soft";

  return (
    <aside className={`border-l-4 px-4 py-3 text-sm leading-6 ${styles}`}>
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1">{children}</div>
    </aside>
  );
}
