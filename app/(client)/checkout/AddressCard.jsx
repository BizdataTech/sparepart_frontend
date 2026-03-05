const AddressCard = ({ address }) => {
  return (
    <div className="text-[1.2rem] md:text-[1.6rem] border border-neutral-300 bg-white p-4">
      <div className="font-medium">{`${address.address}, ${address.house_number}`}</div>
      <div>{`${address.street}, ${address.city}, ${address.district}`}</div>
      <div>{`${address.state}, ${address.pincode}`}</div>
      <div className="mt-4">{`Phone Number: ${address.phone_number}`}</div>
    </div>
  );
};

export default AddressCard;
