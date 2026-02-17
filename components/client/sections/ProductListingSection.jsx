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
    <section className="space-y-4 w-full mb-8">
      <div className="text-[1.3rem] lg:text-[2.2rem] font-medium">
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
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
            {items.map((item) => (
              <Link
                href={`/product/${item._id}`}
                className="bg-white h-[25rem] lg:h-[35rem] space-y-4"
              >
                <img
                  src={item.image}
                  alt="product image"
                  className="w-full h-[10rem] lg:h-[20rem] object-contain"
                />
                <div className="h-full space-y-1 lg:space-y-2 p-4">
                  <div className="text-[1.3rem] lg:text-[1.6rem] font-medium uppercase leading-[2.3rem]">
                    {item.product_title}
                  </div>
                  <div className="text-[1.3rem] lg:text-[1.6rem]">
                    {item.brand}
                  </div>
                  <div className="text-[1.4rem] lg:text-[1.8rem] font-semibold mt-4">
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
