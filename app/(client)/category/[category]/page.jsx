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
    <main className="w-[90%] md:w-[85%] mx-auto pt-[15rem] md:pt-[17rem] pb-[2rem] md:pb-[4rem] flex gap-4 md:gap-8">
      <Sidebar setter={setCustomerFilters} filters={filters} />
      <ProductList products={products} />
    </main>
  );
};

export default CategoryProductList;
