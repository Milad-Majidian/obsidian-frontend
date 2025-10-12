import CategoryProductList from "@/features/categories/components/CategoryPage";
import { Metadata } from "next";
import { getCategoryProductsServer } from "@/features/categories/services/category.server";
import { parseCategoryFilters } from "@/features/categories/utils/parseCategoryFilters";
import CategoryPage from "@/features/categories/components/CategoryPage";

interface Props {
  params: Promise<{ category: string}>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({params}: { params: Promise<{ category: string }> }): Promise<Metadata>{
  const { category } = await params;
  const title = `${category} - Buy Online | MyFurnitureStore`;
  const description = `Explore the best ${category} products at MyFurnitureStore. High quality, affordable prices, and fast delivery.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/categories/${category}`,
      type: "website",
    },
  };
}

export default async function CategoriesPage({params, searchParams}: Props) {
  const { category }  = await params;

  const filters = parseCategoryFilters(await searchParams);
  const data = await getCategoryProductsServer({ slug: category, ...filters });

  return (
      <CategoryPage  slug={category} initialData={data} initialFilters={filters} />

  );
}
