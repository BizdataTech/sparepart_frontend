import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useCategoryProducts = (category, customerFilters) => {
  let [products, setProducts] = useState([]);
  let [filters, setFilters] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getProducts();
  }, [customerFilters]);

  let getProducts = async () => {
    try {
      let params = new URLSearchParams();
      params.append("filter", "category");
      params.append("category", category);
      Object.entries(customerFilters).forEach(([key, values]) => {
        values.forEach((v) => params.append(key, v));
      });

      let response = await fetch(
        `${BACKEND_URL}/api/auto-products?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setProducts(result.category_products);
      setFilters(result.filters);
      console.log("Fitlers:", result.filters);
      console.log("category products:", result.category_products);
    } catch (error) {
      console.log("products fetch on category page failed:", error.message);
    }
  };

  return { products, filters, getProducts };
};

export default useCategoryProducts;
