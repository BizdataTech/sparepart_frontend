import { Download, House, User } from "phosphor-react";

const PageRight = ({ config }) => {
  let { address, priceDetails } = config;
  console.log("address:", address);
  return (
    <section className="md:w-2/6 flex flex-col gap-4">
      {!address ? (
        <div className="loading--container w-full h-[20rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 text-[1.2rem] md:text-[1.6rem] flex flex-col gap-2 md:gap-4 p-4">
          <div className="font-medium">Delivery Address</div>
          <div className="flex items-center gap-4 md:gap-6 bg-neutral-100 leading-[2rem] md:leading-[2.5rem] p-2">
            <div className="">
              <House className="w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]" />
            </div>
            <div>
              <div>
                {address.address}, {address.house_number}
              </div>
              <div>{`${address.street}, ${address.city}`}</div>
              <div>{`${address.district} ${address.state}, ${address.pincode}`}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 bg-neutral-100 leading-[2rem] md:leading-[2.5rem] p-2">
            <div>
              <User className="w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]" />
            </div>
            <div>
              <div>{`User Name : ${address.name || "Name not found"}`}</div>
              <div>{`Phone Number : ${address.phone_number}`}</div>
            </div>
          </div>
        </div>
      )}
      {!priceDetails.totalAmount ? (
        <div className="loading--container w-full h-[20rem] md:h-[30rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 text-[1.2rem] md:text-[1.6rem] flex flex-col gap-2 md:gap-4 p-4">
          <div className="font-medium">Price Details</div>
          <div>
            <div className="flex justify-between items-center py-1">
              <div>Total Amount</div>
              <div>₹{priceDetails.totalAmount}</div>
            </div>
            <div className="flex justify-between items-center py-1">
              <div>Payment Method</div>
              <div>{priceDetails.paymentMethod}</div>
            </div>
            <button className="mt-4 py-2 text-center w-full bg-neutral-200 font-medium flex items-center gap-2 justify-center cursor-not-allowed hover:bg-neutral-300 transition-colors">
              Download Invoice <Download />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PageRight;
