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

@Component({
selector: 'app-map-card',
templateUrl: './map-card.page.html',
styleUrls: ['./map-card.page.scss'],
})
export class MapCardPage implements OnInit {
	map: GoogleMap;
	constructor() {

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
				zoom: 18,
				tilt: 30
			}
		};

		this.map = GoogleMaps.create('map_canvas', mapOptions);

		const marker: Marker = this.map.addMarkerSync({
			title: 'Ionic',
			icon: 'blue',
			animation: 'DROP',
			position: {
			lat: 50.6745737,
			lng: 17.9372723
			}
		});
		marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
			alert('clicked');
		});
	}

}
