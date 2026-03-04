"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { InputLabel } from "@/components/admin/InputLabel";
import { Spinner, X, XCircle } from "phosphor-react";
import axios from "axios";

let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Form = ({ selectedVehicle, setSelectedVehicle, refetch, close }) => {
  const dataSchema = {
    make: "",
    model: "",
    start_year: "",
    end_year: "",
    engine: "",
  };
  const [data, setData] = useState(dataSchema);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    if (selectedVehicle) {
      let { make, model, start_year, end_year, engine } = selectedVehicle;
      setData({ make, model, start_year, end_year, engine });
    }
  }, [selectedVehicle]);

  const handleData = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (selectedVehicle)
      setUpdateData((prev) => {
        let new_update = { ...prev };
        if (selectedVehicle[name] === value.trim()) delete new_update[name];
        else new_update[name] = value;
        return new_update;
      });
    setErrors((prev) => {
      let { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const submitVehicle = async (e) => {
    e.preventDefault();
    let submitError = {};

    Object.entries(data).forEach(([key, value]) => {
      if (!String(value).trim()) submitError[key] = "* Required";
    });

    if (Object.keys(submitError).length)
      return setErrors((prev) => {
        let new_errors = { ...prev };
        Object.entries(submitError).forEach(
          ([key, value]) => (new_errors[key] = value),
        );
        return new_errors;
      });

    if (selectedVehicle && !Object.keys(updateData).length)
      return toast.warning("Updation Dismissed : No Changes Found");

    try {
      setLoading(true);
      let res;

      if (selectedVehicle) {
        res = await axios.patch(
          `${BACKEND_URL}/api/auto-vehicles/${selectedVehicle._id}`,
          updateData,
          { withCredentials: true },
        );
      } else {
        res = await axios.post(`${BACKEND_URL}/api/auto-vehicles`, data, {
          withCredentials: true,
        });
      }

      setLoading(false);
      setData(dataSchema);

      if (selectedVehicle) {
        setSelectedVehicle(null);
        setUpdateData({});
      }

      refetch();
      close();
      toast.success(res.data.message);
    } catch (err) {
      console.log(err.response?.data?.message);
      setLoading(false);
      if (err.response?.status === 409)
        return toast.error(err.response?.data?.message);
    }
  };

  const cancelUpdate = () => {
    if (loading)
      return toast("Couln't cancel when update or creation taking place.");
    setSelectedVehicle(null);
    setUpdateData({});
    setData(dataSchema);
    close();
  };

  return (
    <section className="w-2/6 a-section--box flex flex-col gap-6 p-6 relative">
      <div className="flex justify-between items-center">
        <div className="a-section--title !text-[1.6rem]">
          {selectedVehicle ? "Update Vehicle" : "Create Vehicle"}
        </div>
        <X
          className="w-[1.8rem] h-[1.8rem] text-red-700 cursor-pointer"
          weight="bold"
          onClick={cancelUpdate}
        />
      </div>

      <form className="flex flex-col gap-6" onSubmit={submitVehicle}>
        <div className="space-y-2">
          <InputLabel label={"Make"} error={errors?.make} />
          <input
            type="text"
            className="a-input"
            placeholder="Eg: Suzuki"
            name="make"
            value={data.make}
            onChange={handleData}
          />
        </div>
        <div className="space-y-2">
          <InputLabel label={"Model"} error={errors?.model} />
          <input
            type="text"
            className="a-input"
            placeholder="Eg: Swift"
            name="model"
            value={data.model}
            onChange={handleData}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <InputLabel label={"Year Start"} error={errors?.start_year} />
            <input
              type="number"
              className="a-input"
              placeholder="Eg: 2014"
              name="start_year"
              value={data.start_year}
              onChange={handleData}
            />
          </div>
          <div className="space-y-2">
            <InputLabel label={"Year End"} error={errors?.end_year} />
            <input
              type="number"
              className="a-input"
              placeholder="Eg: 2019"
              name="end_year"
              value={data.end_year}
              onChange={handleData}
            />
          </div>
        </div>
        <div className="space-y-2">
          <InputLabel label={"Engine"} error={errors?.engine} />
          <input
            type="text"
            className="a-input"
            placeholder="Eg: 1.2L petrol"
            name="engine"
            value={data.engine}
            onChange={handleData}
          />
        </div>
        <div className="mt-12 space-y-4">
          <button
            className={`w-full bg-black text-white font-medium text-[1.4rem] py-3 rounded-[.5rem] text-center ${
              loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <span>Submitting</span>
                <Spinner className="w-[2rem] h-[2rem] animate-spin" />
              </div>
            ) : selectedVehicle ? (
              "Update Vehicle"
            ) : (
              "Create Vehicle"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
