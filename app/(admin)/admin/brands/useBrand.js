"use client";

import { useEffect, useState } from "react";

const useBrand = () => {
  let [brands, setBrands] = useState(null);
  let [results, setResults] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // get all brands
  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    setResults(brands);
  }, [brands]);

  let getBrands = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/brands?search=`, {
        method: "GET",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log("brands:", result.result);
      setBrands(result.result);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return { brands: results, setResults, refetch: getBrands };
};

export default useBrand;
