import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

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
	private storage: Storage,
	private auth: AuthService
	) { }

	ionViewWillEnter() {
		this.menuCtrl.enable(false);
	}

	ngOnInit() {
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
			header: 'Resetowanie hasła',
			message: 'Wpisz swój adres email',
			inputs: [
			{
			name: 'email',
			type: 'email',
			placeholder: 'Email'
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
			handler: async () => {
				const loader = await this.loadingCtrl.create({
				duration: 2000
				});

				loader.present();
				loader.onWillDismiss().then(async l => {
					const toast = await this.toastCtrl.create({
						showCloseButton: true,
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

	// // //
	goToRegister() {
	this.navCtrl.navigateRoot('/register');
	}

	loginClick() {
		console.log(this.onLoginForm.value.email);
		this.auth.login(this.onLoginForm.value.email, this.onLoginForm.value.password);
	}

	loginWithFacebook(){
		this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
			this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
				
				this.userData = {
					username: profile['name'],
					email: profile['email'],
					id: profile['id']
				};
			});
		});
	}

}
