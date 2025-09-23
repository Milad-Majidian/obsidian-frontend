
import CategoriesList from "@/features/categories/components/CatagoriesList";
import { getCategoryByName } from "@/features/categories/services/category";


interface Props {
  params: { category: string };
}

export default async function CategoriesPage({params}:Props) {

    const categories = await getCategoryByName(params.category)

    console.log('categories',categories)

  return (
    <div className="min-h-screen bg-gray-100"> 
        {/* {
            categories.length === 0 ? ( 
                <div className="container mx-auto p-4 md:p-6">
                    <p className="text-center text-gray-500">No categories found.</p>
                </div>
            ) : (
                <CategoriesList categories={categories} />
            )

        } */}
    </div>
  );
}
