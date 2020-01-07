import { Component, OnInit } from '@angular/core';
import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapOptions,
	CameraPosition,
	MarkerOptions,
	Marker,
	Environment
  } from '@ionic-native/google-maps';
import { ModalController } from '@ionic/angular';
import { LocalCardPage } from '../modal/local-card/local-card.page';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
selector: 'app-map-card',
templateUrl: './map-card.page.html',
styleUrls: ['./map-card.page.scss'],
})
export class MapCardPage implements OnInit {
	map: GoogleMap;
	items: any;

	constructor(public modalCtrl: ModalController, public connection: ConnectionService) {
	}

	ngOnInit() {
		// this.loadMap();
		this.refreshLocalsList();
	}

	loadMap() {
		Environment.setEnv({
			'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDhaNlp2f2UqXYSugZ34N2WnpNw3kZ3ffk',
			'API_KEY_FOR_BROWSER_DEBUG': ''
		});;

		let mapOptions: GoogleMapOptions = {
			camera: {
				target: {
					lat: 50.6745737,
					lng: 17.9372723
				},
				zoom: 15,
				tilt: 30
			}
		};

		this.map = GoogleMaps.create('map_canvas', mapOptions);
		var id_local_data_main = 47;
		
		const marker_1: Marker = this.map.addMarkerSync({
			title: 'Pizza Hut',
			icon: {url: 'assets/icon/pizza-hut.png'},
			animation: 'DROP',
			position: {
			lat: 50.6745737,
			lng: 17.9372723
			}
		});
		marker_1.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
			this.openLocationCard(id_local_data_main);
		});

		const marker_2: Marker = this.map.addMarkerSync({
			title: 'Zdrowa Krowa',
			icon: {url: 'assets/icon/zdrowa-krowa.png'},
			animation: 'DROP',
			position: {
			lat: 50.6712784,
			lng: 17.9344813
			}
		});
		marker_2.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
			this.openLocationCard(id_local_data_main);
		});
	}

	refreshLocalsList(){
		this.connection.getDataByGet('/locals/getMapList/1').subscribe(data=>{
			this.items = data;
			console.log(Object.keys(this.items).length);
		})
	}

	async openLocationCard (id_local_data_main) {
		const modal = await this.modalCtrl.create({
		component: LocalCardPage,
		componentProps: {
			id_local_data_main: id_local_data_main
		}
		});
		return await modal.present();
	}

}
