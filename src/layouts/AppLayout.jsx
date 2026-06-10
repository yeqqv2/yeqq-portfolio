import { Suspense } from "react";
import Navbar from "@/layouts/navbar/Navbar";
import Footer from "@/layouts/footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <a href="#main" className="skip-link">
        içeriğe geç
      </a>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;
