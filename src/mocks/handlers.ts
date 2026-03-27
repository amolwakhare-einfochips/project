import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("/api/products", () => {
        console.log("✅ MSW HIT");
        return HttpResponse.json([
            { id: 1, name: "Product 1" },
            { id: 2, name: "Product 2" },
        ]);
    })
];