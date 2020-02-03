import { Component, OnInit } from '@angular/core';
import { CouponCardPage } from '../modal/coupon-card/coupon-card.page';
import { ModalController, LoadingController } from '@ionic/angular';
import { FilterCardPage } from '../modal/filter-card/filter-card.page';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { Platform } from '@ionic/angular';
import { ImagePage } from '../modal/image/image.page';

@Component({
	selector: 'app-local-coupons-card',
	templateUrl: './local-coupons-card.page.html',
	styleUrls: ['./local-coupons-card.page.scss'],
})
export class LocalCouponsCardPage implements OnInit {

	id_local_data_main: any;
	local_name: any = '';
	items: any;
	phone_number: any;
	show = false;

	constructor(
		public modalCtrl: ModalController,
		public route: ActivatedRoute,
		public connection: ConnectionService,
		public loadingCtrl: LoadingController,
		public platform: Platform
	) { }

	ngOnInit() {
		this.id_local_data_main = this.route.snapshot.params['id_local_data_main'];
		this.local_name = this.route.snapshot.params['local_name'];
		this.phone_number = this.route.snapshot.params['phone_number']
		this.refreshCouponsList(this.id_local_data_main);
	}

	refreshCouponsList(id_local_data_main){
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getList/' + id_local_data_main).subscribe(data => {
				this.items = data;
				console.log(data);
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	openPhone(phone_number) {
		this.countStats('Phonenumber').then(a => {
			window.open('tel:' + phone_number + ' }}', '_self');
		});
	}

	async countStats(name) {
		this.connection.getDataByPost('locals/show' + name + 'Count', {id_local_data_main: this.id_local_data_main}).subscribe(data => {
			console.log(data);
		});
	}

	async showMenu() {
		this.countStats('Menu');
		const modal = await this.modalCtrl.create({
			component: ImagePage,
			componentProps: {
				id_local_data_main: this.id_local_data_main
			}
			});
		return await modal.present();
	}

	async openCouponCard (id_coupon_data_main, local_name) {
		const modal = await this.modalCtrl.create({
			component: CouponCardPage,
			componentProps: {
				id_coupon_data_main: id_coupon_data_main,
				id_local_data_main: this.id_local_data_main,
				local_name: local_name
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
