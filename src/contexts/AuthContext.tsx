import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChange, signInWithGoogle, signInWithEmail, signUpWithEmail, signOutUser } from '../config/firebase';
import { createUserProfile, getUserProfile, UserProfile } from '../services/userService';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setIsLoading(true);
      try {
        if (firebaseUser) {
          // Get user profile from Firestore
          const userProfile = await getUserProfile(firebaseUser.uid);
          if (userProfile) {
            setUser(userProfile);
            setIsAuthenticated(true);
          } else {
            // Create new user profile if it doesn't exist
            const newProfile = await createUserProfile(firebaseUser);
            setUser(newProfile);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setError('Authentication error occurred');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      await signInWithEmail(email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setError(null);
      await signInWithGoogle();
      return true;
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(error.message || 'Google login failed');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const firebaseUser = await signUpWithEmail(email, password);
      
      // Create user profile with additional data
      await createUserProfile(firebaseUser, { name, role: 'Member' });
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOutUser();
    } catch (error: any) {
      console.error('Logout error:', error);
      setError(error.message || 'Logout failed');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      loginWithGoogle, 
      register, 
      logout, 
      error, 
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};