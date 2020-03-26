import { Component, OnInit } from '@angular/core';
import {
	NavController,
	AlertController,
	MenuController,
	ToastController,
	PopoverController,
	ModalController,
	LoadingController,
	ActionSheetController
} from '@ionic/angular';

import { FormControl } from '@angular/forms';
import { LocalCardPage } from '../modal/local-card/local-card.page';
import { ConnectionService } from 'src/app/services/connection.service';
import { FilterCardPage } from '../modal/filter-card/filter-card.page';
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
		public connection: ConnectionService,
		public loadingCtrl: LoadingController,
		public actionSheetCtrl: ActionSheetController
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

	refreshLocalsList() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getList/1').subscribe(data => {
				this.items_locals = data;
				console.log(data);
				this.items_locals_search = this.items_locals;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	refreshCouponsList() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getCouponsByCity/1').subscribe(data => {
				this.items_coupons = data;
				this.items_coupons_search = this.items_coupons;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	refreshLocalsFavList() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getFavouriteList/1').subscribe(data => {
				this.items_locals = data;
				this.items_locals_search = this.items_locals;
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	refreshCouponsFavList() {
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
		switch (this.viewList) {
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
				break;
			}
		}
	}

	toggleFav() {
		switch (this.viewList) {
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
				break;
			}
		}
	}

	navigateToMapCard() {
		this.navCtrl.navigateForward('map-card');
	}

	getItems(ev: any) {
		this.show = false;
		this.items_locals_search = this.items_locals;
		this.items_coupons_search = this.items_coupons;
		const val = ev.target.value;
		if (val && val.trim() !== '') {
			switch (this.viewList) {
				case 'locals': {
					this.items_locals_search = this.items_locals_search.filter(item => {
						return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
					});
					this.show = true;
					break;
				}
				case 'locals_fav': {
					this.items_locals_search = this.items_locals_search.filter(item => {
						return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
					});
					this.show = true;
					break;
				}
				case 'coupons': {
					this.items_coupons_search = this.items_coupons_search.filter(item => {
						return item.coupon_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
					});
					this.show = true;
					break;
				}
				case 'coupons_fav': {
					this.items_coupons_search = this.items_coupons_search.filter(item => {
						return item.coupon_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
					});
					this.show = true;
					break;
				}
			}
		}
	}

	refreshDataSort(id_sort_const_type) {
		switch (this.viewList) {
			case 'locals': {
				this.presentLoading().then(a =>
					this.connection.getDataByGet('locals/getOrderedList/1/' + id_sort_const_type).subscribe(data => {
						this.items_locals = data;
						this.items_locals_search = this.items_locals;
						this.loadingCtrl.dismiss('loading');
						this.show = true;
						console.log(data);
					})
				);
				break;
			}
			case 'locals_fav': {
				this.presentLoading().then(a =>
					this.connection.getDataByGet('locals/getOrderedFavouriteList/1/' + id_sort_const_type).subscribe(data => {
						this.items_locals = data;
						this.items_locals_search = this.items_locals;
						this.loadingCtrl.dismiss('loading');
					})
				);
				break;
			}
			case 'coupons': {
				this.presentLoading().then(a =>
					this.connection.getDataByGet('coupons/getOrderedListByCity/1/' + id_sort_const_type).subscribe(data => {
						this.items_coupons = data;
						this.items_coupons_search = this.items_coupons;
						this.loadingCtrl.dismiss('loading');
					})
				);
				break;
			}
			case 'coupons_fav': {
				this.presentLoading().then(a =>
					this.connection.getDataByGet('coupons/getOrderedFavouriteList/' + id_sort_const_type).subscribe(data => {
						this.items_coupons = data;
						this.items_coupons_search = this.items_coupons;
						this.loadingCtrl.dismiss('loading');
					})
				);
				break;
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
					handler: async data => {
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

	async openLocationCard(id_local_data_main) {
		const modal = await this.modalCtrl.create({
			component: LocalCardPage,
			componentProps: {
				id_local_data_main: id_local_data_main
			}
		});
		return await modal.present();
	}

	async openCouponCard(id_coupon_data_main, id_local_data_main, local_name) {
		const modal = await this.modalCtrl.create({
			component: CouponCardPage,
			componentProps: {
				id_coupon_data_main: id_coupon_data_main,
				id_local_data_main: id_local_data_main,
				local_name: local_name
			}
		});
		return await modal.present();
	}

	async searchFilter() {
		const modal = await this.modalCtrl.create({
			component: FilterCardPage,
			componentProps: {}
		});
		return await modal.present();
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie'
		});
		await loading.present();
	}

	async presentFilterActionSheet() {
		const localsActionSheet = await this.actionSheetCtrl.create({
			header: 'Sortuj',
			buttons: [
				{
					text: 'Najbardziej popularne',
					handler: () => {
						this.refreshDataSort(1);
					}
				},
				{
					text: 'Najnowsze',
					handler: () => {
						this.refreshDataSort(2);
					}
				},
				{
					text: 'Tylko otwarte',
					handler: () => {
						this.refreshDataSort(3);
					}
				}
			]
		});

		const couponsActionSheet = await this.actionSheetCtrl.create({
			header: 'Sortuj',
			buttons: [
				{
					text: 'Najbardziej popularne',
					handler: () => {
						this.refreshDataSort(1);
					}
				},
				{
					text: 'Najnowsze',
					handler: () => {
						this.refreshDataSort(2);
					}
				},
				{
					text: 'Tylko aktywne',
					handler: () => {
						this.refreshDataSort(3);
					}
				}
			]
		});

		if (this.viewList === 'locals' || this.viewList === 'locals_fav') {
			await localsActionSheet.present();
		}

		if (this.viewList === 'coupons' || this.viewList === 'coupons_fav') {
			await couponsActionSheet.present();
		}
	}
}
