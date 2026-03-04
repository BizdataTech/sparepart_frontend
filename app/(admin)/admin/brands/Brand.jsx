import axios from "axios";
import dayjs from "dayjs";
import { DotsThree, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Brand = ({ brand, select, refetch }) => {
  let [box, setBox] = useState(false);
  let boxRef = useRef(null);

  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setBox(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const [loading, setLoading] = useState(false);
  const deleteBrand = async () => {
    try {
      setLoading(true);
      let res = await axios.delete(`${BACKEND_URL}/api/brands/${brand._id}`, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success(res.data.message);
      refetch();
      setBox(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      if (err.response?.status === 422)
        toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="grid grid-cols-5 items-center even:bg-neutral-100">
      <div className="text-start px-4 py-2">{brand.brand_name}</div>
      <div className="flex justify-center px-4 py-2">
        <img
          src={brand.image.url}
          alt={`${brand.brand_name} logo image`}
          className="w-[3rem] h-[3rem] object-contain"
        />
      </div>
      <div className="text-center px-4 py-2">
        {dayjs(brand?.createdAt).format("DD-MM-YYYY")}
      </div>
      <div className="text-center px-4 py-2">
        {dayjs(brand?.createdAt).format("hh:mm a")}
      </div>
      <div className="flex justify-end px-4 py-2 relative">
        <DotsThree
          weight="bold"
          className="w-[2.2rem] h-[2.2rem] cursor-pointer"
          onClick={() => setBox(!box)}
        />
        {box && (
          <ul
            className="absolute top-[80%] right-8 z-100 bg-white shadow-md"
            ref={boxRef}
          >
            <li>
              <button
                className="hover:bg-neutral-100 transition-colors cursor-pointer py-2 px-6"
                onClick={() => {
                  select();
                  setBox(false);
                }}
                disabled={loading}
              >
                Update Brand
              </button>
            </li>
            <li>
              <button
                className={`text-red-700 hover:bg-neutral-100 transition-colors ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} py-2 px-6`}
                onClick={deleteBrand}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center gap-1">
                    Deleting{" "}
                    <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                  </div>
                ) : (
                  "Delete Brand"
                )}
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Brand;
