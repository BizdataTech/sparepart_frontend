"use client";

import { Spinner, XCircle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import useResults from "./useResults";
import { InputLabel } from "@/components/admin/InputLabel";
import { toast } from "sonner";

const BannerSectionCard = ({ section }) => {
  const [edit, setEdit] = useState(false);
  const sectionData = {
    url: section.url,
    data_source: section.data_source,
    reference_id: section.reference_id,
  };
  const [newData, setNewData] = useState({});
  const [referenceText, setReferenceText] = useState("");
  const inputRef = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const debounce = useRef(null);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState(null);
  const [box, setBox] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getReference();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setQueryResults(null);
      setBox(false);
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        setBox(true);
        let results = await useResults(
          query,
          newData.data_source || sectionData.data_source,
        );
        setQueryResults(results);
      } catch (error) {
        console.log(error.message);
      }
    }, 200);
  }, [query]);

  const getReference = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/sections/reference/${section.reference_id}?data_source=${section.data_source}`,
        {
          method: "GET",
        },
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      switch (section.data_source) {
        case "product":
          setReferenceText(`${result.brand} ${result.product_title}`);
          break;
        case "category":
          setReferenceText(`${result.title}`);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleInput = (e) => {
    let file = e.target.files[0];
    setSelectedFile(file);
    setNewData((prev) => ({
      ...prev,
      url: URL.createObjectURL(file),
    }));
  };

  const handleSelect = (e) => {
    let value = e.target.value;
    setNewData((prev) => {
      let new_data = { ...prev };
      new_data.data_source = value;
      if (value === "none") {
        delete new_data.reference_id;
        setErrors((prev) => {
          let { reference_id, ...rest } = prev;
          return rest;
        });
        return new_data;
      }
      new_data.reference_id = "";
      return new_data;
    });
    setReferenceText("");
    setQuery("");
  };

  const selectReference = (item) => {
    setNewData((prev) => ({
      ...prev,
      reference_id: item._id,
    }));
    setErrors((prev) => {
      let { reference_id, ...rest } = prev;
      return rest;
    });
    setBox(false);
    setQueryResults(null);
    setReferenceText(
      `${item.brand || ""} ${item.product_title || ""} ${item.title || ""}`,
    );
  };

  const cancelEdit = () => {
    setEdit(false);
    setNewData({});
    setSelectedFile(null);
    setQueryResults(null);
    setBox(false);
    getReference();
  };

  const updateSection = async () => {
    if (!Object.keys(newData).length)
      return toast.warning("Couldn't find any changes for updation");
    setErrors((prev) => {
      let new_errors = { ...prev };
      Object.entries(newData).forEach(([key, value]) => {
        if (!value.trim()) new_errors[key] = "Required";
      });
      return new_errors;
    });
    if (Object.keys(errors).length) return;
    console.log("safe");
  };

  useEffect(() => {
    return () => URL.revokeObjectURL(newData.url);
  }, []);

  return (
    <section className="a-section--box !space-y-8">
      <div className="flex justify-between items-center">
        <div className="a-section--title capitalize">
          {section.section_type.split("_").join(" ")}
        </div>
        {edit && (
          <div
            className="p-2 text-[1.2rem] text-neutral-800 bg-neutral-200 cursor-pointer flex items-center gap-2"
            onClick={cancelEdit}
          >
            Cancel Editing{" "}
            <XCircle className="w-[1.5rem] h-[1.5rem]" weight="fill" />
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div
          className={`${edit ? "cursor-pointer" : "cursor-auto"}`}
          onClick={() => {
            if (edit) inputRef.current.click();
          }}
        >
          <img
            src={newData.url || sectionData.url}
            alt="banner image"
            className="w-full h-[20rem] border border-neutral-400 bg-neutral-200 object-contain"
          />
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleInput}
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="space-y-1 w-1/2">
            <InputLabel label="Data Source" error={errors.data_source} />
            <select
              className="a-input cursor-pointer"
              disabled={!edit}
              value={newData?.data_source || sectionData?.data_source}
              onChange={handleSelect}
            >
              {[
                ["none", "none"],
                ["Product", "product"],
                ["Category", "category"],
              ].map(([key, value], i) => (
                <option className="capitalize" value={value} key={i}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          {newData.data_source !== "none" && (
            <div className="space-y-1 w-1/2">
              <InputLabel label="Data Reference" error={errors.reference_id} />
              <div className="relative">
                <input
                  className="a-input capitalize"
                  type="search"
                  value={query}
                  disabled={!edit}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {referenceText && (
                  <div className="!flex justify-between items-center absolute top-0 right-0 left-0 bottom-0 bg-white a-input z-100">
                    <div>{referenceText}</div>
                    <XCircle
                      className="w-[1.8rem] h-[1.8rem] text-neutral-600 cursor-pointer"
                      weight="fill"
                      onClick={() => {
                        if (!edit) return;
                        setReferenceText("");
                        setNewData((prev) => ({
                          ...prev,
                          reference_id: "",
                        }));
                      }}
                    />
                  </div>
                )}

                {box && (
                  <div className="absolute top-full left-0 right-0 p-4 text-[1.6rem] shadow-md max-h-[20rem] overflow-y-scroll bg-white">
                    {queryResults === null && (
                      <div className="flex items-center justify-center gap-2">
                        Searching{" "}
                        <Spinner className="w-[1.3rem] h-[1.3rem] animate-spin" />
                      </div>
                    )}
                    {queryResults && queryResults.length >= 1 && (
                      <div>
                        {queryResults.map((item) => (
                          <div
                            className="flex justify-between items-center hover:bg-neutral-100 transition-colors cursor-pointer py-1"
                            onClick={() => selectReference(item)}
                          >
                            <div>{`${item?.brand || ""} ${item.product_title || ""} ${item.title || ""}`}</div>
                            {item.image && (
                              <img
                                src={item.image}
                                className="w-[5rem] h-[5rem]"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {queryResults && queryResults.length === 0 && (
                      <div className="text-center py-1">
                        No matching result found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mt-[5rem]">
        {!edit ? (
          <button
            className="a-text--button bg-black text-white hover:bg-black/70 active:bg-black transition-colors"
            onClick={() => setEdit(true)}
          >
            Edit Section
          </button>
        ) : (
          <>
            <button className="a-text--button text-white bg-red-700 hover:bg-red-900 transition-colors">
              Delete Section
            </button>
            <button
              className="a-text--button text-green-800 border border-green-900 hover:text-white hover:bg-green-800  transition-colors"
              onClick={updateSection}
            >
              Update Section
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default BannerSectionCard;
