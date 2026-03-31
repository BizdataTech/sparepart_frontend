"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for managing brand data in the admin panel.
 * Handles fetching all brands and provides methods to refetch and filter results.
 * 
 * @returns {Object} { brands: results, setResults, refetch: getBrands }
 */
const useBrand = () => {
  // --- State Management ---
  
  // Stores the raw list of brands fetched from the server
  let [brands, setBrands] = useState(null);
  
  // Stores the results ready for display (can be filtered locally if needed)
  let [results, setResults] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // --- Initial Data Fetch ---
  
  // Fetches all brands when the component using this hook mounts
  useEffect(() => {
    getBrands();
  }, []);

  // Syncs the 'results' state whenever the 'brands' data changes
  useEffect(() => {
    setResults(brands);
  }, [brands]);

  /**
   * Fetches all brands from the backend API.
   * Updates the brands state on success and logs errors on failure.
   */
  let getBrands = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/brands?search=`, {
        method: "GET",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      // Update global brands list
      setBrands(result.result);
    } catch (error) {
      console.error("Fetch Brands Error:", error.message);
    }
  };

  /**
   * Expose the data and utility functions:
   * - brands: The list currently intended for display.
   * - setResults: Allows local filtering of the display results.
   * - refetch: Triggers a fresh API call for brands.
   */
  return { brands: results, setResults, refetch: getBrands };
};

export default useBrand;
