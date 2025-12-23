"use client";

import RegisterForm from "@/components/client/RegisterForm";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const ImageGrid = ({ config }) => {
  let { _id, images, stock, addProducttoCart } = config;
  let [heroImage, setHeroImage] = useState(images[0]);

  let { user } = useContext(UserContext);
  let [mounted, setMounted] = useState(false);
  let [DOMContainer, setDOMContainer] = useState(null);
  let [box, setBox] = useState(false);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let [cartStatus, setCartStatus] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDOMContainer(document.getElementById("sign-container"));
  }, []);

  useEffect(() => {
    if (user) getStatus();
    else setCartStatus(false);
  }, [user]);

  const handleCartAccess = async (id) => {
    if (!user) return setBox(true);
    let _ = await addProducttoCart(id);
    getStatus();
  };

  let getStatus = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/cart/product/${_id}`, {
        method: "GET",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setCartStatus(result.result);
      console.log("status:", result.result);
    } catch (error) {
      console.log("product-cart status fetch failed.", error.message);
    }
  };

  const [zoomPosition, setZoomPosition] = useState({ x: "", y: "" });
  const [show, setShow] = useState(false);
  const handleMouseMovement = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  if (!mounted || !DOMContainer) return null;

  return (
    <div className="md:w-3/6 space-y-4">
      <div className="h-[35rem] flex gap-4 self-start">
        <div className="flex flex-col gap-4 items-center justify-start">
          {images.map((image, index) => (
            <img
              src={image}
              alt={`product ${index}`}
              key={index}
              className="w-[6rem] h-[6rem] border-2 border-red-900 p-1 cursor-pointer"
              onMouseEnter={() => setHeroImage(image)}
            />
          ))}
        </div>
        <div
          className="w-full h-full relative cursor-zoom-in"
          onMouseMove={handleMouseMovement}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <img
            src={heroImage}
            alt="product image"
            className="w-full h-full object-contain mx-auto bg-white"
          />
          {show && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: "200%",
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <button className="button border border-neutral-900 text-neutral-900 bg-white cursor-pointer">
          Add to Whishlist
        </button>
        {cartStatus ? (
          <Link
            className={`button bg-red-900 text-white text-center`}
            href="/cart"
          >
            View Cart
          </Link>
        ) : (
          <button
            className={`button bg-red-900 text-white text-center ${
              stock <= 0 ? "cursor-not-allowed opacity-40" : "cursor-pointer"
            }  `}
            onClick={() => handleCartAccess(_id)}
            disabled={stock <= 0}
          >
            Add to Cart
          </button>
        )}
      </div>
      {box && createPortal(<RegisterForm setBox={setBox} />, DOMContainer)}
    </div>
  );
};
