import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient  from "@/lib/getQueryClient"
import CategoryProductList from "@/features/categories/components/CategoryProductList";
import { getCategoryProducts } from "@/features/categories/services/category";
import { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({params}: Props): Promise<Metadata>{
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

export default async function CategoriesPage({params}: Props) {
  const {category} = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categoryProducts",category,1],
    queryFn: () => getCategoryProducts({slug:category})
  })

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryProductList slug={category} />
      </HydrationBoundary>
  );
}
