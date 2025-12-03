import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { getCategoryProductsServer } from '../services/category.server';
import { server } from '@/mocks/server';

describe('getCategoryProductsServer', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should fetch products without filters', async () => {
    const result = await getCategoryProductsServer({ slug: 'electronics'});
    
    expect(result.data).toBeDefined();
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.pagination).toBeDefined();
  });

  it('should include sort parameter in request', async () => {
    const result = await getCategoryProductsServer({
      slug: 'electronics',
      sort: 'price_low'

    });

    // MSW mock will sort by price
    const prices = result.data.map(p => p.price);
    
    // Verify prices are in ascending order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  it('should include brand filter in request', async () => {
    const result = await getCategoryProductsServer({
      slug: 'electronics',
      brand: 'Samsung'
    });

    // Should return filtered products
    expect(result.data.length).toBeGreaterThan(0);
  });

  it('should include price range filters', async () => {
    const result = await getCategoryProductsServer({
      slug: 'electronics',
      minPrice: 500,
      maxPrice: 1000
    });

    // All products should be within price range
    result.data.forEach(product => {
      expect(product.price).toBeGreaterThanOrEqual(500);
      expect(product.price).toBeLessThanOrEqual(1000);
    });
  });

  it('should handle inStock filter', async () => {
    const result = await getCategoryProductsServer({
      slug: 'electronics',
      inStock: true
    });

    // Should return filtered products
    expect(result.data.length).toBeGreaterThan(0);
  });

  it('should handle pagination', async () => {
    const page1 = await getCategoryProductsServer({
      slug: 'electronics',
      page: 1
    });

    const page2 = await getCategoryProductsServer({
      slug: 'electronics',
      page: 2
    });

    // Different pages should have different products
    expect(page1.data[0]._id).not.toBe(page2.data[0]._id);
    expect(page1.pagination.page).toBe(1);
    expect(page2.pagination.page).toBe(2);
  });

  it('should throw error on failed fetch', async () => {
    await expect(
      getCategoryProductsServer({ slug: 'non-existent-category' })
    ).rejects.toThrow();
  });
});
