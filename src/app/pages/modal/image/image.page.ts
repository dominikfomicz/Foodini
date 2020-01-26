import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-image',
	templateUrl: './image.page.html',
	styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
	id_local_data_main;
	images = [];

	constructor(
		private nav: NavController,
		private modalCtrl: ModalController,
		public connection: ConnectionService
	) {}

	ngOnInit() {
		this.connection.getDataByPost('locals/files/countMenuPhotos', {id_local_data_main: this.id_local_data_main}).subscribe(data => {
			for (let i = 1; i <= data; i++) {
				this.images.push(
					'http://repo.foodini.net.pl/storage/locals/' + this.id_local_data_main + '/menu_' + i + '.png'
				);
			}

		});
		console.log(this.images);
	}

	closeModal() {
	this.modalCtrl.dismiss();
	}

}
