"use client";

import { Spinner, X } from "phosphor-react";
import InputLabel from "./InputLabel";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "@/context/userContext";
import { toast } from "sonner";

const RegisterForm = ({ setBox }) => {
  let { loginUser, registerUser } = useContext(UserContext);
  let [route, setRoute] = useState("sign-in");
  let [loading, setLoading] = useState(false);
  let [responseError, setResponseError] = useState(null);

  let {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const handleInputFields = (route) => {
    if (route === "sign-in") {
      reset({
        email: "",
        password: "",
      });
    } else {
      reset({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    }
  };

  const handleRoute = () => {
    let new_route = route === "sign-in" ? "sign-up" : "sign-in";
    setRoute(new_route);
    handleInputFields(new_route);
  };

  const submitForm = async (values) => {
    let result = null;
    setLoading(true);
    if (route === "sign-in") result = await loginUser(values);
    else result = await registerUser(values);
    setLoading(false);

    if (result.error) {
      setResponseError(result.error);
      setTimeout(() => {
        setResponseError(null);
      }, 5000);
    } else if (result.email_error) {
      setError("email", {
        type: "server",
        message: result.email_error,
      });
    } else {
      handleInputFields(route);
      setBox(false);
    }
  };

  let isRegister = route === "sign-up" ? true : false;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center shadow-xl z-200">
      <div className="bg-white w-[35rem] md:w-[55rem] space-y-[2.5rem] md:space-y-[3rem] px-8 md:px-10 py-10 md:py-12 relative">
        <div className="text-[2.4rem] md:text-[3rem] font-bold uppercase">
          Sign in / Sign up
        </div>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(submitForm)}
          key={route}
        >
          {isRegister && (
            <div className="space-y-2">
              <InputLabel title="User Name" error={errors?.username?.message} />
              <input
                type="text"
                className="input--form"
                {...register("username", { required: "Field Required" })}
              />
            </div>
          )}

          <div>
            <InputLabel title="E-mail" error={errors?.email?.message} />
            <input
              type="email"
              className="input--form"
              {...register("email", {
                required: "Field Required",
                patter: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
          </div>
          <div className="flex gap-6">
            <div className="w-full">
              <InputLabel title="Password" error={errors?.password?.message} />
              <input
                type="password"
                className="input--form"
                {...register("password", {
                  required: "Field Required",
                  minLength: {
                    value: 6,
                    message: "Required min 6 chars",
                  },
                })}
              />
            </div>
            {isRegister && (
              <div className="w-full">
                <InputLabel
                  title="Confirm-Password"
                  error={errors?.confirm_password?.message}
                />
                <input
                  type="password"
                  className="input--form"
                  {...register("confirm_password", {
                    required: "Field Required",
                    validate: (v) => v === watch("password") || "Not matching",
                  })}
                />
              </div>
            )}
          </div>
          <div className="mt-12 space-y-4">
            {responseError && (
              <div className="text-[1.6rem] bg-red-100 text-red-800 font-medium py-2 px-4">
                {responseError}
              </div>
            )}
            <button
              className="w-full bg-black text-[1.6rem] text-white font-semibold uppercase py-6 flex justify-center cursor-pointer"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  Submitting{" "}
                  <Spinner className="animate-spin w-[1.8rem] h-[1.8rem]" />
                </div>
              ) : isRegister ? (
                "Create Account"
              ) : (
                "Log In"
              )}
            </button>
            <div className="mt-2 text-[1.6rem] text-neutral-700">
              {isRegister ? (
                <div>
                  Already have an Account?{" "}
                  <span
                    className="underline hover:text-purple-700 transition-colors cursor-pointer"
                    onClick={handleRoute}
                  >
                    Sign In
                  </span>
                </div>
              ) : (
                <div>
                  Create a New Account?{" "}
                  <span
                    className="underline hover:text-purple-700 transition-colors cursor-pointer"
                    onClick={handleRoute}
                  >
                    Register
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
        <div
          className="absolute -right-[1rem] -top-[1rem] bg-white border-2 p-2 cursor-pointer"
          onClick={() => setBox(false)}
        >
          <X className="w-[3rem] h-[3rem]" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
