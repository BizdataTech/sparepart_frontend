"use client";

import { Toaster } from "sonner";
import "./admin.css";
import { AdminProvider } from "./AdminContext";
import AdminLayout from "./AdminLayout";

const Layout = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <AdminProvider>
        <AdminLayout>{children}</AdminLayout>
      </AdminProvider>
    </>
  );
};

export default Layout;
