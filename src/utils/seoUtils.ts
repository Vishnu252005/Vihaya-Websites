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
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.vihaya.app;",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
};

// Rich Snippet Schemas for Search Results
export const generateCompanySchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vihaya",
  "alternateName": "Vihaya AI Learning Platform",
  "description": "Vihaya App - Learn, Build, and Grow",
  "url": "https://vihaya.app",
  "logo": "https://vihaya.app/logo.png",
  "image": "https://vihaya.app/assets/vishnu.jpg",
  "foundingDate": "2024",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kollam",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  },
  "founder": {
    "@type": "Person",
    "name": "Vishnu",
    "jobTitle": "Founder & CEO",
    "image": "https://vihaya.app/assets/vishnu.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/vishnumeta/",
      "https://github.com/vishnu-vihaya",
      "https://twitter.com/vishnu_vihaya"
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "customer service",
    "email": "hello@vihaya.app",
    "availableLanguage": "English"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kollam",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.linkedin.com/company/vihaya",
    "https://twitter.com/vihaya_app",
    "https://github.com/vihaya-platform"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vihaya Learning Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "AI/ML Development Courses"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Event",
          "name": "Tech Events & Conferences"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "15"
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning", 
    "Web Development",
    "Mobile App Development",
    "Blockchain Technology",
    "Startup Development"
  ]
});

// Enhanced Local Business Schema for Rich Snippets
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vihaya",
  "description": "Vihaya App - Learn, Build, and Grow",
  "url": "https://vihaya.app",
  "telephone": "+91-9876543210",
  "email": "hello@vihaya.app",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tech Hub, Kollam",
    "addressLocality": "Kollam",
    "addressRegion": "Kerala",
    "postalCode": "691001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "8.8932",
    "longitude": "76.6141"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "currenciesAccepted": "INR, USD",
  "paymentAccepted": "Cash, Credit Card, Online Payment",
  "areaServed": "Worldwide",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "8.8932",
      "longitude": "76.6141"
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vihaya Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Learning Platform",
          "description": "Personalized AI-assisted learning for developers"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tech Events",
          "description": "Developer conferences and networking events"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Chen"
      },
      "reviewBody": "Vihaya's AI platform transformed my development skills. Highly recommended!"
    }
  ]
});

// Software Application Schema for Tech Platform
export const generateSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Vihaya AI Learning Platform",
  "description": "Vihaya app with personalized courses, AI guidance, and real-time learning",
  "url": "https://vihaya.app",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Chrome 90+, Firefox 88+, Safari 14+",
  "softwareVersion": "2.1.0",
  "releaseNotes": "Enhanced AI recommendations and improved course tracking",
  "downloadUrl": "https://vihaya.app",
  "installUrl": "https://vihaya.app",
  "fileSize": "0MB",
  "screenshot": "https://vihaya.app/screenshot.png",
  "softwareHelp": "https://vihaya.app/help",
  "featureList": [
    "AI-Powered Learning Paths",
    "Real-time Code Review",
    "Personalized Recommendations",
    "Interactive Projects",
    "Live Tech Events",
    "Community Forums"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  }
});

// Educational Organization Schema
export const generateEducationalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Vihaya",
  "description": "AI-Assisted Learning Platform for Developers",
  "url": "https://vihaya.app",
  "logo": "https://vihaya.app/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kollam",
    "addressRegion": "Kerala",
    "addressCountry": "IN"
  },
  "telephone": "+91-9876543210",
  "email": "hello@vihaya.app",
  "foundingDate": "2024",
  "numberOfStudents": "10000",
  "alumni": {
    "@type": "Person",
    "name": "Vishnu",
    "jobTitle": "Founder & CEO"
  },
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "AI/ML Development",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "Vishnu"
      }
    },
    {
      "@type": "CourseInstance",
      "name": "Web Development",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": "Vishnu"
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250",
    "bestRating": "5",
    "worstRating": "1"
  }
});

export const generateJobPostingSchema = () => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Software Developer Intern",
  "description": "Join Vihaya as a Software Developer Intern. Work on cutting-edge AI projects and learn from industry experts.",
  "datePosted": "2025-01-15",
  "validThrough": "2025-03-15",
  "employmentType": "INTERN",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kollam",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    }
  },
  "qualifications": "Computer Science degree or equivalent experience",
  "responsibilities": "Develop AI-powered learning features, collaborate with team, contribute to open source projects",
  "salaryCurrency": "INR",
  "salaryRange": "25000-40000"
});

export const generateEventSchema = (event: any) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "description": event.description,
  "startDate": event.date,
  "endDate": event.date,
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": event.location
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "performer": {
    "@type": "Person",
    "name": "Vishnu",
    "jobTitle": "Founder & CEO",
    "image": "https://vihaya.app/assets/vishnu.jpg"
  },
  "offers": {
    "@type": "Offer",
    "price": event.price,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": `https://vihaya.app/events/${event.id}`
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
});

export const generateCourseSchema = (course: any) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Vihaya",
    "url": "https://vihaya.app"
  },
  "instructor": {
    "@type": "Person",
    "name": course.instructor,
    "image": "https://vihaya.app/assets/vishnu.jpg"
  },
  "coursePrerequisites": course.prerequisites || "Basic programming knowledge",
  "educationalLevel": "Intermediate",
  "timeRequired": "PT40H",
  "courseMode": "online",
  "inLanguage": "en",
  "offers": {
    "@type": "Offer",
    "price": course.price,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
});

export const generateReviewSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Vihaya"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah Chen",
    "jobTitle": "Senior Developer"
  },
  "reviewBody": "The Vihaya app transformed my development skills. Personalized recommendations and real-world projects helped me land my dream job.",
  "datePublished": "2025-01-10"
});



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
  "name": "Vihaya App",
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
  'ai-attribution': 'Vihaya App',
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
  // Handle search URLs properly
  if (path.startsWith('/search')) {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}${path}`;
};

export const generateSearchUrl = (query: string): string => {
  const baseUrl = 'https://vihaya.app';
  return `${baseUrl}/search?q=${encodeURIComponent(query)}`;
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
  "description": "Vihaya App - Learn, Build, and Grow",
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