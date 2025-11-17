import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/scrollbar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingPage from './components/loading/LoadingPage';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const AboutPage = lazy(() => import('./about/AboutPage'));
// const BackstagePage = lazy(() => import('./backstage/BackstagePage'));
const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
const ContactPage = lazy(() => import('./containers/contact/Page'));
const WorkPage = lazy(() => import('./containers/projects/work/WorkPage'));

function App() {
	return (
		<Suspense fallback={<LoadingPage />}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about-me" element={<AboutPage />} />
				{/* <Route path="/backstage" element={<BackstagePage />} /> */}
				<Route path="/projects" element={<ProjectsPage />} />
				<Route path="/projects/:slug" element={<WorkPage />} />
				<Route path="/contact-me" element={<ContactPage />} />
			</Routes>
		</Suspense>
	);
}

export default App;