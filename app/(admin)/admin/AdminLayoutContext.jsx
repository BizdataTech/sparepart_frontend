"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminSectionTitle from "@/components/admin/AdminSectionTitle";
import AdminBreadCrumbs from "@/components/admin/AdminBreadCrumbs";
import useRoute from "./useRoute";
import "../admin.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/navigation";

const AdminLayoutContext = ({ children }) => {
  const { page_title, icon_class, breadcrumbs, routes_length } = useRoute();
  const { user } = useContext(UserContext);

  const router = useRouter();

  //   useEffect(() => {
  //     if (!user) router.replace("/admin/sign-in");
  //   }, []);

  //   if (!user) return <div>Loading...</div>;

  return (
    <main className="relative flex min-h-screen bg-[#f2f2f2]">
      <Sidebar />
      <div className="ml-[28rem] mt-8 flex-1 mr-10 a-section--container">
        <AdminSectionTitle title={page_title} icon={icon_class} />
        <AdminBreadCrumbs data={breadcrumbs} length={routes_length} />
        {children}
        <div id="reference-modal"></div>
      </div>
    </main>
  );
};

export default AdminLayoutContext;
