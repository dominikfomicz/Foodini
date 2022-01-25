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
	public sortWay = {
					'Najnowsze' : 1,
					'Najpopularniejsze': 2,
					'Polecane' : 3,
					'Alfabetycznie rosnąco' : 4,
					'Alfabetycznie malejąco' : 5
				};

	public favColor = 'secondary';
	public selectedFilter = 1;
	constructor(private modalCtrl: ModalController, public navCtrl: NavController) { }

	ngOnInit() {
	}

	closeModal() {
		console.log(this.sortWay);
		this.modalCtrl.dismiss(this.sortWay);
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
