"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const useBrand = () => {
  let [brands, setBrands] = useState([]);
  let fileInputRef = useRef(null);
  let [file, setFile] = useState(null);
  let [previewURL, setPreviewURL] = useState(null);
  let [brandName, setBrandName] = useState("");
  let [errors, setErrors] = useState({});
  let [loading, setLoading] = useState(false);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [updateData, setUpdateData] = useState({});

  // get all brands
  useEffect(() => {
    getBrands();
  }, []);

  let getBrands = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/brands`, {
        method: "GET",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log("brands:", result.brands);
      setBrands(result.brands);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const openSystemFiles = () => {
    fileInputRef.current.click();
  };

  const handleBrandName = (event) => {
    setBrandName(event.target.value);
    if (selectedBrand)
      setUpdateData((prev) => ({
        ...prev,
        brand_name: event.target.value,
      }));
    setErrors((prev) => {
      let { brand_name, ...rest } = prev;
      return rest;
    });
  };

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (!file) return null;

    setFile(file);
    if (selectedBrand)
      setUpdateData((prev) => ({
        ...prev,
        image: file,
      }));
    const url = URL.createObjectURL(file);
    setPreviewURL(url);
    setErrors((prev) => {
      let { brand_image, ...rest } = prev;
      return rest;
    });
  };

  const handleSelect = (brand) => {
    setSelectedBrand({
      id: brand._id,
      public_id: brand.image.public_id,
    });
    setPreviewURL(brand.image.url);
    setBrandName(brand.brand_name);
    setErrors({});
  };

  const cancelUpdate = () => {
    setSelectedBrand(null);
    setUpdateData({});
    setFile(null);
    setPreviewURL(null);
    setBrandName("");
  };

  const submitBrand = async () => {
    try {
      let error_object = {};
      if (!brandName.trim()) error_object.brand_name = "Brand Name Required";

      if (!previewURL) error_object.brand_image = "Image Required";
      if (Object.keys(error_object).length) {
        setErrors((prev) => {
          let newError = { ...prev };
          Object.entries(error_object).forEach(([key, value]) => {
            newError[key] = value;
          });
          return newError;
        });
        return;
      }

      let formData = new FormData();
      let response;
      if (selectedBrand) {
        console.log("brand update data :", updateData);
        if (!Object.keys(updateData).length)
          return toast.warning(
            "Update Dismissed : No new data detected to update selected brand",
          );
        Object.entries(updateData).forEach(([key, value]) =>
          formData.append(key, value),
        );
        formData.append("public_id", selectedBrand.public_id);
        setLoading(true);
        response = await fetch(
          `${BACKEND_URL}/api/brands/${selectedBrand.id}`,
          {
            method: "PATCH",
            body: formData,
          },
        );
        setLoading(false);
      } else {
        formData.append("image", file);
        formData.append("brand_name", brandName);

        setLoading(true);
        response = await fetch(`${BACKEND_URL}/api/brands`, {
          method: "POST",
          body: formData,
        });
        setLoading(false);
      }

      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      getBrands();
      setPreviewURL(null);
      setBrandName("");
      setUpdateData({});
      toast.success(result.message);
    } catch (error) {
      console.log("error", error.message);
      toast.error("Failed : Brand updation failed");
    }
  };

  return {
    loading,
    brands,
    fileInputRef,
    openSystemFiles,
    handleFileChange,
    previewURL,
    brandName,
    handleBrandName,
    submitBrand,
    errors,
    handleSelect,
    update: selectedBrand ? true : false,
    cancel: cancelUpdate,
  };
};

export default useBrand;
