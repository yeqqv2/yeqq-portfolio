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
		<BrowserRouter
			future={
				{
					v7_startTransition: true,
					v7_relativeSplatPath: true
				}}
		>
			<Navbar />
			<App />
			<Footer />
		</BrowserRouter>
	</React.StrictMode>
);
