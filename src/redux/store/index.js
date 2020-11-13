/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ductienas@gmail.com
* Phone 0867185407
*
* Created: 2018-01-10 22:17:54
*------------------------------------------------------- */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { fromJS, Iterable } from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import rootReducer, { initialState } from 'src/redux/reducers';
import ThunkMiddleware from 'src/redux/thunk';

const DEV = process.browser && process.env.NODE_ENV !== 'production';

export default (state = initialState) => {
	const bindMiddleware = middleware => {
		if (DEV) {
			const stateTransformer = (state) => {
				if (Iterable.isIterable(state)) return state.toJS();
				return state;
			};

			const logger = createLogger({
				stateTransformer,
				collapsed: (getState, action, logEntry) => !logEntry.error,
				predicate: (getState, action) => !['@@redux-form/CHANGE', '@@redux-form/REGISTER_FIELD'].includes(action.type),
			});

			return applyMiddleware(...middleware, logger);
		}

		return applyMiddleware(...middleware);
	};

	const store = createStore(
		combineReducers(rootReducer),
		fromJS(state),
		bindMiddleware([ThunkMiddleware, thunk]),
	);

	return store;
};
