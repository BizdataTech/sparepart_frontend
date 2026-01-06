"use client";

import { OrderProvider } from "./orderContext";
import OrderLayout from "./OrderLayout";

const Page = ({ children }) => {
  return (
    <OrderProvider>
      <OrderLayout>{children}</OrderLayout>
    </OrderProvider>
  );
};

export default Page;
