import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, GitBranch, Users, Code, Zap } from 'lucide-react';

interface Hero3DProps {
  onGetStarted?: () => void;
}

const Hero3D: React.FC<Hero3DProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000000%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2"
              >
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Trusted by 10,000+ developers
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                Build the future with
                <span className="block text-blue-600 dark:text-blue-400">
                  collaborative learning
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg"
              >
                Join millions of developers in building, learning, and sharing code. 
                Discover events, master new skills, and showcase your projects.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={onGetStarted}
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get started for free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a project
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
            >
              {[
                { number: '100M+', label: 'Developers' },
                { number: '330M+', label: 'Repositories' },
                { number: '4M+', label: 'Organizations' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-800 dark:bg-gray-700 px-4 py-3 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400 ml-4">vihaya-project</div>
              </div>

              {/* Code Content */}
              <div className="p-6 text-sm font-mono">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <div className="text-green-400">$ npm create vihaya-app</div>
                  <div className="text-gray-400">✓ Creating new project...</div>
                  <div className="text-gray-400">✓ Installing dependencies...</div>
                  <div className="text-blue-400">
                    <span className="text-gray-500">import</span> {`{ Course, Event }`} <span className="text-gray-500">from</span> <span className="text-yellow-300">'@vihaya/core'</span>
                  </div>
                  <div className="text-blue-400">
                    <span className="text-gray-500">import</span> {`{ AI }`} <span className="text-gray-500">from</span> <span className="text-yellow-300">'@vihaya/ai'</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="text-purple-400">const</span> <span className="text-blue-300">app</span> = <span className="text-yellow-300">new</span> <span className="text-green-300">VihayaApp</span>()
                  </div>
                  <div className="text-gray-400">
                    app.<span className="text-blue-300">use</span>(<span className="text-green-300">AI</span>.<span className="text-blue-300">assistant</span>())
                  </div>
                  <div className="text-green-400">✓ Ready to learn and build!</div>
                </motion.div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg"
            >
              <GitBranch className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg"
            >
              <Code className="w-6 h-6" />
            </motion.div>

            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-1/2 -right-8 bg-purple-500 text-white p-3 rounded-lg shadow-lg"
            >
              <Zap className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;