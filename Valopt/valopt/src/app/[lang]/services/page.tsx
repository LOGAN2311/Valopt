// app/[lang]/services/page.tsx
import { fetchLocalizedData } from '@/lib/api';
import ServicesPageClient from './ServicesPageClient';
import { generateMultiLanguageStaticParams } from '@/lib/staticParams';

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const initialData = await fetchLocalizedData(
    '/api/service', 
    params.lang, 
    [
      'serviceHero',
      'serviceHero.cta',
      'serviceHero.heroImage.image',
      'customer_trust',
      'servicesSection',
      'servicesCard',
      'servicesCta',
    ]
  );
  
  return <ServicesPageClient initialData={initialData} lang={params.lang} />;
}