import { InputLabel } from "@/components/admin/InputLabel";
import ProductNameTag from "@/components/admin/ProductNameTag";
import { Spinner, X } from "phosphor-react";

const SectionForm = ({ util }) => {
  let { sectionData, config, handleInput, searchConfig } = util;
  let {
    query,
    setQuery,
    loading,
    searchResults,
    handleSelection,
    selectedProducts,
    removeProduct,
  } = searchConfig;

  return (
    <section className="w-full p-4 shadow-sm space-y-6">
      <div className="a-section--title">Create Section</div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="space-y-2 w-full">
            <InputLabel label="Section Title" />
            <input
              name="title"
              type="text"
              placeholder="Eg: Spark Plug New Arrivals"
              className="a-input"
              value={sectionData.title}
              onChange={handleInput}
            />
          </div>
          <div className="space-y-2 w-4/6">
            <InputLabel label="Creation Type" />
            <select
              name="section_type"
              id=""
              className="a-input"
              value={sectionData?.section}
              onChange={handleInput}
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>
        {sectionData?.section_type === "automatic" ? (
          <div className="flex gap-4">
            <div className="space-y-2 w-full">
              <InputLabel label="Category" />
              <select name="category" id="" className="a-input">
                <option value="" selected disabled>
                  Select Category
                </option>
              </select>
            </div>
            <div className="space-y-2 w-full">
              <InputLabel label="Filter" />
              <select name="filter" id="" className="a-input">
                <option value="" selected disabled>
                  Select Filter
                </option>
                <option value="new_arrival">New Arrival</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <InputLabel label="Search Products" />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Products..."
                  className="a-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query.length > 0 && (
                  <div className="absolute left-0 right-0 max-h-[20rem] shadow-md bg-white p-2 text-[1.4rem] overflow-y-scroll">
                    {loading ? (
                      <div className="flex justify-center items-center gap-2">
                        <div className="">Loading Products</div>
                        <Spinner className="animate-spin w-[2rem] h-[2rem]" />
                      </div>
                    ) : searchResults.length ? (
                      searchResults.map((result, i) => (
                        <div
                          className="text-[1.4rem] cursor-pointer hover:bg-neutral-100 p-2 px-4"
                          key={i}
                          onClick={() => handleSelection(result)}
                        >
                          <ProductNameTag product={result} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center">No Products Found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="h-[30rem] gap-4 overflow-y-scroll border border-neutral-300 bg-white rounded-[.5rem] p-4">
              {selectedProducts.length > 0 &&
                selectedProducts.map((p, i) => (
                  <div
                    className="bg-neutral-200 inline-block mb-2 mr-2 p-2 rounded-[.5rem]"
                    key={i}
                  >
                    <div className="flex gap-4">
                      <div className="text-[1.4rem] inline-block">
                        <ProductNameTag product={p} />
                      </div>
                      <X
                        className="h-[1.8rem] w-[1.8rem] cursor-pointer"
                        onClick={() => removeProduct(p)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div className="a-text--button ml-auto !py-3 mt-[5rem] cursor-pointer bg-neutral-800 text-white py-2">
          Create Section
        </div>
      </div>
    </section>
  );
};

export default SectionForm;
