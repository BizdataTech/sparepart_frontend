"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminSectionTitle from "@/components/admin/AdminSectionTitle";
import AdminBreadCrumbs from "@/components/admin/AdminBreadCrumbs";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import useRoute from "./admin/useRoute";
import "./admin.css";
import { Toaster } from "sonner";

dayjs.extend(localeData);

const Layout = ({ children }) => {
  const { page_title, icon_class, breadcrumbs, routes_length } = useRoute();

  return (
    <>
      <Toaster position="top-center" richColors />
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

export default Layout;
