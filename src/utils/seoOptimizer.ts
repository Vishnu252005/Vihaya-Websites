// Comprehensive SEO Optimizer for Vihaya Platform
import { generateMetaTitle, generateMetaDescription, generateKeywords, generateCanonicalUrl } from './seoUtils';

export interface SEOOptimizationResult {
  success: boolean;
  issues: string[];
  recommendations: string[];
  fixedUrls: string[];
}

export const analyzeSEOIssues = (): SEOOptimizationResult => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const fixedUrls: string[] = [];

  // Check for common SEO issues
  const currentUrl = window.location.href;
  
  // Check for missing search page
  if (currentUrl.includes('/search') && !currentUrl.includes('?q=')) {
    issues.push('Search page without query parameter detected');
    recommendations.push('Ensure search page handles empty queries gracefully');
    fixedUrls.push('/search');
  }

  // Check for proper canonical URLs
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    issues.push('Missing canonical URL');
    recommendations.push('Add canonical URL to all pages');
  }

  // Check for proper meta descriptions
  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    issues.push('Missing meta description');
    recommendations.push('Add meta description to all pages');
  }

  // Check for proper title tags
  const title = document.title;
  if (!title || title.length < 10) {
    issues.push('Insufficient title tag');
    recommendations.push('Ensure title tags are descriptive and 10-60 characters');
  }

  // Check for proper heading structure
  const h1Tags = document.querySelectorAll('h1');
  if (h1Tags.length === 0) {
    issues.push('Missing H1 tag');
    recommendations.push('Add H1 tag to all pages');
  } else if (h1Tags.length > 1) {
    issues.push('Multiple H1 tags detected');
    recommendations.push('Use only one H1 tag per page');
  }

  // Check for proper image alt tags
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images missing alt tags`);
    recommendations.push('Add descriptive alt tags to all images');
  }

  // Check for proper internal linking
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  if (internalLinks.length === 0) {
    issues.push('No internal links detected');
    recommendations.push('Add internal links to improve site structure');
  }

  // Check for proper structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length === 0) {
    issues.push('No structured data detected');
    recommendations.push('Add structured data for better search visibility');
  }

  return {
    success: issues.length === 0,
    issues,
    recommendations,
    fixedUrls
  };
};

export const optimizePageForSearch = (pageData: {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  type: 'page' | 'event' | 'course' | 'project' | 'search';
}) => {
  const optimizations = [];

  // Generate optimized meta title
  const optimizedTitle = generateMetaTitle(pageData.title);
  optimizations.push({
    type: 'title',
    current: document.title,
    optimized: optimizedTitle
  });

  // Generate optimized meta description
  const optimizedDescription = generateMetaDescription(pageData.description);
  optimizations.push({
    type: 'description',
    current: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    optimized: optimizedDescription
  });

  // Generate optimized keywords
  const optimizedKeywords = generateKeywords(pageData.keywords);
  optimizations.push({
    type: 'keywords',
    current: document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '',
    optimized: optimizedKeywords
  });

  // Generate canonical URL
  const canonicalUrl = generateCanonicalUrl(pageData.url);
  optimizations.push({
    type: 'canonical',
    current: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
    optimized: canonicalUrl
  });

  return optimizations;
};

export const generateSearchSitemap = (searchTerms: string[]) => {
  const baseUrl = 'https://vihaya.app';
  const currentDate = new Date().toISOString();
  
  return searchTerms.map(term => ({
    loc: `${baseUrl}/search?q=${encodeURIComponent(term)}`,
    lastmod: currentDate,
    changefreq: 'weekly' as const,
    priority: 0.6
  }));
};

export const validateSearchURLs = (urls: string[]): { valid: string[], invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  urls.forEach(url => {
    try {
      const urlObj = new URL(url);
      if (urlObj.pathname === '/search' && urlObj.searchParams.has('q')) {
        valid.push(url);
      } else if (urlObj.pathname === '/search' && !urlObj.searchParams.has('q')) {
        // Empty search page is valid
        valid.push(url);
      } else {
        invalid.push(url);
      }
    } catch {
      invalid.push(url);
    }
  });

  return { valid, invalid };
};

export const generateSearchOptimizationReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    issues: analyzeSEOIssues(),
    recommendations: [
      'Ensure all search URLs are properly handled',
      'Add proper meta tags to search results pages',
      'Implement proper canonical URLs for search pages',
      'Add structured data for search functionality',
      'Optimize page load speed for search results',
      'Implement proper breadcrumb navigation',
      'Add proper internal linking from search results',
      'Ensure mobile-friendly search interface',
      'Implement proper error handling for search queries',
      'Add proper analytics tracking for search behavior'
    ],
    technicalFixes: [
      'Add search route to React Router',
      'Create SearchPage component',
      'Update sitemap to include search page',
      'Update robots.txt to allow search crawling',
      'Add proper SEO meta tags to search pages',
      'Implement proper URL structure for search queries',
      'Add proper error pages for invalid search queries',
      'Implement search result pagination',
      'Add proper structured data for search results',
      'Optimize search result loading performance'
    ]
  };

  return report;
};

export const fixCommonSEOIssues = () => {
  const fixes = [];

  // Fix missing canonical URLs
  if (!document.querySelector('link[rel="canonical"]')) {
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href;
    document.head.appendChild(canonicalLink);
    fixes.push('Added canonical URL');
  }

  // Fix missing meta description
  if (!document.querySelector('meta[name="description"]')) {
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
  metaDescription.content = 'Vihaya App - Learn, Build, and Grow';
    document.head.appendChild(metaDescription);
    fixes.push('Added meta description');
  }

  // Fix missing meta keywords
  if (!document.querySelector('meta[name="keywords"]')) {
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'AI learning, developer platform, courses, events, projects';
    document.head.appendChild(metaKeywords);
    fixes.push('Added meta keywords');
  }

  // Fix missing viewport meta tag
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(viewportMeta);
    fixes.push('Added viewport meta tag');
  }

  return fixes;
};

export default {
  analyzeSEOIssues,
  optimizePageForSearch,
  generateSearchSitemap,
  validateSearchURLs,
  generateSearchOptimizationReport,
  fixCommonSEOIssues
}; 