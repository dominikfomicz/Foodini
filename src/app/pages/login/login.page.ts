import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public onLoginForm: FormGroup;
	userData = null;

	constructor(
	public navCtrl: NavController,
	public menuCtrl: MenuController,
	public toastCtrl: ToastController,
	public alertCtrl: AlertController,
	public loadingCtrl: LoadingController,
	private formBuilder: FormBuilder,
	private facebook: Facebook,
	private storage: Storage
	) { }

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

	ngOnInit() {
		this.storage.set('email', 'test@wp.pl');
		this.storage.get('email').then((result) => {
			console.log(result);
	});

		this.onLoginForm = this.formBuilder.group({
			'email': [null, Validators.compose([
				Validators.required
			])],
			'password': [null, Validators.compose([
				Validators.required
			])]
		});
	}

	async forgotPass() {
		const alert = await this.alertCtrl.create({
			header: 'Forgot Password?',
			message: 'Enter you email address to send a reset link password.',
			inputs: [
			{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
			}
			],
			buttons: [
			{
			text: 'Cancel',
			role: 'cancel',
			cssClass: 'secondary',
			handler: () => {
			console.log('Confirm Cancel');
			}
			}, {
			text: 'Confirm',
			handler: async () => {
				const loader = await this.loadingCtrl.create({
				duration: 2000
				});

				loader.present();
				loader.onWillDismiss().then(async l => {
					const toast = await this.toastCtrl.create({
						showCloseButton: true,
						message: 'Email was sended successfully.',
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

	// // //
	goToRegister() {
	this.navCtrl.navigateRoot('/register');
	}

	goToHome() {
	this.navCtrl.navigateRoot('/home-results');
	}

	loginWithFacebook(){
		this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
			this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
				this.userData = {
					email: profile['email'],
					first_name: profile['first_name'],
					picture: profile['picture_large']['data']['url'],
					username: profile['name'],
					id: profile['id']
				};
			});
		});
	}

}
