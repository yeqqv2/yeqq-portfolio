import './styles/variables.css'; // Kullanıcı isteği: Dokunulmadı
import './styles/reset.css';     // Kullanıcı isteği: Dokunulmadı
import './styles/global.css';    // Kullanıcı isteği: Dokunulmadı
import './styles/scrollbar.css'; // Kullanıcı isteği: Dokunulmadı

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingPage from './components/loading/LoadingPage';
import HomePage from './pages/home/HomePage';

const AboutPage = lazy(() => import('./about/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
const ContactPage = lazy(() => import('./containers/contact/Page'));
const WorkPage = lazy(() => import('./containers/projects/work/WorkPage'));

function App() {
	return (
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
	);
}

export default App;