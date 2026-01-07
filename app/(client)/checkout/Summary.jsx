import ButtonLoading from "@/components/client/ButtonLoading";
import { CartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { Spinner } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Summary = ({ cartTotal, addressId, payment, cart_loading }) => {
  const { getCart } = useContext(CartContext);
  let [loading, setLoading] = useState(false);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let router = useRouter();

  const proceedCheckout = async () => {
    if (!addressId)
      return toast.error("Checkout Failed : Address is not selected");
    if (!payment)
      return toast.error("Checkout Failed : Payment method is not selected.");
    try {
      setLoading(true);
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
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      router.replace(`/order-summary?orderId=${result.orderId}`);
      getCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAmount = (amount) => {
    if (cart_loading)
      return <Spinner className="animate-spin w-[1.8rem] h-[1.8rem]" />;
    return `₹ ${Intl.NumberFormat("en-IN").format(amount)}`;
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
          <div>{getAmount(cartTotal)}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-t border-neutral-300 text-green-800 font-medium">
          <div>Checkout Total</div>
          <div>{getAmount(cartTotal)}</div>
        </div>
        <button
          className={`button w-full bg-black text-white mt-8 transition-colors ${
            loading || cart_loading
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer"
          }`}
          onClick={proceedCheckout}
          disabled={loading || cart_loading}
        >
          {loading ? <ButtonLoading text="Placing Order" /> : "Place Order"}
        </button>
      </div>
    </section>
  );
};

export default Summary;
