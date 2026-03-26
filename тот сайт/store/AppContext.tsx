import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'designer' | 'client' | null;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  location?: string;
  followers?: number;
  following?: number;
  // Client specific
  height?: number;
  weight?: number;
  bodyType?: string;
  colorType?: string;
  stylePrefs?: string[];
  budget?: string;
  // Designer specific
  specialty?: string;
  works?: number;
  rating?: number;
  verified?: boolean;
}

export interface CapsuleItem {
  id: string;
  name: string;
  image: string;
  price: number;
  designerId: string;
  designerName: string;
  category: string;
}

export interface Capsule {
  id: string;
  name: string;
  items: CapsuleItem[];
  createdAt: string;
  shared?: boolean;
}

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  onboardingComplete: boolean;
  myCapsules: Capsule[];
  savedItems: string[];
  login: (user: UserProfile) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  addCapsule: (capsule: Capsule) => void;
  toggleSave: (itemId: string) => void;
  notifications: number;
  activeChat: string | null;
  setActiveChat: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const DEMO_DESIGNER: UserProfile = {
  id: 'designer-1',
  name: 'Алина Морозова',
  email: 'alina@forma.ai',
  avatar: 'https://images.unsplash.com/photo-1611246706753-80b59941efc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
  role: 'designer',
  bio: 'Минималистичная мода с акцентом на устойчивость',
  location: 'Москва',
  followers: 2847,
  following: 134,
  specialty: 'Минимализм / Eco Fashion',
  works: 47,
  rating: 4.9,
  verified: true,
};

export const DEMO_CLIENT: UserProfile = {
  id: 'client-1',
  name: 'Мария Петрова',
  email: 'maria@example.com',
  avatar: 'https://images.unsplash.com/photo-1760551600460-018b52b28045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150',
  role: 'client',
  location: 'Санкт-Петербург',
  followers: 124,
  following: 89,
  height: 167,
  weight: 58,
  bodyType: 'Прямоугольник',
  colorType: 'Лето',
  stylePrefs: ['Минимализм', 'Casual Chic'],
  budget: '10000-30000',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [myCapsules, setMyCapsules] = useState<Capsule[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const login = (profile: UserProfile) => {
    setUser(profile);
    if (profile.role === 'designer') setOnboardingComplete(true);
  };

  const logout = () => {
    setUser(null);
    setOnboardingComplete(false);
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (user) setUser({ ...user, ...data });
    setOnboardingComplete(true);
  };

  const addCapsule = (capsule: Capsule) => {
    setMyCapsules(prev => [capsule, ...prev]);
  };

  const toggleSave = (itemId: string) => {
    setSavedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      onboardingComplete,
      myCapsules,
      savedItems,
      login,
      logout,
      completeOnboarding,
      addCapsule,
      toggleSave,
      notifications: 3,
      activeChat,
      setActiveChat,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
