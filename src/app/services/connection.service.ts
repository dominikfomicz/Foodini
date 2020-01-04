import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ConnectionService {

	constructor(private http: HttpClient, private router: Router) { }

	mainUrl = 'http://repo.foodini.net.pl/';

	httpOptions = {};

	setToken(token: string) {
		localStorage.setItem('token', token);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	login(username: string, password: string) {
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
					this.setToken(data['access_token']);
					this.getDataByGet('user').subscribe(user_data => {
						localStorage.setItem('username', user_data['name']);
						localStorage.setItem('user_email', user_data['email']);
						localStorage.setItem('user_type', user_data['user_type']);
					});
				}
				return this.router.navigateByUrl('home-results');
			},
			response => {
				console.log(response);
			});
	}

	registerStart(uuid: string) {
		localStorage.clear();
		const post_data = new HttpParams()
			.set('name', uuid)
			.set('password', uuid)
			.set('email', uuid)

		return this.http.post('http://repo.foodini.net.pl/auth-api/register', post_data, this.httpOptions);
	}

	getDataByPost(url: String, post_data: any) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};
		return this.http.post(this.mainUrl + url, post_data, this.httpOptions)
			.pipe(
				(data => {
					return data;
				}),
				catchError(error => {
					if (error.status === 401) {
						this.showError(error.statusText);
					} else if (error.status === 404) {
						this.showError(error.statusText);
					} else if (error.staatus === 500) {
						this.showError(error.statusText);
					} else {
						this.showError(error.statusText);
					}
					return throwError(error);
				})
			);
	}

	getDataByGet(url: String) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};

		return this.http.get(this.mainUrl + url, this.httpOptions)
			.pipe((data => {
					return data;
				}),
				catchError(error => {
					if (error.status === 401) {
						this.showError(error.statusText);
					} else if (error.status === 404) {
						this.showError(error.statusText);
					} else if (error.status === 500) {
						this.showError(error.statusText);
					} else {
						this.showError(error.statusText);
					}
					return throwError(error);
				})
			);
	}

	selectItem(app_list_string){
		return this.getDataByPost('tools/getList', {app_list_string: app_list_string});
	}

	showError(message) {
		localStorage.clear();
		console.log(message);
		this.router.navigateByUrl('/welcome-page');
	}
}

