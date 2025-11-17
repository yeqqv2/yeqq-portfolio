import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// 1. Kritik Olmayan Bileşenleri Asenkron Yükleme (Code Splitting/Lazy Loading)
const Navbar = lazy(() => import('./layouts/navbar/Navbar'));
const Footer = lazy(() => import('./layouts/footer/Footer'));

// 2. Performansın En Büyük Düşmanı: AnimatedCursor
// Büyük 3. taraf kütüphaneleri lazy yapmak TBT'yi ciddi ölçüde düşürür.
const AnimatedCursor = lazy(() => import('react-animated-cursor'));


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			{/* ⚡️ OPTİMİZASYON: Navbar'ı Suspense ile sarmalayın */}
			<Suspense fallback={null}>
				<Navbar />
			</Suspense>

			{/* Ana uygulama hemen yüklenmeye devam ediyor */}
			<App />

			{/* ⚡️ OPTİMİZASYON: Footer'ı Suspense ile sarmalayın */}
			<Suspense fallback={null}>
				<Footer />
			</Suspense>

			{/* AnimatedCursor doğru sarmalanmış. */}
			<Suspense fallback={null}>
				<AnimatedCursor
					innerSize={10}
					innerScale={1}
					outerStyle={{
						display: 'none',
					}}
					innerStyle={{
						backgroundColor: 'rgba(0,0,0)',
						zIndex: 999,
					}}
					clickables={[
						'a',
						'input[type="text"]',
						'input[type="email"]',
						'input[type="number"]',
						'input[type="submit"]',
						'input[type="image"]',
						'label[for]',
						'select',
						'textarea',
						'button',
						'.link',
					]}
					trailingSpeed={10}
					showSystemCursor={true}
				/>
			</Suspense>

		</BrowserRouter>
	</React.StrictMode>
);