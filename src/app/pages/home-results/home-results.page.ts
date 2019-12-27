import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {
	NavController,
	AlertController,
	MenuController,
	ToastController,
	PopoverController,
	ModalController,
	LoadingController
} from '@ionic/angular';

// Modals
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LocalCardPage } from '../modal/local-card/local-card.page';
import { ConnectionService } from 'src/app/services/connection.service';
import { FilterCardPage } from '../modal/filter-card/filter-card.page';

@Component({
	selector: 'app-home-results',
	templateUrl: './home-results.page.html',
	styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
	UniqueDeviceID: string;
	searchKey = '';
	yourLocation = '123 Test Street';
	themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
	searchControl: FormControl;
	searchTerm = '';
	items: any;
	viewList = 'locals';
	searching: any = false;


	constructor(
		public navCtrl: NavController,
		public menuCtrl: MenuController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public dataService: DataService,
		public connection: ConnectionService,
		public loadingCtrl: LoadingController
	) {
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.refreshLocalsList();
	}

	onSearchInput() {
		this.searching = true;
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(true);
	}

	settings() {
		this.navCtrl.navigateForward('settings');
	}

	refreshLocalsList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getList/1').subscribe(data => {
				this.items = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	refreshCouponsList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getList/1').subscribe(data => {
				this.items = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	toggleSwitchButton(){
		if(this.viewList === 'locals'){
			this.viewList = 'coupons';
		} else {
			this.viewList = 'locals';
		}
	}

	async alertLocation() {
		const changeLocation = await this.alertCtrl.create({
		header: 'Wybierz miasto',
		message: 'Opole',
		buttons: [
			{
			text: 'Anuluj',
			handler: data => {
				console.log('Cancel clicked');
			}
			},
			{
			text: 'Zmień',
			handler: async (data) => {
				console.log('Change clicked', data);
				const toast = await this.toastCtrl.create({
				message: 'Zmieniono miasto',
				duration: 3000,
				position: 'top',
				closeButtonText: 'OK',
				showCloseButton: false
				});

				toast.present();
			}
			}
		]
		});
		changeLocation.present();
	}

	async openLocationCard (id_local_data_main) {
		const modal = await this.modalCtrl.create({
		component: LocalCardPage,
		componentProps: {
			id_local_data_main: id_local_data_main
		}
		});
		return await modal.present();
	}

	async searchFilter (foo, bar) {
		const modal = await this.modalCtrl.create({
		component: FilterCardPage,
		componentProps: {
			foo: foo,
			bar: bar
		}
		});
		return await modal.present();
	}
	
	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}
}
