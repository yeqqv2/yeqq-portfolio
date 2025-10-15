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
			innerSize={24}
			innerScale={3}
			outerStyle={{
				display: 'none',
			}}
			innerStyle={{
				backgroundColor: 'white',
				zIndex: 99999,
				mixBlendMode: 'difference'
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
			trailingSpeed={0}
			showSystemCursor={false}
		/>
		<BrowserRouter>
			<Navbar />
			<App />
			<Footer />
		</BrowserRouter>
	</React.StrictMode>
);
