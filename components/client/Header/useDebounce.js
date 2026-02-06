import { useEffect, useRef, useState } from "react";

const useDebounce = () => {
  let [query, setQuery] = useState("");
  let [results, setResults] = useState(null);
  let [box, setBox] = useState(false);
  let [load, setLoad] = useState(false);
  let debounce = useRef(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (query.trim().length) {
      if (debounce.current) clearTimeout(debounce.current);
      setBox(true);
      setLoad(true);
      debounce.current = setTimeout(async () => {
        try {
          let response = await fetch(
            `${BACKEND_URL}/api/auto-products?filter=search&query=${query}`,
            {
              method: "GET",
              credentials: "include",
            },
          );
          setLoad(false);
          let result = await response.json();
          if (!response.ok) throw new Error(result.message);
          setResults(result.products);
        } catch (error) {
          console.log("search error:", error.message);
        }
      }, 200);
    } else {
      setResults(null);
      setBox(false);
    }
  }, [query]);

  return { query, setQuery, results, box, setBox, load };
};

export default useDebounce;
