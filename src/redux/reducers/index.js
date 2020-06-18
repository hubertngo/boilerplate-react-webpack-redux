/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-16 00:42:57
*------------------------------------------------------- */

import loading, { initialState as initialLoading } from './loading';
import pokemon, { initialState as initialPokemon } from './pokemon';

export const initialState = {
	loading: initialLoading,
	pokemon: initialPokemon,
};

export default {
	loading,
	pokemon,
};
