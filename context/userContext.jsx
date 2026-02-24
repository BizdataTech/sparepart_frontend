"use client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const getUserStat = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/verify/me`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        console.log(result.message);
        if (response.status === 403) toast.error(result.message);
        if (!response.ok) throw new Error(result.message);
        setUser(result.user);
      } catch (error) {
        console.log(error.message);
        setUser(false);
      }
    };
    getUserStat();
  }, []);

  const loginUser = async (userData) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/auth/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      let data = await response.json();
      if ([401, 403].includes(response.status)) {
        return { error: data.message };
      }
      if (!response.ok) throw new Error(data.message);
      console.log("logged in user:", data.user);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      let data = await response.json();
      if (response.status === 409) {
        return { email_error: data.message };
      }
      if (!response.ok) throw new Error(data.message);
      console.log("user:", data.user);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("error:", error);
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const value = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
