type CalloutProps = {
  title: string;
  tone?: "steel" | "warn";
  children: React.ReactNode;
};

export function Callout({ title, tone = "steel", children }: CalloutProps) {
  return (
    <aside className={tone === "warn" ? "callout callout-warn motion-arrive" : "callout callout-steel motion-arrive"}>
      <p className="callout-title">{title}</p>
      <div className="callout-body">{children}</div>
    </aside>
  );
}
