
import CategoryProductList from "@/features/categories/components/CategoryProductList";
import { getCategoryProducts } from "@/features/categories/services/category";

interface Props {
  params: { category: string };
}

export default async function CategoriesPage({params}:Props) {
  const { category } = await params

  const categories = await getCategoryProducts({
    slug: category,
  })
   const products = categories.data;

  return (
    <div className="min-h-screen bg-gray-100"> 
           {
            products.length === 0 ? ( 
                <div className="container mx-auto p-4 md:p-6">
                    <p className="text-center text-gray-500">No categories found.</p>
                </div>
            ) : (
                <CategoryProductList products={products} />
            )

        }
    </div>
  );
}
