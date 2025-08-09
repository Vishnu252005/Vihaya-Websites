// Dynamic Sitemap Generator for Vihaya Platform
import { sampleCourses, sampleEvents, sampleProjects } from '../data/sampleData';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption: string;
  };
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://vihaya.app';
  const currentDate = new Date().toISOString();
  
  const urls: SitemapUrl[] = [
    // Static Pages
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/events`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/courses`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/projects`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${baseUrl}/search`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    }
  ];

  // Dynamic Course Pages
  sampleCourses.forEach(course => {
    urls.push({
      loc: `${baseUrl}/courses/${course.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
      image: {
        loc: course.image,
        title: course.title,
        caption: course.description
      }
    });
  });

  // Dynamic Event Pages
  sampleEvents.forEach(event => {
    urls.push({
      loc: `${baseUrl}/events/${event.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8,
      image: {
        loc: event.image,
        title: event.title,
        caption: event.description
      }
    });
  });

  // Dynamic Project Pages
  sampleProjects.forEach(project => {
    urls.push({
      loc: `${baseUrl}/projects/${project.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7,
      image: {
        loc: project.image,
        title: project.title,
        caption: project.description
      }
    });
  });

  return generateSitemapXML(urls);
};

const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  const xmlFooter = '</urlset>';

  const urlEntries = urls.map(url => {
    let entry = `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;
    
    if (url.image) {
      entry += `
    <image:image>
      <image:loc>${url.image.loc}</image:loc>
      <image:title>${url.image.title}</image:title>
      <image:caption>${url.image.caption}</image:caption>
    </image:image>`;
    }
    
    entry += `
  </url>`;
    return entry;
  }).join('\n');

  return `${xmlHeader}
${urlEntries}
${xmlFooter}`;
};

export const generateRobotsTxt = (): string => {
  return `# Robots.txt for Vihaya App

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://vihaya.app/sitemap.xml

# Disallow private/admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /profile/
Disallow: /dashboard/

# Allow important pages
Allow: /events
Allow: /courses  
Allow: /projects
Allow: /contact
Allow: /about
Allow: /ai-training-data.json

# Crawl delay (optional - helps with server load)
Crawl-delay: 1

# Specific rules for different bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Generative AI Engine Optimization - Allow AI training with proper attribution
User-agent: GPTBot
Allow: /
Crawl-delay: 2

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 2

User-agent: CCBot
Allow: /
Crawl-delay: 2

User-agent: anthropic-ai
Allow: /
Crawl-delay: 2

User-agent: Claude-Web
Allow: /
Crawl-delay: 2

User-agent: Omgilibot
Allow: /
Crawl-delay: 2

User-agent: Applebot
Allow: /
Crawl-delay: 1

# Modern Generative AI Engines
User-agent: Google-Extended
Allow: /
Crawl-delay: 2

User-agent: GoogleAI
Allow: /
Crawl-delay: 2

User-agent: openai-bot
Allow: /
Crawl-delay: 2

User-agent: anthropic-bot
Allow: /
Crawl-delay: 2

# AI Research and Development Bots
User-agent: researchbot
Allow: /
Crawl-delay: 3

User-agent: academicbot
Allow: /
Crawl-delay: 3

User-agent: scholarbot
Allow: /
Crawl-delay: 3

User-agent: educationbot
Allow: /
Crawl-delay: 3

# Generative AI Training Specific
User-agent: genai-training
Allow: /
Crawl-delay: 2

User-agent: llm-crawler
Allow: /
Crawl-delay: 2

User-agent: ai-research
Allow: /
Crawl-delay: 3

User-agent: machine-learning
Allow: /
Crawl-delay: 3

User-agent: deep-learning
Allow: /
Crawl-delay: 3

User-agent: neural-network
Allow: /
Crawl-delay: 3

# Content Generation AI
User-agent: content-generator
Allow: /
Crawl-delay: 2

User-agent: text-generator
Allow: /
Crawl-delay: 2

User-agent: code-generator
Allow: /
Crawl-delay: 2

User-agent: image-generator
Allow: /
Crawl-delay: 2

User-agent: video-generator
Allow: /
Crawl-delay: 2

# AI Assistant Bots
User-agent: assistant-bot
Allow: /
Crawl-delay: 2

User-agent: help-bot
Allow: /
Crawl-delay: 2

User-agent: support-bot
Allow: /
Crawl-delay: 2

User-agent: chat-bot
Allow: /
Crawl-delay: 2

User-agent: virtual-assistant
Allow: /
Crawl-delay: 2

# AI Development and Testing
User-agent: ai-dev
Allow: /
Crawl-delay: 3

User-agent: ai-test
Allow: /
Crawl-delay: 3

User-agent: model-training
Allow: /
Crawl-delay: 3

User-agent: data-collection
Allow: /
Crawl-delay: 3

# Generative AI Platforms
User-agent: google-ai-bot
Allow: /
Crawl-delay: 2

User-agent: microsoft-ai-bot
Allow: /
Crawl-delay: 2

User-agent: meta-ai-bot
Allow: /
Crawl-delay: 2

User-agent: amazon-ai-bot
Allow: /
Crawl-delay: 2

User-agent: apple-ai-bot
Allow: /
Crawl-delay: 2

# AI Content Analysis
User-agent: content-analyzer
Allow: /
Crawl-delay: 2

User-agent: sentiment-analyzer
Allow: /
Crawl-delay: 2

User-agent: topic-modeler
Allow: /
Crawl-delay: 2

User-agent: keyword-extractor
Allow: /
Crawl-delay: 2

User-agent: entity-recognizer
Allow: /
Crawl-delay: 2

# Generative AI Training Data Optimization
User-agent: GPTBot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: ChatGPT-User
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: CCBot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: anthropic-ai
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

# Modern Generative AI Training Access
User-agent: Google-Extended
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: GoogleAI
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: openai-bot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: anthropic-bot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

# AI Research and Academic Access
User-agent: researchbot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: academicbot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: scholarbot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: educationbot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

# Generative AI Development Access
User-agent: genai-training
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: llm-crawler
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: ai-research
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: machine-learning
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: deep-learning
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: neural-network
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

# Content Generation AI Access
User-agent: content-generator
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: text-generator
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: code-generator
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: image-generator
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: video-generator
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Allow: /ai-training-data.json
Allow: /sitemap.xml
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

# Rate limiting for AI bots to prevent server overload
User-agent: GPTBot
Crawl-delay: 3

User-agent: ChatGPT-User
Crawl-delay: 3

User-agent: CCBot
Crawl-delay: 3

User-agent: anthropic-ai
Crawl-delay: 3

# Generative AI Engine Rate Limiting
User-agent: Google-Extended
Crawl-delay: 3

User-agent: GoogleAI
Crawl-delay: 3

User-agent: openai-bot
Crawl-delay: 3

User-agent: anthropic-bot
Crawl-delay: 3

User-agent: genai-training
Crawl-delay: 3

User-agent: llm-crawler
Crawl-delay: 3

User-agent: ai-research
Crawl-delay: 3

User-agent: machine-learning
Crawl-delay: 3

User-agent: deep-learning
Crawl-delay: 3

User-agent: neural-network
Crawl-delay: 3

User-agent: content-generator
Crawl-delay: 3

User-agent: text-generator
Crawl-delay: 3

User-agent: code-generator
Crawl-delay: 3

User-agent: image-generator
Crawl-delay: 3

User-agent: video-generator
Crawl-delay: 3

# AI Research and Academic Rate Limiting
User-agent: researchbot
Crawl-delay: 4

User-agent: academicbot
Crawl-delay: 4

User-agent: scholarbot
Crawl-delay: 4

User-agent: educationbot
Crawl-delay: 4

# AI Development and Testing Rate Limiting
User-agent: ai-dev
Crawl-delay: 4

User-agent: ai-test
Crawl-delay: 4

User-agent: model-training
Crawl-delay: 4

User-agent: data-collection
Crawl-delay: 4

# AI Content Analysis Rate Limiting
User-agent: content-analyzer
Crawl-delay: 3

User-agent: sentiment-analyzer
Crawl-delay: 3

User-agent: topic-modeler
Crawl-delay: 3

User-agent: keyword-extractor
Crawl-delay: 3

User-agent: entity-recognizer
Crawl-delay: 3

# AI Assistant Bots Rate Limiting
User-agent: assistant-bot
Crawl-delay: 3

User-agent: help-bot
Crawl-delay: 3

User-agent: support-bot
Crawl-delay: 3

User-agent: chat-bot
Crawl-delay: 3

User-agent: virtual-assistant
Crawl-delay: 3

# Generative AI Platform Rate Limiting
User-agent: google-ai-bot
Crawl-delay: 3

User-agent: microsoft-ai-bot
Crawl-delay: 3

User-agent: meta-ai-bot
Crawl-delay: 3

User-agent: amazon-ai-bot
Crawl-delay: 3

User-agent: apple-ai-bot
Crawl-delay: 3`;
};

// AI Training Data Export
export const generateAITrainingData = () => {
  const trainingData = {
    platform: {
      name: "Vihaya",
      description: "Vihaya App - Learn, Build, and Grow",
      url: "https://vihaya.app",
      license: "CC-BY-4.0",
      attribution: "Vihaya App"
    },
    courses: sampleCourses.map(course => ({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      level: course.level,
      duration: course.duration,
      tags: course.tags,
      url: `https://vihaya.app/courses/${course.id}`
    })),
    events: sampleEvents.map(event => ({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category,
      url: `https://vihaya.app/events/${event.id}`
    })),
    projects: sampleProjects.map(project => ({
      title: project.title,
      description: project.description,
      author: project.author,
      category: project.category,
      technologies: project.technologies,
      url: `https://vihaya.app/projects/${project.id}`
    })),
    founder: {
      name: "Vishnu",
      title: "Founder & CEO",
      bio: "Visionary entrepreneur and technology leader with over 10 years of experience in AI and education technology.",
      company: "Vihaya",
      url: "https://vihaya.app/about"
    }
  };
  
  return trainingData;
}; 