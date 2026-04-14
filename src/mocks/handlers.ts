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

type ApiError = {
  fieldErrors?: Record<string, string>;
  message?: string;
};

// MOCK DB
let products: Product[] = [
  { id: 1, name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
  { id: 2, name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
  { id: 3, name: "Headset Pro", price: 59.0, category: "Audio" },
  { id: 4, name: "USB-C Hub", price: 45.0, category: "Accessories" },
  { id: 5, name: "Webcam HD", price: 39.0, category: "Video" },
  { id: 6, name: "Powerbank X", price: 25.0, category: "Energy" },
];

export const handlers = [
  // GET PRODUCTS
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort");

    let data = [...products];

    // SEARCH
    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY
    if (category && category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    // SORT
    if (sort) {
      data.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return HttpResponse.json(data);
  }),

  // CREATE PRODUCT
  http.post("/api/products", async ({ request }) => {
    const body = (await request.json()) as ProductInput;

    //  DUPLICATE VALIDATION
    const isDuplicate = products.some(
      (p) => p.name.toLowerCase() === body.name.toLowerCase()
    );

    if (isDuplicate) {
      const error: ApiError = {
        fieldErrors: {
          name: "Name already exists",
        },
      };

      return HttpResponse.json(error, { status: 422 });
    }

    const newItem: Product = {
      id: Date.now(),
      ...body,
    };

    products.push(newItem);

    return HttpResponse.json(newItem);
  }),

  //  UPDATE PRODUCT
  http.put("/api/products/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as ProductInput;

    // DUPLICATE VALIDATION 
    const isDuplicate = products.some(
      (p) =>
        p.name.toLowerCase() === body.name.toLowerCase() &&
        p.id !== id
    );

    if (isDuplicate) {
      const error: ApiError = {
        fieldErrors: {
          name: "Name already exists",
        },
      };

      return HttpResponse.json(error, { status: 422 });
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

  // DELETE PRODUCT
  http.delete("/api/products/:id", ({ params }) => {
  const id = Number(params.id);

  console.log("MSW DELETE ID:", id); 

  const exists = products.some((p) => p.id === id);

  if (!exists) {
    return HttpResponse.json(
      { message: "Item not found" },
      { status: 404 }
    );
  }

  products = products.filter((p) => p.id !== id);

  return HttpResponse.json({ success: true }, { status: 200 });
})

];