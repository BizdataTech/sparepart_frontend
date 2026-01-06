const BACKNED_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchOrder = async (id) => {
  let response = await fetch(`${BACKNED_URL}/api/orders/${id}`, {
    method: "GET",
    credentials: "include",
  });
  let result = await response.json();
  if (!response.ok)
    throw new Error(result.message || "Failed to fetch the order data");

  return result.data;
};
