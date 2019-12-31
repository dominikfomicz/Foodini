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
import { trigger, state, transition, style, animate } from '@angular/animations';

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
	items_locals: any;
	items_coupons: any;
	viewList = 'locals';
	searching: any = false;
	favColor: any = 'light';

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
				this.items_locals = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	refreshCouponsList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getList/1').subscribe(data => {
				this.items_coupons = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	refreshLocalsFavList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getList/1').subscribe(data => {
				this.items_locals = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	refreshCouponsFavList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getList/1').subscribe(data => {
				this.items_coupons = data;
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	toggleSwitchButton(){
		switch(this.viewList) {
			case 'locals': {
				this.refreshCouponsList();
				this.viewList = 'coupons';
				break;
			}
			case 'locals_fav': {
				this.refreshCouponsFavList();
				this.viewList = 'coupons_fav';
				break;
			}
			case 'coupons': {
				this.refreshLocalsList();
				this.viewList = 'locals';
				break;
			}
			case 'coupons_fav': {
				this.refreshLocalsFavList();
				this.viewList = 'locals_fav';
			}
		}
	}

	toggleFav(){
		switch(this.viewList) {
			case 'locals': {
				this.refreshLocalsFavList();
				this.viewList = 'locals_fav';
				this.favColor = 'secondary';
				break;
			}
			case 'locals_fav': {
				this.refreshLocalsList();
				this.viewList = 'locals';
				this.favColor = 'light';
				break;
			}
			case 'coupons': {
				this.refreshCouponsFavList();
				this.viewList = 'coupons_fav';
				this.favColor = 'secondary';
				break;
			}
			case 'coupons_fav': {
				this.refreshCouponsList();
				this.viewList = 'coupons';
				this.favColor = 'light';
			}
		}
	}

	navigateToMapCard(){
		this.navCtrl.navigateForward('map-card');
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
