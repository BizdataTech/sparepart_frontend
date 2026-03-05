const { Spinner } = require("phosphor-react");

const ButtonLoading = ({ text }) => {
  return (
    <div className="text-[1.2rem] md:text-[1.6rem] flex justify-center items-center gap-2">
      <div>{text}</div>
      <Spinner className="animate-spin w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]" />
    </div>
  );
};

export default ButtonLoading;
