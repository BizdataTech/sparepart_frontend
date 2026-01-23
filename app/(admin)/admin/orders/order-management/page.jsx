"use client";

import { useSearchParams } from "next/navigation";
import useOrder from "./useOrder";
import OrderHistory from "./OrderHistory";
import ActionButtons from "./ActionButtons";

const OrderManagement = () => {
  let params = useSearchParams();
  let id = params.get("id");

  let { data, getData } = useOrder(id);
  let { deliveryAddress: address } = data || {};
  if (data === null)
    return (
      <div className="flex gap-6">
        <div className="loading--container w-1/2 h-[20rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
        <div className="loading--container w-1/2 h-[40rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      </div>
    );
  return (
    <main className="pt-2 flex gap-4">
      <div className="W-1/2 flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {data.items.map((item) => (
            <div
              className="a-section--box !rounded-[0rem] a-text--body gap-8"
              key={item.product._id}
            >
              <div className="self-start">
                <img
                  src={item.product.images[0]}
                  alt={`${item.product.product_title} image`}
                  className="w-[7rem] h-[7rem] object-cover"
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
                <div className="flex items-center justify-between mt-8">
                  <div>
                    ₹ <span className="font-medium">{item.product.price}</span>
                  </div>
                  <div>
                    Quantity :{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="a-section--box !rounded-[0rem]">
          <div className="a-section--title">Order History</div>
          <OrderHistory history={data.orderStatusHistory} />
        </div>
      </div>
      <div className="w-1/2 flex-1 flex flex-col gap-4">
        <div className="a-section--box !rounded-[0rem]">
          <div className="a-section--title">Delivery Address</div>
          <div className="a-text--body">
            <div>{address.name || "Unknown Name"}</div>
            <div>{`${address.address}, ${address.house_number}`}</div>
            <div>{`${address.street}, ${address.city}, ${address.district}, ${address.state}, ${address.pincode}`}</div>
            <div className="mt-4">
              Contact : <span>{address.phone_number}</span>
            </div>
          </div>
        </div>
        <div className="a-section--box !rounded-[0rem]">
          <div className="a-section--title">Payment Details</div>
          <div className="a-text--body">
            <div className="flex items-center justify-between py-3 border-b border-neutral-200">
              <div>Total Amount</div>
              <div className="font-semibold">
                {Intl.NumberFormat("en-IN").format(data?.totalAmount)}
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>Payment Type</div>
              <div className="uppercase">{data.paymentMethod}</div>
            </div>
          </div>
        </div>
        <ActionButtons
          currentStatus={data.currentOrderStatus}
          orderId={id}
          refetch={getData}
        />
      </div>
    </main>
  );
};

export default OrderManagement;
