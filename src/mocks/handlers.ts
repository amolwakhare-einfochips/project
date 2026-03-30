import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost/api/products", () => {
    return HttpResponse.json([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
  }),
];