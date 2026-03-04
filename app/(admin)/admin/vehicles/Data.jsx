import axios from "axios";
import { DotsThreeVertical, Spinner } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Data = ({ v, select, refetch }) => {
  let [box, setBox] = useState(false);
  let boxRef = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setBox(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const updateTrigger = () => {
    if (loading) return;
    setBox(false);
    select();
  };

  const deleteVehicle = async () => {
    if (loading) return;
    try {
      setLoading(true);
      let res = await axios.delete(
        `${BACKEND_URL}/api/auto-vehicles/${v._id}`,
        { withCredentials: true },
      );
      setBox(false);
      setLoading(false);
      toast.success(res.data.message);
      refetch();
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data?.message || "Something went wrong");

      if (err.response?.status === 409)
        return toast.error(err.response.data?.message);
    }
  };

  return (
    <div
      className={`grid grid-cols-5 gap-2 text-[1.4rem] py-4 px-4 even:bg-neutral-100`}
      key={v._id}
    >
      <div>{v.make}</div>
      <div>{v.model}</div>
      <div>{`${v.start_year} - ${v.end_year}`}</div>
      <div>{v.engine}</div>
      <div className="relative">
        <DotsThreeVertical
          className="ml-auto mr-[2.5rem] w-[2rem] h-[2rem] cursor-pointer"
          weight="bold"
          onClick={() => setBox(true)}
        />
        {box && (
          <ul
            className="absolute right-[4rem] z-[100] bg-white shadow-md"
            ref={boxRef}
          >
            <li
              className="py-3 px-8 hover:bg-neutral-100 transition-colors cursor-pointer"
              onClick={updateTrigger}
            >
              Update Vehicle
            </li>
            <li
              className={`py-3 px-8 text-red-700 hover:bg-neutral-100 transition-colors ${loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
              onClick={deleteVehicle}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-1">
                  Deleting{" "}
                  <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
                </div>
              ) : (
                "Delete Vehicle"
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Data;

{
}
