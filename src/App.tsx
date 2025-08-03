import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { CoursesPage } from './pages/CoursesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Main Pages */}
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* Detail Pages with IDs */}
            <Route path="events/:id" element={<EventDetailPage />} />
            <Route path="courses/:id" element={<CourseDetailPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// 404 Not Found Page Component
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default App;