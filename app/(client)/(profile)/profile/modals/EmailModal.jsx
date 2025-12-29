import { X } from "phosphor-react";
import FormLabel from "./FormLabel";
import { useForm } from "react-hook-form";

const EmailModal = ({ open, refetch }) => {
  let {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const submitEmail = async (values) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/email`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      let result = await response.json();
      if (response.status === 409)
        return setError("email", { type: "server", message: result.message });
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
        <div className="text-[1.8rem] font-medium">Change Email</div>
        <div className="text-[1.6rem] text-neutral-600">
          Enter below your new email.
        </div>
      </div>
      <form onSubmit={handleSubmit(submitEmail)}>
        <div className="space-y-2">
          <FormLabel title="New Email" error={errors?.email} />
          <input
            type="text"
            className="modal--input"
            {...register("email", { required: true })}
          />
        </div>
        <button className="modal--button mt-8" type="submit">
          Submit New Email
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

export default EmailModal;
