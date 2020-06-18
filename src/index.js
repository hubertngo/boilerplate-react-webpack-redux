import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import createStore from 'src/redux/store';

import Router from 'src/pages';
import 'src/assets/theme/less/index.less';

const wrapper = document.getElementById('container');

const store = createStore();
const Main = () => {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
};

ReactDOM.render(<Main />, wrapper);
