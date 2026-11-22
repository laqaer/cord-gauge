import { lastReviewedLabel } from "@/lib/site";

type GuideHeroProps = {
  kicker: string;
  title: string;
  dek: string;
};

export function GuideHero({ kicker, title, dek }: GuideHeroProps) {
  return (
    <header className="guide-hero">
      <p className="kicker">{kicker}</p>
      <h1 className="display">{title}</h1>
      <p className="dek">{dek}</p>
      <p className="kicker mt-4">{`Last reviewed: ${lastReviewedLabel}`}</p>
    </header>
  );
}
