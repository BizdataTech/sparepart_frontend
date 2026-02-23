import dayjs from "dayjs";
import { DotsThree } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const User = ({ user, refetch }) => {
  let [more, setMore] = useState(false);
  let moreRef = useRef(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target))
        setMore(false);
    };
    document.addEventListener("mousedown", handleMouseClick);
    return () => document.removeEventListener("mousedown", handleMouseClick);
  }, []);

  const handleBlock = async () => {
    try {
      let response = await fetch(
        `${BACKEND_URL}/api/users/${user._id}/toggle-user`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      refetch();
      setMore(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Failed : Something Went Wrong");
    }
  };

  const deleteUser = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/users/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      setMore(false);
      refetch();
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to Delete User : Something Went Wrong");
    }
  };

  return (
    <div
      className="grid grid-cols-5 gap-8 border-b-0 border-neutral-200 last:border-b-0 text-[1.3rem] text-neutral-800 items-center even:bg-neutral-100"
      key={user._id}
    >
      <div className="text-start py-4 px-4">
        {dayjs(user.createdAt).format("DD-MM-YYYY")}
      </div>
      <div className="text-center py-4 px-4">{user.username}</div>
      <div className="text-center py-4 px-4">{user.email}</div>
      <div
        className={`text-center font-medium py-4 px-4 ${user.blocked ? "text-red-700" : "text-green-700"}`}
      >
        {user.blocked ? "Blocked" : "Active"}
      </div>
      <div className="text-center py-4 px-4 relative">
        <DotsThree
          className="w-[2.5rem] h-[2.5rem] cursor-pointer ml-auto mr-4"
          weight="bold"
          onClick={() => setMore(!more)}
        />
        {more && (
          <ul
            className="absolute right-[2rem] bg-white shadow-md p-2 z-100"
            ref={moreRef}
          >
            <li
              className="py-2 px-4 hover:bg-neutral-100 transition-colors cursor-pointer"
              onClick={handleBlock}
            >
              {user.blocked ? "Unblock User" : "Block User"}
            </li>
            <li
              className="py-2 px-4 text-red-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              onClick={deleteUser}
            >
              Delete User
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default User;
