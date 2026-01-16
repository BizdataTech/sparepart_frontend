import { useEffect, useState } from "react";

const useOrders = () => {
  let [orders, setOrders] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/admin/orders`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log("orders:", result.data);
      setOrders(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { orders };
};

export default useOrders;
