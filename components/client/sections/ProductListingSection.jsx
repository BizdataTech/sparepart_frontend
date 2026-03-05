import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";

const ProductListingSection = ({ section }) => {
  console.log("section data:", section);
  const [items, setItems] = useState(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    let getData = async () => {
      try {
        let response = await fetch(
          `${BACKEND_URL}/api/sections/${section.section_type}?reference_id=${section.reference_id}&data_source=${section.data_source}&limit=${section.limit}`,
          {
            method: "GET",
          },
        );
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("result:", result.result);
        setItems(result.result);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <section className="flex flex-col gap-2 md:gap-8 w-full my-8">
      <div className="text-[1.6rem] lg:text-[3rem] text-start md:text-center font-semibold uppercase ">
        {section?.title}
      </div>
      <div className="w-full">
        {items === false && (
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((item, i) => (
              <div className="loading--container h-[25rem]">
                <div className="loading--mask loading--animation"></div>
              </div>
            ))}
          </div>
        )}
        {items && items.length >= 1 && (
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-8">
            {items.map((item) => (
              <ProductCard product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListingSection;
