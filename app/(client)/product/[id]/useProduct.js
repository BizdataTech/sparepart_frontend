import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter, useParams } from "next/navigation";
import { CartContext } from "@/context/cartContext";
export const useProduct = () => {
  let [product, setProduct] = useState(null);
  let [products, setProducts] = useState([]);
  let [genuineProduct, setGenuineProduct] = useState(null);
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const getProductData = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/auto-products/${id}`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        else {
          setProduct(result.product);
        }
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    getProductData();
  }, []);

  useEffect(() => {
    let getProducts = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-products?filter=product-page&genuine_reference=${id}`,
          {
            method: "GET",
          }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setProducts(result.products);
      } catch (error) {
        console.log("product page products fetch failed:", error.message);
      }
    };
    getProducts();
  }, [product]);

  useEffect(() => {
    let getGenuineProduct = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-products/${product?.genuine_reference}?filter=genuine`,
          { method: "GET" }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setGenuineProduct(result.product);
        console.log("genuine product:", result.product);
      } catch (error) {
        console.log("genuine product fetch failure:", error.message);
      }
    };
    if (product?.product_type !== "genuine") getGenuineProduct();
  }, [product]);

  const addProducttoCart = async (productId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/auto-products/${productId}?filter=stock`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      if (result.product_stock <= 0)
        return toast.error("Sorry, This product is now out of stock.");
      //   add product to cart
      const result2 = await addToCart(productId);
      return;
    } catch (error) {
      console.log("stock fetch error:", error.message);
      return;
    }
  };

  return { product, products, genuineProduct, addProducttoCart };
};
