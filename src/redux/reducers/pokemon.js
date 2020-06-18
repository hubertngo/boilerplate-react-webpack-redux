/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2018-06-18 23:56:39
 *-------------------------------------------------------*/
import { fromJS } from 'immutable';

import { spliceOne } from 'src/utils';

import { MODEL_NAME } from 'src/redux/actions/pokemon';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
		loading: true,
	},
	view: {
	},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case `GET_${MODEL_NAME}_LIST_REQUEST`:
			return state.update('list', () => {
				return initialState.get('list').toJS();
			});

		case `GET_${MODEL_NAME}_LIST_SUCCESS`: {
			return state.update('list', (list) => {
				return {
					limit: 12,
					skip: list.skip + list.limit,
					total: action.payload.count,
					data: action.payload.results,
					loading: false,
				};
			});
		}

		case `GET_${MODEL_NAME}_DATA_REQUEST`:
			return state.update('view', () => {
				return initialState.get('view').toJS();
			});

		case `GET_${MODEL_NAME}_DATA_SUCCESS`:
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case `UPDATE_${MODEL_NAME}_DATA_REQUEST`:
			return state.update('view', (view) => {
				return {
					...view,
					loading: true,
				};
			});

		case `UPDATE_${MODEL_NAME}_SUCCESS`: {
			return state.update('view', (view) => {
				return { ...view, ...action.payload, loading: false };
			});
		}

		case `DELETE_${MODEL_NAME}_SUCCESS`: {
			return state.update('list', (list) => {
				const { id } = action.payload;

				if (list.data) {
					const index = list.data.findIndex((row) => {
						return row.id === id;
					});

					spliceOne(list.data, index);
					list.total = list.total - 1; // eslint-disable-line
					list.skip = list.skip - 1; // eslint-disable-line

					return { ...list, data: [...list.data] };
				}

				return initialState.get('list').toJS();
			}).update('view', () => {
				return {};
			});
		}

		default:
			return state;
	}
};
