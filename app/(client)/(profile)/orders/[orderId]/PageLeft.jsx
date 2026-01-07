import dayjs from "dayjs";
import ProductCard from "./ProductCart";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const PageLeft = ({ config }) => {
  let { products, orderStatus, orderNumber, createdAt } = config;
  const getNote = (stat) => {
    switch (stat) {
      case "placed":
        return (
          <div className="text-green-800 font-semibold">
            Order Placed on {dayjs(createdAt).format("Do MMMM, YYYY")}
          </div>
        );
      default:
        return <div>he he he</div>;
    }
  };
  return (
    <section className="w-4/6 bg-white text-[1.6rem] space-y-12">
      <div className="space-y-4">
        {!products ? (
          <div className="loading--container w-full h-[10rem]">
            <div className="loading--mask loading--animation"></div>
          </div>
        ) : (
          products.map((product) => <ProductCard product={product} />)
        )}
      </div>
      <div className="space-y-4 ">
        <div className="font-medium">Order Details</div>
        <div>{getNote(orderStatus)}</div>
      </div>
      <div className="p-2 bg-blue-50 text-neutral-800">
        Order Number : <span className="font-medium">{orderNumber}</span>
      </div>
    </section>
  );
};

export default PageLeft;
