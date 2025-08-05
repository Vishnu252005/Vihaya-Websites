import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  stats: {
    coursesCompleted: number;
    eventsAttended: number;
    projectsSubmitted: number;
    certificatesEarned: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Demo credentials
  const demoCredentials = {
    email: 'demo@vihaya.app',
    password: 'demo123'
  };

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('vihaya_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login logic
    if (email === demoCredentials.email && password === demoCredentials.password) {
      const demoUser: User = {
        id: '1',
        name: 'Vishnu',
        email: 'demo@vihaya.app',
        avatar: '/assets/vishnu.jpg',
        role: 'Founder & CEO',
        joinDate: '2024-01-15',
        stats: {
          coursesCompleted: 12,
          eventsAttended: 8,
          projectsSubmitted: 5,
          certificatesEarned: 7
        }
      };
      
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('vihaya_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Demo registration logic
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: '/assets/vishnu.jpg',
      role: 'Member',
      joinDate: new Date().toISOString().split('T')[0],
      stats: {
        coursesCompleted: 0,
        eventsAttended: 0,
        projectsSubmitted: 0,
        certificatesEarned: 0
      }
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('vihaya_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vihaya_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};