import React from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  Brain, 
  Target, 
  Users, 
  Award, 
  Clock, 
  Globe, 
  Heart, 
  Lightbulb,
  Rocket,
  Star,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { founderInfo } from '../data/sampleData';

export const AboutPage: React.FC = () => {
  // Founder Schema Markup for better SEO
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": founderInfo.name,
    "jobTitle": founderInfo.title,
    "description": founderInfo.bio,
    "image": founderInfo.image,
    "url": "https://vihaya.app/about",
    "sameAs": [
      founderInfo.socialMedia.linkedin,
      founderInfo.socialMedia.twitter,
      founderInfo.socialMedia.github
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Vihaya",
      "url": "https://vihaya.app"
    },
    "knowsAbout": ["AI", "Education Technology", "Developer Education", "Machine Learning", "EdTech"],
    "award": `${founderInfo.achievements.awardsWon} awards won`,
    "vision": founderInfo.vision
  };

  const companyValues = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to create personalized learning experiences that adapt to each student\'s unique needs.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our platform thrives on collaboration, peer learning, and the collective wisdom of our global developer community.'
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Every feature we build is designed to help learners achieve their career goals and unlock their full potential.'
    },
    {
      icon: Heart,
      title: 'Passion for Learning',
      description: 'We believe that learning should be engaging, accessible, and transformative for everyone, regardless of background.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Vishnu founded Vihaya with a vision to revolutionize developer education' },
    { year: '2021', title: 'First 1,000 Students', description: 'Reached our first major milestone with 1,000 active learners' },
    { year: '2022', title: 'AI Integration', description: 'Launched our proprietary AI recommendation engine' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded to serve students in over 50 countries worldwide' },
    { year: '2024', title: '50,000 Students', description: 'Celebrated reaching 50,000 students and 500+ courses' },
    { year: '2025', title: 'Next Generation Platform', description: 'Launching advanced features and enterprise solutions' }
  ];

  const teamStats = [
    { number: '50K+', label: 'Students Worldwide', icon: Users },
    { number: '500+', label: 'Expert Instructors', icon: Award },
    { number: '1000+', label: 'Courses Available', icon: Brain },
    { number: '50+', label: 'Countries Served', icon: Globe }
  ];

  return (
    <>
      <SEOHead
        title="About Vihaya - AI-Powered Learning Platform for Developers"
        description="Learn about Vihaya's mission to democratize developer education through AI. Meet our founder Vishnu and discover our journey to empower 50,000+ students worldwide."
        keywords="About Vihaya, Vishnu founder, AI learning platform, developer education, company mission, team, Vihaya story, Vihaya CEO, founder of Vihaya, Vishnu Vihaya"
        canonicalUrl="https://vihaya.app/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://vihaya.app/' },
          { name: 'About', url: 'https://vihaya.app/about' }
        ]}
        faqs={[
          {
            question: "Who is the founder of Vihaya?",
            answer: "Vishnu is the founder and CEO of Vihaya, a visionary entrepreneur with over 10 years of experience in AI and education technology."
          },
          {
            question: "What is Vihaya's mission?",
            answer: "Vihaya's mission is to democratize developer education through AI-powered personalization, making quality learning accessible to everyone, everywhere."
          },
          {
            question: "How many students has Vihaya helped?",
            answer: "Vihaya has empowered over 50,000 students worldwide with personalized AI-driven learning experiences."
          }
        ]}
        article={{
          title: "Meet Vishnu - Founder & CEO of Vihaya",
          description: "Learn about Vishnu, the visionary founder and CEO of Vihaya, who is revolutionizing developer education through AI-powered learning.",
          author: "Vihaya Team",
          publishedDate: "2025-01-15T10:00:00+00:00",
          modifiedDate: "2025-01-15T10:00:00+00:00",
          image: founderInfo.image,
          url: "https://vihaya.app/about"
        }}
        schemaMarkup={founderSchema}
      />
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Vihaya</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize developer education through AI-powered personalization, 
              making quality learning accessible to everyone, everywhere.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
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

      {/* Founder Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Visionary Founder
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The innovative mind behind Vihaya's revolutionary approach to developer education
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
                    <img
                      src={founderInfo.image}
                      alt={`${founderInfo.name} - ${founderInfo.title} of Vihaya`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white font-bold text-3xl">V</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Founder Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {founderInfo.name}
                </h3>
                <p className="text-2xl text-blue-600 dark:text-blue-400 mb-6 font-semibold">
                  {founderInfo.title}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {founderInfo.bio}
                </p>
              </div>

              {/* Achievements */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {founderInfo.achievements.yearsExperience}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {(founderInfo.achievements.studentsImpacted / 1000).toFixed(0)}K+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {founderInfo.achievements.awardsWon}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Industry Awards</div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Connect with Vishnu:</p>
                <div className="flex space-x-4">
                  <motion.a
                    href={founderInfo.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Vishnu's LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href={founderInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Vishnu's Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href={founderInfo.socialMedia.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Vishnu's GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  
                  <motion.a
                    href={founderInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Vishnu's Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123C19.833 2.245 17.815.228 14.183.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.009 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </div>

              {/* Quote */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-l-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-3">
                  "{founderInfo.quote}"
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  - {founderInfo.name}, {founderInfo.title}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do at Vihaya
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a vision to transform education to impacting thousands of developers worldwide
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                  </div>
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Rocket className="w-16 h-16 text-white mx-auto" />
            <h2 className="text-4xl font-bold text-white">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              {founderInfo.vision}
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Mission
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};