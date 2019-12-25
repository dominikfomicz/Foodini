import { Component, OnInit } from '@angular/core';
import { CouponCardPage } from '../modal/coupon-card/coupon-card.page';
import { ModalController } from '@ionic/angular';
import { FilterCardPage } from '../modal/filter-card/filter-card.page';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-local-coupons-card',
	templateUrl: './local-coupons-card.page.html',
	styleUrls: ['./local-coupons-card.page.scss'],
})
export class LocalCouponsCardPage implements OnInit {

	id_local_data_main: any;
	items: any;

	constructor(
		public modalCtrl: ModalController,
		public route: ActivatedRoute,
		public connection: ConnectionService
	) { }

	ngOnInit() {
		this.id_local_data_main = this.route.snapshot.params['id_local_data_main'];
		this.connection.getDataByGet('coupons/getList/' + this.id_local_data_main).subscribe(data => {
			this.items = data;
			console.log(data);
		});
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

}
