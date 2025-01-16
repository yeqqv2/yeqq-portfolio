import React from "react";
import { Route, Routes } from "react-router-dom";
// ================================================
// STYLES
// ================================================
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scrollbar.css";
import Terminal from "./animations/opening/OpeningAnimation";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Terminal />} />
      {/* HOME PAGE */}
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
