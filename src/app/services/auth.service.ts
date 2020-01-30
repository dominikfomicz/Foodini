import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppComponent } from '../app.component';
const TOKEN_KEY = 'auth-token';

@Injectable()
export class AuthService {
	authenticationState = new BehaviorSubject(false);
	httpOptions = {};

	constructor(private storage: Storage, private plt: Platform, private http: HttpClient) {
		this.plt.ready().then(() => {
			this.checkToken();
		});
	}

	checkToken() {
		this.storage.get(TOKEN_KEY).then(res => {
			if (res) {
			this.authenticationState.next(true);
			}
		});
	}

	getToken() {
		return localStorage.getItem('token');
	}

	login(username, password) {
		const post_data = new HttpParams()
			.set('username', username)
			.set('password', password)
			.set('client_id', '1')
			.set('client_secret', 'wYp5wj6LRF6zE8M2DAQofcOUAc7JHeGVlFF5P8au')
			.set('scope', '')
			.set('grant_type', 'password');

		return this.http.post('http://repo.foodini.net.pl/oauth/token', post_data, this.httpOptions).subscribe(
			(data) => {
				if (data && data['access_token']) {
					return this.storage.set(TOKEN_KEY, data['access_token']).then(() => {
						this.storage.set('email', username);
						this.storage.set('password', password);
						localStorage.setItem('token', data['access_token']); //nie dało się inaczej wkleić tokena do headera w requestach :P
						this.authenticationState.next(true);
					});
				}
			});
	}

	logout() {
		return this.storage.remove(TOKEN_KEY).then(() => {
			return this.storage.remove('email').then(() => {
				return this.storage.remove('password').then(() => {
					// window.location.reload();
					localStorage.removeItem('token');
					this.authenticationState.next(false);
				});
			});
		});

	}

	isAuthenticated() {
		return this.authenticationState.value;
	}
}
