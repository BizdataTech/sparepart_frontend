import { Upload, Spinner, X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const BrandCreation = ({
  selectedBrand,
  removeSelectedBrand,
  close,
  refetch,
}) => {
  // --- Refs & State ---
  
  let fileInputRef = useRef(null);
  
  let [file, setFile] = useState(null);       // The selected image file object
  let [previewURL, setPreviewURL] = useState(null); // Local URL for image preview
  let [brandName, setBrandName] = useState("");     // The text input for brand name
  let [errors, setErrors] = useState({});           // Validation errors
  let [loading, setLoading] = useState(false);      // Loading state for API operations

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Tracks only the fields that were modified during an update (used for PATCH)
  const [updateData, setUpdateData] = useState({});

  /**
   * Effect: Initialize form data when a brand is selected for update.
   */
  useEffect(() => {
    if (selectedBrand) {
      setPreviewURL(selectedBrand.url);
      setBrandName(selectedBrand.brand_name);
      setErrors({});
    }
  }, [selectedBrand]);

  /**
   * Effect: Revoke old object URLs to prevent memory leaks when a new image is selected.
   */
  useEffect(() => {
    return () => {
      if (previewURL && previewURL.startsWith("blob:")) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  /**
   * Programmatically clicks the hidden file input.
   */
  const openSystemFiles = () => {
    fileInputRef.current.click();
  };

  /**
   * Handles text input for the brand name.
   * Also tracks changes in updateData if in update mode.
   */
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

  /**
   * Handles file selection for the brand logo.
   * Sets the file object, generates a preview URL, and tracks it in updateData.
   */
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

  /**
   * Resets local state and closes the creation/update sidebar.
   */
  const cancelUpdate = () => {
    removeSelectedBrand();
    setUpdateData({});
    setFile(null);
    setPreviewURL(null);
    setBrandName("");
    close();
  };

  /**
   * Submits the brand form (Create or Update).
   * Performs validation, constructs FormData, and makes the API request.
   */
  const submitBrand = async () => {
    try {
      // Basic Frontend Validation
      let error_object = {};
      if (!brandName.trim()) error_object.brand_name = "Brand Name Required";
      if (!previewURL) error_object.brand_image = "Image Required";
      
      if (Object.keys(error_object).length) {
        setErrors((prev) => ({ ...prev, ...error_object }));
        return;
      }

      let formData = new FormData();
      let response;

      if (selectedBrand) {
        // --- Update Flow (PATCH) ---
        if (!Object.keys(updateData).length)
          return toast.warning(
            "Update Dismissed : No new data detected to update selected brand",
          );

        // Include only changed fields in the payload
        Object.entries(updateData).forEach(([key, value]) =>
          formData.append(key, value),
        );
        
        // Pass public_id to handle potential image deletion/replacement in Cloudinary
        formData.append("public_id", selectedBrand.public_id);
        
        setLoading(true);
        response = await fetch(
          `${BACKEND_URL}/api/brands/${selectedBrand.id}`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
          },
        );
        setLoading(false);
      } else {
        // --- Creation Flow (POST) ---
        formData.append("image", file);
        formData.append("brand_name", brandName);

        setLoading(true);
        response = await fetch(`${BACKEND_URL}/api/brands`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        setLoading(false);
      }

      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      
      // Cleanup after success
      removeSelectedBrand();
      setUpdateData({});
      setPreviewURL(null);
      setFile(null);
      setBrandName("");
      refetch();
      close();
      toast.success(result.message);
    } catch (error) {
      console.log("error", error.message);
      toast.error("Failed : Brand operation failed");
    }
  };

  return (
    <section className="w-2/6 a-text--body bg-white flex flex-col gap-4 rounded-[1rem] p-6">
      <div className="flex justify-between items-center">
        <div className="text-[1.6rem] font-medium">
          #{selectedBrand ? "Update" : "Create"} Brand
        </div>

        <div className="text-red-700 cursor-pointer" onClick={cancelUpdate}>
          <X weight="bold" className="w-[1.8rem] h-[1.8rem]" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-end justify-between">
          <label htmlFor="" className="a-text--label">
            Brand Name
          </label>
          {errors.brand_name && (
            <div className="a-text--error">{errors.brand_name}</div>
          )}
        </div>

        <input
          type="text"
          className="a-input"
          placeholder="Eg: Skoda"
          value={brandName}
          onChange={handleBrandName}
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-end justify-between">
          <div className="a-text--label">Image</div>
          {errors.brand_image && (
            <div className="a-text--error">{errors.brand_image}</div>
          )}
        </div>
        <div
          className="border border-neutral-200 h-[20rem] bg-white flex items-center justify-center cursor-pointer relative"
          onClick={openSystemFiles}
        >
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {previewURL ? (
            <div className="absolute inset-0">
              <img
                src={previewURL}
                alt="brand preview image"
                className="w-full h-full object-contain"
              />
              <div className="bg-black/40 absolute inset-0"></div>
              <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-10 text-white text-[1.8rem] font-medium w-full text-center">
                Click here to change the preview image
              </div>
            </div>
          ) : (
            <div className="a-text--label !text-[1.6rem] !flex items-center gap-0">
              Upload image from your device{" "}
              <Upload className="w-[4rem] h-[2rem]" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <button
          className={`w-full text-[1.6rem] text-white bg-black ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} py-4`}
          onClick={submitBrand}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              {selectedBrand ? "Updating" : "Creating"}
              <Spinner className="w-[2rem] h-[2rem] animate-spin" />
            </div>
          ) : selectedBrand ? (
            "Update Brand"
          ) : (
            "Create Brand"
          )}
        </button>
      </div>
    </section>
  );
};

export default BrandCreation;
