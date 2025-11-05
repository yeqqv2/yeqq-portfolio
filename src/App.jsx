import { Routes, Route } from 'react-router-dom';
// ================================================
// STYLES
// ================================================
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/scrollbar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import ProjectsPage from './pages/projects/ProjectsPage';
import ContactPage from './containers/contact/Page';
import WorkPage from './containers/projects/work/WorkPage';

function App() {
	return (
		<Routes>
			{/* HOME PAGE */}
			<Route path="/" element={<HomePage />} />
			<Route path="/about-me" element={<AboutPage />} />
			<Route path="/projects" element={<ProjectsPage />} />
			<Route path="/projects/:name" element={<WorkPage />} />
			<Route path="/contact-me" element={<ContactPage />} />
		</Routes>
	);
}

export default App;