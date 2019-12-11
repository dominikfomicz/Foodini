import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
	selector: 'app-filter-card',
	templateUrl: './filter-card.page.html',
	styleUrls: ['./filter-card.page.scss'],
})
export class FilterCardPage implements OnInit {
	public radiusmiles = 1;
	public minmaxprice = {
		upper: 500,
		lower: 10
	};
	public sortWay = ['Najnowsze', 'Najpopularniejsze', 'Polecane', 'Alfabetycznie rosnąco', 'Alfabetycznie malejąco'];
	foo;
	bar;
	public favColor = 'secondary';

	constructor(private modalCtrl: ModalController, public navCtrl: NavController) { }

	ngOnInit() {
		console.log(`${this.foo} ${this.bar}`);
	}

	closeModal() {
		this.modalCtrl.dismiss();
	}

	changeFavColor() {
		if (this.favColor === 'light') {
			this.favColor = 'secondary';
		} else {
			this.favColor = 'light';
		}
	}

	openCouponList() {
		this.navCtrl.navigateForward('local-coupons-card');
		this.closeModal();
	}

}
