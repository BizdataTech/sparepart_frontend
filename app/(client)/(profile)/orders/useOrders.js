import { useEffect, useState } from "react";

const useOrders = (query) => {
  let [orders, setOrders] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    let getOrders = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/orders`, {
          method: "GET",
          credentials: "include",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setOrders(result.orders);
      } catch (error) {
        console.log(error.message);
      }
    };
    getOrders();
  }, [query]);

  return { orders };
};

export default useOrders;
