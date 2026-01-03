"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";

const SignIn = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (values) => {};
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-[50rem] border border-neutral-300 shadow-xl space-y-10 px-10 py-[4rem] mb-[5rem]">
        <div className="text-[2rem] font-semibold uppercase">Sign In</div>
        <form className="space-y-10" onSubmit={handleSubmit(submitForm)}>
          <div className="space-y-1">
            <Label title="Email" error={errors?.email?.message} />
            <input
              type="email"
              className="modal--input"
              {...register("email", { required: "Email Required" })}
            />
          </div>
          <div className="space-y-1">
            <Label title="Password" error={errors?.password?.message} />
            <input
              type="password"
              className="modal--input"
              {...register("password", { required: "Password Required" })}
            />
          </div>
          <button
            className="modal--button !py-6 !text-[1.6rem] uppercase tracking-[.1rem] cursor-pointer mt-4"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
