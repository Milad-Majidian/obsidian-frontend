// features/categories/__mocks__/categoryHandlers.ts
import { http, HttpResponse, delay } from "msw";

type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    inStock: boolean;
    category: string;
};

type Pagination = {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

type ProductsResponse = {
    category: string;
    brand: string;
    products: Product[];
    pagination: Pagination;
};

const MOCK_PRODUCTS: Record<string, Product[]> = {
    default: [
        { id: "p1", name: "Mock Product 1", brand: "Acme", price: 100, inStock: true, category: "default" },
        { id: "p2", name: "Mock Product 2", brand: "Acme", price: 200, inStock: false, category: "default" },
        { id: "p3", name: "Mock Product 3", brand: "Globex", price: 150, inStock: true, category: "default" },
    ],
    electronics: [
        { id: "e1", name: "Headphones", brand: "Acme", price: 80, inStock: true, category: "electronics" },
        { id: "e2", name: "Keyboard", brand: "Globex", price: 120, inStock: true, category: "electronics" },
        { id: "e3", name: "Monitor", brand: "Initech", price: 300, inStock: false, category: "electronics" },
    ],
    books: [
        { id: "b1", name: "Clean Code", brand: "Prentice", price: 45, inStock: true, category: "books" },
        { id: "b2", name: "Refactoring", brand: "Addison", price: 50, inStock: true, category: "books" },
    ],
};

const parseNumber = (value: string | null, fallback: number, min = 1, max?: number) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    const clamped = Math.max(min, max ? Math.min(n, max) : n);
    return Math.floor(clamped);
};

const getQuery = (request: Request) => {
    const url = new URL(request.url);
    return {
        category: url.searchParams.get("category") || "default",
        brand: url.searchParams.get("brand") || "All",
        page: parseNumber(url.searchParams.get("page"), 1, 1),
        perPage: parseNumber(url.searchParams.get("perPage"), 10, 1, 100),
        sortBy: url.searchParams.get("sortBy") || "name", // name | price
        sortDir: (url.searchParams.get("sortDir") || "asc").toLowerCase() as "asc" | "desc",
        delayMs: parseNumber(url.searchParams.get("delay"), 0, 0, 5000),
    } as const;
};

const sorters: Record<string, (a: Product, b: Product) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    price: (a, b) => a.price - b.price,
};

export const categoryHandlers = [
    http.get("/products", async ({ request }) => {
        const { category, brand, page, perPage, sortBy, sortDir, delayMs } = getQuery(request);

        if (delayMs > 0) await delay(delayMs);

        const pool = MOCK_PRODUCTS[category];
        if (!pool) {
            return HttpResponse.json(
                { message: `Unknown category: ${category}` },
                { status: 404 }
            );
        }

        let items = pool.slice();
        if (brand !== "All") {
            items = items.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
        }

        const sorter = sorters[sortBy] ?? sorters.name;
        items.sort(sorter);
        if (sortDir === "desc") items.reverse();

        const totalItems = items.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
        const safePage = Math.min(page, totalPages);
        const start = (safePage - 1) * perPage;
        const paginated = items.slice(start, start + perPage);

        const body: ProductsResponse = {
            category,
            brand,
            products: paginated,
            pagination: {
                currentPage: safePage,
                perPage,
                totalItems,
                totalPages,
                hasNext: safePage < totalPages,
                hasPrev: safePage > 1,
            },
        };

        return HttpResponse.json(body);
    }),
];
