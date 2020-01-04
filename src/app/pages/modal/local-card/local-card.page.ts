import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-local-card',
	templateUrl: './local-card.page.html',
	styleUrls: ['./local-card.page.scss'],
})
export class LocalCardPage implements OnInit {

	id_local_data_main;
	items: any;
	favColor: any;
	show: boolean = false;

	constructor(private modalCtrl: ModalController,
				public navCtrl: NavController,
				public loadingCtrl: LoadingController,
				public connection: ConnectionService ) {
	}

	ngOnInit() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getDetails/'+ this.id_local_data_main).subscribe(data => {
				this.items = data;
				console.log(data);
				if(this.items.is_favouirite === true){
					this.favColor = 'secondary';
				} else {
					this.favColor = 'light';
				}
				this.loadingCtrl.dismiss('loading');
				this.show = true;
			})
		);
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor(id_local_data_main){
		if (this.favColor === 'light') {
			this.favColor = 'secondary';
			this.connection.getDataByPost('locals/addLocalToFavourite', {id_local_data_main: id_local_data_main}).subscribe(data => {
				console.log(data);
			});
		} else {
			this.favColor = 'light';
			this.connection.getDataByPost('locals/removeLocalFromFavourite', {id_local_data_main: id_local_data_main}).subscribe(data => {
				console.log(data);
			});
		}
	}

	openCouponList(id_local_data_main, local_name){
		// this.closeModal();
		this.navCtrl.navigateForward('local-coupons-card/' + id_local_data_main + '/' + local_name);
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}
}
