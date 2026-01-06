import Link from "next/link";

const Content = ({ orders }) => {
  const getElement = (type) => {
    switch (type) {
      case "placed":
        return <div className="text-green-800 font-semibold">Order Placed</div>;
      default:
        return;
    }
  };
  return (
    <section className="space-y-6">
      {!orders ? (
        <div className="loading--container w-full h-[15rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : !orders.length ? (
        <div className="p-6 border border-neutral-300 text-[1.6rem]">
          <div className="font-medium">No Order Found</div>
          <div>Couldn't find any orders here.</div>
        </div>
      ) : (
        orders.map((order) => (
          <div
            href={`/orders/${order._id}`}
            key={order._id}
            className="border border-neutral-300 text-[1.6rem] shadow-sm p-8 w-full min-h-[15rem]"
          >
            <Link href={`/orders/${order._id}`} className="space-y-4">
              <div className="relative">
                {order.products.map((product, i) => (
                  <img
                    key={product._id}
                    src={product.images[0]}
                    alt={`${product.product_title} image`}
                    className="absolute left-0 top-0 w-[8rem] h-[8rem] shadow-md"
                    style={{
                      transform: `translateY(${20 * i}px) translateX(${
                        10 * i
                      }px)`,
                    }}
                  />
                ))}
              </div>
              <div className="ml-[13rem] flex justify-between items-start">
                <div className="space-y-4">
                  <div>
                    <div className="text-[1.4rem]">Order Number</div>
                    <div className="font-semibold">{order.orderNumber}</div>
                  </div>
                  <div className="flex gap-4">
                    <div>Total Products</div>
                    <div>{order.products.length}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-end">
                    <div className="text-[1.4rem]">Total Amount</div>
                    <div className="font-semibold">
                      ₹ {Intl.NumberFormat("en-IN").format(order.totalAmount)}
                    </div>
                  </div>
                  <div className="text-end">
                    {getElement(order.orderStatus)}
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
