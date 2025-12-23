"use client";

import { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import useCategoryProducts from "./useCategoryProducts";
import { useParams } from "next/navigation";

const CategoryProductList = () => {
  let { category } = useParams();
  let [customerFilters, setCustomerFilters] = useState({});
  let { products, filters } = useCategoryProducts(category, customerFilters);

  return (
    <main className="w-[85%] mx-auto mt-[17rem] mb-[4rem] flex gap-8">
      <Sidebar setter={setCustomerFilters} filters={filters} />
      <ProductList products={products} />
    </main>
  );
};

export default CategoryProductList;
