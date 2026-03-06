import { useEffect, useState } from "react";
import { getOrderData } from "./orderService";
import axios from "axios";
import { toast } from "sonner";

const useOrder = (id) => {
  let [data, setData] = useState(null);
  let [productListLoading, setProductListLoading] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  const getProductListPDF = async () => {
    try {
      setProductListLoading(true);
      let res = await axios.get(
        `${BACKEND_URL}/api/warehouse/orders/${data._id}/product-list-pdf`,
        { responseType: "blob", withCredentials: true },
      );

      setProductListLoading(false);

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "warehouse-product-list.pdf";
      a.click();
    } catch (err) {
      setProductListLoading(false);
      toast.error("Failed : Something Went Wrong");
      console.log(err.message);
    }
  };

  return { data, getData, getProductListPDF, loading: { productListLoading } };
};

export default useOrder;
