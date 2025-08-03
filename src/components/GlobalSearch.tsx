import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, BookOpen, Code, TrendingUp, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sampleEvents, sampleCourses, sampleProjects } from '../data/sampleData';

interface SearchResult {
  id: string;
  title: string;
  type: 'event' | 'course' | 'project';
  description: string;
  image: string;
  author?: string;
  instructor?: string;
  date?: string;
  price?: number;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const searchResults: SearchResult[] = [];
      
      // Search events
      sampleEvents.forEach(event => {
        if (event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase()) ||
            event.category.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push({
            id: event.id,
            title: event.title,
            type: 'event',
            description: event.description,
            image: event.image,
            date: event.date,
            price: event.price
          });
        }
      });

      // Search courses
      sampleCourses.forEach(course => {
        if (course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.instructor.toLowerCase().includes(query.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
          searchResults.push({
            id: course.id,
            title: course.title,
            type: 'course',
            description: course.description,
            image: course.image,
            instructor: course.instructor,
            price: course.price
          });
        }
      });

      // Search projects
      sampleProjects.forEach(project => {
        if (project.title.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.author.toLowerCase().includes(query.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(query.toLowerCase()))) {
          searchResults.push({
            id: project.id,
            title: project.title,
            type: 'project',
            description: project.description,
            image: project.image,
            author: project.author
          });
        }
      });

      setResults(searchResults.slice(0, 10)); // Limit to 10 results
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    navigate(`/${result.type}s/${result.id}`);
    onClose();
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleResultClick(results[selectedIndex]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'course': return BookOpen;
      case 'project': return Code;
      default: return Search;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'course': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'project': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search events, courses, projects..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => {
                      const Icon = getTypeIcon(result.type);
                      return (
                        <motion.div
                          key={`${result.type}-${result.id}`}
                          className={`flex items-center px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                            index === selectedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
                          }`}
                          onClick={() => handleResultClick(result)}
                          whileHover={{ x: 5 }}
                        >
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {result.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                                {result.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                              {result.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {result.instructor && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3" />
                                  <span>{result.instructor}</span>
                                </div>
                              )}
                              {result.author && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3" />
                                  <span>{result.author}</span>
                                </div>
                              )}
                              {result.date && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(result.date).toLocaleDateString()}</span>
                                </div>
                              )}
                              {result.price !== undefined && (
                                <span className="font-medium">
                                  {result.price === 0 ? 'Free' : `$${result.price}`}
                                </span>
                              )}
                            </div>
                          </div>
                          <Icon className="w-5 h-5 text-gray-400 ml-4" />
                        </motion.div>
                      );
                    })}
                  </div>
                ) : query.length >= 2 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="w-12 h-12 mb-3 opacity-50" />
                    <p>No results found for "{query}"</p>
                    <p className="text-sm mt-1">Try different keywords or check spelling</p>
                  </div>
                ) : (
                  <div className="py-8 px-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'AI Summit', 'JavaScript', 'Machine Learning', 'Web Development'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>ESC Close</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Powered by Vihaya AI</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};