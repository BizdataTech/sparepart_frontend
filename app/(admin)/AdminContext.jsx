import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AdminContext = createContext();
const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    getAdminUser();
  }, []);

  const getAdminUser = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/admin-users/verify`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (response.status === 401) {
        setUser(false);
        return toast.error(result.message);
      }
      if (!response.ok) throw new Error(result.message);
      setUser(result.user);
    } catch (error) {
      console.log(error.message);
      setUser(false);
    }
  };

  const value = { user, refetch: getAdminUser };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
