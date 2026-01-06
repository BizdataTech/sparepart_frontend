import { Suspense } from "react";
import OrderSummaryLayout from "./OrderSummaryLayout";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <OrderSummaryLayout />
    </Suspense>
  );
};

export default Page;
