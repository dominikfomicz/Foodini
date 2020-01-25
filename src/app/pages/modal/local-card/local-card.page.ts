import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, LoadingController, Platform } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImagePage } from '../image/image.page';

@Component({
	selector: 'app-local-card',
	templateUrl: './local-card.page.html',
	styleUrls: ['./local-card.page.scss'],
})
export class LocalCardPage implements OnInit {

	id_local_data_main;
	items: any;
	favColor: any;
	show = false;
	showTags = false;
	coupons_button = true;

	constructor(private modalCtrl: ModalController,
				public navCtrl: NavController,
				public loadingCtrl: LoadingController,
				public connection: ConnectionService,
				public viewer: PhotoViewer,
				public platform: Platform ) {
	}

	ngOnInit() {
		this.presentLoading().then(a =>
			this.connection.getDataByGet('locals/getDetails/'+ this.id_local_data_main).subscribe(data => {
				this.items = data;
				console.log(data);
				if(this.items.is_favouirite === true){
					this.favColor = '/assets/img/star_color.svg';
				} else {
					this.favColor = '/assets/img/star.svg';
				}

				if(this.items.coupons_count === 0){
					this.coupons_button = false;
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
		if (this.favColor === '/assets/img/star.svg') {
			this.favColor = '/assets/img/star_color.svg';
			this.items.favourite_count = this.items.favourite_count + 1;
			this.connection.getDataByPost('locals/addLocalToFavourite', {id_local_data_main: id_local_data_main}).subscribe(data => {
				console.log(data);
			});
		} else {
			this.favColor = '/assets/img/star.svg';
			this.items.favourite_count = this.items.favourite_count - 1;
			this.connection.getDataByPost('locals/removeLocalFromFavourite', {id_local_data_main: id_local_data_main}).subscribe(data => {
				console.log(data);
			});
		}
	}

	openCouponList(id_local_data_main, local_name, phone_number){
		this.navCtrl.navigateForward('local-coupons-card/' + id_local_data_main + '/' + local_name + '/' + phone_number);
		this.closeModal();
	}

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
			message: 'Ładowanie',
		});
		await loading.present();
	}

	expandTags() {
		this.showTags = !this.showTags;
	}

	async showMenu(){
		// var menuURL = 'http://repo.foodini.net.pl/storage/locals/' + this.id_local_data_main + '/menu.png';
		// var title = '';
		// var options = {
		// 	share: true,

		// };
		// if(this.platform.is('ios')) {
		// 	menuURL = decodeURIComponent(menuURL);
		// }
		// this.viewer.show(menuURL, title, options);
			const modal = await this.modalCtrl.create({
			component: ImagePage,
			componentProps: {
				id_local_data_main: this.id_local_data_main
			}
			});
			return await modal.present();

	}
}
