"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import AuthButtons from "./AuthButtons";
import useDebounce from "./useDebounce.js";

const HeaderMiddle = () => {
  const { items } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { query, setQuery, results, box, setBox, load } = useDebounce();
  return (
    <div className="border border-neutral-300">
      <div className="header w-full flex justify-between">
        <div className="left flex items-center gap-8">
          <Link href={`/`}>
            <div className="leading-[2.4rem] uppercase text-[2.5rem]">
              <span className="text-[#b00015] font-semibold">prototype</span>{" "}
              <br /> <span className="text-black font-medium">site</span>
            </div>
          </Link>
          <div className="flex items-center space-x-3">
            <form className="relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-[38rem] px-4 py-4 bg-neutral-200 text-[1.5rem] placeholder:text-neutral-600 placeholder:font-medium rounded-md focus:outline-none focus:ring-2 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="absolute h-full right-4" type="submit">
                <i className="fa-solid fa-magnifying-glass text-[1.8rem] text-neutral-600 cursor-pointer"></i>
              </button>
              {box && results && (
                <div className="absolute bg-white shadow-2xl left-0 right-0 top-full z-200 overflow-y-scroll text-[1.6rem] p-4">
                  {results.length ? (
                    results.map((product) => (
                      <div
                        className="hover:bg-neutral-200 transition-colors cursor-pointer py-2"
                        onClick={() => setBox(null)}
                      >
                        <Link
                          className=""
                          href={`/product/${product._id}`}
                        >{`${product.brand}'s ${product.product_title}`}</Link>
                      </div>
                    ))
                  ) : (
                    <div>No Matching Results found!</div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        <nav>
          <ul className="options flex items-center gap-[2.8rem] text-[1.6rem] font-medium text-neutral-800">
            <div className="relative">
              <Link href={`/cart`} className="capitalize cursor-pointer">
                cart
              </Link>
              <span className="absolute top-0 right-[-1.5rem] text-[.9rem] py-[.1rem] px-[.5rem] bg-red-600 text-white rounded-full">
                {items.length}
              </span>
            </div>

            <Link href={`/wishlist`} className="capitalize cursor-pointer">
              wishlist
            </Link>
            {user && (
              <Link href={`/profile`} className="capitalize cursor-pointer">
                profile
              </Link>
            )}

            <AuthButtons />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMiddle;
