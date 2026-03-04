"use client";

import { CaretLeft, CaretRight, DotsThreeVertical } from "phosphor-react";
import Form from "./Form.jsx";
import useVehicles from "./useVehicles.js";
import { useEffect, useState } from "react";
import Data from "./Data.jsx";
import SearchSection from "@/components/admin/SearchSection.jsx";
import EmptyRow from "@/components/admin/EmptyRow.jsx";

const Vehicles = () => {
  let {
    vehicles,
    setResults,
    selectedVehicle,
    setSelectedVehicle,
    currentPage,
    totalPages,
    handlePage,
    refetch,
  } = useVehicles();

  const [modalBox, setModalBox] = useState(false);

  useEffect(() => {
    if (selectedVehicle) setModalBox(true);
  }, [selectedVehicle]);

  return (
    <main className="flex gap-6">
      <div className="w-full self-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <SearchSection
              placeholder="Search for vehicles"
              type="vehicles"
              setResults={setResults}
            />
            <button
              className="a-text--button ml-auto !text-[1.2rem] text-white bg-black/80 hover:bg-black !py-3 transition !rounded-[.3rem]"
              onClick={() => setModalBox(true)}
            >
              Add New Vehicle
            </button>
          </div>
          {/* <div className="flex items-center gap-4 self-end text-[1.4rem]">
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
              </div> */}
          <div className="a-section--box !p-0">
            <div className="grid grid-cols-5 gap-2">
              {["Make", "Model", "Year", "Engine", "Options"].map((head, i) => (
                <div
                  className="text-[1.4rem] font-medium py-4 px-4 last:text-end mr-4"
                  key={i}
                >
                  {head}
                </div>
              ))}
            </div>
            {vehicles && vehicles.length >= 1 ? (
              vehicles.map((v) => (
                <Data
                  v={v}
                  select={() => setSelectedVehicle({ ...v })}
                  refetch={refetch}
                  key={v._id}
                />
              ))
            ) : (
              <EmptyRow text="No result found" />
            )}
          </div>
        </div>
      </div>

      {modalBox && (
        <div className="fixed inset-0 bg-black/30 z-100 flex justify-center items-center">
          <Form
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            refetch={refetch}
            close={() => setModalBox(false)}
          />
        </div>
      )}
    </main>
  );
};

export default Vehicles;
