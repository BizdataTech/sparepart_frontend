import { CheckCircle, X } from "phosphor-react";
import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import Link from "next/link";

const AddressModal = ({ setModal, addressId, setAddressId, setAddress }) => {
  const [addresses, setAddresses] = useState(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    let getAddresses = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/users/address?type=all`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("addresses:", result.addresses);
        setAddresses(result.addresses);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAddresses();
  }, []);

  const handleAddress = (address) => {
    setAddressId(address._id);
    setModal(false);
    setAddress(address);
  };
  return (
    <div className="w-[80rem] max-h-[60rem] overflow-y-scroll bg-white mb-[4rem] p-8">
      <div className="flex justify-between items-center">
        <div className="text-[2rem] font-medium uppercase">Change Address</div>
        <X
          className="w-[2rem] h-[2rem] text-red-700 cursor-pointer"
          weight="bold"
          onClick={() => setModal(false)}
        />
      </div>
      <div className="text-[1.6rem] space-y-8">
        <div>
          Select a single delivery address from your saved addresses to proceed
          with your order.
        </div>
        <div className="space-y-4">
          {!addresses ? (
            <div></div>
          ) : !addresses.length ? (
            <div className="border border-neutral-400 bg-neutral-200/80 p-8">
              <div className="font-medium uppercase">Address not added!</div>
              <div>
                Couldn't find any address. Visit{" "}
                <Link href="/profile" className="text-purple-700 underline">
                  Address
                </Link>{" "}
                to add new address to proceed with your order.
              </div>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                className={`relative cursor-pointer hover:-translate-y-[.2rem] transition-transform ${
                  address._id === addressId && "border border-blue-700"
                }`}
                onClick={() => handleAddress(address)}
              >
                <AddressCard address={address} />
                {address._id === addressId && (
                  <CheckCircle
                    className="absolute top-4 right-4 w-[2.3rem] h-[2.3rem] text-blue-700"
                    weight="fill"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
