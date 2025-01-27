import AiAssistanceClient from "./AiAssistanceClient";
import { fetchLocalizedData } from "@/lib/api"; // Ensure this utility is implemented
import { generateMultiLanguageStaticParams } from "@/lib/staticParams";

// Generate static paths for all supported languages
export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

// Define the type for the page parameters
interface AssistantPageProps {
  params: {
    lang: string;
  };
}

export default async function AssistantPage({ params }: AssistantPageProps) {
  // Fetch localized data for the AI Assistance page
  const initialAssistantData = await fetchLocalizedData(
    "/api/ai-assistance",
    params.lang,
    [
      "AI_Assistance",
      "AI_Assistance.about_hero_cta",
      "AI_Assistance.about_hero_image",
      "AI_Assistance.ai_assistance_guide",
      "AI_Assistance.ai_assistance_services_card",
      "AI_Assistance.icon",
    ]
  );

  // Log the fetched data for debugging
  console.log("initialAssistantData", initialAssistantData);

  // Render the AiAssistanceClient component with the fetched data
  return (
    <AiAssistanceClient initialData={initialAssistantData} lang={params.lang} />
  );
}