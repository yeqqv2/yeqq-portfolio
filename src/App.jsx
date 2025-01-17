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

function App() {
  return (
    <Routes>
      {/* HOME PAGE */}
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
