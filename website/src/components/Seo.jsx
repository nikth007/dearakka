import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'Dear Akka';
const DEFAULT_DESC =
  "A warm, private women's health companion by Sundaram Medical Foundation, Chennai. Track your cycle, mood and symptoms, get personalised predictions, and ask Akka anything.";

export default function Seo({ title, description, path = '/' }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Understand your body, with a sister who knows`;
  const desc = description || DEFAULT_DESC;
  const url = `https://dearakka.org${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
