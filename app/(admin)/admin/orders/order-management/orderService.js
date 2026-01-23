const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getOrderData = async (id) => {
  let response = await fetch(`${BACKEND_URL}/api/admin/orders/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch order data");
  return response.json();
};

export const confirmOrder = async (orderId) => {
  const response = await fetch(
    `${BACKEND_URL}/api/admin/orders/${orderId}/confirm`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );
  if (!response.ok) throw new Error("Confirmation Failed");
  return response.json();
};
