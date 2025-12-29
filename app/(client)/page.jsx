"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/client/Product/ProductCard.jsx";
import Banner from "@/components/client/Home/Banner";

const ClientPage = () => {
  const [products, setProducts] = useState([]);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    let getProducts = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-products?filter=home&category=690d7693f1d5f0662da165df`,
          { method: "GET" }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setProducts(result.products);
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    getProducts();
  }, []);
  return (
    <main className="pt-[16rem]">
      <Banner />
      <div className="w-[85%] mx-auto space-y-4 my-[8rem]">
        <div className="text-[2rem] uppercase font-medium">Air Filters</div>
        {products.length > 0 && (
          <div className="grid grid-cols-6 gap-5">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ClientPage;
