import { http, HttpResponse } from "msw";

const mockProducts = [
  { id: 1, name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
  { id: 2, name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
  { id: 3, name: "Headset Pro", price: 59.0, category: "Audio" },
  { id: 4, name: "USB-C Hub", price: 45.0, category: "Accessories" },
  { id: 5, name: "Webcam HD", price: 39.0, category: "Video" },
  { id: 6, name: "Powerbank X", price: 25.0, category: "Energy" },
];

export const handlers = [
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let data = [...mockProducts];

    // SEARCH
    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (category && category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    // SORT
    if (sort) {
      data.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price,
      );
    }

    return HttpResponse.json(data);
  }),
];
