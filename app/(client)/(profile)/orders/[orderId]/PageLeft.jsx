import dayjs from "dayjs";
import ProductCard from "./ProductCart";
import advancedFormat from "dayjs/plugin/advancedFormat";
import OrderHistory from "./OrderHistory";

dayjs.extend(advancedFormat);

const PageLeft = ({ config }) => {
  let { items, orderNumber, orderHistory } = config;

  return (
    <section className="md:w-4/6 bg-white flex flex-col gap-6 md:gap-12">
      {!items ? (
        <div className="loading--container w-full h-[10rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <ProductCard item={item} />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 md:gap-4">
        <div className="text-[1.2rem] md:text-[1.6rem]">
          Order History Timeline
        </div>
        <OrderHistory history={orderHistory} />
      </div>
    </section>
  );
};

export default PageLeft;
