
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our User type
interface User {
  id: string;
  username: string;
  email: string;
}

// Define the shape of our AuthContext
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isLoading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the user exists (in localStorage)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Create a user object without the password
      const loggedInUser = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email
      };
      
      // Store the user in localStorage
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create a new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        password // In a real app, you would hash this password
      };
      
      // Store all users in localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Create a user object without the password for the session
      const loggedInUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      };
      
      // Store the user in localStorage
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
