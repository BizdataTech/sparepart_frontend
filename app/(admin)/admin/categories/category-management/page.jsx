import { Suspense } from "react";
import CategoryManagement from "./CategoryManagement";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <CategoryManagement />
    </Suspense>
  );
};

export default Page;
