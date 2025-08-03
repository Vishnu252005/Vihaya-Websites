import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Code, 
  Award, 
  Target, 
  Clock,
  CheckCircle,
  BarChart3,
  Trophy,
  Flame,
  Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProgressData {
  coursesCompleted: number;
  coursesInProgress: number;
  eventsAttended: number;
  projectsSubmitted: number;
  certificatesEarned: number;
  totalLearningHours: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface LearningActivity {
  id: string;
  type: 'course' | 'event' | 'project';
  title: string;
  completedAt: Date;
  progress: number;
  timeSpent: number;
}

export const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData>({
    coursesCompleted: 12,
    coursesInProgress: 3,
    eventsAttended: 8,
    projectsSubmitted: 5,
    certificatesEarned: 7,
    totalLearningHours: 156,
    currentStreak: 7,
    longestStreak: 21,
    weeklyGoal: 10,
    weeklyProgress: 7
  });

  const [recentActivity, setRecentActivity] = useState<LearningActivity[]>([
    {
      id: '1',
      type: 'course',
      title: 'Advanced React Patterns',
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      progress: 85,
      timeSpent: 4.5
    },
    {
      id: '2',
      type: 'event',
      title: 'AI Summit 2025',
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      progress: 100,
      timeSpent: 8
    },
    {
      id: '3',
      type: 'project',
      title: 'E-commerce Platform',
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      progress: 100,
      timeSpent: 12
    }
  ]);

  const [achievements, setAchievements] = useState([
    { id: '1', title: 'First Course Completed', icon: BookOpen, earned: true, date: '2024-01-15' },
    { id: '2', title: '7-Day Learning Streak', icon: Flame, earned: true, date: '2024-02-01' },
    { id: '3', title: 'Event Enthusiast', icon: Calendar, earned: true, date: '2024-02-15' },
    { id: '4', title: 'Project Master', icon: Code, earned: false, date: null },
    { id: '5', title: '30-Day Streak', icon: Trophy, earned: false, date: null }
  ]);

  const weeklyProgressPercentage = (progressData.weeklyProgress / progressData.weeklyGoal) * 100;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'event': return Calendar;
      case 'project': return Code;
      default: return CheckCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      case 'event': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'project': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning journey and achievements
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
          <Flame className="w-5 h-5" />
          <span className="font-bold">{progressData.currentStreak} day streak</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Courses Completed',
            value: progressData.coursesCompleted,
            icon: BookOpen,
            color: 'blue',
            change: '+2 this month'
          },
          {
            label: 'Events Attended',
            value: progressData.eventsAttended,
            icon: Calendar,
            color: 'green',
            change: '+1 this week'
          },
          {
            label: 'Projects Submitted',
            value: progressData.projectsSubmitted,
            icon: Code,
            color: 'purple',
            change: '+1 this month'
          },
          {
            label: 'Certificates Earned',
            value: progressData.certificatesEarned,
            icon: Award,
            color: 'yellow',
            change: '+3 this month'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
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

      {/* Weekly Goal Progress */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Goal</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {progressData.weeklyProgress} of {progressData.weeklyGoal} hours completed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(weeklyProgressPercentage)}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">This week</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full flex items-center justify-end pr-2"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(weeklyProgressPercentage, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {weeklyProgressPercentage > 20 && (
              <span className="text-white text-xs font-medium">
                {progressData.weeklyProgress}h
              </span>
            )}
          </motion.div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>0h</span>
          <span>{progressData.weeklyGoal}h goal</span>
        </div>
      </motion.div>

      {/* Recent Activity & Achievements */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{activity.completedAt.toLocaleDateString()}</span>
                      <span>{activity.timeSpent}h spent</span>
                      {activity.progress < 100 && (
                        <span>{activity.progress}% complete</span>
                      )}
                    </div>
                  </div>
                  {activity.progress === 100 && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Achievements</h3>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-700 opacity-60'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: achievement.earned ? 1 : 0.6, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: achievement.earned ? 1.02 : 1 }}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                }`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned && achievement.date && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Learning Insights */}
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Learning Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">Your learning patterns and recommendations</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {progressData.totalLearningHours}h
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Learning Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              {progressData.longestStreak}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Longest Streak (days)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              92%
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Course Completion Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};