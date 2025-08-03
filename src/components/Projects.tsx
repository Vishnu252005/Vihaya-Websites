import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Heart, Filter, Code, Zap } from 'lucide-react';
import { sampleProjects, Project } from '../data/sampleData';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const categories = ['All', 'AI/ML', 'E-commerce', 'Healthcare', 'Fintech', 'Education'];

  const filteredProjects = selectedCategory === 'All' 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === selectedCategory);

  const handleLike = (projectId: string) => {
    const newLikedProjects = new Set(likedProjects);
    if (newLikedProjects.has(projectId)) {
      newLikedProjects.delete(projectId);
    } else {
      newLikedProjects.add(projectId);
    }
    setLikedProjects(newLikedProjects);
    console.log(`Project ${projectId} ${newLikedProjects.has(projectId) ? 'liked' : 'unliked'}`);
  };

  const handleSubmitProject = () => {
    console.log('Submit Project clicked');
    // Navigate to a submit project page or show modal
    alert('Project submission feature coming soon! This would navigate to /projects/submit');
  };

  const handleViewProject = (project: Project) => {
    console.log('View project:', project.title);
    navigate(`/projects/${project.id}`);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI/ML': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'E-commerce': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Healthcare': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      'Fintech': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Education': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Student Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover innovative projects built by our talented community of students and innovators
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleViewProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(project.id);
                    }}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      likedProjects.has(project.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      by {project.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </motion.a>
                  
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <Code className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Share Your Project</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Built something amazing? Share your project with our community and get feedback from fellow developers.
          </p>
          <motion.button
            onClick={handleSubmitProject}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};