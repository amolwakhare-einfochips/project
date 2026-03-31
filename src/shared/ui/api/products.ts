const BASE_URL = "http://localhost";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};