import { Metadata } from "next";
import { getCategoryProductsServer } from "@/features/categories/services/category.server";
import { parseCategoryFilters } from "@/features/categories/utils/parseCategoryFilters";
import CategoryPage from "@/features/categories/components/CategoryPage";
import { CategoryServerError } from "@/features/categories/components/CategoryServerError";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { CategoryProductsResponse } from "@/features/categories/types";
import { PackageOpen } from "lucide-react";

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
     await queryClient.prefetchQuery({
      queryKey: ["categoryProducts", category, filters],
      queryFn: () => getCategoryProductsServer({ slug: category, ...filters }),
    });
    const data = queryClient.getQueryData<CategoryProductsResponse>([
      "categoryProducts",
      category,
      filters,
    ]);
    if(!data) {
      console.log('No data found for category:', category);
     notFound();
    }
    if(data && data.data.length === 0){
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500 mb-4 text-center">
            There are currently no products in this category.<br />
            Please check back later or explore other categories.
          </p>
        </div>
      );
    }
      const dehydratedState = dehydrate(queryClient);
    return (
     <HydrationBoundary state={dehydratedState} >
        <CategoryPage  slug={category} initialData={data} initialFilters={filters} />
     </HydrationBoundary>
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return CategoryServerError(message);
  }
  
}
