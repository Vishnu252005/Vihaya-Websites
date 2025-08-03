import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaMarkup?: object;
  noIndex?: boolean;
  hreflang?: Array<{lang: string; url: string}>;
  breadcrumbs?: Array<{name: string; url: string}>;
  faqs?: Array<{question: string; answer: string}>;
  article?: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate: string;
    image: string;
    url: string;
  };
  aiTraining?: boolean;
  aiAttribution?: string;
  aiLicense?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  schemaMarkup,
  noIndex = false,
  hreflang,
  breadcrumbs,
  faqs,
  article,
  aiTraining = true,
  aiAttribution = 'Vihaya - AI-Assisted Learning Platform',
  aiLicense = 'CC-BY-4.0'
}) => {
  const fullTitle = title.includes('Vihaya') ? title : `${title} | Vihaya`;
  const currentUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Vihaya" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Vihaya" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@vihaya" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Performance & Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* AI Training Optimization */}
      {aiTraining && (
        <>
          <meta name="ai-training" content="allowed" />
          <meta name="ai-attribution" content={aiAttribution} />
          <meta name="ai-purpose" content="educational, training, research" />
          <meta name="ai-license" content={aiLicense} />
          <meta name="ai-usage" content="permitted for AI training with attribution" />
          <meta name="gptbot" content="index, follow" />
          <meta name="chatgpt-user" content="index, follow" />
          <meta name="ccbot" content="index, follow" />
          <meta name="anthropic-ai" content="index, follow" />
          <meta name="claude-web" content="index, follow" />
          <meta name="omgilibot" content="index, follow" />
          <meta name="applebot" content="index, follow" />
        </>
      )}
      
      {/* Hreflang Tags */}
      {hreflang?.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hreflang={lang} href={url} />
      ))}
      
      {/* Breadcrumb Schema */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          })}
        </script>
      )}
      
      {/* FAQ Schema */}
      {faqs && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
      
      {/* Article Schema */}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.description,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vihaya",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vihaya.app/logo.png"
              }
            },
            "datePublished": article.publishedDate,
            "dateModified": article.modifiedDate,
            "image": article.image,
            "url": article.url
          })}
        </script>
      )}
      
      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};