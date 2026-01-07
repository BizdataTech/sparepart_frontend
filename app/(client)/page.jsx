"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/client/Product/ProductCard.jsx";
import Banner from "@/components/client/Home/Banner";

const ClientPage = () => {
  const [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    let getProducts = async () => {
      try {
        setLoading(true);
        let response = await fetch(
          `${BACKEND_URL}/api/auto-products?filter=home&category=690d7693f1d5f0662da165df`,
          { method: "GET" }
        );
        setLoading(false);
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
    <main className="pt-[14rem] md:pt-[16rem]">
      <Banner />
      <div className="w-[90%] md:w-[85%] mx-auto space-y-4 my-[4rem] md:my-[8rem]">
        {loading ? (
          <div className="grid grid-cols-5 gap-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="loading--container w-full h-[25rem]">
                <div className="loading--mask loading--animation"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="text-[1.6rem] md:text-[2rem] uppercase font-medium">
              Air Filters
            </div>
            {products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                {products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ClientPage;
