import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AddressModal from "./AddressModal";
import AddressCard from "./AddressCard";

const Address = ({ selectedId, setId }) => {
  const [address, setAddress] = useState(null);
  const [modal, setModal] = useState(false);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getDefaultAddress();
  }, []);

  const getDefaultAddress = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/users/address?type=default`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setAddress(result?.address || null);
      setId(result?.address?._id || null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center text-[1.6rem]">
        <div className="font-medium uppercase">Deliver To:</div>
        <div
          className="underline text-red-800 cursor-pointer hover:text-red-950 transition-colors"
          onClick={() => setModal(true)}
        >
          Change Address
        </div>
      </div>

      {address === null ? (
        <div>Loading...</div>
      ) : address === undefined ? (
        <div></div>
      ) : (
        <AddressCard address={address} />
      )}
      {modal &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-200">
            <AddressModal
              setModal={setModal}
              addressId={selectedId}
              setAddressId={setId}
              setAddress={setAddress}
            />
          </div>,
          document.getElementById("modal-container")
        )}
    </section>
  );
};
export default Address;
