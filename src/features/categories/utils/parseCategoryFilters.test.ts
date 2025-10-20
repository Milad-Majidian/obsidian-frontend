import { parseCategoryFilters } from "./parseCategoryFilters";

describe("parseCategoryFilters", ()=> {
    it("should parse valid query parameters correctly", () => {
        const query = { brand : "apple", sort: "priceAsc" }
        const result = parseCategoryFilters(query);    

        expect(result.brand).toBe("apple")
        expect(result.sortBy).toBe("priceAsc")    
    })

    it("should handle empty filters gracefully", () => {
        const result = parseCategoryFilters({})
        expect(result).toEqual({})
    })
})