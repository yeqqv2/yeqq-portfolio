import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom"; // useLocation eklendi
import "./i18n";
import { ProjectProvider } from "./context/ProjectContext";

const Navbar = lazy(() => import("./layouts/navbar/Navbar"));
const Footer = lazy(() => import("./layouts/footer/Footer"));
const AnimatedCursor = lazy(() => import("react-animated-cursor"));

// URL'i dinleyip Navbar/Footer'ı gizleyecek yeni sarmalayıcı bileşen
const AppLayout = ({ children }) => {
  const location = useLocation();
  // URL "/admin" ile başlıyorsa true döner
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Admin sayfasında değilsek Navbar'ı göster */}
      {!isAdminRoute && (
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
      )}

      <Suspense fallback={null}>{children}</Suspense>

      {!isAdminRoute && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

      {/* <Suspense fallback={null}>
        <AnimatedCursor
          innerSize={10}
          innerScale={1}
          outerStyle={{ display: "none" }}
          innerStyle={{ backgroundColor: "rgba(0,0,0)", zIndex: 999 }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
          trailingSpeed={0}
          showSystemCursor={true}
        />
      </Suspense> */}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProjectProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppLayout>
          <App />
        </AppLayout>
      </BrowserRouter>
    </ProjectProvider>
  </React.StrictMode>,
);
