"use client";

import { InputLabel } from "@/components/admin/InputLabel";
import { MagnifyingGlass, Spinner, X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const Fitments = ({ utility_object, error }) => {
  let [query, setQuery] = useState("");
  let [visible, setVisible] = useState(false);
  let [suggestions, setSuggestions] = useState([]);
  let [searchLoad, setSearchLoad] = useState(false);
  let debounce = useRef(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  let { selectedVehicles, selectVehicle, removeVehicle } = utility_object;

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!query || query.length < 1) {
      setVisible(false);
      setSuggestions([]);
      setSearchLoad(false);
      return;
    }
    debounce.current = setTimeout(async () => {
      setVisible(true);
      setSearchLoad(true);
      setSuggestions([]);
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/auto-vehicles?type=admin-product-search&query=${encodeURIComponent(
            query.trim()
          )}`,
          {
            method: "GET",
          }
        );
        setSearchLoad(false);
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("result:", result.vehicles);
        setSuggestions(result.vehicles);
      } catch (error) {
        setSuggestions([]);
        console.log("error:", error.message);
      }
    }, 300);
  }, [query]);
  return (
    <section className="a-section--box">
      <InputLabel label="Fitments" error={error} />
      <div className="flex gap-4 mt-4">
        <div className="w-1/2 space-y-2">
          {/* <InputLabel label="Search Cars" /> */}
          <div className="relative">
            <div className="relative flex justify-between items-center">
              <input
                type="text"
                className="a-input outline-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Cars This Product Fits ..."
              />
              <MagnifyingGlass className="text-neutral-600 absolute right-4 text-[1.5rem]" />
            </div>

            {visible && (
              <div className="absolute w-full bg-white shadow-sm p-4 min-h-auto max-h-[22rem] overflow-y-scroll text-[1.4rem]">
                {searchLoad ? (
                  <div className="flex gap-2 items-center justify-center">
                    <span className="text-[1.4rem]">Searching</span>{" "}
                    <Spinner className="w-[2rem] h-[2rem] animate-spin" />
                  </div>
                ) : !suggestions.length ? (
                  "No Matching Car Found!"
                ) : (
                  suggestions.map((vehicle) => (
                    <div
                      key={vehicle._id}
                      className="cursor-pointer hover:bg-neutral-100 py-1"
                      onClick={() => selectVehicle(vehicle)}
                    >{`${vehicle.make} ${vehicle.model} ${vehicle.start_year} - ${vehicle.end_year} ${vehicle.engine}`}</div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className="!w-1/2 h-[30rem] overflow-y-scroll a-input !py-6 space-y-2">
          {selectedVehicles.length > 0 ? (
            selectedVehicles.map((v) => (
              <div className=" flex justify-between items-center bg-neutral-100 py-1 px-2 rounded-[.5rem]">
                <div>{`${v.make} ${v.model} ${v.start_year} - ${v.end_year} ${v.engine}`}</div>
                <X
                  className="text-[1.2rem] cursor-pointer"
                  weight="bold"
                  onClick={() => removeVehicle(v._id)}
                />
              </div>
            ))
          ) : (
            <div>
              <div className="font-medium">No Fitment Selected</div>
              <div>
                You are required to select any fitment this product will be
                suited.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Fitments;
