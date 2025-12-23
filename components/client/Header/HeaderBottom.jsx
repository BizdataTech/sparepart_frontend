"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const HeaderBottom = () => {
  let [categories, setCategories] = useState([]);
  let [children, setChildren] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const get_categories = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-categories?filter=nav-bar`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("dropdown:", result.categories);
        setCategories(result.categories);
      } catch (error) {
        console.log("nav bar category fetch error:", error.message);
      }
    };
    get_categories();
  }, []);

  const getChildren = (id) => {
    let matching_parent = categories.find((c) => String(c._id) === String(id));
    console.log("parent:", matching_parent);
    setChildren(matching_parent.children);
  };

  return (
    <nav style={{ backgroundColor: "#121212", color: "white" }}>
      <div className="w-[85%] flex mx-auto relative group">
        {categories.map((cata, i) => (
          <>
            <div
              key={i}
              className="text-[1.6rem] py-4 px-6 cursor-pointer hover:bg-neutral-700 transition-colors"
              onMouseOver={() => getChildren(cata._id)}
            >
              {cata.title}
            </div>
            {children && (
              <div className="hidden group-hover:flex flex-col absolute left-0 w-full top-full h-[40rem] bg-[#121212] p-6">
                {children.map((c) => (
                  <Link
                    className="text-[1.6rem] font-light py-2 cursor-pointer hover:underline"
                    href={`/category/${c.slug}`}
                    onClick={() => setChildren(null)}
                  >
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </nav>
  );
};
