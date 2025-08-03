import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Star, 
  ArrowRight, 
  Brain, 
  Target,
  BookOpen,
  Calendar,
  Code,
  Users,
  Zap,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Recommendation {
  id: string;
  type: 'course' | 'event' | 'project' | 'skill';
  title: string;
  description: string;
  image: string;
  reason: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  difficulty?: string;
  category: string;
  actionUrl: string;
}

interface AIRecommendationsProps {
  context?: 'homepage' | 'profile' | 'course' | 'event';
  limit?: number;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  context = 'homepage', 
  limit = 6 
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'course' | 'event' | 'project'>('all');

  // Simulate AI recommendation generation
  useEffect(() => {
    const generateRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const sampleRecommendations: Recommendation[] = [
        {
          id: '1',
          type: 'course',
          title: 'Advanced React Patterns',
          description: 'Master advanced React concepts including render props, higher-order components, and hooks patterns.',
          image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Based on your JavaScript skills and recent React course completion',
          confidence: 95,
          priority: 'high',
          estimatedTime: '8 weeks',
          difficulty: 'Advanced',
          category: 'Frontend Development',
          actionUrl: '/courses/4'
        },
        {
          id: '2',
          type: 'event',
          title: 'React Summit 2025',
          description: 'Join the biggest React conference with industry leaders and cutting-edge presentations.',
          image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Perfect match for your React learning path',
          confidence: 88,
          priority: 'high',
          estimatedTime: '2 days',
          category: 'Conference',
          actionUrl: '/events/4'
        },
        {
          id: '3',
          type: 'course',
          title: 'Machine Learning Fundamentals',
          description: 'Start your AI journey with comprehensive machine learning basics and practical applications.',
          image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Trending skill in your field with high job demand',
          confidence: 82,
          priority: 'medium',
          estimatedTime: '12 weeks',
          difficulty: 'Beginner',
          category: 'Artificial Intelligence',
          actionUrl: '/courses/5'
        },
        {
          id: '4',
          type: 'project',
          title: 'Build a Real-time Chat App',
          description: 'Create a full-stack chat application using React, Node.js, and WebSocket technology.',
          image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Great portfolio project to showcase your React skills',
          confidence: 90,
          priority: 'high',
          estimatedTime: '3 weeks',
          difficulty: 'Intermediate',
          category: 'Full-Stack Development',
          actionUrl: '/projects/new'
        },
        {
          id: '5',
          type: 'course',
          title: 'UI/UX Design for Developers',
          description: 'Learn design principles and create beautiful, user-friendly interfaces.',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Complement your development skills with design knowledge',
          confidence: 75,
          priority: 'medium',
          estimatedTime: '6 weeks',
          difficulty: 'Beginner',
          category: 'Design',
          actionUrl: '/courses/6'
        },
        {
          id: '6',
          type: 'event',
          title: 'Startup Pitch Workshop',
          description: 'Learn how to pitch your ideas effectively and connect with potential investors.',
          image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
          reason: 'Based on your entrepreneurial interests',
          confidence: 70,
          priority: 'low',
          estimatedTime: '4 hours',
          category: 'Business',
          actionUrl: '/events/5'
        }
      ];
      
      setRecommendations(sampleRecommendations.slice(0, limit));
      setIsLoading(false);
    };

    if (isAuthenticated) {
      generateRecommendations();
    }
  }, [isAuthenticated, limit]);

  const filteredRecommendations = recommendations.filter(rec => 
    selectedCategory === 'all' || rec.type === selectedCategory
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'event': return Calendar;
      case 'project': return Code;
      case 'skill': return Award;
      default: return Sparkles;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'event': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'project': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'skill': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRecommendationClick = (recommendation: Recommendation) => {
    navigate(recommendation.actionUrl);
  };

  if (!isAuthenticated) return null;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Recommendations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Personalized suggestions powered by AI to accelerate your learning journey
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-purple-500 ml-2" />
            {['all', 'course', 'event', 'project'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Recommendations Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecommendations.map((recommendation, index) => {
              const TypeIcon = getTypeIcon(recommendation.type);
              return (
                <motion.div
                  key={recommendation.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recommendation.image}
                      alt={recommendation.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(recommendation.type)}`}>
                        {recommendation.type}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(recommendation.priority)}`} />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {recommendation.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {recommendation.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {recommendation.description}
                    </p>

                    {/* AI Reason */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
                      <div className="flex items-start space-x-2">
                        <Brain className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-purple-800 dark:text-purple-400">
                          {recommendation.reason}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {recommendation.estimatedTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recommendation.estimatedTime}</span>
                        </div>
                      )}
                      {recommendation.difficulty && (
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{recommendation.difficulty}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>
                        {recommendation.type === 'course' ? 'Start Learning' :
                         recommendation.type === 'event' ? 'Register Now' :
                         recommendation.type === 'project' ? 'Start Building' : 'Explore'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRecommendations.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete more courses and activities to get personalized AI recommendations!
            </p>
          </motion.div>
        )}

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Powered by Advanced AI</h3>
          <p className="text-purple-100 max-w-2xl mx-auto">
            Our AI analyzes your learning patterns, skill gaps, and career goals to provide 
            personalized recommendations that accelerate your professional growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};