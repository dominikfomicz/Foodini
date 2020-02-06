import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public onLoginForm: FormGroup;
	public onFacebook: FormGroup;
	userData = null;
	show = false;

	constructor(
	public navCtrl: NavController,
	public menuCtrl: MenuController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public loadingCtrl: LoadingController,
	private formBuilder: FormBuilder,
	private facebook: Facebook,
	private storage: Storage,
	private auth: AuthService,
	private router: Router,
	private device: Device,
	private platform: Platform
	) {
		this.auth.authenticationState.subscribe(state => {
			if (state) {
				this.show = false;
			} else {
				this.show = true;
			}
		});

	}

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

	ngOnInit() {
		this.onLoginForm = this.formBuilder.group({
			'email': [null, Validators.compose([
				Validators.required,
				Validators.email
			])],
			'password': [null, Validators.compose([
				Validators.required
			])]
		});
		this.onFacebook = this.formBuilder.group({
			'check': [null, Validators.required]
		});
	}

	goToRegister() {
	// this.navCtrl.navigateRoot('/register');
		this.router.navigate(['/register'], {replaceUrl: true});
	}

	loginClick() {
		this.auth.login(this.onLoginForm.value.email, this.onLoginForm.value.password);
	}

	loginWithFacebook() {
		this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
			this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
				this.auth.registerFacebook(profile['name'], profile['email'], profile['id']).subscribe(
					(data) => {
						if (data === 0) {
							this.auth.login(profile['email'], profile['id']);
						}
						if (data === -1) {
							this.auth.login(profile['email'], profile['id']);
						}
				});

				// this.userData = {
				// 	username: profile['name'],
				// 	email: profile['email'],
				// 	id: profile['id']
				// };
			});
		});
	}

	loginAsGuest() {
		this.auth.registerUuid(this.device.uuid).subscribe(
			(data) => {
				if (data === 0) {
					this.auth.login(this.device.uuid, this.device.uuid);
				}
				if (data === -1) {
					this.auth.login(this.device.uuid, this.device.uuid);
				}
		});
	}

	async forgotPass() {
		const alert = await this.alertCtrl.create({
			header: 'Resetowanie hasła',
			inputs: [
			{
			name: 'email',
			type: 'email',
			placeholder: 'Wpisz swój adres email'
			}
			],
			buttons: [
			{
			text: 'Anuluj',
			role: 'cancel',
			cssClass: 'secondary',
			handler: () => {
			console.log('Confirm Cancel');
			}
			}, {
			text: 'Wyślij',
			handler: async input => {
				this.auth.resetPassword(input.email);
				const loader = await this.loadingCtrl.create({
				duration: 2000
				});

				loader.present();
				loader.onWillDismiss().then(async l => {
					const toast = await this.toastCtrl.create({
						showCloseButton: false,
						message: 'Sprawdź skrzynkę i postępuj zgodnie z instrukcjami',
						duration: 3000,
						position: 'bottom'
					});

					toast.present();
				});
			}
			}
			]
		});

		await alert.present();
	}

}
