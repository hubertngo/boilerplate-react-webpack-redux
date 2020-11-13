/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ductienas@gmail.com
* Phone 0867185407
*
* Created: 2018-01-13 18:13:59
*------------------------------------------------------- */
import { REQUEST_ERROR } from 'src/redux/actions/type';
import { getType } from 'typesafe-actions';
import { notification } from 'antd';
import * as actions from 'src/redux/actions/loading';

export const initialState = false;

console.log('actions', actions);

export default (state = initialState, action) => {
	switch (action.type) {
		case getType(actions.toggleLoader):
			return !state;
		case getType(actions.startLoader):
			return true;
		case getType(actions.stopLoader):
			return false;
		case REQUEST_ERROR: {
			if (process.browser) {
				if (action.payload !== 'TOKEN_INVALID') {
					const audio = document.getElementById('noti-sound');
					audio.play();
					notification.warning({
						message: 'Warning!',
						description: action.payload.message || action.payload,
					});
				}
			}
			return false;
		}
		default:
			return state;
	}
};
