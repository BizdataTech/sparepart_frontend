import { CheckCircle, Spinner, XCircle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GenuineReference = ({ utility_object }) => {
  let { reference, product_type, category, error } = utility_object;
  let { genuineReference, handleGenuineReference } = reference;
  let [openModal, setOpenModal] = useState(false);

  let [query, setQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  let [queryState, setQueryState] = useState("idle");
  let debounce = useRef(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    let getGenuineProducts = () => {
      if (debounce.current) clearTimeout(debounce.current);
      debounce.current = setTimeout(async () => {
        try {
          let response = await fetch(
            `${BACKEND_URL}/api/auto-products?filter=products&category=${
              category._id
            }&query=${encodeURIComponent(query)}&type=genuine`
          );
          let result = await response.json();
          if (!response.ok) throw new Error(result.message);
          setSearchResults(result.products);
          console.log("search results:", result.products);
        } catch (error) {
          console.log("query fetch failed:", error.message);
        }
      }, 300);
    };
    if (category && product_type !== "genuine") getGenuineProducts();
  }, [category, product_type, query]);

  let section_access = product_type !== "genuine" && category;

  return (
    <section
      className={`flex gap-4 ${
        !section_access
          ? "cursor-not-allowed pointer-events-none opacity-50"
          : ""
      }`}
    >
      {openModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/.5 z-50 flex justify-center items-center">
            <div className="relative w-[70%] min-h-[50rem] rounded-[1rem] bg-white p-8 shadow-[0_0_2rem_.1rem_#C1C3C3] ml-[20rem] flex flex-col gap-8">
              <XCircle
                className="absolute -right-4 -top-4 text-black w-[3rem] h-[3rem] cursor-pointer"
                weight="fill"
                onClick={() => setOpenModal(false)}
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  className="a-input outline-none"
                  placeholder="Search Genuine Products Here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="a-text--button text-white bg-black w-2/12 !rounded-[.5rem]">
                  Search Product
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {searchResults.length ? (
                  searchResults.map((result) => {
                    let selectedReference =
                      result._id === genuineReference?._id;
                    return (
                      <div
                        className={`flex justify-between border border-neutral-200 p-4 hover:bg-neutral-100 transition-colors cursor-pointer active:bg-neutral-50 `}
                        onClick={() => handleGenuineReference(result)}
                      >
                        <div>
                          <div className="text-[1.4rem] font-medium">
                            {result.product_title}
                          </div>
                          <div className="text-[1.2rem] text-neutral-600">
                            {result.brand.brand_name}
                          </div>
                        </div>
                        <div className="flex flex-col justify-between">
                          {selectedReference && (
                            <CheckCircle
                              className="self-end w-[1.5rem] h-[1.5rem] text-green-700"
                              weight="fill"
                            />
                          )}
                          <div className="text-neutral-400 mt-auto">
                            Part Number :{" "}
                            <span className="text-black">
                              {result.part_number}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : queryState === "loading" ? (
                  <Spinner className="w-[2rem] h-[2rem] text-center" />
                ) : (
                  <div className="text-center mt-8">
                    <div className="text-[1.4rem] font-medium">
                      No Genuine Products Found !
                    </div>
                    <div>
                      Couldn't find any genuine products under this category
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.getElementById("reference-modal")
        )}
      <div className="a-section--box w-2/6 self-start">
        <button
          className={`bg-purple-50  text-start transition-colors text-[1.4rem] p-2 ${
            section_access
              ? "hover:bg-purple-100 cursor-pointer"
              : "cursor-not-allowed"
          }`}
          onClick={() => setOpenModal(!openModal)}
        >
          Click here to {genuineReference ? "update the" : "add a"}{" "}
          <span className="font-medium">Genuine Product Reference</span>
        </button>
      </div>
      <div
        className={`a-section--box w-full ${
          genuineReference && "!bg-green-200/10"
        }`}
      >
        {genuineReference ? (
          <div className={`flex justify-between h-full`}>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center mb-4">
                <CheckCircle weight="fill" className="w-[1rem] h-[1rem] " />
                <div className="text-[1.2rem] font-medium">
                  Selected Genuine Product Reference
                </div>
              </div>

              <div className="text-[1.4rem]">
                Product Title :{" "}
                <span className="font-medium">
                  {genuineReference.product_title}
                </span>
              </div>
              <div className="mt-1">
                <div className="text-[1.2rem] text-neutral-600">
                  {genuineReference.brand.brand_name}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="capitalize text-[1.2rem] text-white bg-green-800/60  py-.5 px-2 font-medium self-end">
                {genuineReference.product_type}
              </div>
              <div className="text-[1.2rem] text-neutral-600 ">
                Part Number :{" "}
                <span className="font-medium text-black">
                  {genuineReference.part_number}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className={`text-center ${error && " text-red-700"}`}>
            <div className="text-[1.4rem] font-medium">
              No Genuine Product is Referenced for this Product
            </div>
            <div className="text-[1.2rem]">
              You need to choose a genuine product reference for this product
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GenuineReference;
