"use client";

import ButtonLoading from "@/components/client/ButtonLoading";
import RegisterForm from "@/components/client/RegisterForm";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export const ImageGrid = ({
  config,
  handleMouseMovement,
  setShow,
  image,
  setImage,
}) => {
  let { _id, images, stock, addProducttoCart } = config;

  let { user } = useContext(UserContext);
  let [mounted, setMounted] = useState(false);
  let [DOMContainer, setDOMContainer] = useState(null);
  let [box, setBox] = useState(false);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let [cartStatus, setCartStatus] = useState(false);
  let [wishlistStatus, setWishlistStatus] = useState(false);

  let [cartLoading, setCartLoading] = useState(false);
  let [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDOMContainer(document.getElementById("modal-container"));
  }, []);

  useEffect(() => {
    if (user) {
      getStatus();
      getWishlistStatus();
    } else {
      setCartStatus(false);
      setWishlistStatus(false);
    }
  }, [user]);

  const handleCartAccess = async (id) => {
    if (!user) return setBox(true);
    setCartLoading(true);
    let _ = await addProducttoCart(id);
    setCartLoading(false);
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

  let getWishlistStatus = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/users/wishlist/product/${_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setWishlistStatus(result.result);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const addToWishlist = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/wishlist`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: _id }),
      });
      let result = await response.json();
      if (response.status === 409) return toast.error(result.message);
      if (!response.ok) throw new Error(result.message);
      setWishlistStatus(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!mounted || !DOMContainer) return null;

  return (
    <div className="md:w-3/6 space-y-8">
      <div className="h-[35rem] flex gap-4 self-start">
        <div className="flex flex-col gap-4 items-center justify-start">
          {images.map((image, index) => (
            <img
              src={image.url}
              alt={`product ${index}`}
              key={index}
              className="w-[6rem] h-[6rem] border-2 border-red-900 p-1 cursor-pointer"
              onMouseEnter={() => setImage(image)}
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
            src={image?.url || images[0]?.url}
            alt="product image"
            className="w-full h-full object-contain mx-auto bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {wishlistStatus ? (
          <Link
            href="/wishlist"
            className="button bg-white border border-red-900 text-red-900 text-center"
          >
            View Wishlist
          </Link>
        ) : (
          <button
            className="button border border-neutral-900 text-neutral-900 bg-white cursor-pointer"
            onClick={addToWishlist}
          >
            Add to Whishlist
          </button>
        )}

        {cartStatus ? (
          <Link
            className={`button bg-red-900 text-white text-center ${
              viewLoading && "cursor-not-allowed opacity-70 pointer-events-none"
            }`}
            onClick={() => setViewLoading(true)}
            href="/cart"
          >
            {viewLoading ? (
              <ButtonLoading text="Directing to Cart" />
            ) : (
              "View Cart"
            )}
          </Link>
        ) : (
          <button
            className={`button bg-red-900 text-white text-center ${
              stock <= 0 || cartLoading
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer"
            }  `}
            onClick={() => handleCartAccess(_id)}
            disabled={stock <= 0 || cartLoading}
          >
            {cartLoading ? (
              <ButtonLoading text={"Adding to Cart"} />
            ) : (
              "Add to Cart"
            )}
          </button>
        )}
      </div>
      {box && createPortal(<RegisterForm setBox={setBox} />, DOMContainer)}
    </div>
  );
};
