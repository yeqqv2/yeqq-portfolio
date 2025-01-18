import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./layouts/navbar/Navbar";
import Footer from "./layouts/footer/Footer";
import AnimatedCursor from "react-animated-cursor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AnimatedCursor
      innerSize={20}
      outerSize={40}
      innerScale={1.5}
      outerScale={1.5}
      outerAlpha={0}
      outerStyle={{
        border: "3px solid var(--orange500)",
        zIndex: 999,
      }}
      innerStyle={{
        backgroundColor: "var(--orange500)",
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
      trailingSpeed={10}
      showSystemCursor={false}
    />
    <BrowserRouter>
      <Navbar />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
