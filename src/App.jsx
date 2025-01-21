import React from "react";
import { Route, Routes } from "react-router-dom";
// ================================================
// STYLES
// ================================================
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scrollbar.css";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";

function App() {
  return (
    <Routes>
      {/* HOME PAGE */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about-me" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
