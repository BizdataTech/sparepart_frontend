"use client";

import { Pencil } from "phosphor-react";
import useProfile from "./useProfile";
import { useEffect, useState } from "react";
import UserNameModal from "./modals/UserNameModal";
import EmailModal from "./modals/EmailModal";
import AddressModal from "./modals/AddressModal";
import useAddress from "./useAddress";

const Profile = () => {
  const { userData, mode, handleMode, box, refetch } = useProfile();
  let [DOMContainer, setDOMContainer] = useState(null);
  let { setAsDefault, deleteAddress } = useAddress(refetch);
  let [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    setDOMContainer(document.getElementById("container--modal"));
  }, []);

  const handleAddress = (id) => {
    handleMode("address");
    setSelectedAddress(id);
  };

  const closeBox = () => {
    setSelectedAddress(null);
    box.setBoxStatus(false);
  };

  let addresses = userData?.addresses || null;

  if (!userData) return <div>Loading Data...</div>;
  return (
    <section className="space-y-4">
      <div className="space-y-4 md:space-y-8">
        <h1 className="text-[2rem] uppercase font-medium">User Profile</h1>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-[1.6rem] gap-8">
            <div className="space-y-2">
              <div className="font-medium">User Name</div>
              <div className="p-4 bg-red-50 flex justify-between items-center">
                <div>{userData?.username}</div>
                <Pencil
                  className="cursor-pointer"
                  onClick={() => handleMode("username")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Email</div>
              <div className="p-4 bg-red-50 flex justify-between items-center">
                <div>{userData?.email}</div>
                <Pencil
                  className="cursor-pointer"
                  onClick={() => handleMode("email")}
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div className="text-[1.6rem] font-medium">Addresses</div>
              <button
                className="text-red-700 font-medium underline text-[1.4rem] cursor-pointer p-2"
                onClick={() => handleMode("address")}
              >
                Add New Address
              </button>
            </div>

            {addresses.length ? (
              <div className="space-y-6">
                {addresses.map((ad) => (
                  <div className="text-[1.6rem] border border-neutral-300 flex justify-between p-4">
                    <div className="space-y-4">
                      <div>
                        <div>
                          Name :{" "}
                          <span className="font-medium">{ad?.name || "-"}</span>
                        </div>
                        <div className="font-medium">{ad.address}</div>
                        <div>H/N - {ad.house_number}</div>
                        <div>{`${ad.street}, ${ad.city}, ${ad.district}`}</div>
                        <div>{`${ad.state}, ${ad.pincode}`}</div>
                      </div>
                      <div>Phone : {ad.phone_number}</div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <button
                        className={`self-end border border-neutral-300 text-[1.4rem] cursor-pointer py-1 px-2 ${
                          ad.default &&
                          "bg-green-100 text-green-800 font-medium border-0"
                        }`}
                        onClick={() => setAsDefault(ad._id)}
                        disabled={ad.default}
                      >
                        {ad.default ? "Default address" : "Set as default"}
                      </button>
                      <div className="flex gap-4 items-end mt-auto text-[1.4rem]">
                        <button
                          className="text-red-700 underline cursor-pointer"
                          onClick={() => deleteAddress(ad._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="text-blue-700 underline cursor-pointer"
                          onClick={() => handleAddress(ad._id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-neutral-300 p-8  text-[1.6rem]">
                <div className="font-medium">No address added so far</div>
                <div className="">You have not added any address so far. </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {box.boxStatus && DOMContainer && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-100">
          {mode === "username" && (
            <UserNameModal open={box.setBoxStatus} refetch={refetch} />
          )}
          {mode === "email" && (
            <EmailModal open={box.setBoxStatus} refetch={refetch} />
          )}
          {mode === "address" && (
            <AddressModal
              close={closeBox}
              refetch={refetch}
              addressId={selectedAddress}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
