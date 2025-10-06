import CategoryProductList from "@/features/categories/components/CategoryProductList";
import { Metadata } from "next";
import { getCategoryProductsServer } from "@/features/categories/services/category.server";
import { parseCategoryFilters } from "@/features/categories/utils/parseCategoryFilters";

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
    // Await searchParams if needed
  const { category }  = await params;
  const query = await searchParams;

  // const initialFilters = {
  //   brand: typeof query.brand === "string" ? query.brand : undefined,
  //   minPrice: query.minPrice ? Number(query.minPrice) : undefined,
  //   maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
  //   inStock:
  //     query.inStock === "true"
  //       ? true
  //       : query.inStock === "false"
  //       ? false
  //       : undefined,
  //   sortBy: typeof query.sortBy === "string" ? query.sortBy : undefined,
  //   order: query.order === "asc" || query.order === "desc" ? query.order : "desc",
  //   page: query.page ? Number(query.page) : 1,
  // };
  const filters = parseCategoryFilters(await searchParams);

  const data = await getCategoryProductsServer({ slug: category, ...filters });

  return (
      <CategoryProductList  slug={category} initialData={data} />
  );
}
