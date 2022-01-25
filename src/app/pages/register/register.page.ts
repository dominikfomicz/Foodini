import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';

@Component({
selector: 'app-register',
templateUrl: './register.page.html',
styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	public onLoginForm: FormGroup;
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
			'check': [null, this.mustBeTruthy],
			'email': [null, Validators.compose([
				Validators.required,
				Validators.email
			])],
			'password': [null, Validators.compose([
				Validators.required
      		])]
		});
	}

	mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
		const rv: { [key: string]: boolean } = {};
		if (!c.value) {
		  rv['notChecked'] = true;
		}
		return rv;
	}

	goToLogin() {
  // this.navCtrl.navigateRoot('');
  this.router.navigate([''], {replaceUrl: true});
	}

	registerClick() {
		this.auth.register(this.onLoginForm.value.email, this.onLoginForm.value.password).subscribe(
      (data) => {
				if (data === 0) {
					this.presentSuccessAlert();
				}
				if (data === -1) {
					this.presentErrorAlert();
				}
		},
		err => {
			this.presentErrorAlert();
		});
	}

  async presentSuccessAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Dziękujemy!',
      subHeader: 'W ciągu 5 minut otrzymasz e-mail, w którym potwierdzisz założenie konta',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Błąd',
      subHeader: 'Uzytkownik o podanym adresie email już istnieje',
      buttons: ['OK']
    });

    await alert.present();
  }

}
