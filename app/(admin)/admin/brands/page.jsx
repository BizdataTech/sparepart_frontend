"use client";

import { useEffect, useState } from "react";
import BrandCreation from "./BrandCreation";
import BrandList from "./BrandList";
import useBrand from "./useBrand";
import SearchSection from "@/components/admin/SearchSection";

const Brands = () => {
  // --- Data & Hooks ---
  
  // Custom hook to manage fetching and filtering brands
  const { brands, setResults, refetch } = useBrand();

  // --- UI State ---
  
  // Controls the visibility of the BrandCreation (Create/Update) modal/sidebar
  const [box, setBox] = useState(false);

  // Stores the specific brand object when the user clicks 'Update'
  const [selectedBrand, setSelectedBrand] = useState(null);

  /**
   * Prepares the selected brand data for the update form.
   * Maps backend properties to the expected format for BrandCreation.
   * @param {Object} brand - The brand object from the list
   */
  const handleSelect = (brand) => {
    setSelectedBrand({
      id: brand._id,
      public_id: brand.image.public_id,
      url: brand.image.url,
      brand_name: brand.brand_name,
    });
  };

  /**
   * Effect: Automatically open the creation/update box when a brand is selected.
   */
  useEffect(() => {
    if (selectedBrand) setBox(true);
  }, [selectedBrand]);

  // Render a loading state until brands data is available
  if (brands === null) return <div>loading...</div>;
  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SearchSection
          placeholder="Search for brands by brand name"
          type="brands"
          setResults={setResults}
        />
        <button
          href="/admin/brands"
          className="a-text--button ml-auto !text-[1.2rem] text-white bg-black/80 hover:bg-black !py-3 transition !rounded-[.3rem]"
          onClick={() => setBox(true)}
        >
          Create New Brand
        </button>
      </div>
      <BrandList
        brands={brands}
        handleSelect={handleSelect}
        refetch={refetch}
      />
      {box && (
        <div className="fixed inset-0 bg-black/30 z-100 flex justify-center items-center">
          <BrandCreation
            selectedBrand={selectedBrand}
            removeSelectedBrand={() => setSelectedBrand(null)}
            close={() => setBox(false)}
            refetch={refetch}
          />
        </div>
      )}
    </main>
  );
};

export default Brands;
