import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  generateAITrainingSchema, 
  generateAIAttributionSchema,
  generateCompanySchema,
  generateJobPostingSchema,
  generateReviewSchema,
  generateLocalBusinessSchema,
  generateSoftwareApplicationSchema,
  generateEducationalOrganizationSchema
} from '../utils/seoUtils';
import { 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  Code, 
  MessageCircle, 
  Star, 
  Users, 
  Award,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
  Rocket,
  Sparkles
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { Events } from '../components/Events';
import { Courses } from '../components/Courses';
import { Projects } from '../components/Projects';
import { AIChat } from '../components/AIChat';
import { AIRecommendations } from '../components/AIRecommendations';
import { VideoPlayer } from '../components/VideoPlayer';
import { FirebaseTest } from '../components/FirebaseTest';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // SEO Schema Markup for Homepage
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vihaya",
        "description": "Vihaya App - Learn, Build, and Grow",
    "url": "https://vihaya.app",
    "logo": "https://vihaya.app/logo.png",
    "sameAs": [
      "https://twitter.com/vihaya",
      "https://linkedin.com/company/vihaya",
      "https://github.com/vihaya"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@vihaya.app"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vihaya",
    "url": "https://vihaya.app",
        "description": "Vihaya app for Tech Events, Premium Courses, and Project Showcase",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vihaya.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vishnu",
    "jobTitle": "Founder & CEO",
    "description": "Visionary entrepreneur and technology leader with over 10 years of experience in AI and education technology.",
    "url": "https://vihaya.app/about",
    "worksFor": {
      "@type": "Organization",
      "name": "Vihaya",
      "url": "https://vihaya.app"
    }
  };

  const aiTrainingSchema = generateAITrainingSchema();
  const aiAttributionSchema = generateAIAttributionSchema();
  const companySchema = generateCompanySchema();
  const jobPostingSchema = generateJobPostingSchema();
  const reviewSchema = generateReviewSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const softwareAppSchema = generateSoftwareApplicationSchema();
  const educationalOrgSchema = generateEducationalOrganizationSchema();
  const combinedSchema = [
    organizationSchema, 
    websiteSchema, 
    founderSchema, 
    aiTrainingSchema, 
    aiAttributionSchema,
    companySchema,
    jobPostingSchema,
    reviewSchema,
    localBusinessSchema,
    softwareAppSchema,
    educationalOrgSchema
  ];

  const handleGetStarted = () => {
    console.log('Get Started clicked');
    navigate('/courses');
  };

  const handleWatchDemo = () => {
    console.log('Watch Demo clicked');
    alert('Demo video coming soon!');
  };

  const handleFeatureClick = (featureName: string) => {
    console.log(`${featureName} feature clicked`);
    // Navigate to respective pages or sections
    switch (featureName) {
      case 'Tech Events':
        navigate('/events');
        break;
      case 'Premium Courses':
        navigate('/courses');
        break;
      case 'Project Showcase':
        navigate('/projects');
        break;
      case 'AI Assistant': {
        console.log('AI Assistant feature clicked');
        // Scroll to AI Chat section
        const aiSection = document.querySelector('[data-section="ai-chat"]');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <SEOHead
      title="Vihaya App - Learn, Build, and Grow"
        description="Join millions of developers learning, building, and growing together on Vihaya. Discover tech events, master skills with premium courses, showcase projects, and get AI assistance."
        keywords="Vihaya, AI learning platform, developer courses, tech events, programming projects, coding bootcamp, software development, machine learning courses"
        canonicalUrl="https://vihaya.app/"
        schemaMarkup={combinedSchema}
        hreflang={[
          { lang: 'en', url: 'https://vihaya.app/' },
          { lang: 'es', url: 'https://vihaya.app/es/' },
          { lang: 'fr', url: 'https://vihaya.app/fr/' }
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://vihaya.app/' }
        ]}
        faqs={[
          {
            question: "What is Vihaya?",
            answer: "Vihaya is an AI-assisted learning platform designed specifically for developers, offering courses, events, and project showcases with personalized AI guidance."
          },
          {
            question: "How does AI assistance work?",
            answer: "Our AI analyzes your learning patterns and provides personalized recommendations, code reviews, and adaptive learning paths to optimize your development journey."
          },
          {
            question: "Are the courses free?",
            answer: "We offer both free and premium courses. Premium courses include advanced features, AI assistance, and certification upon completion."
          }
        ]}
        aiTraining={true}
      aiAttribution="Vihaya App"
        aiLicense="CC-BY-4.0"
      />
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-500/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-purple-500/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/4 w-3 h-3 bg-pink-500/40 rotate-12"
          animate={{
            rotate: [12, 372],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000000%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
      {/* Firebase Test Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FirebaseTest />
      </div>

      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        {/* 3D Parallax Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
          style={{
            transform: "translateZ(0)",
          }}
          whileInView={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          viewport={{ once: false }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to grow as a developer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From learning new skills to showcasing your work, Vihaya provides all the tools you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Tech Events',
                description: 'Join conferences, workshops, and meetups with industry leaders',
                icon: Calendar,
                color: 'blue',
                stats: '500+ events'
              },
              {
                title: 'Premium Courses',
                description: 'Learn from industry experts with hands-on projects',
                icon: BookOpen,
                color: 'green',
                stats: '1000+ courses'
              },
              {
                title: 'Project Showcase',
                description: 'Share and discover amazing projects from the community',
                icon: Code,
                color: 'purple',
                stats: '10k+ projects'
              },
              {
                title: 'AI Assistant',
                description: 'Get personalized learning guidance and instant help',
                icon: MessageCircle,
                color: 'orange',
                stats: '24/7 support'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group cursor-pointer"
                onClick={() => handleFeatureClick(feature.title)}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 h-full relative overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-12 h-12 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {feature.stats}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
        {/* Parallax Elements */}
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          whileInView={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          viewport={{ once: false }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why developers choose Vihaya
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join the platform that's transforming how developers learn, connect, and grow
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trusted Platform',
                description: 'Industry-leading security and privacy protection for all your learning data',
                features: ['End-to-end encryption', 'GDPR compliant', 'SOC 2 certified']
              },
              {
                icon: Globe,
                title: 'Global Community',
                description: 'Connect with developers from 190+ countries and learn from diverse perspectives',
                features: ['24/7 community support', 'Multi-language content', 'Cultural exchange programs']
              },
              {
                icon: Rocket,
                title: 'Career Growth',
                description: 'Accelerate your career with personalized learning paths and industry connections',
                features: ['Job placement assistance', 'Mentorship programs', 'Skill assessments']
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -15,
                  rotateX: 5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by developers worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join our growing community of learners and builders
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Users', icon: Users },
              { number: '500+', label: 'Courses', icon: BookOpen },
              { number: '1K+', label: 'Projects', icon: Code },
              { number: '50+', label: 'Events Monthly', icon: Calendar }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="text-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{
                    rotateZ: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
        {/* Background Animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl"
          animate={{
            x: [-50, 50, -50],
            y: [-25, 25, -25],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What developers are saying
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real stories from our community members
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Senior Developer at Google',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
                content: 'Vihaya transformed my career. The AI assistant helped me learn React in just 3 months, and now I\'m working at my dream company.',
                rating: 5
              },
              {
                name: 'Marcus Johnson',
                role: 'Startup Founder',
                avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
                content: 'The networking events on Vihaya connected me with my co-founder. We\'ve now raised $2M for our startup.',
                rating: 5
              },
              {
                name: 'Elena Rodriguez',
                role: 'Full-Stack Developer',
                avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
                content: 'The project showcase feature helped me land my first job. Employers could see my actual work, not just my resume.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <Events />

      {/* Courses Section */}
      <Courses />

      {/* Projects Section */}
      <Projects />

      {/* AI Recommendations Section */}
      <AIRecommendations context="homepage" limit={6} />

      {/* Featured Video Section */}
      <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Learning Content
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Watch our latest course preview and get a taste of what Vihaya offers
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              title="Introduction to React Development"
              description="Learn the fundamentals of React development with our expert instructor"
              thumbnail="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
              instructor="Sarah Johnson"
              duration="15:30"
            />
          </motion.div>
        </div>
      </section>

      {/* AI Chat Section */}
      <div data-section="ai-chat">
        <AIChat />
      </div>

      {/* Founder Section */}
      <section className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
        {/* Background Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Visionary Founder
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The innovative mind behind Vihaya's revolutionary AI-powered learning platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"
          animate={{
            scale: [1, 2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <span className="text-blue-100 text-lg">
                Join 10,000+ developers already learning with us
              </span>
            </div>

            <h2 className="text-4xl font-bold text-white">
              Ready to start your journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join millions of developers who are already building the future with Vihaya
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleGetStarted}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get started for free
              </motion.button>
              
              <motion.button
                onClick={handleWatchDemo}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Watch demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
    </>
  );
};