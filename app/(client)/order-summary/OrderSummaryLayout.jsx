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
    <main className="pt-[13rem] lg:pt-[18rem] pb-[4rem]">
      {order ? (
        <div className="flex flex-col gap-4 md:gap-6">
          {order.currentOrderStatus === "placed" && (
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <div className="w-full bg-green-100 text-green-800 leading-[2rem] md:leading-[3.5rem] p-4 md:p-6">
                <div className="text-[1.6rem] md:text-[3rem] font-semibold">
                  Success
                </div>
                <div className="text-[1.2rem] md:text-[2rem] font-medium">
                  Congrats, Your order have successfully placed.
                </div>
              </div>
              <div className="md:w-3/12 bg-white md:text-end text-[1.2rem] md:text-[1.6rem] p-4">
                <div>Order Number</div>
                <div className="font-semibold">{order.orderNumber}</div>
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="w-full bg-white flex flex-col gap-2 md:gap-4 p-4 md:p-6">
              <div className="text-[1.4rem] md:text-[2rem] font-medium">
                Ordered Products
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {order.items.map((item) => (
                  <div className="flex gap-4 border border-stone-200 text-[1.2rem] md:text-[1.6rem] p-4">
                    <div>
                      <img
                        src={item.product.images[0]?.url}
                        alt="product image"
                        className="w-[6rem] md:w-[12rem] h-[6rem] md:h-[10rem] object-cover"
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
            <div className="md:w-3/12 bg-white p-4 text-[1.6rem] md:text-[2rem] md:self-end flex flex-row justify-center md:justify-start md:flex-col md:items-end gap-4 md:gap-0 items-center">
              <div className="font-semibold md:font-normal">Order Total</div>
              <div className="font-semibold">₹ {order.totalAmount}</div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 flex flex-col gap-2 md:gap-4">
            <div className="text-[1.4rem] md:text-[2rem] font-medium">
              Selected Delivery Address
            </div>
            <div className="border border-neutral-300 md:w-[50rem] text-[1.2rem] md:text-[1.6rem] p-2 md:p-4">
              <div>{order.deliveryAddress.address}</div>
              <div>House Number : {order.deliveryAddress.house_number}</div>
              <div>{`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.district}, ${order.deliveryAddress.state}`}</div>
              <div>{`Pincode : ${order.deliveryAddress.pincode}`}</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="bg-white w-full text-[1.2rem] md:text-[1.6rem] p-4 relative">
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
              <div className="hidden md:block absolute bottom-4 right-4 md:top-7 md:right-6 flex gap-.5 md:gap-2">
                <Cube
                  weight="duotone"
                  className="text-yellow-600/90 w-[1rem] md:w-[3rem] h-[1rem] md:h-[3rem]"
                />
                <Cube
                  weight="duotone"
                  className="text-yellow-600/90  w-[3rem] md:w-[8rem] h-[3rem] md:h-[8rem]"
                />
              </div>
            </div>
            <div className="bg-white md:w-3/12 text-[1.2rem] md:text-[1.6rem] flex flex-col items-center md:items-start justify-between p-4">
              <div className="font-medium leading-[2rem]">
                Expolore more deals while you are here
              </div>
              <Link
                href="/"
                className="underline text-blue-700 cursor-pointer hover:text-blue-500 md:self-end"
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
