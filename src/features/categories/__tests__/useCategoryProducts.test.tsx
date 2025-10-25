// features/categories/hooks/useCategoryProducts.test.ts
import React from "react";
import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { CategoryProductsResponse } from "@/features/categories/types";

vi.mock("@/features/categories/services/category.client", () => ({
  getCategoryProductsClient: vi.fn(),
}));

import { getCategoryProductsClient } from "@/features/categories/services/category.client";
import { useCategoryProducts } from "../hooks/useCategoryProducts";

const createClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: 0, refetchOnMount: false, refetchOnWindowFocus: false } },
  });

const wrapper = ({ children }: any) => {
  const [client] = React.useState(() => createClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const mockInitialData: CategoryProductsResponse = {
  success: true,
  data: [
    {
      _id: "p1",
      name: "Mock Product 1",
      description: "Mock description 1",
      price: 100,
      category: "electronics",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  pagination: { total: 1, page: 1, limit: 12, totalPages: 1 },
};

describe("useCategoryProducts", () => {
  beforeEach(() => {
    (getCategoryProductsClient as unknown as Mock).mockReset();
  });

  it("returns initial data and is not loading", async () => {
    const { result } = renderHook(
      () => useCategoryProducts("electronics", mockInitialData, { page: 1 }),
      { wrapper }
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data?.[0].name).toBe("Mock Product 1");
  });

  it("refetches successfully and updates data", async () => {
    (getCategoryProductsClient as unknown as Mock).mockResolvedValueOnce({
      success: true,
      data: [
        {
          _id: "p2",
          name: "New Product",
          description: "New description",
          price: 200,
          category: "electronics",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      pagination: { total: 1, page: 1, limit: 12, totalPages: 1 },
    } as CategoryProductsResponse);

    const { result } = renderHook(
      () => useCategoryProducts("electronics", mockInitialData, { page: 1 }),
      { wrapper }
    );

    const refetched = await result.current.refetch();
    expect(getCategoryProductsClient).toHaveBeenCalled();
    expect(refetched.data?.data?.[0].name).toBe("New Product");
  });

  it("handles server error on refetch", async () => {
    (getCategoryProductsClient as unknown as Mock).mockRejectedValueOnce({
      status: 500,
      message: "Internal server error",
    });

    const { result } = renderHook(
      () => useCategoryProducts("electronics", mockInitialData, { page: 1 }),
      { wrapper }
    );

    const refetched = await result.current.refetch();
    expect(getCategoryProductsClient).toHaveBeenCalled();
    expect(refetched.error).toBeTruthy();
    expect((refetched.error as any)?.message).toMatch(/internal server error/i);
  });
});
