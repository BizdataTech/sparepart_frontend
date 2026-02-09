"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce.js";
import { List } from "phosphor-react";
import SlideNavigation from "./SlideNavigation";
import NavLinks from "./NavLinks";

const HeaderMiddle = () => {
  const { query, setQuery, results, box, setBox, load } = useDebounce();
  const [slide, setSlide] = useState(false);
  const [logo, setLogo] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    let getLogo = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/client/logo`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setLogo(result.url);
      } catch (error) {
        console.log(error.message);
      }
    };
    getLogo();
  }, []);

  return (
    <div className="border border-neutral-300">
      <div className="header w-full flex justify-between">
        <div className="left flex items-center gap-8">
          <Link href={`/`}>
            <img
              src={logo}
              alt="website logo"
              className="w-[5rem] lg:w-[9rem] h-[5rem] lg:h-[6.5rem] object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-3">
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

        <NavLinks />
        <div className="md:hidden" onClick={() => setSlide(true)}>
          <List className="w-[3rem] h-[3rem] text-black" weight="fill" />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-200 bg-white  transition-transform ${
          slide ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <SlideNavigation open={setSlide} />
      </div>
    </div>
  );
};

export default HeaderMiddle;
