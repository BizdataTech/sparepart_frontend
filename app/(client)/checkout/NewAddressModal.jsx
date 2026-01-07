import { X } from "phosphor-react";

const NewAddressModal = ({ open }) => {
  return (
    <div className="w-[80rem] max-h-[60rem] overflow-y-scroll bg-white mb-[4rem] p-8">
      <div className="flex justify-between items-center">
        <div className="text-[2rem] font-medium uppercase">Add New Address</div>
        <X
          className="w-[2rem] h-[2rem] text-red-700 cursor-pointer"
          weight="bold"
          onClick={() => open(false)}
        />
      </div>
    </div>
  );
};

export default NewAddressModal;
