/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ductienas@gmail.com
* Phone 0867185407
*
* Created: 2018-01-10 23:14:00
*------------------------------------------------------- */

import { takeEvery, call, put } from 'redux-saga/effects';

import fetchApi from 'src/utils/fetch-api';

import { SINGLE_API } from 'src/redux/actions/type';

function* callApi(action) {
	if (action.type === SINGLE_API) {
		/* payload sample
		{
			uri: ,
			params: ,
			opt: ,
			loading: ,
			uploadFile: ,
			beforeCallType: 'CLEAR_CACHE_FEEDS_FB',
			afterCallType: 'CLEAR_CACHE_FEEDS_FB',
			successType: 'GET_CART_LIST_SUCCESS',
			afterSuccess: next,
			errorType: 'GET_CART_LIST_SUCCESS',
			afterError: next,
		}
		*/

		const { successType, beforeCallType, afterCallType, afterSuccess, errorType, afterError, ...rest } = action.payload;

		if (beforeCallType) {
			yield put({ type: beforeCallType, payload: action.payload.params });
		}

		const response = yield call(fetchApi, rest);

		if (afterCallType) {
			yield put({ type: afterCallType });
		}

		if (response && !response.error) {
			if (successType) {
				yield put({ type: successType, payload: response });
			}

			if (typeof afterSuccess === 'function') {
				afterSuccess(response);
			}
		} else {
			if (errorType) {
				yield put({ type: errorType, payload: response.error });
			}

			if (typeof afterError === 'function') {
				afterError(response.error);
			}
		}
	}
}

export default function* () {
	yield takeEvery('*', callApi);
}
