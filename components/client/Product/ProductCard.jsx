"use client";

import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link
      className="space-y-4 bg-white relative shadow-sm cursor-pointer md:w-auto"
      href={`/product/${product._id}`}
    >
      <div>
        <img
          src={product.images[0]}
          alt="producgt image"
          className="h-[12rem] md:h-[15rem] w-full object-contain"
        />
      </div>
      <div className="p-4 text-[1.4rem] md:text-[1.6rem]">
        <div className=" uppercase font-medium">{product.product_title}</div>
        <div className="my-4 font-semibold">₹ {product.price}</div>
        <div className="text-neutral-600">{product.brand.brand_name}</div>
      </div>
      {["genuine", "oem"].includes(product.product_type) && (
        <div className="absolute top-4 right-0 uppercase text-white font-medium bg-red-700 py-1 px-2 md:px-4  md:text-[1.2rem]">
          {product.product_type}
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
