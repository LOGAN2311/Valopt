import Products from "./Products";
import { fetchLocalizedData } from "@/lib/api"; // Ensure this utility is implemented
import { generateMultiLanguageStaticParams } from "@/lib/staticParams";

export async function generateStaticParams() {
  return generateMultiLanguageStaticParams();
}

export default async function ProductsPage({
  params,
}: {
  params: { lang: string };
}) {
  const initialData = await fetchLocalizedData(
    "/api/product",
    params.lang,
    [
      "products_list",
      "products_list.productsCard",
      "products_assistance_features.products_features_image",
      "products_assistance_features.products_features_content",
      "products_deployment_features.products_features_image",
      "products_deployment_features.products_features_content",
      "products_realtime_features.products_features_image",
      "products_realtime_features.products_features_content",
      "products_faq.products_faq_heading",
      "products_faq.products_faqList",
    ]
  );

  return <Products initialData={initialData} lang={params.lang} />;
}