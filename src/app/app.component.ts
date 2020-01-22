import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Pages } from './interfaces/pages';
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
		public storage: Storage
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

		this.initializeApp();
	}

	initializeApp() {
	// this.storage.set('name', 'Max');

	this.storage.get('name').then((val) => {
		console.log('Your name is', val);
	});

	this.email = this.device.uuid;
	this.platform.ready().then(() => {



		this.statusBar.styleBlackTranslucent();
		this.splashScreen.hide();
	// 	this.email = this.device.uuid;
	// 	const post_data = new HttpParams()
	// 		.set('uuid', this.device.uuid);

	// 	return this.http.post('http://repo.foodini.net.pl/auth-api/getUserStatus', post_data, this.httpOptions).subscribe(data=>{
	// 	this.user_type = data;
	// });
		this.user_type = 3;

	}).catch(() => {});
	}
}
