import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "electronics" },
      { id: 2, name: "" },
    ]);
  }),

  http.get("/api/products", () => {
    return HttpResponse.json([
      { id: 1, name: "phones" },
      { id: 2, name: "laptops" },
    ]);
  }),
];
