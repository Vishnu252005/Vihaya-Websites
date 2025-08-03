import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Code, 
  Award, 
  Settings, 
  Bell, 
  CreditCard, 
  Shield, 
  HelpCircle,
  LogOut,
  Edit3,
  Camera,
  Star,
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
  Download,
  Share2,
  Eye,
  Heart,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProgressTracker } from '../components/ProgressTracker';

export const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User, color: 'blue' },
    { id: 'events', label: 'My Events', icon: Calendar, color: 'green' },
    { id: 'courses', label: 'My Courses', icon: BookOpen, color: 'purple' },
    { id: 'projects', label: 'My Projects', icon: Code, color: 'orange' },
    { id: 'certificates', label: 'Certificates', icon: Award, color: 'yellow' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'pink' },
    { id: 'goals', label: 'Learning Goals', icon: Target, color: 'indigo' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'red' },
    { id: 'billing', label: 'Billing', icon: CreditCard, color: 'emerald' },
    { id: 'security', label: 'Security', icon: Shield, color: 'slate' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'cyan' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent user={user} />;
      case 'analytics':
        return <AnalyticsContent user={user} />;
      case 'events':
        return <EventsContent />;
      case 'courses':
        return <CoursesContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'certificates':
        return <CertificatesContent />;
      case 'goals':
        return <GoalsContent />;
      case 'notifications':
        return <NotificationsContent />;
      case 'billing':
        return <BillingContent />;
      case 'security':
        return <SecurityContent />;
      case 'help':
        return <HelpContent />;
      default:
        return <OverviewContent user={user} />;
    }
  };

  return (
    <>
      <SEOHead
        title={`${user.name}'s Profile - Vihaya Dashboard`}
        description={`View ${user.name}'s learning progress, completed courses, attended events, and project portfolio on Vihaya's developer platform.`}
        keywords="Vihaya profile, developer dashboard, learning progress, course completion, project portfolio, user profile"
        canonicalUrl="https://vihaya.com/profile"
        noIndex={true}
      />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 sticky top-24 h-fit"
          >
            {/* Profile Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <motion.img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-blue-500/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <motion.button
                    className="absolute bottom-0 right-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-3 h-3" />
                  </motion.button>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{user.email}</p>
                <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.role}</span>
                </div>
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                    activeTab === item.id
                      ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg shadow-${item.color}-500/25`
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium flex-1">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                    activeTab === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} />
                </motion.button>
              ))}
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

// Overview Content Component
const OverviewContent: React.FC<{ user: any }> = ({ user }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your learning journey
        </p>
      </div>
      <motion.div
        className="text-right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-sm text-gray-500 dark:text-gray-400">Member since</div>
        <div className="text-lg font-semibold text-gray-900 dark:text-white">
          {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </motion.div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          label: 'Courses Completed', 
          value: user.stats.coursesCompleted, 
          icon: BookOpen, 
          color: 'blue',
          change: '+2 this month'
        },
        { 
          label: 'Events Attended', 
          value: user.stats.eventsAttended, 
          icon: Calendar, 
          color: 'green',
          change: '+1 this week'
        },
        { 
          label: 'Projects Submitted', 
          value: user.stats.projectsSubmitted, 
          icon: Code, 
          color: 'purple',
          change: '+1 this month'
        },
        { 
          label: 'Certificates Earned', 
          value: user.stats.certificatesEarned, 
          icon: Award, 
          color: 'yellow',
          change: '+3 this month'
        }
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-${stat.color}-500/25`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
          <p className="text-green-600 dark:text-green-400 text-xs font-medium">{stat.change}</p>
        </motion.div>
      ))}
    </div>

    {/* Recent Activity */}
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Recent Courses */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Continue Learning</h3>
        <div className="space-y-4">
          {[
            { name: 'Advanced React Patterns', progress: 75, color: 'blue' },
            { name: 'AI & Machine Learning', progress: 45, color: 'purple' },
            { name: 'Full-Stack Development', progress: 90, color: 'green' }
          ].map((course, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{course.name}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`bg-gradient-to-r from-${course.color}-400 to-${course.color}-600 h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h3>
        <div className="space-y-4">
          {[
            { name: 'AI Summit 2025', date: 'Mar 15', time: '10:00 AM' },
            { name: 'React Conference', date: 'Mar 22', time: '2:00 PM' },
            { name: 'Startup Pitch Day', date: 'Apr 5', time: '9:00 AM' }
          ].map((event, index) => (
            <motion.div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{event.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.date} • {event.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

// Other content components with enhanced animations
const EventsContent = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Events</h1>
      <motion.button
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register for Event
      </motion.button>
    </div>
    
    <div className="grid gap-6">
      {[
        { title: 'AI & Machine Learning Summit 2025', date: 'March 15, 2025', location: 'San Francisco, CA', status: 'Registered' },
        { title: 'React Developer Conference', date: 'March 22, 2025', location: 'New York, NY', status: 'Attending' },
        { title: 'Startup Pitch Competition', date: 'April 5, 2025', location: 'Austin, TX', status: 'Waitlist' }
      ].map((event, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">{event.date}</p>
              <p className="text-gray-500 dark:text-gray-500">{event.location}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'Registered' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                event.status === 'Attending' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CoursesContent = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Courses</h1>
      <motion.button
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Browse Courses
      </motion.button>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-6">
      {[
        { title: 'Advanced React Development', progress: 85, instructor: 'Sarah Johnson', duration: '12 weeks' },
        { title: 'AI & Machine Learning Fundamentals', progress: 60, instructor: 'Dr. Michael Chen', duration: '8 weeks' },
        { title: 'Full-Stack JavaScript', progress: 95, instructor: 'Alex Rodriguez', duration: '16 weeks' },
        { title: 'UI/UX Design Principles', progress: 30, instructor: 'Emma Wilson', duration: '10 weeks' }
      ].map((course, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg border border-purple-200/50 dark:border-purple-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">by {course.instructor}</p>
          <p className="text-gray-500 dark:text-gray-500 mb-4">{course.duration}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </div>
          
          <motion.button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Learning
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProjectsContent = () => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Projects</h1>
      <motion.button
        className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Upload Project
      </motion.button>
    </div>
    
    <div className="grid lg:grid-cols-2 gap-6">
      {[
        { title: 'AI-Powered Task Manager', tech: ['React', 'Node.js', 'OpenAI'], likes: 45, views: 234 },
        { title: 'E-commerce Platform', tech: ['Next.js', 'Stripe', 'MongoDB'], likes: 67, views: 456 },
        { title: 'Social Media Dashboard', tech: ['Vue.js', 'Express', 'PostgreSQL'], likes: 23, views: 123 },
        { title: 'Blockchain Voting System', tech: ['Solidity', 'Web3.js', 'React'], likes: 89, views: 567 }
      ].map((project, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 rounded-2xl p-6 shadow-lg border border-orange-200/50 dark:border-orange-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{project.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{project.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{project.views}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>
          
          <motion.button
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Project
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
);

// Simplified versions of other components for brevity
const CertificatesContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Certificates</h1>
    <div className="grid lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                React Development Certificate
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Completed on March {i}, 2025</p>
            </div>
          </div>
          <motion.button
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Certificate
          </motion.button>
        </motion.div>
      ))}
    </div>
  </div>
);

const AnalyticsContent = ({ user }: { user: any }) => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Learning Analytics</h1>
    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div
        className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Learning Progress</h3>
        <div className="space-y-4">
          {[
            { subject: 'React Development', progress: 85, color: 'blue' },
            { subject: 'AI & Machine Learning', progress: 60, color: 'purple' },
            { subject: 'UI/UX Design', progress: 40, color: 'pink' }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300">{item.subject}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className={`bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 h-3 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const GoalsContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Learning Goals</h1>
    <div className="space-y-6">
      {[
        { goal: 'Complete 5 AI Courses', current: 3, target: 5, deadline: 'End of 2025' },
        { goal: 'Attend 10 Tech Events', current: 8, target: 10, deadline: 'December 2025' },
        { goal: 'Build 3 Major Projects', current: 2, target: 3, deadline: 'November 2025' }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.goal}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Target: {item.deadline}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.current / item.target) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
            <div className="text-right ml-6">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{item.current}/{item.target}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const NotificationsContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Notifications</h1>
    <div className="space-y-4">
      {[
        { title: 'New course available', desc: 'Advanced React Patterns is now live', time: '2h ago', type: 'course' },
        { title: 'Event reminder', desc: 'AI Summit 2025 starts tomorrow', time: '1d ago', type: 'event' },
        { title: 'Certificate earned', desc: 'You completed JavaScript Fundamentals', time: '3d ago', type: 'achievement' },
        { title: 'Project liked', desc: 'Someone liked your AI Task Manager project', time: '1w ago', type: 'social' }
      ].map((notification, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-r from-white to-red-50 dark:from-gray-800 dark:to-red-900/20 rounded-xl p-4 flex items-center space-x-4 border border-red-200/50 dark:border-red-800/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{notification.desc}</p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const BillingContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
    <motion.div
      className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Premium Plan</h3>
          <p className="text-gray-600 dark:text-gray-400">$29/month • Next billing: March 15, 2025</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">$29</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>
        </div>
      </div>
      <motion.button
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Manage Subscription
      </motion.button>
    </motion.div>
  </div>
);

const SecurityContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
    <div className="space-y-6">
      <motion.div
        className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password Security</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Last changed 30 days ago</p>
        <motion.button
          className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-slate-700 hover:to-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Change Password
        </motion.button>
      </motion.div>
      
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Add an extra layer of security to your account</p>
        <motion.button
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enable 2FA
        </motion.button>
      </motion.div>
    </div>
  </div>
);

const HelpContent = () => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
    <div className="grid lg:grid-cols-2 gap-6">
      {[
        { title: 'Getting Started Guide', desc: 'Learn the basics of using Vihaya', icon: BookOpen },
        { title: 'Course Enrollment Help', desc: 'How to enroll and access courses', icon: HelpCircle },
        { title: 'Contact Support', desc: 'Get help from our support team', icon: MessageSquare },
        { title: 'Community Forum', desc: 'Connect with other learners', icon: Users }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);