"use client";

import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import FormLabel from "./FormLabel";
import { useState } from "react";

const UserNameModal = ({ open, refetch }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let [loading, setLoading] = useState(false);

  const submitUsername = async (values) => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/users/username`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      setLoading(false);
      let result = await response.json();
      if (response.status === 409)
        return setError("username", {
          type: "server",
          message: result.message,
        });
      if (!response.ok) throw new Error(result.message);
      open(false);
      refetch();
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="modal flex flex-col gap-8 mb-[6rem]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[1.4rem] md:text-[1.8rem] font-medium">
            Change Username
          </div>
          <div className="text-[1.2rem] md:text-[1.6rem] text-neutral-600">
            Enter below your new username.
          </div>
        </div>

        <button
          className={` text-red-700 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => open(false)}
          disabled={loading}
        >
          <X
            className="w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]"
            weight="bold"
          />
        </button>
      </div>
      <form onSubmit={handleSubmit(submitUsername)}>
        <div className="space-y-2">
          <FormLabel title="New Username" error={errors?.username} />
          <input
            type="text"
            className="modal--input"
            {...register("username", { required: true })}
          />
        </div>
        <button className="modal--button mt-8" type="submit" disabled={loading}>
          Submit New Username
        </button>
      </form>
    </div>
  );
};

export default UserNameModal;
