"use client";

import { useSearchParams } from "next/navigation";
import useOrder from "./useOrder";
import Link from "next/link";
import { Cube } from "phosphor-react";

const OrderSummary = () => {
  let searchParams = useSearchParams();
  let orderId = searchParams.get("orderId");

  let { order } = useOrder(orderId);
  console.log("order data:", order);
  return (
    <main className="w-[85%] mx-auto pt-[17rem] pb-[4rem]">
      {order ? (
        <div className="space-y-6">
          {order.orderStatus === "placed" && (
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
              <div className="grid grid-cols-3">
                {order.products.map((product) => (
                  <div className="flex gap-4 border border-stone-200 p-4 text-[1.6rem]">
                    <div>
                      <img
                        src={product.images[0]}
                        alt="product image"
                        className="w-[12rem] h-[10rem] object-cover"
                      />
                    </div>
                    <div>
                      <div>{product.product_title}</div>
                      <div>
                        Part Number :{" "}
                        <span className="font-medium">
                          {product.part_number}
                        </span>
                      </div>
                      <div className="mt-4">Price : {product.price}/-</div>
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
                  className="underline hover:text-purple-800"
                >
                  View Order Details
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
            <div className="bg-white p-4 w-3/12"></div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};

export default OrderSummary;
