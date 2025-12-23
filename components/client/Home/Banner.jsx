"use client";

const Banner = () => {
  return (
    <div className="w-[85%] mx-auto grid grid-cols-3 gap-4 my-4">
      <div className="shadow-xl">
        <img src="/client/men1.png" alt="banner1" className="" />
      </div>
      <div className="shadow-xl">
        <img src="/client/men2.png" alt="banner2" />
      </div>
      <div className="shadow-xl">
        <img src="/client/men3.png" alt="banner3" />
      </div>
    </div>
  );
};

export default Banner;
