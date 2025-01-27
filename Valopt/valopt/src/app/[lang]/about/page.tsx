import AboutClient from './AboutClient';
import { fetchAboutData } from '@/lib/api'; // Create this API utility
import { generateMultiLanguageStaticParams } from '@/lib/staticParams';

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const initialData = await fetchAboutData(params.lang);
  
  return <AboutClient initialData={initialData} lang={params.lang} />;
}
