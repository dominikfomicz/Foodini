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
import { CouponCardPage } from '../modal/coupon-card/coupon-card.page';

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
	items_locals_search: any;
	items_coupons: any;
	items_coupons_search: any;
	viewList = 'locals';
	// favColor: any = 'light';
	viewFav = false;
	show = false;
	switchState = false;
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
				console.log(this.items_locals);
				this.items_locals_search = this.items_locals;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	refreshCouponsList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getCouponsByCity/1').subscribe(data => {
				this.items_coupons = data;
				this.items_coupons_search = this.items_coupons;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	refreshLocalsFavList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getFavouriteList/1').subscribe(data => {
				this.items_locals = data;
				this.items_locals_search = this.items_locals;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
				console.log(data);
			})
		);
	}

	refreshCouponsFavList(){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getFavouriteList').subscribe(data => {
				this.items_coupons = data;
				this.items_coupons_search = this.items_coupons;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	toggleSwitchButton() {
		this.switchState = !this.switchState;
		switch(this.viewList) {
			case 'locals': {
				this.refreshCouponsList();
				this.viewList = 'coupons';
				// document.querySelector('.slider').classList.add('switch-right');
				// alert(document.querySelector('.slider').classList)
				// document.querySelector('.slider').classList.remove('switch-left');
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
				// alert(document.querySelector('.slider').classList)
				// document.querySelector('.slider').classList.add('switch-left');
				// document.querySelector('.slider').classList.remove('switch-right');
				break;
			}
			case 'coupons_fav': {
				this.refreshLocalsFavList();
				this.viewList = 'locals_fav';
				break;
			}
		}
	}

	toggleFav(){
		switch(this.viewList) {
			case 'locals': {
				this.refreshLocalsFavList();
				this.viewList = 'locals_fav';
				this.viewFav = true;
				break;
			}
			case 'locals_fav': {
				this.refreshLocalsList();
				this.viewList = 'locals';
				this.viewFav = false;
				break;
			}
			case 'coupons': {
				this.refreshCouponsFavList();
				this.viewList = 'coupons_fav';
				this.viewFav = true;
				break;
			}
			case 'coupons_fav': {
				this.refreshCouponsList();
				this.viewList = 'coupons';
				this.viewFav = false;
			}
		}
	}

	navigateToMapCard(){
		this.navCtrl.navigateForward('map-card');
	}

	getItems(ev: any) {
		this.items_locals_search = this.items_locals;
		this.items_coupons_search = this.items_coupons;
		const val = ev.target.value;
		if (val && val.trim() != '') {

			switch(this.viewList) {
				case 'locals': {
					this.items_locals_search = this.items_locals_search.filter((item) => {
						return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
					break;
				}
				case 'locals_fav': {
					this.items_locals_search = this.items_locals_search.filter((item) => {
						return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
					break;
				}
				case 'coupons': {
					this.items_coupons_search = this.items_coupons_search.filter((item) => {
						return (item.coupon_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
					break;
				}
				case 'coupons_fav': {
					this.items_coupons_search = this.items_coupons_search.filter((item) => {
						return (item.coupon_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
					});
				}
			}
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

	async openCouponCard (id_coupon_data_main, id_local_data_main) {
		const modal = await this.modalCtrl.create({
		component: CouponCardPage,
		componentProps: {
			id_coupon_data_main: id_coupon_data_main,
			id_local_data_main: id_local_data_main
		}
		});
		return await modal.present();
	}

	async searchFilter () {
		const modal = await this.modalCtrl.create({
		component: FilterCardPage,
		componentProps: {
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
