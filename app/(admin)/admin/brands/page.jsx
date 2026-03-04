"use client";

import { useEffect, useState } from "react";
import BrandCreation from "./BrandCreation";
import BrandList from "./BrandList";
import useBrand from "./useBrand";
import SearchSection from "@/components/admin/SearchSection";

const Brands = () => {
  const { brands, setResults, refetch } = useBrand();
  const [box, setBox] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSelect = (brand) => {
    setSelectedBrand({
      id: brand._id,
      public_id: brand.image.public_id,
      url: brand.image.url,
      brand_name: brand.brand_name,
    });
  };

  useEffect(() => {
    if (selectedBrand) setBox(true);
  }, [selectedBrand]);

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
