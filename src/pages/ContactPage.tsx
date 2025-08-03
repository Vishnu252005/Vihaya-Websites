import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@vihaya.com',
      action: 'mailto:hello@vihaya.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 5pm',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: 'San Francisco, CA',
      action: '#'
    }
  ];

  const faqs = [
    {
      question: 'How do I register for events?',
      answer: 'Simply browse our events page, find an event you\'re interested in, and click the "Register Now" button. You\'ll be guided through the registration process.'
    },
    {
      question: 'Are the courses self-paced?',
      answer: 'Most of our courses are self-paced, allowing you to learn at your own speed. Some courses may have live sessions or deadlines, which will be clearly indicated.'
    },
    {
      question: 'Can I submit my own project?',
      answer: 'Absolutely! We encourage students to showcase their projects. Visit the Projects page and click "Submit Project" to share your work with the community.'
    },
    {
      question: 'How does the AI assistant work?',
      answer: 'Our AI assistant is available 24/7 to help answer questions about courses, events, and provide personalized recommendations based on your interests and goals.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Contact Vihaya - Get Support & Connect With Our Team"
        description="Need help with Vihaya's learning platform? Contact our support team for assistance with courses, events, projects, or technical issues. We're here to help!"
        keywords="Vihaya contact, customer support, help center, technical support, learning platform assistance, contact form"
        canonicalUrl="https://vihaya.com/contact"
      />
    <div className="min-h-screen bg-white dark:bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions about our platform? We're here to help you succeed in your learning journey.
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Founder
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The visionary behind Vihaya's AI-powered learning platform
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Founder Photo */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Vishnu - Founder & CEO of Vihaya"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">V</span>
              </div>
            </motion.div>

            {/* Founder Info */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Vishnu
              </h3>
              <p className="text-xl text-blue-600 dark:text-blue-400 mb-4 font-semibold">
                Founder & CEO
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-2xl">
                Vishnu is a visionary entrepreneur and technology leader with over 10 years of experience 
                in AI and education technology. He founded Vihaya with the mission to democratize learning 
                through AI-powered personalization, making quality education accessible to developers worldwide. 
                His passion for innovation and commitment to empowering learners drives Vihaya's continuous evolution.
              </p>
              
              {/* Achievements */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Students Impacted</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Awards Won</div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <motion.a
                  href="https://linkedin.com/in/vishnu-vihaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Vishnu's LinkedIn Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://twitter.com/vishnu_vihaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Vishnu's Twitter Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://github.com/vishnu-vihaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Vishnu's GitHub Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://instagram.com/vishnu.vihaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Vishnu's Instagram Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817C19.988 13.056 20 12.716 20 10s-.012-3.056-.06-4.123C19.833 2.245 17.815.228 14.183.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.009 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </div>

              {/* Quote */}
              <motion.div
                className="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl border-l-4 border-blue-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-3">
                  "Education is the most powerful weapon which you can use to change the world. 
                  At Vihaya, we're not just teaching code - we're empowering the next generation 
                  of innovators to build the future."
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  - Vishnu, Founder & CEO
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="events">Events</option>
                  <option value="courses">Courses</option>
                  <option value="projects">Projects</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.action}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {info.description}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Office Hours</h3>
              </div>
              <div className="space-y-2 text-blue-100">
                <p>Monday - Friday: 8:00 AM - 6:00 PM PST</p>
                <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-blue-400">
                <Globe className="w-5 h-5" />
                <span className="text-sm">We serve customers worldwide</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};