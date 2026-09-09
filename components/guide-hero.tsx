type GuideHeroProps = {
  kicker: string;
  title: string;
  dek: string;
};

export function GuideHero({ kicker, title, dek }: GuideHeroProps) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-amp-dark">
        {kicker}
      </p>
      <h1 className="mt-2 text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-ink-soft">{dek}</p>
    </header>
  );
}
