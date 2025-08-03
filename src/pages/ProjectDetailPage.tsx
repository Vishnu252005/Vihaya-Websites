import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Heart, 
  Share2, 
  Star,
  Eye,
  Download,
  Code,
  User,
  Calendar,
  Tag,
  MessageSquare,
  Play,
  Zap,
  Award,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';
import { sampleProjects, Project } from '../data/sampleData';
import { DiscussionForum } from '../components/DiscussionForum';
import { useBookmarks } from '../components/BookmarkSystem';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Find the project by ID
  const project = sampleProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <SEOHead
          title="Project Not Found - Vihaya"
          description="The requested project could not be found in Vihaya's project showcase."
          noIndex={true}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/projects')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Project Schema Markup
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": project.author
    },
    "applicationCategory": project.category,
    "programmingLanguage": project.technologies,
    "codeRepository": project.githubUrl,
    "url": project.liveUrl || `https://vihaya.com/projects/${project.id}`,
    "image": project.image,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "ratingCount": project.likes,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": 0,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBookmarkToggle = () => {
    toggleBookmark({
      id: project.id,
      type: 'project',
      title: project.title,
      description: project.description,
      image: project.image,
      author: project.author
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'code', label: 'Code Preview' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'comments', label: 'Comments' },
    { id: 'discussion', label: 'Discussion' }
  ];

  const codePreview = `// Smart City Traffic Optimizer - Main Algorithm
import { TrafficData, OptimizationResult } from './types';
import { AIModel } from './ai-model';

class TrafficOptimizer {
  private aiModel: AIModel;
  private trafficData: TrafficData[];

  constructor() {
    this.aiModel = new AIModel();
    this.trafficData = [];
  }

  async optimizeTraffic(realTimeData: TrafficData[]): Promise<OptimizationResult> {
    // Process real-time traffic data
    const processedData = this.preprocessData(realTimeData);
    
    // Apply AI optimization algorithm
    const prediction = await this.aiModel.predict(processedData);
    
    // Generate traffic light timing recommendations
    const optimization = this.generateOptimization(prediction);
    
    return {
      congestionReduction: optimization.congestionReduction,
      timeSaved: optimization.timeSaved,
      recommendations: optimization.recommendations
    };
  }

  private preprocessData(data: TrafficData[]): ProcessedData {
    return data.map(point => ({
      ...point,
      normalized: this.normalizeTrafficFlow(point.flow),
      weighted: this.applyTimeWeighting(point.timestamp)
    }));
  }
}

export default TrafficOptimizer;`;

  const features = [
    { icon: TrendingUp, label: '40% Congestion Reduction', desc: 'Proven traffic flow improvement' },
    { icon: Zap, label: 'Real-time Processing', desc: 'Instant traffic data analysis' },
    { icon: Globe, label: 'IoT Integration', desc: 'Connected sensor network' },
    { icon: Award, label: 'Award Winning', desc: 'Smart City Innovation Award 2024' }
  ];

  const techStack = [
    { name: 'Python', color: 'bg-blue-500', usage: 85 },
    { name: 'TensorFlow', color: 'bg-orange-500', usage: 70 },
    { name: 'IoT Sensors', color: 'bg-green-500', usage: 60 },
    { name: 'Cloud Computing', color: 'bg-purple-500', usage: 75 }
  ];

  const projectStats = [
    { label: 'Lines of Code', value: '15,000+' },
    { label: 'Test Coverage', value: '94%' },
    { label: 'Performance', value: '99.9%' },
    { label: 'Cities Deployed', value: '12' }
  ];

  return (
    <>
      <SEOHead
        title={`${project.title} by ${project.author} - Project Showcase | Vihaya`}
        description={`Explore ${project.title}, an innovative ${project.category} project by ${project.author}. Built with ${project.technologies.slice(0, 3).join(', ')}. View code and demo on Vihaya.`}
        keywords={`${project.title}, ${project.author}, ${project.category} project, ${project.technologies.join(', ')}, Vihaya projects, developer showcase, open source`}
        canonicalUrl={`https://vihaya.com/projects/${project.id}`}
        ogType="article"
        ogImage={project.image}
        schemaMarkup={projectSchema}
      />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigate('/projects')}
              className="flex items-center space-x-2 text-white mb-6 hover:text-blue-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Projects</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <div className="flex items-center space-x-1 bg-white/20 text-white px-3 py-2 rounded-full">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">2.5k views</span>
                </div>
                <div className="flex items-center space-x-1 bg-white/20 text-white px-3 py-2 rounded-full">
                  <Heart className="w-4 h-4 fill-current text-red-400" />
                  <span className="text-sm font-medium">{project.likes}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mb-6">
                {project.description}
              </p>
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>by {project.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Updated 2 weeks ago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8"
            >
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Project Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        About This Project
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        This innovative AI-powered traffic management system revolutionizes urban mobility by analyzing 
                        real-time traffic data from IoT sensors placed throughout the city. Using advanced machine learning 
                        algorithms, the system predicts traffic patterns and optimizes traffic light timing to reduce 
                        congestion by up to 40%.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        The solution integrates seamlessly with existing city infrastructure and provides a comprehensive 
                        dashboard for traffic management authorities to monitor and control traffic flow in real-time.
                      </p>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Key Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {feature.label}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {feature.desc}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Technology Stack
                      </h3>
                      <div className="space-y-4">
                        {techStack.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-20 text-sm font-medium text-gray-700 dark:text-gray-300">
                              {tech.name}
                            </div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <motion.div
                                className={`${tech.color} h-3 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${tech.usage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                            <div className="w-12 text-sm text-gray-500 dark:text-gray-400">
                              {tech.usage}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'code' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Code Preview
                      </h3>
                      <div className="flex space-x-2">
                        <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs">
                          TypeScript
                        </span>
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded text-xs">
                          AI/ML
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-sm text-gray-400 ml-4">traffic-optimizer.ts</div>
                      </div>
                      <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                        <code>{codePreview}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'demo' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Live Demo
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 text-center">
                      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Interactive Demo Available
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Experience the traffic optimization system in action with real-time data visualization.
                      </p>
                      <motion.button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Launch Demo
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'comments' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Community Feedback
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: 'Sarah Chen',
                          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
                          comment: 'Incredible work! The AI optimization is truly impressive. Would love to see this implemented in our city.',
                          time: '2 days ago'
                        },
                        {
                          name: 'Marcus Johnson',
                          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
                          comment: 'The code quality is excellent and the documentation is very clear. Great job on the IoT integration!',
                          time: '1 week ago'
                        },
                        {
                          name: 'Elena Rodriguez',
                          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
                          comment: 'This could revolutionize urban planning. The 40% congestion reduction is remarkable!',
                          time: '2 weeks ago'
                        }
                      ].map((comment, index) => (
                        <motion.div
                          key={index}
                          className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <img
                            src={comment.avatar}
                            alt={comment.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {comment.name}
                              </h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {comment.time}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {comment.comment}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'discussion' && (
                  <DiscussionForum projectId={project.id} type="project" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <div className="space-y-4">
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </motion.a>
                
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}

                <div className="flex space-x-3">
                  <motion.button
                    onClick={handleBookmarkToggle}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all duration-300 ${
                      isBookmarked(project.id, 'project')
                        ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className={`w-4 h-4 ${isBookmarked(project.id, 'project') ? 'fill-current' : ''}`} />
                    <span>{isBookmarked(project.id, 'project') ? 'Saved' : 'Save'}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Project Stats</h3>
              <div className="space-y-4">
                {projectStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};