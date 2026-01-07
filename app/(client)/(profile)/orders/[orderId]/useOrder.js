import { useEffect, useState } from "react";

const useOrder = (id) => {
  let [order, setOrder] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const orderData = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
          method: "GET",
          credentials: "include",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("order data:", result.data);
        setOrder(result.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    orderData();
  }, []);
  return { order };
};

export default useOrder;
