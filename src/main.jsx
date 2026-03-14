import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import "@/i18n";
import { ProjectProvider } from "@/context/ProjectContext";
import AppLayout from "@/layouts/AppLayout";

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
