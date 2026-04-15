import { http, HttpResponse } from "msw";

// TYPES
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type ProductInput = {
  name: string;
  price: number;
  category: string;
};

// BASE PRODUCTS
const baseProducts = [
  { name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
  { name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
  { name: "Headset Pro", price: 59.0, category: "Audio" },
  { name: "USB-C Hub", price: 45.0, category: "Accessories" },
  { name: "Webcam HD", price: 39.0, category: "Video" },
  { name: "Powerbank X", price: 25.0, category: "Energy" },
];

const firstPageProducts: Product[] = [
  { id: 1, name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
  { id: 2, name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
  { id: 3, name: "Headset Pro", price: 59.0, category: "Audio" },
  { id: 4, name: "USB-C Hub", price: 45.0, category: "Accessories" },
  { id: 5, name: "Webcam HD", price: 39.0, category: "Video" },
  { id: 6, name: "Powerbank X", price: 25.0, category: "Energy" },
  { id: 7, name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
  { id: 8, name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
  { id: 9, name: "Headset Pro", price: 59.0, category: "Audio" },
  { id: 10, name: "USB-C Hub", price: 45.0, category: "Accessories" },
];

const restProducts: Product[] = Array.from({ length: 240 }).map((_, i) => {
  const base = baseProducts[i % baseProducts.length];

  return {
    id: i + 11,
    name: base.name,
    price: base.price,
    category: base.category,
  };
});

let products: Product[] = [...firstPageProducts, ...restProducts];

export const handlers = [
  // GET PRODUCTS
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search") || "";
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    let filtered = [...products];

    // SEARCH
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // PAGINATION
    if (page && limit) {
      const pageNum = Number(page);
      const limitNum = Number(limit);

      const start = (pageNum - 1) * limitNum;

      return HttpResponse.json({
        data: filtered.slice(start, start + limitNum),
        total: filtered.length,
        page: pageNum,
        limit: limitNum,
      });
    }

    return HttpResponse.json(filtered);
  }),

  // CREATE
  http.post("/api/products", async ({ request }) => {
    const body = (await request.json()) as ProductInput;

    const isDuplicate = products.some(
      (p) => p.name.toLowerCase() === body.name.toLowerCase()
    );

    if (isDuplicate) {
      return HttpResponse.json(
        { fieldErrors: { name: "Name already exists" } },
        { status: 422 }
      );
    }

    if (body.price <= 0) {
      return HttpResponse.json(
        { fieldErrors: { price: "Price must be greater than 0" } },
        { status: 422 }
      );
    }

    const newItem: Product = {
      id: Date.now(),
      ...body,
    };

    products.unshift(newItem);

    return HttpResponse.json(newItem, { status: 201 });
  }),

  // UPDATE
  http.put("/api/products/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as ProductInput;

    const isDuplicate = products.some(
      (p) =>
        p.name.toLowerCase() === body.name.toLowerCase() &&
        p.id !== id
    );

    if (isDuplicate) {
      return HttpResponse.json(
        { fieldErrors: { name: "Name already exists" } },
        { status: 422 }
      );
    }

    if (body.price <= 0) {
      return HttpResponse.json(
        { fieldErrors: { price: "Price must be greater than 0" } },
        { status: 422 }
      );
    }

    let updatedItem: Product | null = null;

    products = products.map((p) => {
      if (p.id === id) {
        updatedItem = { ...p, ...body };
        return updatedItem;
      }
      return p;
    });

    return HttpResponse.json(updatedItem);
  }),

  // DELETE
  http.delete("/api/products/:id", ({ params }) => {
    const id = Number(params.id);

    const exists = products.some((p) => p.id === id);

    if (!exists) {
      return HttpResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    products = products.filter((p) => p.id !== id);

    return HttpResponse.json(
      { success: true },
      { status: 200 }
    );
  }),
];