"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminSectionTitle from "@/components/admin/AdminSectionTitle";
import AdminBreadCrumbs from "@/components/admin/AdminBreadCrumbs";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import useRoute from "./admin/useRoute";
import { useContext, useEffect } from "react";
import { Spinner } from "phosphor-react";
import { useRouter } from "next/navigation";
import { AdminContext } from "./AdminContext";

dayjs.extend(localeData);

const AdminLayout = ({ children }) => {
  const { page_title, icon_class, breadcrumbs, routes_length } = useRoute();
  const router = useRouter();
  const { user } = useContext(AdminContext);
  useEffect(() => {
    if (user === false) router.push("/admin/sign-in");
  }, [user]);

  if (user === null)
    return (
      <div className="fixed inset-0 bg-white flex justify-center items-center gap-1 text-[1.8rem]">
        Loading <Spinner className="w-[1.8rem] h-[1.8rem] animate-spin" />
      </div>
    );
  if (user === false) return null;
  return (
    <>
      <main className="relative flex min-h-screen bg-[#f2f2f2]">
        <Sidebar />
        <div className="ml-[28rem] mt-8 flex-1 mr-10 a-section--container">
          <AdminSectionTitle title={page_title} icon={icon_class} />
          <AdminBreadCrumbs data={breadcrumbs} length={routes_length} />
          {children}
          <div id="reference-modal"></div>
          <div id="element--modal"></div>
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
