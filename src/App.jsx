import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/scrollbar.css";

import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/smooth scroll/index";
import LoadingPage from "./components/loading/LoadingPage";
import HomePage from "./pages/home/HomePage";

const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const ManifestPage = lazy(() => import("./pages/manifest/ManifestPage"));
const ProjectsPage = lazy(() => import("./pages/projects/ProjectsPage"));
const WorkPage = lazy(() => import("./pages/project/WorkPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
import AdminLayout from "./admin/layout/AdminLayout";
import LoginPage from "./admin/login/LoginPage";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import AdminProjectsList from "./admin/projects/AdminProjectsList";
import ProjectCreate from "./admin/project/ProjectCreate";

function App() {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/about-me"
          element={
            <Suspense fallback={<LoadingPage />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/manifest"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ManifestPage />
            </Suspense>
          }
        />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<LoadingPage />}>
              <WorkPage />
            </Suspense>
          }
        />
        <Route
          path="/contact-me"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjectsList />} />
          <Route path="projects/create" element={<ProjectCreate />} />
        </Route>
      </Routes>
    </SmoothScroll>
  );
}

export default App;
