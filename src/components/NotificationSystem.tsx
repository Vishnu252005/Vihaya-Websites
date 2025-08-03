import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Check, 
  Info, 
  AlertTriangle, 
  Calendar, 
  BookOpen, 
  Code, 
  Award,
  Users,
  Heart,
  MessageSquare,
  Trash2,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'event' | 'course' | 'project' | 'social';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
}

interface NotificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'event' | 'course' | 'social'>('all');

  // Sample notifications
  useEffect(() => {
    if (isAuthenticated) {
      const sampleNotifications: Notification[] = [
        {
          id: '1',
          type: 'event',
          title: 'Event Reminder',
          message: 'AI Summit 2025 starts in 2 hours. Don\'t forget to join!',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          read: false,
          actionUrl: '/events/1',
          actionText: 'View Event'
        },
        {
          id: '2',
          type: 'course',
          title: 'New Course Available',
          message: 'Advanced React Patterns course is now live. Perfect for your learning path!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          actionUrl: '/courses/4',
          actionText: 'Enroll Now'
        },
        {
          id: '3',
          type: 'social',
          title: 'Project Liked',
          message: 'Sarah Chen liked your Smart City Traffic Optimizer project',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          read: true,
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          actionUrl: '/projects/1',
          actionText: 'View Project'
        },
        {
          id: '4',
          type: 'success',
          title: 'Certificate Earned',
          message: 'Congratulations! You\'ve earned a certificate for completing React Development Bootcamp',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          read: true,
          actionUrl: '/profile',
          actionText: 'View Certificate'
        },
        {
          id: '5',
          type: 'info',
          title: 'Weekly Progress',
          message: 'You\'ve completed 7 hours of learning this week. Keep up the great work!',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          read: true,
          actionUrl: '/profile',
          actionText: 'View Progress'
        }
      ];
      setNotifications(sampleNotifications);
    }
  }, [isAuthenticated]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'event':
        return notification.type === 'event';
      case 'course':
        return notification.type === 'course';
      case 'social':
        return notification.type === 'social';
      default:
        return true;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'course': return BookOpen;
      case 'project': return Code;
      case 'social': return Users;
      case 'success': return Check;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'event': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'course': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'project': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'social': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  if (!isAuthenticated) return null;

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

          {/* Notification Panel */}
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
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {unreadCount} unread notifications
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
              <div className="flex space-x-2 overflow-x-auto">
                {['all', 'unread', 'event', 'course', 'social'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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

            {/* Actions */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Mark All Read
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="p-4 space-y-4">
                  {filteredNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                          notification.read
                            ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        layout
                      >
                        <div className="flex items-start space-x-3">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar}
                              alt="User"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-medium ${
                                notification.read 
                                  ? 'text-gray-700 dark:text-gray-300' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                >
                                  <Trash2 className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              
                              <div className="flex space-x-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                {notification.actionUrl && (
                                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                    {notification.actionText}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8">
                  <Bell className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-center text-sm">
                    {filter === 'all' 
                      ? "You're all caught up! New notifications will appear here."
                      : `No ${filter} notifications found.`
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Settings Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full flex items-center justify-center space-x-2 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Notification Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Notification Badge Component
export const NotificationBadge: React.FC<{ count: number; onClick: () => void }> = ({ count, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Notifications"
    >
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
        >
          {count > 99 ? '99+' : count}
        </motion.div>
      )}
    </motion.button>
  );
};