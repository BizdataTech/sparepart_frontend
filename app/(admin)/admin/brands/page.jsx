"use client";

import BrandCreation from "./BrandCreation";
import BrandList from "./BrandList";
import useBrand from "./useBrand";

const Brands = () => {
  const {
    status,
    brandName,
    handleBrandName,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    submitBrand,
    errors,
    brands,
  } = useBrand();

  let creation_utils = {
    status,
    brandName,
    handleBrandName,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    submitBrand,
    errors,
  };

  return (
    <main>
      <BrandCreation utils={creation_utils} />
      <hr className="my-16 text-neutral-300" />
      <BrandList brands={brands} />
    </main>
  );
};

export default Brands;
