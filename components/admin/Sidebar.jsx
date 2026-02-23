"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import adminRouteData from "@/data/adminRouteData";
import { toast } from "sonner";
import { Spinner } from "phosphor-react";

const Sidebar = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean)[1];
  const [currentSlug, setCurrentSlug] = useState(slug);
  let router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let [loading, setLoading] = useState(false);

  const logoutAdminUser = async () => {
    try {
      setLoading(true);
      let response = await fetch(`${BACKEND_URL}/api/admin-users/logout`, {
        method: "POST",
        credentials: "include",
      });
      setLoading(false);
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message, { richColors: false });
      router.replace("/admin/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <aside className="admin__sidebar fixed top-0 h-screen left-0 w-[25rem] bg-neutral-200 flex flex-col justify-between p-8 z-10">
      <ul className="flex flex-col justify-between h-full">
        <div>
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
              ),
          )}
        </div>
        <button
          className={`a-text--sidebar self-center ${loading ? "!text-red-700 opacity-70 cursor-not-allowed" : "cursor-pointer"} active:!bg-red-100`}
          onClick={logoutAdminUser}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-1">
              Logging Out{" "}
              <Spinner className="w-[1.5rem] h-[1.5rem] animate-spin" />
            </div>
          ) : (
            "Logout"
          )}
        </button>
      </ul>
    </aside>
  );
};

export default Sidebar;
