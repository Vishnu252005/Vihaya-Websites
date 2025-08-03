import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Send, 
  User, 
  Clock,
  Pin,
  Flag,
  MoreVertical,
  Search,
  Filter,
  Plus,
  Award,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
  replies: number;
  isPinned: boolean;
  tags: string[];
  category: string;
}

interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: Date;
  likes: number;
  dislikes: number;
  parentReplyId?: string;
}

interface DiscussionForumProps {
  courseId?: string;
  eventId?: string;
  projectId?: string;
  type: 'course' | 'event' | 'project' | 'general';
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({ 
  courseId, 
  eventId, 
  projectId, 
  type 
}) => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'replies'>('recent');

  // Sample data
  useEffect(() => {
    const samplePosts: ForumPost[] = [
      {
        id: '1',
        title: 'Best practices for React hooks?',
        content: 'I\'m working on a complex React application and wondering about the best practices for using hooks. Any recommendations?',
        author: {
          id: '1',
          name: 'Alex Johnson',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'Student'
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 15,
        dislikes: 2,
        replies: 8,
        isPinned: false,
        tags: ['React', 'Hooks', 'Best Practices'],
        category: 'Technical'
      },
      {
        id: '2',
        title: 'Course completion certificate',
        content: 'How do I download my course completion certificate? I completed all modules but can\'t find the download link.',
        author: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'Premium Member'
        },
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 8,
        dislikes: 0,
        replies: 3,
        isPinned: true,
        tags: ['Certificate', 'Course', 'Help'],
        category: 'Support'
      },
      {
        id: '3',
        title: 'Project showcase feedback',
        content: 'I just submitted my final project and would love to get some feedback from the community. It\'s an e-commerce platform built with React and Node.js.',
        author: {
          id: '3',
          name: 'Marcus Rodriguez',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'Student'
        },
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        likes: 23,
        dislikes: 1,
        replies: 12,
        isPinned: false,
        tags: ['Project', 'Feedback', 'React', 'Node.js'],
        category: 'Projects'
      }
    ];
    setPosts(samplePosts);
  }, []);

  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || post.category.toLowerCase() === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.likes - b.dislikes) - (a.likes - a.dislikes);
        case 'replies':
          return b.replies - a.replies;
        case 'recent':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !isAuthenticated) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: user!.id,
        name: user!.name,
        avatar: user!.avatar,
        role: user!.role
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      dislikes: 0,
      replies: 0,
      isPinned: false,
      tags: [],
      category: 'General'
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'instructor':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'premium member':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'moderator':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Discussion Forum
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with fellow learners and share knowledge
          </p>
        </div>
        {isAuthenticated && (
          <motion.button
            onClick={() => setShowNewPostForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </motion.button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="support">Support</option>
            <option value="projects">Projects</option>
            <option value="general">General</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="replies">Most Replies</option>
          </select>
        </div>
      </div>

      {/* New Post Form */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Post
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What would you like to discuss?"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleCreatePost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredAndSortedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {post.author.name}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author.role)}`}>
                      {post.author.role}
                    </span>
                    {post.isPinned && (
                      <Pin className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{post.likes}</span>
                </motion.button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                  <span>{post.dislikes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <Reply className="w-5 h-5" />
                  <span>{post.replies} replies</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedPosts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No discussions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
          </p>
          {isAuthenticated && !searchQuery && (
            <motion.button
              onClick={() => setShowNewPostForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Discussion
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );
};