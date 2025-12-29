"use client";

import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import FormLabel from "./FormLabel";

const UserNameModal = ({ open, refetch }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const submitUsername = async (values) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/username`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
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
      console.log(error.message);
    }
  };

  return (
    <div className="modal space-y-8 mb-[6rem] relative">
      <div>
        <div className="text-[1.8rem] font-medium">Change Username</div>
        <div className="text-[1.6rem] text-neutral-600">
          Enter below your new username.
        </div>
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
        <button className="modal--button mt-8" type="submit">
          Submit New Username
        </button>
      </form>

      <div
        className="absolute top-0 right-0 bg-black text-white cursor-pointer p-2"
        onClick={() => open(false)}
      >
        <X className="w-[2rem] h-[2rem]" weight="bold" />
      </div>
    </div>
  );
};

export default UserNameModal;
