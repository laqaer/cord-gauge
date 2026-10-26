import { BenchMark, markForKicker } from "@/components/marks";

type GuideHeroProps = {
  kicker: string;
  title: string;
  dek: string;
};

export function GuideHero({ kicker, title, dek }: GuideHeroProps) {
  return (
    <header className="guide-hero">
      <div className="guide-hero-copy">
        <p className="kicker">{kicker}</p>
        <h1 className="display">{title}</h1>
        <p className="dek">{dek}</p>
      </div>
      <div className="mark-plate" aria-hidden="true">
        <BenchMark kind={markForKicker(kicker)} />
      </div>
    </header>
  );
}
