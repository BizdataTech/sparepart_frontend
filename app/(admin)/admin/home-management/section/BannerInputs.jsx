import { Spinner, XCircle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const BannerInputs = ({ refetch }) => {
  let [errors, setErrors] = useState({});
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  let [bannerDetails, setBannerDetails] = useState({
    data_source: "product",
    reference_id: "",
  });
  let [selectedText, setSelectedText] = useState("");
  let [query, setQuery] = useState("");
  let [searchResults, setSearchResults] = useState(null);
  let fileInputRef = useRef(null);

  const handleBannerImageInput = (e) => {
    let file = e.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => {
      let { banner, ...rest } = prev;
      return rest;
    });
  };

  const handleSelection = (e) => {
    let { value, name } = e.target;
    if (name === "data_source") {
      setBannerDetails((prev) => ({
        data_source: value,
        reference_id: "",
      }));
      setSearchResults(null);
      setQuery("");
      setSelectedText("");
    }
  };

  let debounce = useRef();
  let [box, setBox] = useState(false);
  let [loading, setLoading] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!query.trim()) {
      setBox(false);
      setSearchResults(null);
      setBannerDetails((prev) => ({
        ...prev,
        reference_id: "",
      }));

      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        setBox(true);
        setLoading(true);
        let response = await fetch(
          `${BACKEND_URL}/api/sections/search/${bannerDetails.data_source}?query=${query}`,
          {
            method: "GET",
          },
        );
        setLoading(false);
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setSearchResults(result.result);
        console.log("search results:", result.result);
      } catch (error) {
        console.log(error.message);
      }
    }, 200);
  }, [query]);

  const handleReferenceSelection = (item) => {
    setBannerDetails((prev) => ({
      ...prev,
      reference_id: item._id,
    }));
    setBox(false);
    setSearchResults(null);
    setErrors((prev) => {
      let { reference_id, ...rest } = prev;
      return rest;
    });
    switch (bannerDetails.data_source) {
      case "product":
        setSelectedText(`${item.brand} ${item.product_title}`);
        break;
      case "category":
        setSelectedText(`${item.title}`);
        break;
      default:
        break;
    }
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const submitBanner = async () => {
    let submit_errors = {};
    if (!file) submit_errors.banner = "Banner Image Required";
    if (bannerDetails.data_source !== "none" && !bannerDetails.reference_id)
      submit_errors.reference_id = "Required";
    if (Object.keys(submit_errors).length) {
      return setErrors((prev) => {
        let new_errors = { ...prev };
        Object.entries(submit_errors).forEach(([key, value]) => {
          new_errors[key] = value;
        });
        return new_errors;
      });
    }

    let formData = new FormData();
    formData.append("section_type", "banner");
    formData.append("url", file);
    formData.append("data_source", bannerDetails.data_source);
    formData.append("reference_id", bannerDetails.reference_id);
    try {
      setSubmitLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/sections`, {
        method: "POST",
        body: formData,
      });
      setSubmitLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setFile(null);
      setPreview(null);
      setBannerDetails({
        data_source: "products",
        reference_id: "",
      });
      setQuery("");
      setSelectedText("");
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <section className="flex flex-col gap-8">
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>Banner Image</div>
          {errors.banner && (
            <div className="a-text--error">{errors.banner}</div>
          )}
        </div>

        <div
          className="w-full h-[20rem] relative group cursor-pointer hover:text-black"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={preview ? preview : "/admin/empty.webp"}
            className={`w-full h-full object-contain bg-neutral-200 border ${!preview && "opacity-30"}`}
          />
          <div className="z-100 absolute inset-0 bg-black/20 text-[2rem] text-white font-medium hidden group-hover:flex justify-center items-center">
            {preview
              ? "Click to update banner image"
              : "Click to select a banner image"}
          </div>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleBannerImageInput}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 space-y-1">
          <div className="a-text--label">Data Source</div>
          <select
            className="a-input"
            name="data_source"
            onChange={handleSelection}
          >
            {[
              ["none", "none"],
              ["Product", "product"],
              ["Category", "category"],
            ].map(([key, value], i) => (
              <option
                className="capitalize"
                value={value}
                key={i}
                selected={i == 1}
              >
                {key}
              </option>
            ))}
          </select>
        </div>
        {bannerDetails.data_source !== "none" && (
          <div className="w-1/2 space-y-1">
            <div className="flex justify-between items-end">
              <div className="a-text--label capitalize">Data Reference</div>
              {errors.reference_id && (
                <div className="a-text--error">{errors.reference_id}</div>
              )}
            </div>

            <div className="relative">
              <input
                type="search"
                className="a-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search for ${
                  bannerDetails.data_source === "product"
                    ? "Product"
                    : bannerDetails.data_source === "category"
                      ? "Category"
                      : ""
                }`}
              />
              {bannerDetails.reference_id && (
                <div className="absolute left-0 top-0 right-0 bottom-0 bg-white a-input !flex justify-between items-center z-100">
                  <div>{selectedText}</div>
                  <XCircle
                    className="w-[1.8rem] h-[1.8rem] text-neutral-400"
                    weight="fill"
                    onClick={() => setQuery("")}
                  />
                </div>
              )}
              {box && (
                <div className="absolute z-150 left-0 bottom-full w-full max-h-[30rem] overflow-y-scroll shadow-md border border-neutral-300 bg-white p-4 flex flex-col">
                  {loading && (
                    <Spinner className="w-[1.6rem] h-[1.6rem] self-center animate-spin" />
                  )}
                  {searchResults && searchResults.length === 0 && (
                    <div className="text-center">
                      No matching results found!
                    </div>
                  )}
                  {bannerDetails.data_source === "product" &&
                    searchResults &&
                    searchResults.length >= 1 &&
                    searchResults.map((item) => (
                      <div
                        key={item._id}
                        className="hover:bg-neutral-100 transition-colors flex justify-between items-center cursor-pointer p-2"
                        onClick={() => handleReferenceSelection(item)}
                      >
                        <div>{`${item.brand} ${item.product_title}`}</div>
                        <img
                          src={item.image}
                          alt={`${item.product_title} image`}
                          className="w-[5rem] h-[5rem] object-cover"
                        />
                      </div>
                    ))}
                  {bannerDetails.data_source === "category" &&
                    searchResults &&
                    searchResults.length >= 1 &&
                    searchResults.map((item) => (
                      <div
                        key={item._id}
                        className="hover:bg-neutral-100 active:bg-neutral-200/60 transition-colors flex justify-between items-center cursor-pointer p-2"
                        onClick={() => handleReferenceSelection(item)}
                      >
                        <div>{`${item.title}`}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <button
        className={`mt-8 bg-black text-white font-medium py-3 px-6 self-end ${submitLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        onClick={submitBanner}
        disabled={submitLoading}
      >
        {submitLoading ? (
          <div className="flex items-center gap-2">
            Submitting{" "}
            <Spinner className="w-[1.8rem] h-[1.8rem] animate-spin" />
          </div>
        ) : (
          "Submit Banner Section"
        )}
      </button>
    </section>
  );
};

export default BannerInputs;
