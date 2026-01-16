import dayjs from "dayjs";
import ProductCard from "./ProductCart";
import advancedFormat from "dayjs/plugin/advancedFormat";
import OrderHistory from "./OrderHistory";

dayjs.extend(advancedFormat);

const PageLeft = ({ config }) => {
  let { products, orderNumber, orderHistory } = config;

  return (
    <section className="w-4/6 bg-white text-[1.6rem] space-y-12">
      {!products ? (
        <div className="loading--container w-full h-[10rem]">
          <div className="loading--mask loading--animation"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div>Order History Timeline</div>
        <OrderHistory history={orderHistory} />
      </div>
    </section>
  );
};

export default PageLeft;
