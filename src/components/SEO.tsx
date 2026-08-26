import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  schema?: Record<string, any>;
}

export function SEO({ title, description, url = 'https://aimlpartner.com', schema }: SEOProps) {
  const fullTitle = `${title} | AIMLPartner`;
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIMLPartner",
    "url": "https://aimlpartner.com",
    "description": "Enterprise AI engineering and custom automation solutions based in Bedminster, NJ.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bedminster",
      "addressRegion": "NJ",
      "addressCountry": "US"
    }
  };

  const schemaToUse = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AIMLPartner" />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToUse)}
      </script>
    </Helmet>
  );
}
