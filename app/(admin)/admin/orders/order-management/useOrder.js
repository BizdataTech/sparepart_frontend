import { useEffect, useState } from "react";
import { getOrderData } from "./orderService";

const useOrder = (id) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let { data } = await getOrderData(id);
      console.log("data:", data);
      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return { data, getData };
};

export default useOrder;
