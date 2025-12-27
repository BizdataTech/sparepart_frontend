"use client";

import { CartContext } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, getCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  let [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (user === false) router.push("/");
  }, [user]);

  useEffect(() => {
    setCartTotal(cart?.cartTotal);
  }, [cart]);

  if (!user) return null;
  return (
    <section className="w-[85%] mx-auto pb-4">
      {!cart || !cart?.items.length ? (
        <div className="bg-neutral-200 p-8 ">
          <div className="text-[2.2rem] font-medium">
            Oops, Your cart is empty!
          </div>
          <div className="text-[1.6rem]">
            Find your next favorite item and let's get this cart filled!
          </div>
        </div>
      ) : (
        <div className="flex gap-4 pt-[17rem]">
          <div className="w-4/6 flex flex-col gap-4">
            {cart?.items.map((item, index) => (
              <CartItem
                item={item}
                key={item._id}
                setCartTotal={setCartTotal}
                getCart={getCart}
              />
            ))}
          </div>

          <div className="w-2/6 self-start min-h-[40rem] border border-neutral-300 bg-white flex flex-col justify-between p-8">
            <div>
              <div className="text-[1.8rem] uppercase pb-4 border-b border-neutral-500">
                Cart Totals
              </div>
              <div className="py-4 text-[1.6rem] space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-neutral-600">Shipping</div>
                  <div className="font-medium">Free</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-neutral-600">Cart Total</div>
                  <div className="font-medium">
                    {Intl.NumberFormat("en-IN").format(cartTotal)}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-neutral-500 text-[1.6rem] flex justify-between items-center">
                <div>Total</div>
                <div className="font-medium">
                  {Intl.NumberFormat("en-IN").format(cartTotal)}
                </div>
              </div>
            </div>
            {cart?.items.length > 0 && (
              <Link
                className="button bg-black text-white text-center font-medium"
                href="/checkout"
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
