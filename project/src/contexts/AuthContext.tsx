import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { AuthUser, UserRole } from '../types';

interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Simulated auth functions for the MVP
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        setAuthUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse auth user', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password) {
        // For demo purposes - in production this would be a real API call
        const mockUser: AuthUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role,
          token: 'mock_token_' + Math.random().toString(36).substr(2, 16),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setAuthUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (name && email && password) {
        // For demo purposes - in production this would be a real API call
        const mockUser: AuthUser = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          role,
          token: 'mock_token_' + Math.random().toString(36).substr(2, 16),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setAuthUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ 
      authUser, 
      loading, 
      error,
      login, 
      register, 
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};