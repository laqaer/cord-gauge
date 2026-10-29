import type { ReactElement } from "react";
import { JsonLd } from "@/components/json-ld";

export type FaqDraft = {
  readonly question: string;
  readonly answer: string;
};

export type GuideFaq = {
  readonly script: ReactElement;
  readonly answers: ReactElement;
};

export function guideFaq(drafts: readonly FaqDraft[]): GuideFaq {
  const entries = normalizeFaq(drafts);
  return {
    script: <JsonLd data={faqPageDocument(entries)} />,
    answers: faqAnswers(entries),
  };
}

type NormalizedFaqList = readonly [FaqDraft, ...FaqDraft[]];

type AnswerDocument = {
  readonly "@type": "Answer";
  readonly text: string;
};

type QuestionDocument = {
  readonly "@type": "Question";
  readonly name: string;
  readonly acceptedAnswer: AnswerDocument;
};

type FaqPageDocument = {
  readonly "@context": "https://schema.org";
  readonly "@type": "FAQPage";
  readonly mainEntity: readonly QuestionDocument[];
};

function toNormalizedFaq(draft: FaqDraft): FaqDraft {
  const question = draft.question.replace(/\s+/g, " ").trim();
  const answer = draft.answer.replace(/\s+/g, " ").trim();
  if (question === "" || answer === "") {
    throw new Error(`guideFaq draft is empty: ${JSON.stringify(draft)}`);
  }
  if (question.includes("<") || answer.includes("<")) {
    throw new Error(
      `guideFaq draft contains '<'. JSON.stringify does not escape it, so the script tag would break: ${JSON.stringify(draft)}`,
    );
  }
  return { question, answer };
}

function normalizeFaq(drafts: readonly FaqDraft[]): NormalizedFaqList {
  const [first, ...rest] = drafts;
  if (first === undefined) {
    throw new Error("guideFaq needs at least one question.");
  }
  const head = toNormalizedFaq(first);
  const tail = rest.map(toNormalizedFaq);
  const seen = new Set<string>();
  for (const entry of [head, ...tail]) {
    if (seen.has(entry.question)) {
      throw new Error(`guideFaq repeated question: ${entry.question}`);
    }
    seen.add(entry.question);
  }
  return [head, ...tail];
}

function faqPageDocument(entries: NormalizedFaqList): FaqPageDocument {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

function faqAnswers(entries: NormalizedFaqList): ReactElement {
  return (
    <>
      <h2>Questions</h2>
      {entries.map((entry) => (
        <section key={entry.question}>
          <h3>{entry.question}</h3>
          <p>{entry.answer}</p>
        </section>
      ))}
    </>
  );
}
