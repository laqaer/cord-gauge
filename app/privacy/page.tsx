import type { Metadata } from "next";
import { ogImage, twitterWithImage } from "@/lib/metadata";
import { site } from "@/lib/site";

const title = "Privacy policy";
const description =
  "Privacy policy for CordGauge Guide, a content and affiliate extension-cord comparison site.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title,
    description,
    url: "/privacy",
    images: [ogImage],
  },
  twitter: {
    ...twitterWithImage,
    title,
    description,
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-amp-dark">Legal</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Privacy policy
      </h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated {site.updated}.</p>
      <div className="prose-cord mt-8">
        <p>
          CordGauge Guide ({site.domain}) is a content and affiliate comparison site published by{" "}
          {site.publisher}. This policy describes the small amount of information a directory like
          this typically handles. We do not run user accounts.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Server and hosting logs.</strong> Our host (intended: Vercel) and any future
            CDN may record IP address, user agent, referrer, and requested URL to operate the site
            and stop abuse.
          </li>
          <li>
            <strong>Email you send us.</strong> Messages to {site.email} include whatever you
            write. We use that to reply. We do not add you to a newsletter by default.
          </li>
          <li>
            <strong>Optional analytics.</strong> If we later add a privacy-respecting analytics
            tool, this page will name it. None is required to read the guides today.
          </li>
        </ul>

        <h2>Affiliate and advertising technology</h2>
        <p>
          Some product links are Amazon Associates links (tag=laqaer-20). Clicking through to
          Amazon can cause Amazon to set cookies, record that you came from CordGauge Guide, and
          attribute a commission if you buy. Amazon has its own privacy policy. CordGauge Guide
          does not receive your payment card number.
        </p>
        <p>
          <code>ads.txt</code> on this site is a placeholder. We do not run display ads or list
          an AdSense publisher ID. If that changes, this page will name the network.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell a list of CordGauge Guide readers as a product.</li>
          <li>We do not ask for account passwords as a condition of reading.</li>
          <li>We do not knowingly collect information from children under 13.</li>
        </ul>

        <h2>Retention and requests</h2>
        <p>
          Emails are kept as long as needed to handle the thread and basic bookkeeping. Hosting
          logs follow the host’s retention. To ask what we have from an email you sent, write{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Changes</h2>
        <p>
          If the site adds accounts, a newsletter, or display ads, we will update this page and the
          date above.
        </p>
      </div>
    </article>
  );
}
