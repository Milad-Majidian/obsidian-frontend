
export function CategoryProductList({ products }:any) {
    return (
         <div className="mt-6">
              <>
                <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product:any) => (
                    <li
                      key={product._id}
                      className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
                    >
                      <img
                        src={
                          product.image || "/categories/product-placeholder.png"
                        }
                        alt={product.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h2 className="mt-2 font-semibold">{product.name}</h2>
                      <span className="">{product.price}</span>
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
        </div>
    )
}