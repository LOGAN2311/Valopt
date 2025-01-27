import ResponsibleAI from "./ResponsibleAI";
import { fetchLocalizedData } from "@/lib/api"; // Ensure this utility is implemented
import { generateMultiLanguageStaticParams } from "@/lib/staticParams";

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ResponsibleAIPage({
  params,
}: {
  params: { lang: string };
}) {
  const initialData = await fetchLocalizedData(
    "/api/ai-deployment",
    params.lang,
    [
      "AI_deployment",
      "AI_deployment.about_hero_cta",
      "AI_deployment.about_hero_image",
      "AI_deployment.about_featureList",
      "AI_deployment.about_featureList.icon",
    ]
  );

  console.log("ResponsibleAI",initialData);
  return <ResponsibleAI initialData={initialData} lang={params.lang} />;
}