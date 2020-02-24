import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AppComponent } from '../app.component';
const TOKEN_KEY = 'auth-token';

@Injectable()
export class AuthService {
	authenticationState = new BehaviorSubject(false);
	userStatus = new BehaviorSubject(0);
	httpOptions = {};

	constructor(private storage: Storage, private plt: Platform, private http: HttpClient, public alertCtrl: AlertController) {
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

						//załadowanie linków do zarządzania dla managerów i kelnerów w menu
						const post_data = new HttpParams().set('uuid', username);
						return this.http.post('http://repo.foodini.net.pl/auth-api/getUserStatus', post_data, this.httpOptions).subscribe(data => {
							if (data === -1) {
								localStorage.setItem('user_status', '-1');
								this.userStatus.next(-1);
							}
							if (data === 0) {
								localStorage.setItem('user_status', '0');
								this.userStatus.next(0);
							}
							if (data === 1) {
								localStorage.setItem('user_status', '1');
								this.userStatus.next(1);
							}
							if (data === 2) {
								localStorage.setItem('user_status', '2');
								this.userStatus.next(2);
							}
							if (data === 3) {
								localStorage.setItem('user_status', '3');
								this.userStatus.next(3);
							}
						});
					});
				}
			},
			err => {
				this.presentAlert('Błąd', 'Adres email, lub hasło jest niepoprawne.');
			});
	}

	register(username, password) {
		const post_data = new HttpParams()
			.set('name', username)
			.set('email', username)
			.set('password', password);
		return this.http.post('http://repo.foodini.net.pl/auth-api/registerEmail', post_data, this.httpOptions);
	}

	registerFacebook(username, email, facebook_id) {
		const post_data = new HttpParams()
			.set('name', username)
			.set('email', email)
			.set('password', facebook_id);
		return this.http.post('http://repo.foodini.net.pl/auth-api/register', post_data, this.httpOptions);
	}

	registerUuid(uuid) {
		const post_data = new HttpParams()
			.set('uuid', uuid);
		return this.http.post('http://repo.foodini.net.pl/auth-api/registerUuid', post_data, this.httpOptions);
	}

	resetPassword(email) {
		const post_data = new HttpParams()
			.set('email', email);
		return this.http.post('http://repo.foodini.net.pl/password/email', post_data, this.httpOptions).subscribe(data => {
			console.log(data);
		});
	}

	logout() {
		return this.storage.remove(TOKEN_KEY).then(() => {
			return this.storage.remove('email').then(() => {
				return this.storage.remove('password').then(() => {
					localStorage.removeItem('token');
					localStorage.removeItem('user_status');
					this.authenticationState.next(false);
				});
			});
		});

	}

	isAuthenticated() {
		return this.authenticationState.value;
	}

	async presentAlert(header, message) {
		const alert = await this.alertCtrl.create({
		  header: header,
		  subHeader: message,
		  buttons: ['OK']
		});
	
		await alert.present();
	}
}
