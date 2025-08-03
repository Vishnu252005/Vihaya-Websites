import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  Award, 
  BookOpen, 
  Play, 
  Lock, 
  CheckCircle,
  Download,
  Share2,
  Heart,
  User,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';
import { sampleCourses, Course } from '../data/sampleData';
import { RegistrationModal } from '../components/RegistrationModal';
import { DiscussionForum } from '../components/DiscussionForum';
import { useBookmarks } from '../components/BookmarkSystem';
import { VideoPlayer } from '../components/VideoPlayer';

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Find the course by ID
  const course = sampleCourses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <SEOHead
          title="Course Not Found - Vihaya"
          description="The requested course could not be found on Vihaya's learning platform."
          noIndex={true}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Not Found</h1>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  // Course Schema Markup
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "Vihaya",
      "url": "https://vihaya.com"
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor
    },
    "courseCode": course.id,
    "educationalLevel": course.level,
    "timeRequired": course.duration,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "ratingCount": course.students,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://vihaya.com/courses/${course.id}`
    },
    "image": course.image,
    "url": `https://vihaya.com/courses/${course.id}`,
    "keywords": course.tags.join(', ')
  };

  const handleEnroll = () => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: course.description,
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
      id: course.id,
      type: 'course',
      title: course.title,
      description: course.description,
      image: course.image,
      instructor: course.instructor,
      price: course.price
    });
  };

  const curriculum = [
    {
      title: 'Getting Started with React',
      lessons: [
        { title: 'Introduction to React', duration: '15 min', locked: false },
        { title: 'Setting up Development Environment', duration: '20 min', locked: false },
        { title: 'Your First React Component', duration: '25 min', locked: false },
        { title: 'Understanding JSX', duration: '18 min', locked: true }
      ]
    },
    {
      title: 'React Fundamentals',
      lessons: [
        { title: 'Components and Props', duration: '30 min', locked: true },
        { title: 'State and Lifecycle', duration: '35 min', locked: true },
        { title: 'Handling Events', duration: '25 min', locked: true },
        { title: 'Conditional Rendering', duration: '20 min', locked: true }
      ]
    },
    {
      title: 'Advanced React Concepts',
      lessons: [
        { title: 'React Hooks Deep Dive', duration: '45 min', locked: true },
        { title: 'Context API and State Management', duration: '40 min', locked: true },
        { title: 'Performance Optimization', duration: '35 min', locked: true },
        { title: 'Testing React Applications', duration: '50 min', locked: true }
      ]
    },
    {
      title: 'Building Real Projects',
      lessons: [
        { title: 'Project 1: Todo Application', duration: '60 min', locked: true },
        { title: 'Project 2: Weather Dashboard', duration: '75 min', locked: true },
        { title: 'Project 3: E-commerce Store', duration: '90 min', locked: true },
        { title: 'Final Project and Deployment', duration: '120 min', locked: true }
      ]
    }
  ];

  const features = [
    { icon: Monitor, label: 'HD Video Lessons' },
    { icon: Download, label: 'Downloadable Resources' },
    { icon: Smartphone, label: 'Mobile Access' },
    { icon: Award, label: 'Certificate of Completion' },
    { icon: Users, label: 'Community Access' },
    { icon: Globe, label: 'Lifetime Access' }
  ];

  const requirements = [
    'Basic understanding of HTML and CSS',
    'Familiarity with JavaScript fundamentals',
    'A computer with internet connection',
    'Code editor (VS Code recommended)'
  ];

  const learningOutcomes = [
    'Build modern React applications from scratch',
    'Master React hooks and state management',
    'Implement responsive and interactive UIs',
    'Deploy React applications to production',
    'Follow React best practices and patterns',
    'Debug and optimize React applications'
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'discussion', label: 'Discussion' }
  ];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <>
      <SEOHead
        title={`${course.title} - Online Course by ${course.instructor} | Vihaya`}
        description={`Master ${course.title} with ${course.instructor} on Vihaya. ${course.level} level course, ${course.duration} duration. Join ${course.students}+ students. Enroll now!`}
        keywords={`${course.title}, ${course.instructor}, ${course.level} course, ${course.tags.join(', ')}, Vihaya courses, online learning, programming course`}
        canonicalUrl={`https://vihaya.com/courses/${course.id}`}
        ogType="course"
        ogImage={course.image}
        schemaMarkup={courseSchema}
      />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigate('/courses')}
              className="flex items-center space-x-2 text-white mb-6 hover:text-blue-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  ${course.price}
                </span>
                <div className="flex items-center space-x-1 bg-white/20 text-white px-3 py-2 rounded-full">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mb-6">
                {course.description}
              </p>
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>by {course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
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
                    {/* Course Preview Video */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Course Preview
                      </h3>
                      <VideoPlayer
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        title={course.title}
                        description="Get a preview of what you'll learn in this course"
                        thumbnail={course.image}
                        instructor={course.instructor}
                        duration="5:30"
                      />
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        What You'll Learn
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Course Features */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Course Features
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <feature.icon className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-700 dark:text-gray-300">{feature.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'curriculum' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Course Curriculum
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {curriculum.reduce((total, section) => total + section.lessons.length, 0)} lessons
                      </span>
                    </div>
                    
                    {curriculum.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                      >
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {section.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {section.lessons.length} lessons
                          </p>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <motion.div
                              key={lessonIndex}
                              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex items-center space-x-3">
                                {lesson.locked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <Play className="w-4 h-4 text-green-500" />
                                )}
                                <span className={`${
                                  lesson.locked 
                                    ? 'text-gray-500 dark:text-gray-400' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {lesson.duration}
                                </span>
                                {lesson.locked && (
                                  <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full">
                                    Premium
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'instructor' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start space-x-6">
                      <img
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                        alt={course.instructor}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {course.instructor}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 mb-4">
                          Senior React Developer & Instructor
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>4.9 instructor rating</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>15,000+ students</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>12 courses</span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Sarah is a passionate React developer with over 8 years of experience building 
                          scalable web applications. She has worked at top tech companies including Google 
                          and Facebook, and has been teaching React development for the past 5 years. 
                          Her courses have helped thousands of developers master modern React development.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                          {course.rating}
                        </div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Course rating</p>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                                {rating}★
                              </span>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                                {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          name: 'Alex Johnson',
                          rating: 5,
                          comment: 'Excellent course! Sarah explains complex concepts in a very clear and understandable way. The projects are practical and really help solidify the learning.',
                          date: '2 weeks ago'
                        },
                        {
                          name: 'Maria Garcia',
                          rating: 5,
                          comment: 'This course transformed my React skills. The curriculum is well-structured and the instructor is very knowledgeable. Highly recommended!',
                          date: '1 month ago'
                        },
                        {
                          name: 'David Chen',
                          rating: 4,
                          comment: 'Great content and good pace. Would love to see more advanced topics covered in future updates.',
                          date: '3 weeks ago'
                        }
                      ].map((review, index) => (
                        <motion.div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 pb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {review.name}
                                </h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {review.date}
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'discussion' && (
                  <DiscussionForum courseId={course.id} type="course" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600 dark:text-gray-400">one-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Students</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language</span>
                  <span className="font-medium text-gray-900 dark:text-white">English</span>
                </div>
              </div>

              <motion.button
                onClick={handleEnroll}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enroll Now
              </motion.button>

              <div className="flex space-x-3">
                <motion.button
                  onClick={handleBookmarkToggle}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all duration-300 ${
                    isBookmarked(course.id, 'course')
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked(course.id, 'course') ? 'fill-current' : ''}`} />
                  <span>{isBookmarked(course.id, 'course') ? 'Saved' : 'Save'}</span>
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
            </motion.div>

            {/* Course Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Course Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">95% completion rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Project-based learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Self-paced learning</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          type="course"
          item={selectedCourse}
        />
      )}
    </div>
    </>
  );
};