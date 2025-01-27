import { fetchLocalizedData } from '@/lib/api';
import DataAnalytics from './DataAnalyticsPageClient';
import { generateMultiLanguageStaticParams } from '@/lib/staticParams';

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const initialAnalyticData = await fetchLocalizedData(
    '/api/data-analytic', 
    params.lang, 
    [
      "dataAnalytics_hero.about_hero_cta",
      "dataAnalytics_hero.about_hero_image",
      "dataAnalytics_solves.analytics_solves_list",
      "dataAnalytics_services.about_featureList",
      "dataAnalytics_choose.ai_assistance_guide",
      "dataAnalytics_industries.about_featureList",
    ]
  );
  
  return <DataAnalytics initialData={initialAnalyticData} lang={params.lang} />;
}