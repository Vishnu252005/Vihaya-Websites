import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  Share2, 
  Heart, 
  Star,
  CheckCircle,
  User,
  Building,
  Globe,
  Ticket,
  Award,
  Coffee,
  Wifi,
  Car
} from 'lucide-react';
import { sampleEvents, Event } from '../data/sampleData';
import { RegistrationModal } from '../components/RegistrationModal';
import { DiscussionForum } from '../components/DiscussionForum';
import { useBookmarks } from '../components/BookmarkSystem';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Find the event by ID
  const event = sampleEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <SEOHead
          title="Event Not Found - Vihaya"
          description="The requested event could not be found on Vihaya's platform."
          noIndex={true}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/events')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Event Schema Markup
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.date,
    "endDate": event.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location.split(', ')[0],
        "addressRegion": event.location.split(', ')[1] || "",
        "addressCountry": "US"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Vihaya",
      "url": "https://vihaya.app"
    },
    "offers": {
      "@type": "Offer",
      "price": event.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://vihaya.app/events/${event.id}`
    },
    "image": event.image,
    "url": `https://vihaya.app/events/${event.id}`
  };

  const handleRegister = () => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: event.description,
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
      id: event.id,
      type: 'event',
      title: event.title,
      description: event.description,
      image: event.image,
      date: event.date,
      price: event.price
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'discussion', label: 'Discussion' }
  ];

  const speakers = [
    { name: 'Dr. Sarah Chen', role: 'AI Research Director at Google', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { name: 'Vishnu', role: 'Founder & CEO at Vihaya', avatar: '/assets/vishnu.jpg' },
    { name: 'Elena Rodriguez', role: 'VP of Engineering at OpenAI', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' }
  ];

  const agenda = [
    { time: '9:00 AM', title: 'Registration & Welcome Coffee', speaker: 'Event Team' },
    { time: '9:30 AM', title: 'Opening Keynote: The Future of AI', speaker: 'Dr. Sarah Chen' },
    { time: '10:30 AM', title: 'Building AI-Powered EdTech Platforms', speaker: 'Vishnu' },
    { time: '11:30 AM', title: 'Coffee Break & Networking', speaker: '' },
    { time: '12:00 PM', title: 'AI Ethics and Responsible Development', speaker: 'Elena Rodriguez' },
    { time: '1:00 PM', title: 'Lunch & Panel Discussion', speaker: 'All Speakers' },
    { time: '2:30 PM', title: 'Hands-on Workshop: Building AI Models', speaker: 'Technical Team' },
    { time: '4:00 PM', title: 'Q&A and Closing Remarks', speaker: 'All Speakers' }
  ];

  const amenities = [
    { icon: Coffee, label: 'Free Coffee & Snacks' },
    { icon: Wifi, label: 'High-Speed WiFi' },
    { icon: Car, label: 'Free Parking' },
    { icon: Award, label: 'Certificate of Attendance' },
    { icon: Ticket, label: 'Event Swag Bag' },
    { icon: Users, label: 'Networking Opportunities' }
  ];

  return (
    <>
      <SEOHead
        title={`${event.title} - Tech Event on Vihaya`}
        description={`Join ${event.title} in ${event.location}. ${event.description.substring(0, 120)}... Register now on Vihaya's platform.`}
        keywords={`${event.title}, ${event.category}, tech event, ${event.location}, Vihaya events, developer conference, programming meetup`}
        canonicalUrl={`https://vihaya.app/events/${event.id}`}
        ogType="event"
        ogImage={event.image}
        schemaMarkup={eventSchema}
      />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.button
              onClick={() => navigate('/events')}
              className="flex items-center space-x-2 text-white mb-6 hover:text-blue-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Events</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {event.price === 0 ? 'Free Event' : `$${event.price}`}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                {event.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
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
                  <div className="space-y-8">
            {/* Event Details */}
                    <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Date & Time</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">9:00 AM - 5:00 PM PST</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">{event.location}</p>
                    <p className="text-gray-600 dark:text-gray-400">Moscone Center, Hall A</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Attendees</p>
                    <p className="text-gray-600 dark:text-gray-400">{event.attendees} registered</p>
                    <p className="text-gray-600 dark:text-gray-400">500 max capacity</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Building className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Organizer</p>
                    <p className="text-gray-600 dark:text-gray-400">Vihaya Events</p>
                    <p className="text-gray-600 dark:text-gray-400">Tech Conference Series</p>
                  </div>
                </div>
              </div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's Included</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {amenities.map((amenity, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-3"
                            whileHover={{ x: 5 }}
                          >
                            <amenity.icon className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 dark:text-gray-300">{amenity.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'agenda' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Agenda</h2>
                    <div className="space-y-4">
                      {agenda.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="w-20 text-sm font-medium text-blue-600 dark:text-blue-400">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            {item.speaker && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                by {item.speaker}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'speakers' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Speakers</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {speakers.map((speaker, index) => (
                        <motion.div
                          key={index}
                          className="text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={speaker.avatar}
                            alt={speaker.name}
                            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                          />
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {speaker.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {speaker.role}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <DiscussionForum eventId={event.id} type="event" />
                )}
              </div>
            </motion.div>

            {/* Speakers */}
            {/* <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Speakers</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {speakers.map((speaker, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {speaker.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section> */}

            {/* Agenda */}
            {/* <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Agenda</h2>
              <div className="space-y-4">
                {agenda.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-20 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.speaker && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {item.speaker}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section> */}

            {/* What's Included */}
            {/* <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    whileHover={{ x: 5 }}
                  >
                    <amenity.icon className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">{amenity.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </div>
                <p className="text-gray-600 dark:text-gray-400">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available Spots</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {500 - event.attendees} left
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">8 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Language</span>
                  <span className="font-medium text-gray-900 dark:text-white">English</span>
                </div>
              </div>

              <motion.button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
              </motion.button>

              <div className="flex space-x-3">
                <motion.button
                  onClick={handleBookmarkToggle}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all duration-300 ${
                    isBookmarked(event.id, 'event')
                      ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className={`w-4 h-4 ${isBookmarked(event.id, 'event') ? 'fill-current' : ''}`} />
                  <span>{isBookmarked(event.id, 'event') ? 'Saved' : 'Save'}</span>
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

            {/* Event Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Event Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">4.9/5 rating from past events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">500+ attendees expected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live streaming available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
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
    </div>
    </>
  );
};