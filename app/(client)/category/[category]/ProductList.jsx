"use client";

import Link from "next/link";
import useCategoryProducts from "./useCategoryProducts";

const ProductList = ({ products }) => {
  return (
    <section className="w-full bg-white p-4">
      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              className="space-y-4 p-8 border border-neutral-300 hover:scale-102 transition-transform cursor-pointer"
              href={`/product/${product._id}`}
            >
              <div>
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-[20rem] object-contain p-8"
                />
              </div>
              <div className="text-[1.8rem] text-center">
                <div>{product.product_title}</div>
                <div>{product.brand.brand_name}</div>
                <div className="mt-6 font-medium">{`₹ ${product.price}`}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center mt-[5rem]">
          <div className="text-[2rem] font-medium">
            Couldn't find any products!
          </div>
          <div className="text-[1.6rem]">
            No products are found under this category.
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
