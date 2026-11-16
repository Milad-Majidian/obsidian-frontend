import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import CategoryPage from "@/features/categories/components/CategoryPage";
import { CategoryProductsResponse, FilterParams } from "@/features/categories/types";

// Mock next routing APIs used inside ErrorBoundary and FilterBoxBrand
vi.mock("next/router", () => ({
	useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
	useParams: () => ({ category: "electronics" }),
	useSearchParams: () => new URLSearchParams(),
	usePathname: () => "/categories/electronics",
	useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

// Mock ErrorBoundary to a pass-through to avoid importing ESM-only dependency chains in tests
vi.mock("@/common/components/ErrorBoundary", () => ({
	ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock brands API used by useBrands hook to avoid relying on MSW for this test
vi.mock("@/features/categories/services/brand.client.ts", () => ({
	getAllBrandsClient: vi.fn(async () => ({
		sucess: true,
		data: [
			{ _id: "b1", name: "Apple", description: "", image: "/brands/apple.svg", createdAt: new Date(), updatedAt: new Date() },
			{ _id: "b2", name: "Samsung", description: "", image: "/brands/samsung.svg", createdAt: new Date(), updatedAt: new Date() },
		],
	})),
}));

// Also mock products client to ensure no network is performed during render
vi.mock("@/features/categories/services/category.client", () => ({
	getCategoryProductsClient: vi.fn(async () => ({
		success: true,
		data: [],
		pagination: { total: 0, page: 1, limit: 12, totalPages: 1 },
	} as CategoryProductsResponse)),
}));

const createClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
				refetchOnMount: false,
				refetchOnWindowFocus: false,
			},
		},
	});

function renderWithProviders(ui: React.ReactElement) {
	const client = createClient();
	return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe("CategoryPage", () => {
	const initialFilters: FilterParams = {};
	const initialData: CategoryProductsResponse = {
		success: true,
		data: [
			{
				_id: "p1",
				name: "iPhone 15",
				description: "Latest Apple smartphone",
				price: 999,
				category: "electronics",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: "/products/iphone15.jpg",
			},
			{
				_id: "p2",
				name: "Galaxy S24",
				description: "Flagship Samsung phone",
				price: 899,
				category: "electronics",
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				image: "/products/galaxy-s24.jpg",
			},
		],
		pagination: { total: 2, page: 1, limit: 12, totalPages: 1 },
	};

	it("renders banner and initial products", async () => {
		renderWithProviders(
			<CategoryPage slug="electronics" initialData={initialData} initialFilters={initialFilters} />
		);

		// Banner title uses slug
		expect(await screen.findByText(/electronics/i)).toBeInTheDocument();

		// Product items from initial data are rendered
		expect(screen.getByText("iPhone 15")).toBeInTheDocument();
		expect(screen.getByText("Galaxy S24")).toBeInTheDocument();

		// Ensure list contains exactly two items
		const list = screen.getByRole("list");
		const items = within(list).getAllByRole("listitem");
		expect(items).toHaveLength(2);
	});
	it("shows error message when products query fails", async () => {
		// Mock the products client to throw an error
		const { getCategoryProductsClient } = await import("@/features/categories/services/category.client");
		vi.mocked(getCategoryProductsClient).mockImplementationOnce(async () => {
			throw new Error("Network error");
		});

		renderWithProviders(
			<CategoryPage slug="electronics" initialData={initialData} initialFilters={initialFilters} />
		);

		await waitFor(() => {
			expect(screen.getByText(/network error/i)).toBeInTheDocument();
			expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
		});
	});			


	it("loads and displays brands in the filters", async () => {
		renderWithProviders(
			<CategoryPage slug="electronics" initialData={initialData} initialFilters={initialFilters} />
		);

		// Initially shows loading state for brands
		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		// Then brands from mocked client should appear
		await waitFor(() => {
			expect(screen.getByText(/Apple/i)).toBeInTheDocument();
			expect(screen.getByText(/Samsung/i)).toBeInTheDocument();
		});
	});
});
