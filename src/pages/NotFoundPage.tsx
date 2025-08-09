import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { Search, Home, ArrowRight, Bug, Sparkles } from 'lucide-react';

interface QuickLink {
  label: string;
  path: string;
}

const QUICK_LINKS: QuickLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Courses', path: '/courses' },
  { label: 'Projects', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUICK_LINKS;
    return QUICK_LINKS.filter(l => l.label.toLowerCase().includes(q));
  }, [query]);

  const go = (path: string) => {
    navigate(path);
  };

  const goRandom = () => {
    const pick = QUICK_LINKS[Math.floor(Math.random() * QUICK_LINKS.length)];
    navigate(pick.path);
  };

  return (
    <>
      <SEOHead
        title="404 - Page Not Found"
        description="The page you were looking for couldn’t be found. Try searching or explore popular sections."
        canonicalUrl="https://vihaya.app/404"
        noIndex
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-3xl">
          {/* Subtle background accent */}
          <motion.div
            className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          />

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 sm:px-10 py-10">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold">Vihaya</span>
              </div>

              <motion.h1
                className="text-6xl sm:text-7xl font-extrabold text-gray-900 dark:text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                404
              </motion.h1>
              <motion.p
                className="mt-3 text-lg text-gray-600 dark:text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                We couldn’t find that page. Try searching or jump to a popular section.
              </motion.p>

              {/* Interactive search */}
              <div className="mt-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && matches[0]) {
                        go(matches[0].path);
                      }
                    }}
                    placeholder="Search sections (e.g. events, courses, blog)"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    aria-label="Search site sections"
                  />
                </div>

                {/* Suggestions */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {matches.slice(0, 6).map((m) => (
                    <button
                      key={m.path}
                      onClick={() => go(m.path)}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition-colors text-sm"
                    >
                      <span className="inline-block mr-2">{m.label}</span>
                      <ArrowRight className="inline-block w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => go('/')}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </button>
                <button
                  onClick={goRandom}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Surprise me
                </button>
                <a
                  href="mailto:hello@vihaya.app?subject=Broken link report&body=I found a broken link on your site. URL: (paste here)"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bug className="w-5 h-5 mr-2" />
                  Report issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;

