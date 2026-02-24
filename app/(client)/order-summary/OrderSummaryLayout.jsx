"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useOrder from "./useOrder";
import Link from "next/link";
import { Cube, Gift, Sparkle, Spinner } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";

const OrderSummaryLayout = () => {
  let searchParams = useSearchParams();
  let orderId = searchParams.get("orderId");

  let { order } = useOrder(orderId);
  let [redirecting, setRedirecting] = useState(false);

  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user === false) router.replace("/");
  }, [user]);

  if (user === null) return null;

  return (
    <main className="pt-[15rem] lg:pt-[18rem] pb-[4rem]">
      {order ? (
        <div className="space-y-6">
          {order.currentOrderStatus === "placed" && (
            <div className="flex justify-between gap-6">
              <div className="bg-green-100 text-green-800 w-full p-6 leading-[3.5rem]">
                <div className="text-[3rem] font-semibold">Success</div>
                <div className="text-[2rem] font-medium">
                  Congrats, Your order have successfully placed.
                </div>
              </div>
              <div className="text-end bg-white text-[1.6rem] w-3/12 p-4">
                <div>Order Number</div>
                <div className="font-semibold">{order.orderNumber}</div>
              </div>
            </div>
          )}
          <div className="flex gap-6">
            <div className="w-full bg-white space-y-4 p-6">
              <div className="text-[2rem] font-medium">Ordered Products</div>
              <div className="grid grid-cols-3 gap-6">
                {order.items.map((item) => (
                  <div className="flex gap-4 border border-stone-200 p-4 text-[1.6rem]">
                    <div>
                      <img
                        src={item.product.images[0]?.url}
                        alt="product image"
                        className="w-[12rem] h-[10rem] object-cover"
                      />
                    </div>
                    <div>
                      <div>{item.product.product_title}</div>
                      <div>
                        Part Number :{" "}
                        <span className="font-medium">
                          {item.product.part_number}
                        </span>
                      </div>
                      <div className="mt-4">Price : {item.product.price}/-</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-3/12 bg-white p-4 text-[2rem] self-end flex flex-col items-end">
              <div>Order Total</div>
              <div className="font-semibold">₹ {order.totalAmount}</div>
            </div>
          </div>

          <div className="bg-white p-6 space-y-4">
            <div className="text-[2rem] font-medium">
              Selected Delivery Address
            </div>
            <div className="border border-neutral-300 w-[50rem] text-[1.6rem] p-4">
              <div>{order.deliveryAddress.address}</div>
              <div>House Number : {order.deliveryAddress.house_number}</div>
              <div>{`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.district}, ${order.deliveryAddress.state}`}</div>
              <div>{`Pincode : ${order.deliveryAddress.pincode}`}</div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-white w-full text-[1.6rem] p-4 relative">
              <div className="font-medium">Want to check everything later?</div>
              <div>
                You can track delivery, download the invoice, or manage this
                order anytime from your account.
              </div>
              <div className="mt-8">
                <Link
                  href={`/orders/${order._id}`}
                  className={`underline text-purple-800 hover:text-purple-500 flex items-center gap-2 ${
                    redirecting &&
                    "cursor-not-allowed opacity-50 pointer-events-none"
                  }`}
                  onClick={() => setRedirecting(true)}
                >
                  View Order Details{" "}
                  {redirecting && (
                    <Spinner className="animate-spin w-[2rem] h-[2rem]" />
                  )}
                </Link>
              </div>
              <div className="absolute top-7 right-6 flex gap-2">
                <Cube
                  weight="duotone"
                  className="text-yellow-600/90  w-[3rem] h-[3rem]"
                />
                <Cube
                  weight="duotone"
                  className="text-yellow-600/90  w-[8rem] h-[8rem]"
                />
              </div>
            </div>
            <div className="bg-white p-4 w-3/12 text-[1.6rem] flex flex-col justify-between">
              <div className="font-medium leading-[2rem]">
                Expolore more deals while you are here
              </div>
              <Link
                href="/"
                className="underline text-blue-700 cursor-pointer hover:text-blue-500 self-end"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

export default OrderSummaryLayout;
