import { useEffect, useRef, useState } from "react";

const useSection = () => {
  let [sectionData, setSectionData] = useState({
    title: "",
    section_type: "automatic",
  });
  let [config, setConfig] = useState({ category: "", filter: "" });

  // search
  let debounce = useRef(null);
  let [query, setQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  let [loading, setLoading] = useState(false);

  let [selectedProducts, setSelectedProducts] = useState([]);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (query.trim()) {
      debounce.current = setTimeout(async () => {
        try {
          setLoading(true);
          let response = await fetch(
            `${BACKEND_URL}/api/auto-products?filter=products&query=${encodeURIComponent(
              query
            )}`,
            {
              method: "GET",
            }
          );
          let result = await response.json();
          setLoading(false);
          if (!response.ok) throw new Error(result.message);
          console.log("search results:", result.products);
          setSearchResults(result.products);
        } catch (error) {
          console.log("all product search error:", error.message);
        }
      }, 150);
    }
  }, [query]);

  const handleInput = (event) => {
    let { name, value } = event.target;
    setSectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelection = (product) => {
    setSelectedProducts((prev) => {
      setQuery("");
      let matching = prev.find((p) => p._id === product._id);
      if (matching) return prev.filter((p) => p._id !== product._id);
      return [...prev, product];
    });
  };

  const removeProduct = (product) => {
    setSelectedProducts((prev) => {
      return prev.filter((p) => p._id !== product._id);
    });
  };

  return {
    sectionData,
    config,
    handleInput,
    searchConfig: {
      query,
      setQuery,
      loading,
      searchResults,
      handleSelection,
      removeProduct,
      selectedProducts,
    },
  };
};
export default useSection;
