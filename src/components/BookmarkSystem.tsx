import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Heart, X, Calendar, BookOpen, Code, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sampleEvents, sampleCourses, sampleProjects } from '../data/sampleData';

interface BookmarkItem {
  id: string;
  type: 'event' | 'course' | 'project';
  title: string;
  description: string;
  image: string;
  bookmarkedAt: Date;
  author?: string;
  instructor?: string;
  date?: string;
  price?: number;
}

interface BookmarkSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkSystem: React.FC<BookmarkSystemProps> = ({ isOpen, onClose }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'event' | 'course' | 'project'>('all');
  const navigate = useNavigate();

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('vihaya_bookmarks');
    if (savedBookmarks) {
      const parsed = JSON.parse(savedBookmarks);
      setBookmarks(parsed.map((b: any) => ({
        ...b,
        bookmarkedAt: new Date(b.bookmarkedAt)
      })));
    }
  }, [isOpen]);

  const filteredBookmarks = bookmarks.filter(bookmark => 
    filter === 'all' || bookmark.type === filter
  );

  const handleItemClick = (bookmark: BookmarkItem) => {
    navigate(`/${bookmark.type}s/${bookmark.id}`);
    onClose();
  };

  const removeBookmark = (id: string, type: string) => {
    const updatedBookmarks = bookmarks.filter(b => !(b.id === id && b.type === type));
    setBookmarks(updatedBookmarks);
    localStorage.setItem('vihaya_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('vihaya_bookmarks');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'course': return BookOpen;
      case 'project': return Code;
      default: return Bookmark;
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

          {/* Bookmarks Modal */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <BookmarkCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bookmarks</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {bookmarks.length} saved items
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                {['all', 'event', 'course', 'project'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === filterType
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookmarks List */}
            <div className="flex-1 overflow-y-auto">
              {filteredBookmarks.length > 0 ? (
                <div className="p-4 space-y-4">
                  {filteredBookmarks.map((bookmark) => {
                    const Icon = getTypeIcon(bookmark.type);
                    return (
                      <motion.div
                        key={`${bookmark.type}-${bookmark.id}`}
                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors group"
                        onClick={() => handleItemClick(bookmark)}
                        whileHover={{ scale: 1.02 }}
                        layout
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={bookmark.image}
                            alt={bookmark.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {bookmark.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(bookmark.type)}`}>
                                {bookmark.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {bookmark.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Saved {bookmark.bookmarkedAt.toLocaleDateString()}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeBookmark(bookmark.id, bookmark.type);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-all"
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8">
                  <BookmarkCheck className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
                  <p className="text-center text-sm">
                    Start bookmarking events, courses, and projects to access them quickly later.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {bookmarks.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={clearAllBookmarks}
                  className="w-full py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear All Bookmarks
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook for managing bookmarks
export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('vihaya_bookmarks');
    if (savedBookmarks) {
      const parsed = JSON.parse(savedBookmarks);
      setBookmarks(parsed.map((b: any) => ({
        ...b,
        bookmarkedAt: new Date(b.bookmarkedAt)
      })));
    }
  }, []);

  const addBookmark = (item: Omit<BookmarkItem, 'bookmarkedAt'>) => {
    const newBookmark = {
      ...item,
      bookmarkedAt: new Date()
    };
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('vihaya_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (id: string, type: string) => {
    const updatedBookmarks = bookmarks.filter(b => !(b.id === id && b.type === type));
    setBookmarks(updatedBookmarks);
    localStorage.setItem('vihaya_bookmarks', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (id: string, type: string) => {
    return bookmarks.some(b => b.id === id && b.type === type);
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'bookmarkedAt'>) => {
    if (isBookmarked(item.id, item.type)) {
      removeBookmark(item.id, item.type);
    } else {
      addBookmark(item);
    }
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark
  };
};