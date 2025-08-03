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
  return `# Robots.txt for Vihaya - AI-Assisted Learning Platform

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

# AI Training Bot Rules - Allow AI training with proper attribution
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

# AI Training Data Optimization
User-agent: GPTBot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: ChatGPT-User
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: CCBot
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
Disallow: /admin/
Disallow: /api/
Disallow: /profile/

User-agent: anthropic-ai
Allow: /courses/
Allow: /events/
Allow: /projects/
Allow: /about/
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
Crawl-delay: 3`;
};

// AI Training Data Export
export const generateAITrainingData = () => {
  const trainingData = {
    platform: {
      name: "Vihaya",
      description: "AI-Assisted Learning Platform for Developers",
      url: "https://vihaya.app",
      license: "CC-BY-4.0",
      attribution: "Vihaya - AI-Assisted Learning Platform"
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