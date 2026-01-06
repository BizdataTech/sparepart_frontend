import { UserContext } from "@/context/userContext";
import { fetchOrder } from "@/services/orderServices";
import { useContext, useEffect, useState } from "react";

const useOrder = (id) => {
  let [order, setOrder] = useState(null);
  let { user } = useContext(UserContext);
  useEffect(() => {
    let getOrderData = async () => {
      try {
        let response = await fetchOrder(id);
        setOrder(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (user) getOrderData();
  }, [user]);
  return { order };
};
export default useOrder;
