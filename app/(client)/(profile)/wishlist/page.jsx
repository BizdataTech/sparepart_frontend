"use client";

import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Wishlist = () => {
  let [products, setProducts] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getWishlistProducts();
  }, []);

  let getWishlistProducts = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/wishlist`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setProducts(result.products);
      console.log("wishlist products:", result.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeProduct = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/wishlist/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      getWishlistProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="space-y-8">
      <h1 className="text-[2rem] uppercase font-medium">Wishlist</h1>
      <div>
        {!products ? (
          <div>loading</div>
        ) : products.length ? (
          <div className="space-y-4">
            {products.map((p, i) => (
              <Link
                href={`/product/${p._id}`}
                key={i}
                className="text-[1.4rem] md:text-[1.6rem] border border-neutral-300 flex justify-between items-start p-8"
              >
                <div className="flex gap-8">
                  <div>
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-[7rem] md:w-[15rem] h-[7rem] md:h-[10rem] object-cover"
                    />
                  </div>
                  <div>
                    <div className="uppercase font-medium hover:underline hover:text-purple-800 transition-colors">
                      {p.product_title}
                    </div>
                    <div>{p.brand.brand_name}</div>
                    <div className="font-semibold mt-8">₹ {p.price}</div>
                  </div>
                </div>
                <X
                  className="w-[2rem] h-[2rem] text-red-700 cursor-pointer z-100"
                  onClick={(e) => removeProduct(e, p._id)}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-[1.6rem]">
            <div className="font-medium">Your Wishlist is Empty</div>
            <div>
              Couldn't find any products. Add your favourite products here in
              this bucket!
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
