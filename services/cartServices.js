const BACKNED_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchCart = async () => {
  let response = await fetch(`${BACKNED_URL}/api/cart`, {
    method: "GET",
    credentials: "include",
  });
  let result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to fetch cart");
  return result.cart;
};
