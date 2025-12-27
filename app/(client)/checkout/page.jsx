"use client";

import { fetchCart } from "@/services/cartServices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductList from "./ProductList";
import Address from "./Address";
import Summary from "./Summary";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  let router = useRouter();

  useEffect(() => {
    let getCart = async () => {
      try {
        let cart = await fetchCart();
        if (!cart || !cart.items.length) {
          toast.warning("Failed : Your cart is empty");
          router.push("/cart");
        }
        setCart(cart);
      } catch (error) {
        console.log(error.message);
        router.push("/cart");
      }
    };
    getCart();
  }, []);

  return (
    <div className="w-[85%] mx-auto pt-[17rem] pb-[4rem] text-neutral-800 flex flex-col md:flex-row gap-6">
      <div className="w-full lg:w-8/12 space-y-[4rem]">
        <ProductList items={cart?.items || []} />
        <Address />
      </div>
      <Summary cartTotal={cart?.cartTotal || 0} />
    </div>
  );
};

export default Checkout;
