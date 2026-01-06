import { CaretRight } from "phosphor-react";
import PageLeft from "./PageLeft";
import PageRight from "./PageRight";

const OrderLayout = () => {
  return (
    <main className="">
      <div className="flex items-center gap-4 text-[1.2rem]">
        <Link href="/orders" className="underline hover:text-purple-800">
          Orders
        </Link>
        <CaretRight />
        <div>Details</div>
      </div>
      <div>
        <PageLeft />
        <PageRight />
      </div>
    </main>
  );
};

export default OrderLayout;
