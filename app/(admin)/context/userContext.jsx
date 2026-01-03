"use client";

import { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
