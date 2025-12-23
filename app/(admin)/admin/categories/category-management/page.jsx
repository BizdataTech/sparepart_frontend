import { Suspense } from "react";
import CategoryManagement from "./CategoryManagement";

const Page = () => {
  return (
    <Suspense>
      <CategoryManagement />
    </Suspense>
  );
};

export default Page;
