import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './container/LandingPage.jsx';
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.render(
	<Provider store={store}>
			<LandingPage />
	</Provider>,
	document.getElementById('root')
);
