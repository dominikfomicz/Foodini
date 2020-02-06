import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Pages } from './interfaces/pages';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
selector: 'app-root',
templateUrl: 'app.component.html',
styleUrls: ['./app.component.scss']
})
export class AppComponent {
	user_type: any = '0';
	email: any;
	public appPages: Array<Pages>;
	httpOptions = {};

	constructor(
	private platform: Platform,
	private splashScreen: SplashScreen,
	private statusBar: StatusBar,
	public navCtrl: NavController,
	public device: Device,
	private http: HttpClient,
	private auth: AuthService,
	private router: Router,
	private storage: Storage
	) {
		this.appPages = [
		{
			title: 'Prześlij uwagi',
			url: '/contact',
			direct: 'forward',
			icon: 'mail'
		},

		{
			title: 'O Foodinim',
			url: '/about',
			direct: 'forward',
			icon: 'information-circle'
		},
		];
		// if(this.platform.pause){
		//   localStorage.clear();
		// }
		this.initializeApp();
	}

	initializeApp() {
		if(localStorage.getItem('user_status') === '-1'){
				this.user_type = -1;
			}
			if(localStorage.getItem('user_status') === '0'){
				this.user_type = 0;
			}
			if(localStorage.getItem('user_status') === '1'){
				this.user_type = 1;
			}
			if(localStorage.getItem('user_status') === '2'){
				this.user_type = 2;
			}
			if(localStorage.getItem('user_status') === '3'){
				this.user_type = 3;
			}
		this.platform.ready().then(() => {
			this.statusBar.styleBlackTranslucent();
			this.splashScreen.hide();
			// this.email = this.device.uuid;
			this.auth.userStatus.subscribe(status => {
				if (status === -1) {
					this.user_type = -1;
				}
				if (status === 0) {
					this.user_type = 0;
				}
				if (status === 1) {
					this.user_type = 1;
				}
				if (status === 2) {
					this.user_type = 2;
				}
				if (status === 3) {
					this.user_type = 3;
				}
			});
			if(localStorage.getItem('user_status') === '-1'){
				this.user_type = -1;
			}
			if(localStorage.getItem('user_status') === '0'){
				this.user_type = 0;
			}
			if(localStorage.getItem('user_status') === '1'){
				this.user_type = 1;
			}
			if(localStorage.getItem('user_status') === '2'){
				this.user_type = 2;
			}
			if(localStorage.getItem('user_status') === '3'){
				this.user_type = 3;
			}
			this.auth.authenticationState.subscribe(state => {
				if (state) {
					this.router.navigate(['home-results'], {replaceUrl: true});
				} else {
					this.router.navigate([''], {replaceUrl: true});
				}
			});

			//załadowanie linków do zarządzania dla managerów i kelnerów w menu
			// const post_data = new HttpParams().set('uuid', this.device.uuid);
			// return this.http.post('http://repo.foodini.net.pl/auth-api/getUserStatus', post_data, this.httpOptions).subscribe(data => {
			// 	this.user_type = data;
			// 	this.storage.get('email').then((val) => {
			// 		if(val) {
			// 			this.email = val;
			// 		}
			// 	});
			// });


		});
	}

	addRoutesForWorker(){
		this.appPages.push({
			title: 'Test',
			url: '/contact',
			direct: 'forward',
			icon: 'mail'
		});
	}

	logout(){
		this.auth.logout();
		this.initializeApp();
	}
}
