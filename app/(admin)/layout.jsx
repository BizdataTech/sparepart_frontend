import AppProvider from "./context/AppProvider";
import AdminLayoutContext from "./admin/AdminLayoutContext";

const Layout = ({ children }) => {
  return (
    <AppProvider>
      <AdminLayoutContext>{children}</AdminLayoutContext>
    </AppProvider>
  );
};

export default Layout;
