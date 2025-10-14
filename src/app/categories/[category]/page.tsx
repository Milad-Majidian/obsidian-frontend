import { Metadata } from "next";
import { getCategoryProductsServer } from "@/features/categories/services/category.server";
import { parseCategoryFilters } from "@/features/categories/utils/parseCategoryFilters";
import CategoryPage from "@/features/categories/components/CategoryPage";
import { CategoryServerError } from "@/features/categories/components/CategoryServerError";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  try {
    // const data = await getCategoryProductsServer({ slug: category, ...filters });
     await queryClient.prefetchQuery({
      queryKey: ["category-products", category, filters],
      queryFn: () => getCategoryProductsServer({ slug: category, ...filters }),
    });
    const data = queryClient.getQueryData<any>([
      "category-products",
      category,
      filters,
    ]);
    if(!data || data.data.length === 0) {
     notFound();
    }
      const dehydratedState = dehydrate(queryClient);
    return (
     <HydrationBoundary state={dehydratedState} >
        <CategoryPage  slug={category} initialData={data} initialFilters={filters} />
     </HydrationBoundary>
    );
  } catch (error) {
    return <CategoryServerError />;
  }
  
}
