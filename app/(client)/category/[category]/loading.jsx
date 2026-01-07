"use client";

import { Spinner } from "phosphor-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mb-4">
        <Spinner className="w-[2rem] h-[2rem] animate-spin" />
        <div>Redirecting...</div>
      </div>
    </div>
  );
};

export default Loading;
