"use client";

import BrandCreation from "./BrandCreation";
import BrandList from "./BrandList";
import useBrand from "./useBrand";

const Brands = () => {
  const {
    loading,
    brandName,
    handleBrandName,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    submitBrand,
    brands,
    handleSelect,
    update,
    cancel,
    deleteBrand,
    deleteLoad,
    errors,
  } = useBrand();

  let creation_utils = {
    loading,
    brandName,
    handleBrandName,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    submitBrand,
    update,
    cancel,
    deleteBrand,
    deleteLoad,
    errors,
  };

  return (
    <main className="flex gap-6">
      <BrandList brands={brands} handleSelect={handleSelect} />
      <BrandCreation utils={creation_utils} />
    </main>
  );
};

export default Brands;
