import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
	selector: 'app-map-item-card',
	templateUrl: './map-item-card.page.html',
	styleUrls: ['./map-item-card.page.scss'],
})
export class MapItemCardPage implements OnInit {
	public radiusmiles = 1;
	public minmaxprice = {
		upper: 500,
		lower: 10
	};

	foo;
	bar;
	public favColor = "secondary";

	constructor(private modalCtrl: ModalController, public navCtrl: NavController) { }

	ngOnInit() {
		console.log(`${this.foo} ${this.bar}`)
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor(){
		if(this.favColor == "light"){
			this.favColor = "secondary"
		}else{
			this.favColor = "light";
		}
	}

	openCouponList(){
		this.navCtrl.navigateForward('local-coupons-card');
		this.closeModal();
	}

}
