import { Asterisk, X } from "phosphor-react";
import FormLabel from "./FormLabel";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const AddressModal = ({ close, refetch, addressId }) => {
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      house_number: "",
      street: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    if (addressId) getAddressData();
  }, []);

  const getAddressData = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/users/address/${addressId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      reset(result.address);
    } catch (error) {
      console.log("address fetch data failed for update:", error.message);
    }
  };

  const submitAddress = async (values) => {
    console.log("values:", values);
    let response = null;
    try {
      if (addressId) {
      } else {
        response = await fetch(`${BACKEND_URL}/api/users/address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
      }
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      reset();
      close();
      refetch();
    } catch (error) {
      console.log("error:", error.message);
    }
  };
  return (
    <div className="modal !w-[80rem] space-y-8 relative">
      <div>
        <div className="text-[1.8rem] font-medium">
          {addressId ? "Update this address" : "Add new address"}
        </div>
        <div className="flex justify-between items-end">
          <div className="text-[1.6rem] w-[60%]">
            {addressId
              ? "Make changes on the following fields for performing update."
              : "Fill all fields below to create a new address. This address can be used for ordering products."}
          </div>
          <div className="flex items-center gap-2 ">
            <Asterisk className="w-[1.2rem] h-[1.2rem] text-red-600" />{" "}
            <div className="text-[1.6rem] italic">Required</div>
          </div>
        </div>
      </div>

      <form
        className="flex flex-col gap-8 mt-[4rem]"
        onSubmit={handleSubmit(submitAddress)}
      >
        <div className="space-y-2">
          <FormLabel title="Address" error={errors?.address} />
          <input
            type="text"
            className="modal--input"
            {...register("address", { required: true })}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-[50%] space-y-2">
            <FormLabel title="House Number" error={errors?.house_number} />
            <input
              type="text"
              className="modal--input"
              {...register("house_number", { required: true })}
            />
          </div>
          <div className="w-full space-y-2">
            <FormLabel title="Street" error={errors?.street} />
            <input
              type="text"
              className="modal--input"
              {...register("street", { required: true })}
            />
          </div>
          <div className="w-full space-y-2">
            <FormLabel title="City" error={errors?.city} />
            <input
              type="text"
              className="modal--input"
              {...register("city", { required: true })}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full space-y-2">
            <FormLabel title="District" error={errors?.district} />
            <input
              type="text"
              className="modal--input"
              {...register("district", { required: true })}
            />
          </div>
          <div className="w-full space-y-2">
            <FormLabel title="State" error={errors?.state} />
            <input
              type="text"
              className="modal--input"
              {...register("state", { required: true })}
            />
          </div>
          <div className="w-[50%] space-y-2">
            <FormLabel title="Pincode" error={errors?.pincode} />
            <input
              type="text"
              className="modal--input"
              {...register("pincode", { required: true })}
            />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="space-y-2">
            <FormLabel title="Phone Number" error={errors?.phone_number} />
            <input
              type="number"
              className="modal--input"
              {...register("phone_number", {
                required: true,
                pattern: { value: /^\d{10}$/ },
              })}
            />
          </div>
        </div>
        <button
          className="modal--button self-end !w-auto cursor-pointer px-4"
          type="submit"
        >
          {addressId ? "Update the change" : "Create new address"}
        </button>
      </form>
      <div
        className="absolute top-0 right-0 bg-black text-white cursor-pointer p-2"
        onClick={() => close()}
      >
        <X className="w-[2rem] h-[2rem]" weight="bold" />
      </div>
    </div>
  );
};

export default AddressModal;
