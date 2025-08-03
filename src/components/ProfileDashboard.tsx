import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Edit3,
  Camera,
  Star,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'events', label: 'My Events', icon: Calendar },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'projects', label: 'My Projects', icon: Code },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'goals', label: 'Learning Goals', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent user={user} />;
      case 'events':
        return <EventsContent />;
      case 'courses':
        return <CoursesContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'certificates':
        return <CertificatesContent />;
      case 'analytics':
        return <AnalyticsContent user={user} />;
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
        return <ProfileContent user={user} />;
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

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="w-full max-w-6xl ml-auto bg-white dark:bg-gray-900 shadow-2xl flex">
              {/* Sidebar */}
              <div className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                    <motion.button
                      onClick={onClose}
                      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                  {sidebarItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  {renderContent()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Profile Content Component
const ProfileContent: React.FC<{ user: any }> = ({ user }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
      <motion.button
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Edit3 className="w-4 h-4" />
        <span>Edit Profile</span>
      </motion.button>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* Avatar Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
        <div className="relative inline-block mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
          <motion.button
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera className="w-4 h-4" />
          </motion.button>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{user?.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{user?.email}</p>
        <div className="flex items-center justify-center space-x-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{user?.role}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {[
          { label: 'Courses Completed', value: user?.stats.coursesCompleted, icon: BookOpen, color: 'blue' },
          { label: 'Events Attended', value: user?.stats.eventsAttended, icon: Calendar, color: 'green' },
          { label: 'Projects Submitted', value: user?.stats.projectsSubmitted, icon: Code, color: 'purple' },
          { label: 'Certificates Earned', value: user?.stats.certificatesEarned, icon: Award, color: 'yellow' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Other content components (simplified for brevity)
const EventsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Events</h1>
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            AI Conference 2025 #{i}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">March 15, 2025 • San Francisco</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CoursesContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Courses</h1>
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            React Development Course #{i}
          </h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${75 + i * 5}%` }} />
          </div>
          <p className="text-gray-600 dark:text-gray-400">{75 + i * 5}% Complete</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ProjectsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Projects</h1>
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Project #{i}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">AI-powered web application</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const CertificatesContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Certificates</h1>
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Certificate #{i}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Completed React Development</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const AnalyticsContent = ({ user }: { user: any }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Learning Analytics</h1>
    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Progress Overview</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Courses</span>
              <span className="text-gray-900 dark:text-white font-medium">75%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const GoalsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Learning Goals</h1>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Complete 5 AI Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Target: End of 2025</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{i}/5</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const NotificationsContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Notifications</h1>
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-2 h-2 bg-blue-600 rounded-full" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">New course available</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Advanced React Patterns is now live</p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">2h ago</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const BillingContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Billing & Subscription</h1>
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium Plan</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">$29/month • Next billing: March 15, 2025</p>
      <motion.button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Manage Subscription
      </motion.button>
    </div>
  </div>
);

const SecurityContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Security Settings</h1>
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h3>
        <motion.button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Change Password
        </motion.button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <motion.button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enable 2FA
        </motion.button>
      </div>
    </div>
  </div>
);

const HelpContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Help & Support</h1>
    <div className="grid gap-6">
      {[
        { title: 'Getting Started Guide', desc: 'Learn the basics of using Vihaya' },
        { title: 'Course Enrollment Help', desc: 'How to enroll and access courses' },
        { title: 'Contact Support', desc: 'Get help from our support team' },
        { title: 'Community Forum', desc: 'Connect with other learners' }
      ].map((item, i) => (
        <motion.div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);