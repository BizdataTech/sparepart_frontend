"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  const submitForm = async (values) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/admin-users/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      let result = await response.json();
      if (response.status === 400) return toast.error(result.message);
      return router.replace("/admin/products");
    } catch (error) {
      console.log(error.message);
    }
  };

  const input_style = "py-3 px-3 border border-black rounded-0 text-[1.6rem]";
  return (
    <main className="">
      <div className="w-[50rem] mx-auto py-2 bg-black"></div>

      <div className="w-screen flex justify-center items-center">
        <form
          className="w-[50rem] flex flex-col gap-6 p-8 mt-[10rem]"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex items-center justify-between">
            <div className="text-[1.8rem] font-semibold uppercase">
              Sign Up Form
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              className={`${input_style}`}
              placeholder="Name"
              {...register("username", { required: "Field Required" })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="email"
              className={`${input_style}`}
              placeholder="Email"
              {...register("email", { required: "Field Required" })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <input
              type="password"
              className={`${input_style}`}
              placeholder="Password"
              {...register("password", { required: "Field Required" })}
            />
          </div>
          <button
            type="submit"
            m
            className="text-[1.6rem] font-medium py-4 bg-black text-white mt-4"
          >
            Create User
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
