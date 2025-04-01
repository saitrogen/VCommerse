'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthService } from '../lib/api/auth';
import { User, RegisterData } from '../lib/types/user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const data = await AuthService.login({ email, password });
    setToken(data.token);
    const profile = await AuthService.getProfile(data.token);
    setUser(profile.data);
  };

  const register = async (userData: RegisterData) => {
    const data = await AuthService.register(userData);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Clear token from storage if implemented
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};