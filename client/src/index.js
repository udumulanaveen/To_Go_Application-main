import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Toaster from './Components/Toaster/Container';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<Toaster />
		</Provider>
	</React.StrictMode>,
);
