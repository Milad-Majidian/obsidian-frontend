// features/categories/__mocks__/categoryHandlers.ts
import { http, HttpResponse, delay } from "msw";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type ProductsResponse = {
  category: string;
  brand: string;
  products: Product[];
  pagination: Pagination;
};

const MOCK_PRODUCTS: Record<string, Product[]> = {
  default: [
    {
      _id: "p1",
      name: "Mock Product 1",
      description: "Mock description 1",
      price: 100,
      category: "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "p2",
      name: "Mock Product 2",
      description: "Mock description 2",
      price: 200,
      category: "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "p3",
      name: "Mock Product 3",
      description: "Mock description 3",
      price: 150,
      category: "default",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  electronics: [
    {
      _id: "e1",
      name: "Headphones",
      description: "Wireless headphones",
      price: 80,
      category: "electronics",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "e2",
      name: "Keyboard",
      description: "Mechanical keyboard",
      price: 120,
      category: "electronics",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "e3",
      name: "Monitor",
      description: "4K monitor",
      price: 300,
      category: "electronics",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "e4",
      name: "Laptop",
      description: "Gaming laptop",
      price: 700,
      category: "electronics",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  books: [
    {
      _id: "b1",
      name: "Clean Code",
      description: "A handbook of agile software craftsmanship",
      price: 45,
      category: "books",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "b2",
      name: "Refactoring",
      description: "Improving the design of existing code",
      price: 50,
      category: "books",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

const parseNumber = (
  value: string | null,
  fallback: number,
  min = 1,
  max?: number
) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  const clamped = Math.max(min, max ? Math.min(n, max) : n);
  return Math.floor(clamped);
};

const getQuery = (request: Request) => {
  const url = new URL(request.url);
  return {
    category: url.searchParams.get("category") || "default",
    minPrice: url.searchParams.get("minPrice")
      ? parseNumber(url.searchParams.get("minPrice"), 0, 0)
      : undefined,
    maxPrice: url.searchParams.get("maxPrice")
      ? parseNumber(url.searchParams.get("maxPrice"), Infinity, 0)
      : undefined,
    page: parseNumber(url.searchParams.get("page"), 1, 1),
    perPage: parseNumber(url.searchParams.get("perPage"), 10, 1, 100),
    sort: url.searchParams.get("sort") || "name", // name | price
    sortDir: (url.searchParams.get("sortDir") || "asc").toLowerCase() as
      | "asc"
      | "desc",
    delayMs: parseNumber(url.searchParams.get("delay"), 0, 0, 5000),
  } as const;
};

const sorters: Record<string, (a: Product, b: Product) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  price: (a, b) => a.price - b.price,
};

export const categoryHandlers = [
  http.get("http://localhost:3001/products", async ({ request }) => {
    const { category, page, perPage, sort, sortDir, delayMs, minPrice, maxPrice } = getQuery(request);
    if (delayMs > 0) await delay(delayMs);

    // Return 404 if category does not exist in mock data
    if (!Object.prototype.hasOwnProperty.call(MOCK_PRODUCTS, category)) {
      console.log('[MSW] Returning 404 for unknown category:', category);
      return HttpResponse.json(
        { message: `Unknown category: ${category}` },
        { status: 404 }
      );
    }

    const pool = MOCK_PRODUCTS[category];
    let items = pool.slice();
    // Properly filter by minPrice and maxPrice
    if (typeof minPrice === "number" && !isNaN(minPrice)) {
      items = items.filter((p) => p.price >= minPrice);
    }
    if (typeof maxPrice === "number" && isFinite(maxPrice)) {
      items = items.filter((p) => p.price <= maxPrice);
    }
    const sorter = sorters[sort] ?? sorters.name;
    items.sort(sorter);
    if (sortDir === "desc") items.reverse();
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * perPage;
    const paginated = items.slice(start, start + perPage);
    const body = {
      success: true,
      data: paginated,
      pagination: {
        page: safePage,
        limit: perPage,
        total: totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    };
    return HttpResponse.json(body);
  }),
];
