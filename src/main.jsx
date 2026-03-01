import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n";

const Navbar = lazy(() => import("./layouts/navbar/Navbar"));
const Footer = lazy(() => import("./layouts/footer/Footer"));

const AnimatedCursor = lazy(() => import("react-animated-cursor"));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Suspense fallback={null}>
      <App />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <AnimatedCursor
          innerSize={10}
          innerScale={1}
          outerStyle={{
            display: "none",
          }}
          innerStyle={{
            backgroundColor: "rgba(0,0,0)",
            zIndex: 999,
          }}
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
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
