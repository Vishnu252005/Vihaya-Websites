import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { sampleEvents, Event } from '../data/sampleData';
import { RegistrationModal } from './RegistrationModal';

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = (event: Event) => {
    console.log('Registering for event:', event.title);
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleViewAllEvents = () => {
    console.log('View All Events clicked');
    navigate('/events');
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Tech Events
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with industry leaders, learn cutting-edge technologies, and network with fellow innovators
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleEventClick(event.id)}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>

                {/* Register Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegister(event);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={handleViewAllEvents}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Events
          </motion.button>
        </motion.div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          type="event"
          item={selectedEvent}
        />
      )}
    </section>
  );
};