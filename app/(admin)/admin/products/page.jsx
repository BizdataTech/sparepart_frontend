"use client";

import Link from "next/link";
import AdminElseBlock from "@/components/admin/AdminElseBlock";
import useProducts from "./useProducts";
import ShimmerContainer from "@/components/admin/ShimmerContainer";
import { CaretLeft, CaretRight } from "phosphor-react";
import ProductItem from "./ProductItem";
import SearchSection from "@/components/admin/SearchSection";
import EmptyRow from "@/components/admin/EmptyRow";

const Products = () => {
  let { products, setResults, controlPage, totalPages, currentPage, refetch } =
    useProducts();
  return (
    <section className="a-section--container pb-[4rem]">
      <div>
        {products === null ? (
          <ShimmerContainer />
        ) : (
          <div className="w-full max-w-full min-h-[88svh] flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-4">
              <SearchSection
                placeholder="Search for products"
                type="products"
                setResults={setResults}
              />
              <Link
                className="a-text--button ml-auto !text-[1.2rem] text-white bg-black/80 hover:bg-black !py-3 transition !rounded-[.3rem]"
                href="/admin/products/product-management"
              >
                Add new product
              </Link>
            </div>
            <div className="w-full a-text--body a-section--box !p-0 border-0 border-neutral-300 bg-white">
              <div className="flex justify-between py-4 px-4 border-0 border-neutral-200 font-semibold text-neutral-700">
                <div className="grid grid-cols-4 w-[80%] gap-[2rem]">
                  <div>Product Title</div>
                  <div>Category</div>
                  <div>Brand</div>
                  <div className="">Product Type</div>
                </div>
                <div className="">
                  <div className="">Options</div>
                </div>
              </div>
              {products.map((product, index) => (
                <ProductItem key={index} product={product} refetch={refetch} />
              ))}
              {products.length === 0 && <EmptyRow text="No result found" />}
            </div>
            <div className="flex justify-end items-center  gap-8 mt-auto">
              <CaretLeft
                className={`w-[1.5rem] h-[1.5rem] cursor-pointer ${
                  currentPage == 1 ? "text-neutral-300" : ""
                }`}
                weight="bold"
                onClick={() => controlPage("down")}
              />
              <div className="text-[1.4rem]">{"1"}</div>
              <CaretRight
                className={`w-[1.5rem] h-[1.5rem] cursor-pointer ${
                  currentPage === totalPages ? "text-neutral-300" : ""
                }`}
                weight="bold"
                onClick={() => controlPage("up")}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
