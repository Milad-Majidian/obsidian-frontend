import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient  from "@/lib/getQueryClient"
import CategoryProductList from "@/features/categories/components/CategoryProductList";
import { getCategoryProducts } from "@/features/categories/services/category";

// interface Props {
//   params: { category: string };
// }

export default async function CategoriesPage({params}: { params: Promise<{ category: string }> }) {
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
