"use client";

import dayjs from "dayjs";
import tableHead from "./tableHead";
import useOrders from "./useOrders";
import Link from "next/link";

const Page = () => {
  let { orders } = useOrders();

  return (
    <main>
      {!orders ? (
        <div className="loading--container w-full h-[20rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : !orders.length ? (
        <div className="a-section--box">
          <div className="a-text--title">No orders found</div>
          <div className="a-text--body">
            Couldn't find any order so far from your ecommerce store. Retry to
            request for data again.
          </div>
        </div>
      ) : (
        <table className="a-section--box w-full a-text--body">
          <thead>
            <tr>
              {tableHead.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-4 font-semibold first:text-start last:text-end"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="odd:bg-neutral-100">
                <td className="py-4 px-4 text-start font-medium">
                  {order.orderNumber}
                </td>
                <td className="py-4 px-4 text-center">{order.user}</td>
                <td className="py-4 px-4 text-center">
                  {dayjs(order.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="py-4 px-4 text-center">
                  {Intl.NumberFormat("en-IN").format(order.totalAmount)}
                </td>
                <td className="py-4 px-4 text-center">{order.items}</td>
                <td className="text-center capitalize">
                  {order.paymentStatus}
                </td>
                <td className="text-center capitalize">
                  {order.currentOrderStatus}
                </td>
                <td className="text-end py-4 px-4 underline text-purple-800">
                  <Link href={`/admin/orders/order-management?id=${order._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Page;
