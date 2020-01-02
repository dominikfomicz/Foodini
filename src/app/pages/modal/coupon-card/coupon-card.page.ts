import { Component, OnInit } from '@angular/core';
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
	code;
	button = true;
	items: any;
	favColor: any;

	constructor(private modalCtrl: ModalController,
				public navCtrl: NavController,
				public loadingCtrl: LoadingController,
				public connection: ConnectionService) { }

	ngOnInit() {
		console.log(this.id_coupon_data_main)
		this.presentLoading().then(a =>
			this.connection.getDataByGet('coupons/getDetails/'+ this.id_coupon_data_main).subscribe(data => {
				this.items = data;
				console.log(data);
				if(this.items.is_favouirite === true){
					this.favColor = 'secondary';
				} else {
					this.favColor = 'light';
				}
				this.loadingCtrl.dismiss('loading');
			})
		);
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor(id_coupon_data_main){
		if (this.favColor === 'light') {
			this.favColor = 'secondary';
			this.connection.getDataByPost('coupons/addCouponToFavourite', {id_coupon_data_main : id_coupon_data_main }).subscribe(data => {
				console.log(data);
			});
		} else {
			this.favColor = 'light';
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
		// console.log(id_coupon_data_main);
		this.button = false;
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}

}
