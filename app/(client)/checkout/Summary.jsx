import { CartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Summary = ({ cartTotal, addressId, payment }) => {
  const [checkoutStatus, setCheckoutStatus] = useState(false);
  const { getCart } = useContext(CartContext);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let router = useRouter();

  const proceedCheckout = async () => {
    if (!addressId)
      return toast.error("Checkout Failed : Address is not selected");
    if (!payment)
      return toast.error("Checkout Failed : Payment method is not selected.");
    try {
      let response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId,
          paymentMethod: payment,
        }),
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      router.replace(`/order-summary?orderId=${result.orderId}`);
      getCart();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="md:w-4/12 space-y-4">
      <div className="text-[1.6rem] uppercase font-medium">Order Summary</div>
      <div className="text-[1.6rem] bg-white border border-neutral-400 p-4">
        <div className="flex justify-between py-4">
          <div>Shipping</div>
          <div>Free</div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div>Cart Total</div>
          <div>{`₹ ${Intl.NumberFormat("en-IN").format(cartTotal)}`}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-t border-neutral-300 text-green-800 font-medium">
          <div>Checkout Total</div>
          <div>{`₹ ${Intl.NumberFormat("en-IN").format(cartTotal)}`}</div>
        </div>
        <button
          className="button w-full bg-black text-white mt-8 transition-colors cursor-pointer"
          onClick={proceedCheckout}
        >
          Complete Checkout
        </button>
      </div>
    </section>
  );
};

export default Summary;
