import Footer from "@/components/client/Footer/Footer";
import Header from "@/components/client/Header/Header";
import { Toaster } from "sonner";

export default function ClientLayout({ children }) {
  return (
    <>
      <Toaster position="top-center" richColors="true" />
      <main className="h-screen bg-neutral-100 flex flex-col justify-between">
        <div id="modal-container"></div>
        <Header />
        <div className="w-[90%] md:w-[85%] mx-auto">{children}</div>
        <Footer />
      </main>
    </>
  );
}
