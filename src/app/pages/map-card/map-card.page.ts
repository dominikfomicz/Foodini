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
import { MapItemCardPage } from '../modal/map-card/map-item-card.page';

@Component({
selector: 'app-map-card',
templateUrl: './map-card.page.html',
styleUrls: ['./map-card.page.scss'],
})
export class MapCardPage implements OnInit {
	map: GoogleMap;
	constructor(public modalCtrl: ModalController) {
	}

	ngOnInit() {
		this.loadMap();
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
			this.openMapItemCard(1, 2)
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
			this.openMapItemCard(1, 2)
		});
	}

	async openMapItemCard (foo, bar) {
		const modal = await this.modalCtrl.create({
		component: MapItemCardPage,
		componentProps: {
			foo: foo,
			bar: bar
		}
		});
		return await modal.present();
	}

}
