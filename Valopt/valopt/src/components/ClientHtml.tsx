// components/ClientHtml.tsx
'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function ClientHtml({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();

  // Update the <html> lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}