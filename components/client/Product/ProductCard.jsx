"use client";

import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      className="bg-white shadow-md flex flex-col gap-6 overflow-hidden py-2 md:py-8"
    >
      <div className="h-[7rem] lg:h-[12rem]">
        <img
          src={product.image}
          alt="product image"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="h-full flex flex-col gap-1 md:gap-2 px-2 md:px-6">
        <div className="text-[1.1rem] lg:text-[1.8rem] text-center font-medium md:uppercase leading-[1.4rem] md:leading-normal">
          {product.product_title}
        </div>
        <div className="text-[.8rem] lg:text-[1.6rem] text-center">
          {product.brand}
        </div>
        <div className="text-[1.1rem] lg:text-[2rem] text-center font-semibold mt-8">
          ₹ {Intl.NumberFormat("en-IN").format(product.price)}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
