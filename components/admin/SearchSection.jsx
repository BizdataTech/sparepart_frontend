"use client";

import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const SearchSection = ({ placeholder, type, setResults }) => {
  const [query, setQuery] = useState("");
  const debounce = useRef(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let endpoint_and_query = "";

  switch (type) {
    case "products":
      endpoint_and_query = `/api/auto-products?filter=admin-products&current_page=1&search=${query}`;
      break;
    case "categories":
      endpoint_and_query = `/api/auto-categories?filter=all&current_page=1&search=${query}`;
      break;
    case "orders":
      endpoint_and_query = `/api/admin/orders?search=${query}`;
      break;
    case "vehicles":
      endpoint_and_query = `/api/auto-vehicles?type=admin&page=1&search=${query}`;
      break;
    case "users":
      endpoint_and_query = `/api/users?search=${query}`;
      break;
    case "brands":
      endpoint_and_query = `/api/brands?search=${query}`;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        let res = await axios.get(`${BACKEND_URL}${endpoint_and_query}`, {
          withCredentials: true,
        });
        setResults(res.data.result);
      } catch (err) {
        if (err.response) console.log(err.response?.data?.message);
        else console.log(err.message);
      }
    }, [1]);
  }, [query]);

  return (
    <section>
      <form className="relative w-[480px]">
        <input
          type="input"
          className="bg-white border border-neutral-300 w-full  text-[1.4rem] rounded-[.5rem] outline-0 p-3"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MagnifyingGlass
          className="absolute right-4 top-[50%] -translate-y-[50%] w-[1.6rem] h-[1.6rem]"
          weight="bold"
        />
      </form>
    </section>
  );
};

export default SearchSection;
