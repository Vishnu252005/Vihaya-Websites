import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle, Zap, BookOpen, Code } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant at Vihaya. I can help you discover events, recommend courses, assist with projects, and answer questions about technology and innovation. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What events are happening this week?",
    "Recommend a course for React development",
    "How can I showcase my project?",
    "Tell me about AI trends in 2025"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Based on our platform data, I can help you with that. Here are some personalized recommendations...",
      "I'd be happy to assist you with that! Let me provide you with some relevant information from our knowledge base...",
      "Interesting! I can see you're exploring innovative ideas. Here's what I recommend based on current trends...",
      "Great to see your enthusiasm for learning! Here are some curated suggestions that match your interests..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Assistant
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get personalized recommendations and instant answers to your questions about events, courses, and projects
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Vihaya AI</h3>
                <p className="text-blue-100 text-sm">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-600'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {question}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about events, courses, or projects..."
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={1}
                />
              </div>
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: MessageCircle,
              title: 'Smart Recommendations',
              description: 'Get personalized suggestions based on your interests and learning goals'
            },
            {
              icon: Zap,
              title: 'Instant Answers',
              description: 'Quick responses to questions about events, courses, and project guidance'
            },
            {
              icon: BookOpen,
              title: 'Learning Support',
              description: 'Assistance with course selection, project ideas, and skill development'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center"
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};