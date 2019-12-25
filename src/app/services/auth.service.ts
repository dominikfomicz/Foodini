import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	constructor() { }

	get isLoggedIn() {
		if (localStorage.getItem('token') !== null) {
			return true;
		} else {
			return false;
		}
	}
}
