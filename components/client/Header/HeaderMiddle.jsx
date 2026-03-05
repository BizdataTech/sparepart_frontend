"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce.js";
import { List, MagnifyingGlass } from "phosphor-react";
import SlideNavigation from "./SlideNavigation";
import NavLinks from "./NavLinks";

const HeaderMiddle = () => {
  const { query, setQuery, results, box, setBox, load } = useDebounce();
  const [slide, setSlide] = useState(false);
  const [logo, setLogo] = useState(null);
  const boxRef = useRef(null);

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

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setBox(false);
    };
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="border border-neutral-300">
      <div className="header w-full flex justify-between">
        <div className="w-full flex items-center gap-8">
          <Link href={`/`}>
            <img
              src={logo}
              alt="website logo"
              className="w-[3.5rem] lg:w-[9rem] h-[3.5rem] lg:h-[6.5rem] object-contain"
            />
          </Link>
          <div className="w-full md:w-auto">
            <form className="relative">
              <input
                type="input"
                placeholder="Search for products..."
                className="w-full md:w-[45rem] p-4 md:p-6 bg-neutral-200 text-[1.2rem] md:text-[1.6rem] placeholder:text-neutral-600 placeholder:md:font-medium rounded-md outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="absolute h-full right-4" type="submit">
                <MagnifyingGlass
                  className="w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]"
                  weight="bold"
                />
              </button>
              {box && results && (
                <div
                  className="absolute max-h-[40rem] bg-white shadow-2xl left-0 right-0 top-full z-200 overflow-y-scroll text-[1.2rem] md:text-[1.6rem] px-4"
                  ref={boxRef}
                >
                  {results.length ? (
                    results.map((product) => (
                      <div
                        className="hover:bg-neutral-200 transition-colors cursor-pointer py-4 border-b last:border-0"
                        onClick={() => setBox(null)}
                      >
                        <Link
                          className=""
                          href={`/product/${product._id}`}
                        >{`${product.brand}'s ${product.product_title}`}</Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      No Matching Results found!
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        <NavLinks />
        <div className="md:hidden" onClick={() => setSlide(true)}>
          <List className="w-[2rem] h-[2rem] text-black" weight="fill" />
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
