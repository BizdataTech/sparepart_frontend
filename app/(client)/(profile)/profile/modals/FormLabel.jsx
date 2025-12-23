import { Asterisk } from "phosphor-react";

const FormLabel = ({ title, error }) => {
  return (
    <div className="flex justify-start items-center gap-1">
      <label className="text-[1.6rem]">{title}</label>
      <Asterisk
        className={`w-[1.1rem] h-[1.1rem] ${
          error ? "text-red-500" : "text-neutral-400"
        }`}
      />
    </div>
  );
};

export default FormLabel;
