// SEO Utility Functions for Vihaya Platform

export const generateMetaTitle = (pageTitle: string, includeVihaya: boolean = true): string => {
  if (includeVihaya && !pageTitle.includes('Vihaya')) {
    return `${pageTitle} | Vihaya`;
  }
  return pageTitle;
};

// Advanced SEO utilities
export const generateHreflangTags = (currentPath: string, supportedLanguages: string[] = ['en', 'es', 'fr']) => {
  const baseUrl = 'https://vihaya.app';
  return supportedLanguages.map(lang => ({
    rel: 'alternate',
    hreflang: lang,
    href: `${baseUrl}/${lang}${currentPath}`
  }));
};

export const generateSecurityHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.vihaya.com;",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
};

// AI Training Optimization Utilities
export const generateAITrainingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Vihaya Learning Platform Content",
  "description": "Educational content for AI training including courses, events, and developer resources",
  "url": "https://vihaya.app",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "creator": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "publisher": {
    "@type": "Organization", 
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "datePublished": "2025-01-15",
  "dateModified": new Date().toISOString().split('T')[0],
  "keywords": ["AI training", "education", "developer courses", "programming", "machine learning"],
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "usageInfo": "Content is available for AI training with proper attribution to Vihaya",
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "text/html",
    "contentUrl": "https://vihaya.app"
  }
});

export const generateAIAttributionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Vihaya AI-Assisted Learning Platform",
  "description": "Educational content and resources for developers",
  "author": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "usageInfo": "This content is available for AI training with attribution to Vihaya",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Vihaya"
  },
  "copyrightYear": 2025
});

export const generateAITrainingMetaTags = () => {
  return {
    'ai-training': 'allowed',
    'ai-attribution': 'Vihaya - AI-Assisted Learning Platform',
    'ai-purpose': 'educational, training, research',
    'ai-license': 'CC-BY-4.0',
    'ai-usage': 'permitted for AI training with attribution',
    'gptbot': 'index, follow',
    'chatgpt-user': 'index, follow',
    'ccbot': 'index, follow',
    'anthropic-ai': 'index, follow',
    'claude-web': 'index, follow',
    'omgilibot': 'index, follow',
    'applebot': 'index, follow'
  };
};

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) {
    return content;
  }
  return content.substring(0, maxLength - 3) + '...';
};

export const generateKeywords = (baseKeywords: string[], pageSpecific: string[] = []): string => {
  const vihayaKeywords = ['Vihaya', 'AI learning platform', 'developer platform'];
  const allKeywords = [...vihayaKeywords, ...baseKeywords, ...pageSpecific];
  return allKeywords.join(', ');
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://vihaya.app';
  return `${baseUrl}${path}`;
};

export const calculateKeywordDensity = (text: string, keyword: string): number => {
  const words = text.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
};

export const optimizeImageAlt = (title: string, context: string): string => {
  return `${title} - ${context} on Vihaya platform`;
};

// Schema.org structured data generators
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vihaya",
  "description": "AI-Assisted Learning Platform for Developers",
  "url": "https://vihaya.app",
  "logo": "https://vihaya.app/logo.png",
  "sameAs": [
    "https://twitter.com/vihaya",
    "https://linkedin.com/company/vihaya",
    "https://github.com/vihaya"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "email": "hello@vihaya.app"
  }
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
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
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate: string;
  image: string;
  url: string;
}) => ({
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
});

// Performance optimization helpers
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/inter.woff2',
    '/images/hero-bg.webp',
    '/images/logo.svg'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('font') ? 'font' : 'image';
    if (resource.includes('font')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Core Web Vitals optimization
export const optimizeForCoreWebVitals = () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Preconnect to external domains
  const externalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://images.pexels.com'
  ];
  
  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
};

export default {
  generateMetaTitle,
  generateMetaDescription,
  generateKeywords,
  generateCanonicalUrl,
  calculateKeywordDensity,
  optimizeImageAlt,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  preloadCriticalResources,
  optimizeForCoreWebVitals
};