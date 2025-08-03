import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
      "That's a great question! I can help you find relevant events and courses based on your interests.",
      "I'd be happy to assist you with that! Let me provide you with some personalized recommendations.",
      "Interesting! Based on our platform data, here are some suggestions that might interest you.",
      "Great to see your enthusiasm for learning! Here are some curated options for you."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    console.log('AI Chat opened');
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    console.log('AI Chat closed');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: isOpen ? 'none' : '0 10px 25px rgba(59, 130, 246, 0.3)' 
        }}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleCloseChat}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Vihaya AI</h3>
                    <p className="text-blue-100 text-xs">Always here to help</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleCloseChat}
                  className="text-white/80 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className={`px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};