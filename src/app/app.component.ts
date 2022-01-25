import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Pages } from './interfaces/pages';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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
	private storage: Storage,
	private oneSignal: OneSignal,
	public alertCtrl: AlertController
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
		//sprawdza ststus po wyjściu z appki
		if (localStorage.getItem('user_status') === '-1') {
				this.user_type = -1;
			}
		if (localStorage.getItem('user_status') === '0') {
			this.user_type = 0;
		}
		if (localStorage.getItem('user_status') === '1') {
			this.user_type = 1;
		}
		if (localStorage.getItem('user_status') === '2') {
			this.user_type = 2;
		}
		if (localStorage.getItem('user_status') === '3') {
			this.user_type = 3;
		}

		this.platform.ready().then(() => {
			this.statusBar.overlaysWebView(false);
			this.statusBar.styleBlackTranslucent();
			this.splashScreen.hide();

			//powiadomienia push
			this.setupPush();

			//sprawdza status usera po logowaniu
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

			//sprawdza status usera po wyjściu z appki (podwójnie bo wywalało się na iphone)
			if (localStorage.getItem('user_status') === '-1') {
				this.user_type = -1;
			}
			if (localStorage.getItem('user_status') === '0') {
				this.user_type = 0;
			}
			if (localStorage.getItem('user_status') === '1') {
				this.user_type = 1;
			}
			if (localStorage.getItem('user_status') === '2') {
				this.user_type = 2;
			}
			if (localStorage.getItem('user_status') === '3') {
				this.user_type = 3;
			}

			this.auth.authenticationState.subscribe(state => {
				if (state) {
					this.router.navigate(['home-results'], {replaceUrl: true});
				} else {
					this.router.navigate([''], {replaceUrl: true});
				}
			});


		});
	}

	setupPush() {
		this.oneSignal.startInit('fe07882a-c768-457d-9b45-877a47c5c397', '478738418526');
		this.oneSignal.sendTag('user', 'test');
		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

		//kiedy wejdziemy w powiadomienie z Androida/iOS
		this.oneSignal.handleNotificationOpened().subscribe(data => {
			const msg = data.notification.payload.body;
			const title = data.notification.payload.title;
			const additionnalData = data.notification.payload.additionalData;
			this.presentAlert(title, msg);
		});

		//kiedy otrzymamy powiadomienie z włączoną appką
		this.oneSignal.handleNotificationReceived().subscribe(data => {
			const msg = data.payload.body;
			const title = data.payload.title;
			const additionnalData = data.payload.additionalData;

			this.presentAlert(title, msg);
		});
		this.oneSignal.endInit();
	}

	logout() {
		this.auth.logout();
		this.initializeApp();
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
