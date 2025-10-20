import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

function App() {
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 1,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothTouch: true,
			wheelMultiplier: 2.0,
		});

		// expose Lenis to window so inner components (like IntroAbout) can wire ScrollTrigger to it
		// This is safe in browser-only environments and makes integration simpler.
		try {
			window.lenis = lenis;
		} catch (e) {
			// ignore in constrained environments
		}

		function raf(time) {
			lenis.raf(time);
			// Ensure ScrollTrigger updates in step with Lenis' RAF
			ScrollTrigger.update();
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Temizleme fonksiyonu
		return () => {
			// destroy lenis and remove global ref
			try {
				if (window.lenis === lenis) delete window.lenis;
			} catch (e) { }
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
			<Route path="/contact-me" element={<ContactPage />} />
		</Routes>
	);
}

export default App;