import { toast } from "sonner";

const useAddress = (refetch) => {
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const setAsDefault = async (id) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/address/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ default: true }),
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      refetch();
    } catch (error) {
      console.log("set as default error:", error.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/address/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      refetch();
    } catch (error) {
      toast.error("Deletion failed: Something went wrong");
      console.log("address deletion error:", error.message);
    }
  };
  const updateAddress = async () => {};

  return { setAsDefault, deleteAddress, updateAddress };
};

export default useAddress;
