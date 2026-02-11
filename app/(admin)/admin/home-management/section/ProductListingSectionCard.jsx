"use client";

import { useEffect, useRef, useState } from "react";
import getReference from "./getReference";
import { Spinner, X } from "phosphor-react";
import useResults from "./useResults";
import { InputLabel } from "@/components/admin/InputLabel";
import { toast } from "sonner";

const ProductListingSectionCard = ({ section, deleteSection, refetch }) => {
  const [edit, setEdit] = useState(false);

  let sectionData = {
    title: section.title,
    data_source: section.data_source,
    reference_id: section.reference_id,
    redirection: section.redirection,
    layout: section.layout,
    limit: section.limit,
  };
  let [newData, setNewData] = useState({});
  let [referenceText, setReferenceText] = useState("");
  let [errors, setErrors] = useState({});

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (edit) return;
    const getReferenceText = async () => {
      try {
        let text = await getReference(
          section.reference_id,
          section.data_source,
        );
        setReferenceText(text);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReferenceText();
  }, [edit, section]);

  const editMode = () => {
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
    setNewData({});
  };

  const handleData = (e) => {
    let { name, value } = e.target;
    setNewData((prev) => {
      let new_data = { ...prev };
      if (sectionData[name] === value) delete new_data[name];
      else new_data[name] = value;
      return new_data;
    });
    setErrors((prev) => {
      let { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const removeReference = () => {
    setReferenceText("");
    setQuery("");
    setNewData((prev) => ({
      ...prev,
      reference_id: "",
    }));
  };

  const debounce = useRef(null);
  const [searchResults, setSearchResults] = useState(null);
  let [loading, setLoading] = useState(false);
  let [box, setBox] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setBox(false);
      setSearchResults(null);
      setNewData((prev) => ({
        ...prev,
      }));
      return;
    }
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        setBox(true);
        setLoading(true);
        let results = await useResults(query, section.data_source);
        setLoading(false);
        console.log(results);
        setSearchResults(results);
      } catch (error) {
        console.log(error.message);
      }
    }, 200);
  }, [query]);

  const selectReference = (item) => {
    setReferenceText(
      `${item.brand || ""} ${item.product_title || ""} ${item.title || ""}`,
    );
    setNewData((prev) => ({
      ...prev,
      reference_id: item._id,
    }));
    setErrors((prev) => {
      let { reference_id, ...rest } = prev;
      return rest;
    });
    setBox(false);
    setSearchResults(null);
  };

  const [operationLoading, setOperationLoading] = useState(false);
  const handleDelete = async (id) => {
    setOperationLoading(true);
    await deleteSection(id);
    setOperationLoading(false);
  };

  const submitSection = async () => {
    if (!Object.keys(newData).length)
      return toast.warning("Updation Dismissed : No update value found.");
    let flag = true;
    Object.entries(newData).forEach(([key, value]) => {
      if (!value.trim()) {
        flag = false;
        setErrors((prev) => ({
          ...prev,
          [key]: "Required",
        }));
      }
    });
    if (!flag) return;
    try {
      setOperationLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/sections/${section._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      setOperationLoading(false);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setEdit(false);
      toast.success(result.message);
      setNewData({});
      setReferenceText("");
      refetch();
    } catch (error) {
      toast.error("Updation Failed");
      console.log(error.message);
    }
  };

  const title =
    newData.title || newData.title === "" ? newData.title : sectionData.title;

  return (
    <section className="a-section--box flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="a-section--title capitalize">
          {section.section_type.split("_").join(" ")}
        </div>
        {edit && (
          <div
            className="a-text--button text-neutral-800 bg-neutral-200 flex items-center gap-2"
            onClick={cancelEdit}
          >
            Cancel Editing <X className="w-[1.3rem] h-[1.3rem]" weight="fill" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="w-1/2">
          <InputLabel label="Section Title" error={errors.title} />
          <input
            type="text"
            name="title"
            value={title}
            className="a-input"
            disabled={!edit}
            onChange={handleData}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 space-y-1">
            <div className="a-text--label">Data Source</div>
            <select className="a-input" disabled={!edit}>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="w-1/2 space-y-1">
            <InputLabel label="Reference Data" error={errors.reference_id} />
            <div className="relative">
              <input
                type="text"
                className="a-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {box && (
                <div className="absolute top-full left-0 right-0 max-h-[20rem] overflow-y-scroll bg-white  shadow-md p-4 text-[1.4rem]">
                  {loading && (
                    <div className="flex justify-center items-center gap-1">
                      Searching{" "}
                      <Spinner className="w-[1.3rem] h-[1.3ren] animate-spin" />
                    </div>
                  )}
                  {searchResults && searchResults.length === 0 && (
                    <div className="text-center">
                      Couldn't find any matching result
                    </div>
                  )}
                  {searchResults && searchResults.length >= 1 && (
                    <>
                      {searchResults.map((item) => (
                        <div
                          key={item._id}
                          className="py-1 hover:bg-neutral-100 transition-colors cursor-pointer"
                          onClick={() => selectReference(item)}
                        >{`${item.brand || ""} ${item.product_title || ""} ${item.title || ""}`}</div>
                      ))}
                    </>
                  )}
                </div>
              )}
              {referenceText && (
                <div className="absolute inset-0 bg-white a-input z-100 !flex justify-between items-center">
                  <div className="">{referenceText}</div>
                  <X
                    className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                    onClick={() => {
                      if (edit) removeReference();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="a-text--label">Section Item Limit</div>
          <div className="flex gap-[4rem] text-[1.4rem]">
            {["4", "6", "8", "10", "12"].map((count, i) => (
              <div className="flex items-center gap-2" key={i}>
                <input
                  type="radio"
                  name={`count-${section._id}`}
                  id={`count-${section._id}-${count}`}
                  value={count}
                  checked={String(sectionData.limit) == count}
                />
                <label htmlFor={`count-${section._id}-${count}`}>{count}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="self-end flex items-center gap-4">
        {!edit ? (
          <>
            <button
              className={`a-text--button text-white bg-red-700 hover:bg-red-900 transition-colors ${operationLoading ? "!cursor-not-allowed opacity-70" : "!cursor-pointer"}`}
              onClick={() => handleDelete(section._id)}
              disabled={operationLoading}
            >
              Delete Section
            </button>
            <button
              className={`a-text--button bg-black text-white hover:bg-black/70 active:bg-black transition-colors ${operationLoading ? "!cursor-not-allowed opacity-70" : "!cursor-pointer"}`}
              onClick={editMode}
              disabled={operationLoading}
            >
              Edit Section
            </button>
          </>
        ) : (
          <>
            <button
              className={`a-text--button text-green-800 border border-green-900 hover:text-white hover:bg-green-800 ${operationLoading ? "!cursor-not-allowed opacity-70" : "cursor-pointer"} transition-colors`}
              onClick={submitSection}
              disabled={operationLoading}
            >
              {operationLoading ? (
                <div className="flex items-center gap-1">
                  Updating{" "}
                  <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                </div>
              ) : (
                "Update Section"
              )}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductListingSectionCard;
