import { http, HttpResponse } from "msw";

export const successHandler = http.get("/api/products", () => {
  return HttpResponse.json([
    { id: 1, name: "Wireless Mouse", price: 29.99, category: "Peripherals" },
    { id: 2, name: "Mech Keyboard", price: 89.0, category: "Peripherals" },
    { id: 3, name: "Headset Pro", price: 59.0, category: "Audio" },
    { id: 4, name: "USB-C Hub", price: 45.0, category: "Accessories" },
    { id: 5, name: "Webcam HD", price: 39.0, category: "Video" },
    { id: 6, name: "Powerbank X", price: 25.0, category: "Energy" },
  ]);
});

export const emptyHandler = http.get("/api/products", () => {
  return HttpResponse.json([]);
});

export const errorHandler = http.get("/api/products", () => {
  return new HttpResponse(null, { status: 500 });
});

export const handlers = [
  successHandler,
    // emptyHandler,
  // errorHandler,
];