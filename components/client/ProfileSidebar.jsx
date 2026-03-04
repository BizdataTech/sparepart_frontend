"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cube, Heart, User } from "phosphor-react";

const ProfileSidebar = () => {
  const pathname = usePathname();
  console.log("pathname:", pathname);
  return (
    <aside className="sticky top-[13rem] md:static md:w-[30rem] md:h-[50rem] bg-white border border-neutral-200 flex flex-row justify-center md:justify-normal md:flex-col gap-2 p-2 md:p-4 ">
      <Link
        href="/profile"
        className={`px-4 py-2 text-[1.2rem] md:text-[1.6rem] hover:bg-neutral-200/50 transition-colors flex items-center gap-2 md:gap-4 ${
          pathname === "/profile" && "bg-neutral-200/50"
        }`}
      >
        <User
          className="w-[1.4rem] md:w-[1.8rem] h-[1.4rem] md:h-[1.8rem]"
          weight="regular"
        />{" "}
        Profile
      </Link>
      <Link
        href="/orders"
        className={`px-4 py-2 text-[1.2rem] md:text-[1.6rem] hover:bg-neutral-200/50 transition-colors flex items-center gap-2 md:gap-4 ${
          pathname === "/orders" && "bg-neutral-200/50"
        }`}
      >
        <Cube
          className="w-[1.4rem] md:w-[1.8rem] h-[1.4rem] md:h-[1.8rem]"
          weight="regular"
        />{" "}
        Orders
      </Link>
      <Link
        href="/wishlist"
        className={`px-4 py-2 text-[1.2rem] md:text-[1.6rem] hover:bg-neutral-200/50 transition-colors flex items-center gap-2 md:gap-4 ${
          pathname === "/wishlist" && "bg-neutral-200/50"
        }`}
      >
        <Heart
          className="w-[1.4rem] md:w-[1.8rem] h-[1.4rem] md:h-[1.8rem]"
          weight="regular"
        />{" "}
        Wishlist
      </Link>
    </aside>
  );
};

export default ProfileSidebar;
