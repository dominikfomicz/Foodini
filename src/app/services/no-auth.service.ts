import { Injectable } from '@angular/core';

@Injectable()
export class NoAuthService {

	constructor() { }

	get isLoggedIn() {
		if (localStorage.getItem('token') !== null) {
			return false;
		} else {
			return true;
		}
	}
}
