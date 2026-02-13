import Link from "next/link";
import { DotsThree } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const ProductItem = ({ product }) => {
  let [open, setOpen] = useState(false);
  let boxRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return (
    <div className="flex justify-between py-4 px-4 border-b-0 border-neutral-200 last:border-b-0 text-[1.3rem] text-neutral-800 items-center even:bg-neutral-100">
      <div className="grid grid-cols-4 w-[80%] gap-[2rem]">
        <div>{product?.product_title}</div>
        <div>{product?.category?.title}</div>
        <div>{product?.brand?.brand_name}</div>
        <div className="capitalize">
          {product?.product_type.split("_").join(" ")}
        </div>
      </div>
      <div className="">
        <div className="relative">
          <DotsThree
            weight="bold"
            className="w-[5rem] h-8 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div
              className="absolute right-[50%] bott bg-white z-100 py-2 px-4"
              ref={boxRef}
            >
              <Link
                className="py-2 cursor-pointer"
                href={`/admin/products/product-management?id=${product._id}`}
              >
                Update
              </Link>
              <div className="py-2 font-medium text-red-800 cursor-pointer">
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
