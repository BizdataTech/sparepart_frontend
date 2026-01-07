"use client";

import Link from "next/link";
import { CaretRight } from "phosphor-react";
import PageLeft from "./PageLeft";
import PageRight from "./PageRight";
import { useParams } from "next/navigation";
import useOrder from "./useOrder";

const Page = () => {
  let params = useParams();
  let { orderId } = params;

  const { order } = useOrder(orderId);
  const leftConfig = {
    products: order?.products,
    orderStatus: order?.orderStatus,
    orderNumber: order?.orderNumber,
    createdAt: order?.createdAt,
  };

  const rightConfig = {
    address: order?.deliveryAddress,
    priceDetails: {
      totalAmount: order?.totalAmount,
      paymentMethod: order?.paymentMethod,
    },
  };
  return (
    <main className="space-y-8">
      <div className="flex items-center gap-2 text-[1.4rem]">
        <Link href="/orders" className="underline hover:text-purple-800">
          Orders
        </Link>
        <CaretRight />
        <div>Details</div>
      </div>
      <div className="flex gap-[2rem]">
        <PageLeft config={leftConfig} />
        <PageRight config={rightConfig} />
      </div>
    </main>
  );
};

export default Page;
