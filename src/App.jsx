import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
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
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.7,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothTouch: true,
			wheelMultiplier: 1.0,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Temizleme fonksiyonu
		return () => {
			lenis.destroy();
		};
	}, []);

	return (
		<Routes>
			{/* HOME PAGE */}
			<Route path="/" element={<HomePage />} />
			<Route path="/about-me" element={<AboutPage />} />
			<Route path="/projects" element={<ProjectsPage />} />
			<Route path="/projects/:name" element={<WorkPage />} />
			<Route path="/gallery" element={<AboutPage />} />
			<Route path="/contact-me" element={<ContactPage />} />
		</Routes>
	);
}

export default App;
