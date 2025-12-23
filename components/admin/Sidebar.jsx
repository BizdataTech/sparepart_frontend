"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import adminRouteData from "@/data/adminRouteData";

const Sidebar = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean)[1];
  const [currentSlug, setCurrentSlug] = useState(slug);
  return (
    <aside className="admin__sidebar fixed top-0 h-screen left-0 w-[25rem] bg-neutral-200 flex flex-col justify-between p-8 z-10">
      <ul className="flex flex-col">
        {adminRouteData.map(
          (data, index) =>
            data.sidebar && (
              <Link
                key={index}
                className={`a-text--sidebar flex items-baseline gap-4 ${
                  data.slug === currentSlug ? "bg-neutral-100" : ""
                }`}
                href={data.path}
                onClick={() => setCurrentSlug(data.slug)}
              >
                <i className={`${data?.icon_class}`}></i>
                {data.sidebar_title}
              </Link>
            )
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
