import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="flex flex-col space-y-8 w-full mb-8">
      <div className="text-[1.3rem] lg:text-[3rem] text-center font-semibold uppercase ">
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8">
            {items.map((item) => (
              <Link
                href={`/product/${item._id}`}
                className="bg-white shadow-md flex flex-col gap-6 overflow-hidden py-8"
              >
                <div className="h-[8rem] lg:h-[12rem]">
                  <img
                    src={item.image}
                    alt="product image"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="h-full flex flex-col gap-1 md:gap-2 px-6">
                  <div className="text-[1.3rem] lg:text-[1.8rem] text-center font-medium uppercase leading-normal">
                    {item.product_title}
                  </div>
                  <div className="text-[1.3rem] lg:text-[1.6rem] text-center">
                    {item.brand}
                  </div>
                  <div className="text-[1.4rem] lg:text-[2rem] text-center font-semibold mt-8">
                    ₹ {Intl.NumberFormat("en-IN").format(item.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListingSection;
