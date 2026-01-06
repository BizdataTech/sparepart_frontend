import { fetchOrder } from "@/services/orderServices";
import { createContext, useEffect, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  let [data, setData] = useState(null);
  useEffect(() => {
    let getData = async () => {
      try {
        let data = await fetchOrder();
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  let value = { data };
  return <OrderContext.Provider value={value}></OrderContext.Provider>;
};

export { OrderProvider, OrderContext };
