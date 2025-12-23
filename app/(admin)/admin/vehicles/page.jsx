"use client";

import { CaretLeft, CaretRight } from "phosphor-react";
import Form from "./Form.jsx";
import useVehicles from "./useVehicles.js";

const Vehicles = () => {
  let {
    vehicles,
    data,
    handleInputs,
    submitVehicle,
    state,
    currentPage,
    totalPages,
    handlePage,
    update,
    errors,
  } = useVehicles();
  let formUtils = {
    data,
    handleInputs,
    submitVehicle,
    state,
    errors,
    vehicle: update.selectedVehicle,
  };
  return (
    <main className="flex gap-4">
      <div className="w-4/6 bg-white self-start mb-8">
        {vehicles.length ? (
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-1/2 flex gap-2">
                <input
                  type="text"
                  className="a-input"
                  placeholder="Search for vehicles here"
                />
                <button className="bg-black text-white font-medium text-[1.4rem] px-4">
                  Search
                </button>
              </div>
              <div className="flex items-center gap-4 text-[1.4rem]">
                <CaretLeft
                  weight="fill"
                  className="cursor-pointer"
                  onClick={() => handlePage("down")}
                />
                <div>{`${currentPage} / ${totalPages}`}</div>
                <CaretRight
                  weight="fill"
                  className="cursor-pointer"
                  onClick={() => handlePage("up")}
                />
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {["Make", "Model", "Year", "Engine", "Options"].map((head) => (
                  <div className="text-[1.4rem] font-medium">{head}</div>
                ))}
              </div>
              {vehicles.map(
                ({ make, model, engine, start_year, end_year, _id }) => {
                  let matching_vehicle = update.selectedVehicle === _id;
                  return (
                    <div
                      className={`grid grid-cols-5 gap-2 text-[1.4rem] hover:bg-neutral-200 active:bg-neutral-300/50 cursor-pointer transition-colors py-1 ${
                        matching_vehicle ? "bg-neutral-200" : ""
                      }`}
                      key={_id}
                      onClick={() => update.handleVehicle(_id)}
                    >
                      <div>{make}</div>
                      <div>{model}</div>
                      <div>{`${start_year} - ${end_year}`}</div>
                      <div>{engine}</div>
                    </div>
                  );
                }
              )}
              <div></div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-[1.8rem] font-medium">No Vehicles Found</div>
            <div className="text-[1.6rem]">
              Counldn't found any vehicles. Add more vehicles
            </div>
          </div>
        )}
      </div>
      <Form utils={formUtils} />
    </main>
  );
};

export default Vehicles;
