import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './layouts/navbar/Navbar';
import Footer from './layouts/footer/Footer';
import AnimatedCursor from 'react-animated-cursor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AnimatedCursor
			innerSize={20}
			outerSize={50}
			outerScale={1.5}
			outerAlpha={1}
			innerScale={1.25}
			outerStyle={{
				// display: 'none',
				background: 'transparent',
				border: '2px solid white',
				zIndex: 999,
				mixBlendMode: 'difference',
			}}
			innerStyle={{
				backgroundColor: 'white',
				mixBlendMode: 'difference',
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
			trailingSpeed={30}
			showSystemCursor={false}
		/>
		<BrowserRouter>
			<Navbar />
			<App />
			<Footer />
		</BrowserRouter>
	</React.StrictMode>
);
