import CategoryProductList from "@/features/categories/components/CategoryProductList";
import { Metadata } from "next";
import { getCategoryProductsServer } from "@/features/categories/services/category.server";

interface Props {
  params: { category: string};
  searchParams: Record<string, string | string[] | undefined>;
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

export default async function CategoriesPage({params, searchParams}: Props) {
  const {category} = await params;
  const initialFilters = {
    brand : searchParams.brand as string | undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    inStock: searchParams.inStock === 'true' ? true : searchParams.inStock ==='false' ? false : undefined,
    sortBy: searchParams.sortBy as string | undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
  }
  const data = await getCategoryProductsServer({ slug: category, ...initialFilters });

  return (
      <CategoryProductList  slug={category} initialData={data} />
  );
}
