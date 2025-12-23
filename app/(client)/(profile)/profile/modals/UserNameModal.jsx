"use client";

import { X } from "phosphor-react";

const UserNameModal = ({ close }) => {
  return (
    <div className="modal space-y-8 mb-[6rem] relative">
      <div>
        <div className="text-[1.8rem] font-medium">Change Username</div>
        <div className="text-[1.6rem] text-neutral-600">
          Enter below a new username.
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="" className="text-[1.6rem]">
            New Username
          </label>
        </div>
        <input type="text" className="modal--input" />
      </div>
      <button className="modal--button">Submit Username</button>
      <div
        className="absolute top-0 right-0 bg-black text-white cursor-pointer p-2"
        onClick={() => close(false)}
      >
        <X className="w-[2rem] h-[2rem]" weight="bold" />
      </div>
    </div>
  );
};

export default UserNameModal;
