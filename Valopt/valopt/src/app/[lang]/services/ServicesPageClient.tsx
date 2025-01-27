// app/[lang]/services/ServicesPageClient.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import Hero from '@/components/Hero';
import Trust from '@/components/Trust';
import Services from '@/components/Services';
import Cta from '@/components/Cta';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

interface ServicesClientProps {
  initialData: any;
  lang: string;
}

export default function ServicesPageClient({ 
  initialData, 
  lang 
}: ServicesClientProps) {
  const [serviceData, setServiceData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/service`,
          {
            params: {
              locale: language,
              populate: [
                'serviceHero',
                'serviceHero.cta',
                'serviceHero.heroImage.image',
                'customer_trust',
                'servicesSection',
                'servicesCard',
                'servicesCta',
              ],
            },
          }
        );
        
        if (language !== lang) {
          setServiceData(response.data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    if (language !== lang) {
      fetchData();
    }
  }, [language, lang]);
 */
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !serviceData) {
    return <ErrorDisplay error={error || 'Failed to load data'} />;
  }

  const {
    serviceHero,
    customer_trust,
    servicesSection,
    servicesCard,
    servicesCta,
    customer,
  } = serviceData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        heading={serviceHero.heading}
        description={serviceHero.description}
        heroImage={serviceHero.heroImage}
        cta={serviceHero.cta}
      />
      <Trust title={customer} items={customer_trust} />
      <Services
        title={servicesSection.heading}
        description={servicesSection.description}
        items={servicesCard}
      />
      <Cta 
        title={servicesCta.heading} 
        description={servicesCta.description} 
      />
    </div>
  );
}