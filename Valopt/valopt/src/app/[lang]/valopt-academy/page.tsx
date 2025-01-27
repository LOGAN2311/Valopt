import { fetchLocalizedData } from '@/lib/api';
import AcademyPageClient from './AcademyPageClient';
import { generateMultiLanguageStaticParams } from '@/lib/staticParams';

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function AcademyPage({ params }: { params: { lang: string } }) {
  const initialAcademyData = await fetchLocalizedData(
    '/api/academy', 
    params.lang,
    [
      "academy_hero.icon",
      "academy_features",
      "academy_card",
      "academy_card.academy_image",
      "academy_top_courses",
      "academy_card_title",
      "academy_choose.about_featureList",
      "academy_top_courses.about_featureList.icon",
    ]
  );
 
  return <AcademyPageClient initialData={initialAcademyData} lang={params.lang} />;
}