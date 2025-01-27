import Clickstream from "./Clickstream";
import { fetchLocalizedData } from "@/lib/api"; // Ensure this utility is implemented
import { generateMultiLanguageStaticParams } from "@/lib/staticParams";

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ClickstreamPage({
  params,
}: {
  params: { lang: string };
}) {
  const initialData = await fetchLocalizedData(
    "/api/real-time-personalization",
    params.lang,
    [
      "real_time_personalization",
      "real_time_personalization.about_hero_image",
      "real_time_personalization.about_hero_cta",
      "real_time_personalization.about_featureList",
      "real_time_personalization.clickstream_steps",
      "real_time_personalization.clickstream_image",
    ]
  );

  console.log("Clickstream",initialData)
  return <Clickstream initialData={initialData} lang={params.lang} />;
}