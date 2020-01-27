import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-local-card',
	templateUrl: './coupon-card.page.html',
	styleUrls: ['./coupon-card.page.scss'],
})
export class CouponCardPage implements OnInit {
	public radiusmiles = 1;
	public minmaxprice = {
		upper: 500,
		lower: 10
	};

	id_coupon_data_main;
	id_local_data_main;
	code;
	button = true;
	items: any;
	favColor: any;
	show = false;

	constructor(private modalCtrl: ModalController,
				public navCtrl: NavController,
				public loadingCtrl: LoadingController,
				public connection: ConnectionService) {  }

	ngOnInit() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getDetails/' + this.id_coupon_data_main).subscribe(data => {
				this.items = data;
				console.log(data);
				if(this.items.is_favouirite === true) {
					this.favColor = '/assets/img/star_color.svg';
				} else {
					this.favColor = '/assets/img/star.svg';
				}
				if(this.items.is_available === false) {
					this.button = false;
				}
				if(this.items.already_used === true) {
					this.button = false;
				}
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor(id_coupon_data_main){
		if (this.favColor === '/assets/img/star.svg') {
			this.favColor = '/assets/img/star_color.svg';
			this.items.favourite_count = this.items.favourite_count + 1;
			this.connection.getDataByPost('coupons/addCouponToFavourite', {id_coupon_data_main : id_coupon_data_main }).subscribe(data => {
				console.log(data);
			});
		} else {
			this.favColor = '/assets/img/star.svg';
			this.items.favourite_count = this.items.favourite_count - 1;
			this.connection.getDataByPost('coupons/removeFromFavourite', {id_coupon_data_main : id_coupon_data_main }).subscribe(data => {
				console.log(data);
			});
		}
	}

	generateCode(id_coupon_data_main){
		this.connection.getDataByPost('coupons/orderCoupon', {id_coupon_data_main : id_coupon_data_main}).subscribe(data => {
			this.code = data;
			// console.log(data);
		});
		this.button = false;
		// this.content.scrollToBottom(300);
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}

}
