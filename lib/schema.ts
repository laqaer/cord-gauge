import { site } from "@/lib/site";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.publisher,
      email: site.email,
      url: site.url,
    },
    inLanguage: "en-US",
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  dateModified?: string;
}) {
  const url = `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: url,
    datePublished: site.updated,
    dateModified: input.dateModified ?? site.updated,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.publisher,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.publisher,
    url: site.url,
    email: site.email,
    description: site.description,
  };
}
