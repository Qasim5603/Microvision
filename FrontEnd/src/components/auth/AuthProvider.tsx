import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@shared/schema';
import { apiRequest } from '../../lib/queryClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isInitializing, setIsInitializing] = useState(true);
  
  const { 
    data: user, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['/api/auth/me'],
    enabled: true,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  useEffect(() => {
    if (!isLoading) {
      setIsInitializing(false);
    }
  }, [isLoading]);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await apiRequest(
      'POST',
      '/api/auth/login',
      { email, password }
    );
    
    await refetch();
    return response.json();
  };

  const logout = async (): Promise<void> => {
    await apiRequest('POST', '/api/auth/logout');
    await refetch();
  };

  const register = async (userData: any): Promise<User> => {
    const response = await apiRequest(
      'POST',
      '/api/auth/register',
      userData
    );
    
    await refetch();
    return response.json();
  };

  const value: AuthContextType = {
    user: (user as User) || null,
    loading: isInitializing || isLoading,
    error: error as Error | null,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
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