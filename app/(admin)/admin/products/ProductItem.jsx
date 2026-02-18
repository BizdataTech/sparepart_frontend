import Link from "next/link";
import { DotsThree, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ProductItem = ({ product, refetch }) => {
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

  const [deleteLoad, setDeleteLoad] = useState(false);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const deleteProduct = async (id) => {
    if (deleteLoad) return;
    try {
      setDeleteLoad(true);
      let response = await fetch(`${BACKEND_URL}/api/auto-products/${id}`, {
        method: "DELETE",
      });
      setDeleteLoad(false);
      let result = await response.json();
      if (response.status === 409) return toast.error(result.message);
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message, { unstlyled: true });
      refetch();
    } catch (error) {
      console.log(error.message);
      return toast.error(error.message);
    }
  };

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
              className="absolute right-[50%] bott bg-white z-100"
              ref={boxRef}
            >
              <Link
                className="cursor-pointer"
                href={`/admin/products/product-management?id=${product._id}`}
              >
                <div className="py-2 px-6 hover:bg-neutral-100 transition-colors">
                  Update
                </div>
              </Link>
              <div
                className={`py-2 px-6 hover:bg-neutral-100 shadow-xl transition-colors text-red-800 ${deleteLoad ? "cursor-not-allowed bg-neutral-100 opacity-70" : "cursor-pointer"}`}
                onClick={() => deleteProduct(product._id)}
                disabled={deleteLoad}
              >
                {deleteLoad ? (
                  <div className="flex items-center gap-1">
                    Deleting{" "}
                    <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                  </div>
                ) : (
                  "Delete"
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
