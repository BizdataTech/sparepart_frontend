import { InputLabel } from "@/components/admin/InputLabel";
import { Spinner } from "phosphor-react";

const Form = ({ utils }) => {
  let { data, handleInputs, submitVehicle, state, vehicle, errors } = utils;
  return (
    <section className="w-2/6 bg-white p-6 space-y-6 self-start">
      <div className="a-section--title !text-[1.6rem]">#Vehicle Build Form</div>
      <div className="space-y-2">
        <InputLabel label={"Make"} />
        <input
          type="text"
          className="a-input"
          placeholder="Eg: Suzuki"
          name="make"
          value={data.make}
          onChange={handleInputs}
        />
      </div>
      <div className="space-y-2">
        <InputLabel label={"Model"} />
        <input
          type="text"
          className="a-input"
          placeholder="Eg: Swift"
          name="model"
          value={data.model}
          onChange={handleInputs}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <InputLabel label={"Year Start"} />
          <input
            type="text"
            className="a-input"
            placeholder="Eg: 2014"
            name="start_year"
            value={data.start_year}
            onChange={handleInputs}
          />
        </div>
        <div className="space-y-2">
          <InputLabel label={"Year End"} />
          <input
            type="text"
            className="a-input"
            placeholder="Eg: 2019"
            name="end_year"
            value={data.end_year}
            onChange={handleInputs}
          />
        </div>
      </div>
      <div className="space-y-2">
        <InputLabel label={"Engine"} />
        <input
          type="text"
          className="a-input"
          placeholder="Eg: 1.2L petrol"
          name="engine"
          value={data.engine}
          onChange={handleInputs}
        />
      </div>
      <div className="mt-12 space-y-4">
        {errors.response && (
          <div className="a-text--error">{errors.response}</div>
        )}
        <button
          className="w-full bg-black text-white font-medium text-[1.4rem] py-2 cursor-pointer text-center"
          onClick={submitVehicle}
        >
          {state === "loading" ? (
            <div className="flex items-center gap-2 justify-center">
              <span>Submitting</span>

              <Spinner className="w-[2rem] h-[2rem] animate-spin" />
            </div>
          ) : vehicle ? (
            "Update Vehicle"
          ) : (
            "Create Vehicle"
          )}
        </button>
      </div>
    </section>
  );
};

export default Form;
