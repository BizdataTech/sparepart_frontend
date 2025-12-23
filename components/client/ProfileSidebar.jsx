"use client";

import Link from "next/link";

const ProfileSidebar = () => {
  return (
    <aside className="w-[30rem] h-[50rem] bg-white border border-neutral-200 p-4 flex flex-col">
      <Link
        href="/profile"
        className="px-4 py-2 text-[1.5rem] hover:bg-neutral-100 transition-colors"
      >
        Profile
      </Link>
      <Link
        href="/orders"
        className="px-4 py-2 text-[1.5rem] hover:bg-neutral-100 transition-colors"
      >
        Orders
      </Link>
      <Link
        href="/wishlist"
        className="px-4 py-2 text-[1.5rem] hover:bg-neutral-100 transition-colors"
      >
        Wishlist
      </Link>
    </aside>
  );
};

export default ProfileSidebar;
