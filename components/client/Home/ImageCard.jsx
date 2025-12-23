"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "./useHomeProducts";

const ImageCard = ({ categoryID, title }) => {
  let { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts(categoryID);
  });

  return (
    <section className="mx-auto my-4">
      <div className="text-[2.5rem] font-medium">{title}</div>
      <div className="grid grid-cols-5 gap-4 mx-auto py-8">
        {products.map((product, index) => (
          <Link href={`/product/${product.variant._id}`} key={index}>
            <div className="bg-white p-4 flex flex-col gap-6 group">
              <img
                src={product.variant.images[0]}
                alt="product image"
                className="w-full h-[15rem] object-contain group-hover:scale-[1.1] transition-transform"
              />
              <div className="text-center leading-[2.2rem]">
                <div className="text-[1.8rem] font-medium">
                  {product.product_title.split(" ").slice(0, 3).join(" ")}
                </div>
                <div className="text-gray-700">{product.brand}</div>
                <div className="font-medium text-[2rem] mt-4">
                  ₹ {product.variant.price}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ImageCard;
