"use client";

import { useForm } from "react-hook-form";
import Label from "./Label";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "phosphor-react";
import "../../globals.css";

const SignIn = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/admin-users/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      setLoading(false);
      let result = await response.json();
      if (response.status === 401) return toast.error(result.message);
      toast.success(result.message);
      router.replace("/admin/products");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <main className="w-full h-screen flex bg-white text-black p-4">
        <div className="w-4/6 relative">
          <img
            src="/admin/signin-2.jpg"
            alt="Banner image"
            className="w-full h-full rounded-t-[5rem]"
          />
          <div className="absolute w-full bottom-[30%] left-[50%] -translate-x-[50%] flex flex-col items-center">
            <div className="text-[3rem] font-medium">Welcome Back Admin!</div>
            <p className="text-[1.8rem] w-[60rem] text-center text-neutral-600">
              Sign in to continue where you left off and manage everything from
              one simple, powerful workspace.
            </p>
          </div>
        </div>
        <div className="w-2/6 h-full flex flex-col gap-[2rem] justify-center px-[5rem] text-[1.6rem]">
          <div className="flex flex-col items-center gap-1">
            <div className="text-[2.2rem] font-medium">Sign In Account</div>
            <div className="text-[1.5rem] text-neutral-700">
              Enter you login credentials below
            </div>
          </div>
          <form
            className="flex flex-col gap-[2rem]"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="space-y-2">
              <Label title="Email" error={errors?.email?.message} />
              <input
                type="email"
                className="modal--input"
                {...register("email", { required: "Email Required" })}
              />
            </div>
            <div className="space-y-2">
              <Label title="Password" error={errors?.password?.message} />
              <input
                type="password"
                className="modal--input"
                {...register("password", { required: "Password Required" })}
              />
            </div>
            <button
              className={`bg-black text-white font-semibold py-4 rounded-[.7rem] mt-4 ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  Signing In{" "}
                  <Spinner className="w-[2rem] h-[2rem] animate-spin" />
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignIn;
