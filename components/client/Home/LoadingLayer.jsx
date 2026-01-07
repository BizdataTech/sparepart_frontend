const { Spinner } = require("phosphor-react");

const LoadingLayer = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-200">
      <div className="mb-[2rem] flex flex-col justify-center items-center gap-2 text-white text-[1.6rem]">
        <Spinner className="w-[3rem] h-[3rem] animate-spin" weight="bold" />
        <div>Redirecting...</div>
      </div>
    </div>
  );
};

export default LoadingLayer;
