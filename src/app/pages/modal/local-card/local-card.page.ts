import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-local-card',
	templateUrl: './local-card.page.html',
	styleUrls: ['./local-card.page.scss'],
})
export class LocalCardPage implements OnInit {
	public radiusmiles = 1;
	public minmaxprice = {
		upper: 500,
		lower: 10
	};

	public id_local_data_main;
	public items: any;
	public favColor: any;

	constructor(private modalCtrl: ModalController,
				public navCtrl: NavController,
				public loadingCtrl: LoadingController,
				public connection: ConnectionService ) {
		
		this.presentLoading();
	}

	ngOnInit() {
		this.connection.getDataByGet('locals/getDetails/'+ this.id_local_data_main).subscribe(data => {
			this.items = data;
			if(this.items.is_is_favourite === true){
				this.favColor = 'secondary';
			} else {
				this.favColor = 'light';
			}
			this.loadingCtrl.dismiss('loading');
		});
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor(){
		if (this.favColor === 'light') {
			this.favColor = 'secondary';
			//dodaj do ulubionych
		} else {
			this.favColor = 'light';
			//usun z ulubioncyh
		}
	}

	openCouponList(){
		this.navCtrl.navigateForward('local-coupons-card');
		this.closeModal();
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}
}
