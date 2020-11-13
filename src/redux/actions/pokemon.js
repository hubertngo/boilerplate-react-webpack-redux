// import { applyURIFilter } from 'src/utils';
import { SINGLE_API } from 'src/redux/actions/type';
import { createAction } from 'typesafe-actions';

export const MODEL_NAME = 'POKEMON';
const MODEL_PLURAL = 'pokemon';

export const getList = createAction(SINGLE_API, (payload = {}, next = f => f) => {
	const { filter } = payload;
	return {
		url: `/${MODEL_PLURAL}/?offset=${filter.offset}&limit=${filter.limit}`,
		beforeCallType: 'GET_' + MODEL_NAME + '_LIST_REQUEST',
		successType: 'GET_' + MODEL_NAME + '_LIST_SUCCESS',
		afterSuccess: next,
	};
})();

export const getListAsync = async (payload, next = f => f) => {
	const { filter } = payload;
	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/?offset=${filter.offset}&limit=${filter.limit}`,
			beforeCallType: 'GET_' + MODEL_NAME + '_LIST_REQUEST',
			successType: 'GET_' + MODEL_NAME + '_LIST_SUCCESS',
			afterSuccess: next,
		},
	};
};
