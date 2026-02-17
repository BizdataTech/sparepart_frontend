"use client";

import { useEffect, useState } from "react";
import { Spinner } from "phosphor-react";
import useProducts from "../useProducts";
import CategoryList from "./CategoryList";
import { InputLabel } from "@/components/admin/InputLabel";
import Images from "./Images";
import Fitments from "./Fitments";
import GenuineReference from "./GenuineReference";
import { useSearchParams } from "next/navigation";

const ProductManagement = () => {
  const [product, setProduct] = useState(null);
  const {
    data,
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    handleBrand,
    handleCategory,
    reference,
    images,
    handleImages,
    cancelImage,
    vehicle_utility_object,
    createProduct,
    apiLoading,
    errors,
  } = useProducts(product);

  let { generalData, adminFields, handleInput } = data;
  const levelCategories = categories.filter((category) => category.level === 1);
  const [isOpen, setIsOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const params = useSearchParams();
  const id = params.get("id");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    if (!id) return;
    const getProductData = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/auto-products/${id}`, {
          method: "GET",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setProduct(result.product);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProductData();
  }, []);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const utilObject = {
    categories: levelCategories,
    handleCategory,
    handleIsOpen,
  };

  const genuine_util = {
    category: selectedCategory,
    product_type: generalData.product_type,
    reference,
    error: errors?.reference || null,
  };

  const image_util = {
    images,
    handleImages,
    cancelImage,
  };

  return (
    <section className="flex gap-6 mb-8 pb-[7rem]">
      <div className="w-full flex flex-col gap-6">
        <div className="a-section--box flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <div className="space-y-2 w-4/6">
              <InputLabel label="Title" error={errors.product_title} />
              <input
                type="text"
                name="product_title"
                placeholder="Eg: PM25 CABIN AIR FILTER BREZZA/S-CR"
                className="a-input"
                value={generalData?.product_title}
                onChange={handleInput}
              />
            </div>
            <div className="w-2/6 space-y-2">
              <InputLabel label="Product Type" error={errors.product_type} />
              <select
                name="product_type"
                id=""
                className="a-input"
                value={generalData.product_type}
                onChange={handleInput}
              >
                {[
                  ["genuine", "Genuine"],
                  ["oem", "OEM"],
                  ["after_market", "After Market"],
                ].map(([key, value]) => (
                  <option value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full space-y-2">
              <InputLabel label="Brand" error={errors.brand} />
              <div className="relative z-10">
                <div
                  className="a-input cursor-pointer"
                  onClick={() => setBrandOpen(!brandOpen)}
                >
                  {selectedBrand ? selectedBrand.brand_name : "Select Brand"}
                </div>
                {brandOpen && (
                  <div className="absolute w-full shadow-sm bg-white p-4 max-h-[20rem] overflow-y-scroll">
                    {brands.map((brand) => (
                      <div
                        key={brand._id}
                        className="p-2 text-[1.4rem] hover:bg-neutral-100 rounded-[.2rem] cursor-pointer"
                        onClick={() => {
                          handleBrand(brand);
                          setBrandOpen(false);
                        }}
                      >
                        {brand.brand_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full space-y-2">
              {/* label */}
              <InputLabel label="Category" error={errors.category} />
              {/* input field */}
              <div className="relative">
                <div className="a-input cursor-pointer" onClick={handleIsOpen}>
                  {selectedCategory
                    ? selectedCategory.title
                    : "Select Category"}
                </div>
                {isOpen && <CategoryList utils={utilObject} />}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full flex flex-col gap-2">
              <InputLabel label="Part Number" error={errors.part_number} />
              <input
                name="part_number"
                type="text"
                className="a-input uppercase"
                placeholder="Eg: 72180TM0T51"
                value={adminFields?.part_number}
                onChange={handleInput}
              />
            </div>
            <div className="w-2/6 flex flex-col gap-2">
              <InputLabel label="Price" error={errors.price} />
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  className="a-input !pl-10"
                  value={generalData?.price.toLocaleString("en-IN")}
                  onChange={handleInput}
                />
                <div className="absolute text-[1.5rem] left-4 top-[50%] -translate-y-[50%]">
                  &#8377;
                </div>
              </div>
            </div>
            <div className="w-2/6 flex flex-col gap-2">
              <InputLabel label="Stock" error={errors.stock} />
              <input
                type="number"
                name="stock"
                className="a-input"
                placeholder="Eg: 2"
                value={generalData?.stock.toLocaleString("en-IN")}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="space-y-2">
            <InputLabel label="Description" error={errors.description} />
            <textarea
              name="description"
              placeholder="Eg: A premium Android smartphone with AMOLED display..."
              rows={6}
              className="a-input"
              value={generalData?.description}
              onChange={handleInput}
            />
          </div>
        </div>

        <GenuineReference utility_object={genuine_util} />
        <Images utility_object={image_util} error={errors.images} />
        <Fitments
          utility_object={vehicle_utility_object}
          error={errors.fitments}
        />
        <div className="flex justify-end gap-4  mt-[2rem]">
          {Object.keys(errors).length > 0 && (
            <div className="a-text--error ">
              <span className="font-medium">Product Creation Blocked : </span>
              Your need to first resolve all the errors from the above fields
              inorder to create this product
            </div>
          )}
          <button
            className={`a-text--button bg-black text-white !px-[4rem] !py-[1rem] !text-[1.4rem] ${apiLoading && "opacity-60 !cursor-not-allowed"}`}
            onClick={createProduct}
            disabled={apiLoading}
          >
            {apiLoading ? (
              <div className="flex items-center gap-2">
                {product ? "Updating" : "Creating"}{" "}
                <Spinner className="w-[1.7rem] h-[1.7rem] animate-spin" />
              </div>
            ) : product ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductManagement;
