'use client';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ 
  children, 
  defaultLanguage = 'en' // Default fallback language
}: { 
  children: ReactNode; 
  defaultLanguage?: string; 
}) => {
  const [language, setLanguage] = useState(defaultLanguage);

  // Initialize language from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('site-language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  // Persist language selection to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('site-language', language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};