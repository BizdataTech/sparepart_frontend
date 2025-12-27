import { useEffect, useState } from "react";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const getDefaultAddress = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/users/address`, {
          method: "GET",
          credentials: "include",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setAddresses(result.addresses);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDefaultAddress();
  }, []);

  useEffect(() => {
    setDefaultAddress(addresses.find((add) => add.default));
  }, [addresses]);
  return (
    <section className="space-y-4">
      <div className="text-[1.6rem] font-medium uppercase">Deliver To:</div>
      {defaultAddress === null ? (
        <div>Loading...</div>
      ) : defaultAddress === undefined ? (
        <div></div>
      ) : (
        <div className="border border-neutral-300 bg-white p-4 text-[1.6rem]">
          <div className="font-medium">{`${defaultAddress.address}, ${defaultAddress.house_number}`}</div>
          <div>{`${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.district}`}</div>
          <div>{`${defaultAddress.state}, ${defaultAddress.pincode}`}</div>
          <div className="mt-4">{`Phone Number: ${defaultAddress.phone_number}`}</div>
        </div>
      )}
    </section>
  );
};
export default Address;
