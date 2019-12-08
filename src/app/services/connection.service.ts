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

	mainUrl = 'https://repo.foodini.net.pl/api-one/';

	httpOptions = {};
	authOptions = { headers: new HttpHeaders({
					'Authorization': 'Basic YXV0aHNlcnZlcjpEamlKOTltR0NkeDVsa1VEM0I=',
					'Content-Type': 'application/x-www-form-urlencoded'
				})};

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
			.set('grant_type', 'password');

		return this.http.post('https://repo.foodini.net.pl/bifrost/oauth/token', post_data, this.authOptions).subscribe(
			(data) => {
				if (data && data['access_token']) {
					console.log(data['access_token']);
					this.setToken(data['access_token']);
				}
				return this.router.navigateByUrl('home-result');
			},
			response => {
				console.log(response);
			});
	}

	getDataByPost(url: String, post_data: any) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Bearer ' + this.getToken(),
				'Content-Type': 'application/json;charset=utf-8'
			})
		};
		console.log(JSON.stringify(post_data));
		return this.http.post(this.mainUrl + url, JSON.stringify(post_data), this.httpOptions)
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

	showError(message) {
		console.log(message)
	}
}

