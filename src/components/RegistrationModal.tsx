import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, BookOpen, User, Mail, Phone, CreditCard, Check, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'event' | 'course';
  item: {
    id: string;
    title: string;
    price: number;
    date?: string;
    duration?: string;
    instructor?: string;
  };
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  item 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    experience: '',
    paymentMethod: 'credit-card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        experience: '',
        paymentMethod: 'credit-card'
      });
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setShowSuccess(false);
      setErrors({});
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
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Success State */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-10"
                  >
                    <div className="text-center text-white">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Check className="w-10 h-10" />
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold mb-4"
                      >
                        {type === 'event' ? 'Registration Successful!' : 'Enrollment Complete!'}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-green-100 text-lg"
                      >
                        Welcome to {item.title}! Check your email for confirmation details.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 flex items-center justify-center space-x-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        <span>Redirecting you shortly...</span>
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <motion.button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 text-white/80 hover:text-white disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {type === 'event' ? (
                      <Calendar className="w-6 h-6 text-white" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {type === 'event' ? 'Event Registration' : 'Course Enrollment'}
                    </h2>
                    <p className="text-blue-100">{item.title}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your first name"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your last name"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Additional Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your company name"
                        />
                      </div>
                      
                      {type === 'course' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Experience Level
                          </label>
                          <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select your experience level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Information */}
                  {item.price > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Payment Information
                      </h3>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Total Amount:</span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Payment Method
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="credit-card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank-transfer">Bank Transfer</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {type === 'event' ? 'Register for Event' : 'Enroll in Course'}
                        </span>
                        {item.price > 0 && <span>- ${item.price}</span>}
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};