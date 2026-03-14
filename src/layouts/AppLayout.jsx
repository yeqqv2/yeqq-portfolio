import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/layouts/navbar/Navbar";
import Footer from "@/layouts/footer/Footer";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={null}>{children}</Suspense>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default AppLayout;
