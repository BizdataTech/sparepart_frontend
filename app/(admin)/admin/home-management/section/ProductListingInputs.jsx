import { InputLabel } from "@/components/admin/InputLabel";
import { LockLaminated, Spinner, X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ProductListingInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const [sectionDetails, setSectionDetails] = useState({
    data_source: "",
    reference_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [box, setBox] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [referenceText, setReferenceText] = useState("");
  const debounce = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!query.trim()) {
      setBox(false);
      setSearchResults(null);
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        setLoading(true);
        setBox(true);
        let response = await fetch(
          `${BACKEND_URL}/api/sections/search/${sectionDetails.data_source}?query=${query}`,
          {
            method: "GET",
          },
        );
        setLoading(false);
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("results:", result.result);
        setSearchResults(result.result);
      } catch (error) {
        console.log(error.message);
      }
    }, 200);
  }, [query]);

  const hanndleReferenceSelection = (item) => {
    setSectionDetails((prev) => ({
      ...prev,
      reference_id: String(item._id),
    }));
    setBox(false);
    setSearchResults(null);
    clearErrors("reference_id");
    setReferenceText(
      `${item.brand || ""} ${item.product_title || ""} ${item.title || ""}`,
    );
    setQuery("");
  };

  const cancelReferenceSelection = () => {
    setSectionDetails((prev) => ({
      ...prev,
      reference_id: "",
    }));
    setReferenceText("");
  };

  const handleDataSource = (e) => {
    console.log("selected value:", e.target.value);
    setSectionDetails((prev) => {
      let new_details = { ...prev };
      new_details.data_source = e.target.value;
      new_details.reference_id = "";
      return new_details;
    });
    clearErrors("data_source");
    setReferenceText("");
  };

  const submitForm = async (values) => {
    let flag = true;
    Object.entries(sectionDetails).forEach(([key, value]) => {
      if (!value.trim()) {
        flag = false;
        setError(key, {
          type: "manual",
          message: "Required",
        });
      }
    });

    if (!flag) return;

    values.data_source = sectionDetails.data_source;
    values.reference_id = sectionDetails.reference_id;
    values.section_type = "product_listing";

    try {
      let response = await fetch(`${BACKEND_URL}/api/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setSectionDetails({
        data_source: "",
        reference_id: "",
      });
      reset();
      setQuery("");
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed : Section creation failed");
      console.log(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-1 w-1/2">
        <InputLabel label="Section Title" error={errors?.title?.message} />
        <input
          type="text"
          className="a-input outline-0"
          placeholder="Eg: Brake pad deals"
          {...register("title", { required: "Title Required" })}
        />
      </div>
      <div className="flex gap-4">
        <div className="space-y-2 w-1/2">
          <InputLabel
            label="Data Source"
            error={errors?.data_source?.message}
          />
          <select className="a-input" onChange={handleDataSource}>
            <option value="" selected disabled>
              Select one data source
            </option>
            <option value="category">Categories</option>
          </select>
        </div>
        {sectionDetails.data_source && (
          <div className="space-y-2 w-1/2">
            <InputLabel
              label="Data Reference"
              error={errors?.reference_id?.message}
            />
            <div className="relative">
              <input
                type="text"
                className="a-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {sectionDetails.reference_id && (
                <div className="!flex justify-between items-center absolute left-0 right-0 top-0 bottom-0 bg-white-500 z-100 a-input">
                  <div>{referenceText}</div>
                  <X
                    className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                    onClick={cancelReferenceSelection}
                  />
                </div>
              )}
              {box && (
                <div className="absolute left-0 right-0 max-h-[20rem] overflow-y-scroll bg-white shadow-md p-4 z-100">
                  {searchResults === null && (
                    <div className="flex items-center justify-center gap-2">
                      Loading{" "}
                      <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                    </div>
                  )}
                  {searchResults &&
                    searchResults.length >= 1 &&
                    sectionDetails.data_source === "category" && (
                      <div className="w-full h-full">
                        {searchResults.map((result) => (
                          <div
                            className="cursor-pointer hover:bg-neutral-100 active:bg-neutral-200/60 transition-colors p-2"
                            onClick={() => hanndleReferenceSelection(result)}
                          >
                            {result.title}
                          </div>
                        ))}
                      </div>
                    )}
                  {searchResults && searchResults.length === 0 && (
                    <div className="text-center">No matching results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4 w-1/2">
        <InputLabel label="Section Item Count" error={errors?.count?.message} />
        <div className="flex gap-[4rem]">
          {["4", "6", "8", "10", "12"].map((count) => (
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="count"
                id={count}
                value={count}
                {...register("count", { required: "Item count required" })}
              />
              <label htmlFor={count}>{count}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-2 w-1/2">
          <InputLabel
            label="Enable Full List Redirection"
            error={errors?.redirection?.message}
          />
          <div className="flex items-center gap-[4rem]">
            {["yes", "no"].map((value) => (
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="redirection"
                  id={value}
                  value={value}
                  {...register("redirection", { required: "Required" })}
                />
                <label htmlFor={value} className="capitalize">
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 w-1/2">
          <InputLabel label="Layout" error={errors?.layout?.message} />
          <div className="flex items-center gap-[4rem]">
            {["horizontal", "grid"].map((layout) => (
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="layout"
                  id={layout}
                  value={layout}
                  {...register("layout", { required: "Required" })}
                />
                <label htmlFor={layout} className="capitalize">
                  {layout}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`mt-8 bg-black text-white font-medium py-3 px-6 self-end ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            Submitting{" "}
            <Spinner className="w-[1.8rem] h-[1.8rem] animate-spin" />
          </div>
        ) : (
          "Submit Product Listing Section"
        )}
      </button>
    </form>
  );
};

export default ProductListingInputs;
