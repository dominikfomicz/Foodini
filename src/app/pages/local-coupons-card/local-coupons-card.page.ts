import { Component, OnInit } from '@angular/core';
import { CouponCardPage } from '../modal/coupon-card/coupon-card.page';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-local-coupons-card',
	templateUrl: './local-coupons-card.page.html',
	styleUrls: ['./local-coupons-card.page.scss'],
})
export class LocalCouponsCardPage implements OnInit {

	constructor(
		public modalCtrl: ModalController
	) { }

	ngOnInit() {
	}

	async openCouponCard (foo, bar) {
		const modal = await this.modalCtrl.create({
		component: CouponCardPage,
		componentProps: {
			foo: foo,
			bar: bar
		}
		});
		return await modal.present();
	}
}
