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
	public items: any;

	constructor(public modalCtrl: ModalController, public connection: ConnectionService) {
	}

	ngOnInit() {
		this.loadMap();
	}

	loadMap() {
		this.connection.getDataByGet('/locals/getMapList/1').subscribe(data=>{
			Environment.setEnv({
				'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDhaNlp2f2UqXYSugZ34N2WnpNw3kZ3ffk',
				'API_KEY_FOR_BROWSER_DEBUG': ''
			});
	
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

			for(let i = 0; i <= Object.keys(data).length; i++){
				// console.log(data[i]);
				const marker: Marker = this.map.addMarkerSync({
					icon: {url: 'http://repo.foodini.net.pl/storage/locals/'+ data[i].local_id +'/logo.png'},
					animation: 'DROP',
					position: {
					lat: data[i].latitude,
					lng: data[i].longitude
					}
				});
				marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
					this.openLocationCard(data[i].local_id);
				});
			}
		});
	}

	refreshLocalsList(){
		this.connection.getDataByGet('/locals/getMapList/1').subscribe(data=>{
			this.items = data;
			console.log(this.items);
		});
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
