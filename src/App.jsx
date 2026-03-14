import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scrollbar.css";

import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/smooth scroll/index";
import LoadingPage from "./components/loading/LoadingPage";
import HomePage from "./pages/home/HomePage";

// Ziyaretçi Sayfaları
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ManifestPage = lazy(() => import("./pages/manifest/ManifestPage"));
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const WorkPage = lazy(() => import("./pages/project/WorkPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));

const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/dashboard/AdminDashboard"));
const AdminProjectsList = lazy(
  () => import("./admin/projects/AdminProjectsList"),
);
const ProjectCreate = lazy(() => import("./admin/project/ProjectCreate"));

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-me" element={<AboutPage />} />
          <Route path="/manifest" element={<ManifestPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<WorkPage />} />
          <Route path="/contact-me" element={<ContactPage />} />

          {/* Admin Rotası */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjectsList />} />
            <Route path="projects/create" element={<ProjectCreate />} />
          </Route>
        </Routes>
      </Suspense>
    </SmoothScroll>
  );
}

export default App;
