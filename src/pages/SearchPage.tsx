import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, Calendar, BookOpen, Code, TrendingUp, Clock, User, Filter } from 'lucide-react';
import { sampleEvents, sampleCourses, sampleProjects } from '../data/sampleData';
import { SEOHead } from '../components/SEOHead';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'course' | 'project';
  url: string;
  icon: React.ComponentType<any>;
  date?: string;
  instructor?: string;
  level?: string;
  category?: string;
  technologies?: string[];
}

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'courses' | 'projects'>('all');

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, activeFilter]);

  const performSearch = (searchTerm: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const term = searchTerm.toLowerCase();

      // Search events
      if (activeFilter === 'all' || activeFilter === 'events') {
        sampleEvents.forEach(event => {
          if (event.title.toLowerCase().includes(term) ||
              event.description.toLowerCase().includes(term) ||
              event.category.toLowerCase().includes(term)) {
            searchResults.push({
              id: event.id,
              title: event.title,
              description: event.description,
              type: 'event',
              url: `/events/${event.id}`,
              icon: Calendar,
              date: event.date,
              category: event.category
            });
          }
        });
      }

      // Search courses
      if (activeFilter === 'all' || activeFilter === 'courses') {
        sampleCourses.forEach(course => {
          if (course.title.toLowerCase().includes(term) ||
              course.description.toLowerCase().includes(term) ||
              course.tags.some(tag => tag.toLowerCase().includes(term))) {
            searchResults.push({
              id: course.id,
              title: course.title,
              description: course.description,
              type: 'course',
              url: `/courses/${course.id}`,
              icon: BookOpen,
              instructor: course.instructor,
              level: course.level
            });
          }
        });
      }

      // Search projects
      if (activeFilter === 'all' || activeFilter === 'projects') {
        sampleProjects.forEach(project => {
          if (project.title.toLowerCase().includes(term) ||
              project.description.toLowerCase().includes(term) ||
              project.technologies.some(tech => tech.toLowerCase().includes(term))) {
            searchResults.push({
              id: project.id,
              title: project.title,
              description: project.description,
              type: 'project',
              url: `/projects/${project.id}`,
              icon: Code,
              category: project.category,
              technologies: project.technologies
            });
          }
        });
      }

      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'course': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'project': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'course': return BookOpen;
      case 'project': return Code;
      default: return TrendingUp;
    }
  };

  return (
    <>
      <SEOHead
        title={`Search Results for "${query}" | Vihaya`}
        description={`Search results for "${query}" on the Vihaya app. Find events, courses, and projects related to your search.`}
        keywords={`search, ${query}, events, courses, projects, AI learning, developer platform`}
        canonicalUrl={`/search?q=${encodeURIComponent(query)}`}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Search Results
            </h1>
            {query && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Showing results for "<span className="font-semibold">{query}</span>"
              </p>
            )}
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, courses, projects..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={query}
                onChange={(e) => {
                  const newQuery = e.target.value;
                  navigate(`/search?q=${encodeURIComponent(newQuery)}`);
                }}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All', count: results.length },
                { key: 'events', label: 'Events', count: results.filter(r => r.type === 'event').length },
                { key: 'courses', label: 'Courses', count: results.filter(r => r.type === 'course').length },
                { key: 'projects', label: 'Projects', count: results.filter(r => r.type === 'project').length }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((result) => {
                  const IconComponent = result.icon;
                  return (
                    <div
                      key={`${result.type}-${result.id}`}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${getTypeColor(result.type)}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                            {result.date && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {result.date}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {result.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {result.description}
                          </p>
                          <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            {result.instructor && (
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {result.instructor}
                              </span>
                            )}
                            {result.level && (
                              <span className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {result.level}
                              </span>
                            )}
                            {result.category && (
                              <span className="flex items-center">
                                <Filter className="w-4 h-4 mr-1" />
                                {result.category}
                              </span>
                            )}
                          </div>
                          {result.technologies && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {result.technologies.slice(0, 3).map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                              {result.technologies.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  +{result.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : query ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or browse our categories
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => navigate('/events')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Events
                  </button>
                  <button
                    onClick={() => navigate('/courses')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Browse Courses
                  </button>
                  <button
                    onClick={() => navigate('/projects')}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Projects
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Start searching
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter a search term to find events, courses, and projects
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage; 