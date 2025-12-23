import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";

const useProfile = () => {
  let [userData, setUserData] = useState(null);
  let [mode, setMode] = useState(null);
  let [boxStatus, setBoxStatus] = useState(false);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  let { user } = useContext(UserContext);

  useEffect(() => {
    getUserData();
  }, []);

  let getUserData = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/auth/user/${user}`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setUserData(result.user);
    } catch (error) {
      console.log("user data fetch error in profile page:", error.message);
    }
  };

  let handleMode = (value) => {
    setMode(value);
    setBoxStatus(true);
  };

  return {
    userData,
    mode,
    handleMode,
    box: { boxStatus, setBoxStatus },
    refetch: getUserData,
  };
};

export default useProfile;
