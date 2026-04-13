import { http, HttpResponse } from "msw";

let products = [
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

    let data = [...products];

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

  // CREATE
http.post("/api/products", async ({ request }) => {
  const body = (await request.json()) as any;

  if (body.name === "Nano") {
    return HttpResponse.json(
      { fieldErrors: { name: "Name already exists" } },
      { status: 422 }
    );
  }

  const newItem = {
    id: Date.now(),
    ...body,
  };

  products.push(newItem);

  return HttpResponse.json(newItem);
}),

// UPDATE
http.put("/api/products/:id", async ({ params, request }) => {
  const id = Number(params.id);
  const body = (await request.json()) as any;

  if (body.name === "Nano") {
    return HttpResponse.json(
      { fieldErrors: { name: "Name already exists" } },
      { status: 422 }
    );
  }

  products = products.map((p) =>
    p.id === id ? { ...p, ...body } : p
  );

  return HttpResponse.json(body);
}),

  // DELETE
  http.delete("/api/products/:id", ({ params }) => {
    const id = Number(params.id);

    products = products.filter((p) => p.id !== id);

    return HttpResponse.json({ success: true });
  }),
];
