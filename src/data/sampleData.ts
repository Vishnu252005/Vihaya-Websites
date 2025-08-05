export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image: string;
  price: number;
  attendees: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  rating: number;
  students: number;
  image: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  likes: number;
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Summit 2025',
    description: 'Join industry leaders to explore the latest breakthroughs in AI and machine learning technologies.',
    date: '2025-03-15',
    location: 'San Francisco, CA',
    category: 'AI/ML',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 299,
    attendees: 500
  },
  {
    id: '2',
    title: 'Web3 Developer Conference',
    description: 'Discover the future of decentralized web technologies and blockchain development.',
    date: '2025-04-22',
    location: 'New York, NY',
    category: 'Blockchain',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 199,
    attendees: 300
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative startup ideas to top venture capitalists and angel investors.',
    date: '2025-05-10',
    location: 'Austin, TX',
    category: 'Startup',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 0,
    attendees: 150
  }
];

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Bootcamp',
    description: 'Master React from basics to advanced concepts including hooks, context, and performance optimization.',
    instructor: 'Sarah Johnson',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 299,
    rating: 4.8,
    students: 1250,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'AI for Entrepreneurs',
    description: 'Learn how to integrate artificial intelligence into your business strategy and operations.',
    instructor: 'Dr. Michael Chen',
    duration: '8 weeks',
    level: 'Beginner',
    price: 199,
    rating: 4.9,
    students: 890,
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['AI', 'Business', 'Strategy']
  },
  {
    id: '3',
    title: 'Full-Stack JavaScript Development',
    description: 'Build complete web applications using Node.js, Express, MongoDB, and modern frontend frameworks.',
    instructor: 'Alex Rodriguez',
    duration: '16 weeks',
    level: 'Advanced',
    price: 399,
    rating: 4.7,
    students: 675,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Node.js', 'MongoDB', 'Full-Stack']
  }
];

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Smart City Traffic Optimizer',
    description: 'AI-powered traffic management system that reduces congestion by 40% using real-time data analysis.',
    author: 'Emma Williams',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'IoT', 'Cloud'],
    image: 'https://images.pexels.com/photos/10668231/pexels-photo-10668231.jpeg?auto=compress&cs=tinysrgb&w=600',
    githubUrl: 'https://github.com/example/traffic-optimizer',
    liveUrl: 'https://traffic-optimizer-demo.com',
    likes: 245
  },
  {
    id: '2',
    title: 'Sustainable Fashion Marketplace',
    description: 'E-commerce platform connecting eco-conscious consumers with sustainable fashion brands.',
    author: 'James Park',
    category: 'E-commerce',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600',
    githubUrl: 'https://github.com/example/sustainable-fashion',
    liveUrl: 'https://eco-fashion-marketplace.com',
    likes: 189
  },
  {
    id: '3',
    title: 'Mental Health Support Chatbot',
    description: 'AI chatbot providing 24/7 mental health support and resources for students.',
    author: 'Priya Patel',
    category: 'Healthcare',
    technologies: ['Python', 'NLP', 'Flask', 'PostgreSQL'],
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600',
    githubUrl: 'https://github.com/example/mental-health-bot',
    likes: 312
  }
];

// Founder Information
export interface FounderInfo {
  name: string;
  title: string;
  bio: string;
  vision: string;
  image: string;
  socialMedia: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
  };
  achievements: {
    yearsExperience: number;
    studentsImpacted: number;
    awardsWon: number;
  };
  quote: string;
}

export const founderInfo: FounderInfo = {
  name: 'Vishnu',
  title: 'Founder & CEO',
  bio: 'Vishnu is a visionary entrepreneur and technology leader who founded Vihaya to revolutionize engineering education in India. He created an all-in-one app that combines AI-powered study assistance, project marketplace, and campus event management, making quality engineering education accessible to students across India. His passion for innovation and commitment to empowering learners drives Vihaya\'s continuous evolution.',
  vision: 'To create a world where every aspiring developer has access to personalized, AI-powered education that adapts to their unique learning style and career goals. We believe in the power of community-driven learning and the transformative potential of technology education.',
  image: '/assets/vishnu.jpg',
  socialMedia: {
    linkedin: 'https://www.linkedin.com/in/vishnumeta/',
    twitter: 'https://twitter.com/vishnu_vihaya',
    github: 'https://github.com/vishnu-vihaya',
    instagram: 'https://www.instagram.com/_vishnu._.25/'
  },
  achievements: {
    yearsExperience: 3,
    studentsImpacted: 50000,
    awardsWon: 0
  },
  quote: 'Education is the most powerful weapon which you can use to change the world. At Vihaya, we\'re not just teaching code - we\'re empowering the next generation of innovators to build the future.'
};