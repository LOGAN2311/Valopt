import { fetchLocalizedData } from '@/lib/api';
import ContactPageClient from './ContactPageClient';
import { generateMultiLanguageStaticParams } from '@/lib/staticParams';

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const initialContactData = await fetchLocalizedData(
    '/api/contact', 
    params.lang, 
    ['contactElement', 'contactElement.icon']
  );
  
  return <ContactPageClient initialData={initialContactData} lang={params.lang} />;
}