/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone (+65) 8305 8687
*
* Created: 2020-11-13 10:19:27
*------------------------------------------------------- */

import Storage from './storage';

class AuthStorage extends Storage {
	get loggedIn() {
		return !!this.value && !!this.value.token;
	}

	get token() {
		return this.value && this.value.token;
	}

	get userId() {
		return this.value && this.value.userId;
	}

	get role() {
		return this.value && this.value.role;
	}

	get isInfluencer() {
		return this.value && !!this.value.isInfluencer;
	}
}

export default new AuthStorage('AUTH');
