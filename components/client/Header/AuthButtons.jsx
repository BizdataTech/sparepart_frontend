"use client";

import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import RegisterForm from "../RegisterForm";

const AuthButtons = () => {
  const { user, logoutUser } = useContext(UserContext);

  let [mounted, setMounted] = useState(false);
  let [DOMContainer, setDOMContainer] = useState(null);
  let [box, setBox] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDOMContainer(document.getElementById("modal-container"));
  }, []);

  if (!mounted || !DOMContainer) return null;
  return (
    <div>
      {user ? (
        <button
          className="py-2 px-6 cursor-pointer"
          style={{ backgroundColor: "#b00015", color: "white" }}
          onClick={logoutUser}
        >
          Logout
        </button>
      ) : (
        <div className="cursor-pointer" onClick={() => setBox(true)}>
          <span
            className="py-2 px-6"
            style={{ backgroundColor: "#b00015", color: "white" }}
          >
            Sign Up
          </span>
          <span
            className="py-2 px-6"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            Sign In
          </span>
        </div>
      )}
      {box && createPortal(<RegisterForm setBox={setBox} />, DOMContainer)}
    </div>
  );
};

export default AuthButtons;
