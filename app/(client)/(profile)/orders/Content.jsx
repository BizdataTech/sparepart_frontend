import Link from "next/link";

const Content = ({ orders }) => {
  const getElement = (type) => {
    switch (type) {
      case "placed":
        return <div className="text-green-800 font-semibold">Order Placed</div>;
      case "confirmed":
        return (
          <div className="text-green-800 font-semibold">Order Confirmed</div>
        );
      default:
        return;
    }
  };
  return (
    <section className="flex flex-col gap-6">
      {!orders ? (
        <div className="loading--container w-full h-[15rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : !orders.length ? (
        <div className="p-6 border border-neutral-300 text-[1.4rem]">
          <div className="font-medium">No Order Found</div>
          <div>Couldn't find any orders here.</div>
        </div>
      ) : (
        orders.map((order) => (
          <div
            href={`/orders/${order._id}`}
            key={order._id}
            className="border border-neutral-300 text-[1.2rem] md:text-[1.6rem] shadow-sm p-4 md:p-8 w-full"
          >
            <Link
              href={`/orders/${order._id}`}
              className="flex gap-4 md:gap-[4rem]"
            >
              <div className="self-stretch">
                <img
                  key={order.items[0].product._id}
                  src={order.items[0].product.images[0]?.url}
                  alt={`${order.items[0].product.product_title} image`}
                  className="w-[3rem] md:w-[8rem] h-[3rem] md:h-[8rem] my-[50%] md:my-0"
                />
              </div>
              <div className="flex justify-between flex-1">
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-[1rem] md:text-[1.4rem]">
                      Order Number
                    </div>
                    <div className="font-semibold">{order.orderNumber}</div>
                  </div>
                  <div className="flex gap-2 md:gap-4">
                    <div>Total Products</div>
                    <div>{order.items.length}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-end">
                    <div className="text-[1rem] md:text-[1.4rem]">
                      Total Amount
                    </div>
                    <div className="font-semibold">
                      ₹ {Intl.NumberFormat("en-IN").format(order.totalAmount)}
                    </div>
                  </div>
                  <div className="text-[1.1rem] md:text-[1.6rem] text-end">
                    {getElement(order.currentOrderStatus)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
    </section>
  );
};

export default Content;
