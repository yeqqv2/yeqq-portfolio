import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/scrollbar.css';

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll/index';
import LoadingPage from './components/loading/LoadingPage';
import HomePage from './home/HomePage';

const AboutPage = lazy(() => import('./about/AboutPage'));
const ProjectsPage = lazy(() => import('./projects/ProjectsPage'));
const WorkPage = lazy(() => import('./project/WorkPage'));
const ContactPage = lazy(() => import('./contact/ContactPage'));

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
			</Routes>
		</SmoothScroll>
	);
}

export default App;