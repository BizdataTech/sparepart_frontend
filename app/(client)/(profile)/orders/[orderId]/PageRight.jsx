import { Download, House, User } from "phosphor-react";

const PageRight = ({ config }) => {
  let { address, priceDetails } = config;
  console.log("address:", address);
  return (
    <section className="w-2/6 space-y-4">
      {!address ? (
        <div className="loading--container w-full h-[20rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 p-4 text-[1.6rem] space-y-4">
          <div className="font-medium">Delivery Address</div>
          <div className="flex items-center gap-6 p-2 bg-neutral-100 leading-[2.5rem]">
            <div className="">
              <House className="w-[2rem] h-[2rem]" />
            </div>
            <div>
              <div>
                {address.address}, {address.house_number}
              </div>
              <div>{`${address.street}, ${address.city}`}</div>
              <div>{`${address.district} ${address.state}, ${address.pincode}`}</div>
            </div>
          </div>
          <div className="flex items-center gap-6 p-2 bg-neutral-100 leading-[2.5rem]">
            <div>
              <User className="w-[2rem] h-[2rem]" />
            </div>
            <div>
              <div>{address.username || "Name not found"}</div>
              <div>{`Phone Number : ${address.phone_number}`}</div>
            </div>
          </div>
        </div>
      )}
      {!priceDetails.totalAmount ? (
        <div className="loading--container w-full h-[30rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="border border-neutral-300 p-4 text-[1.6rem] space-y-4">
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
