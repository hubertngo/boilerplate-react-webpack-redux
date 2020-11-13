/*--------------------------------------------------------
 * Author Ngô An Ninh
 * Email ductienas@gmail.com
 * Phone 0867185407
 *
 * Created: 2017-07-20 17:59:39
 *-------------------------------------------------------*/
import { createAction } from 'typesafe-actions';

const MODULE_NAME = 'Loading';

export const toggleLoader = createAction(`[${MODULE_NAME}] toggle loading`)();

export const startLoader = createAction(`[${MODULE_NAME}] start loading`)();

export const stopLoader = createAction(`[${MODULE_NAME}] stop loading`)();
