import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.page.html',
	styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

	message = '';

	constructor(public connection: ConnectionService, private device: Device, private platform: Platform) {
		// setTimeout(() => {
		// 	window.location.reload();
		// }, 6000);
	}

	ngOnInit() {
		this.setup().catch(err => {			
			this.connection.login(this.device.uuid, this.device.uuid);
		});
	}

	async setup() {
		await this.platform.ready().then(a => {
			this.message = this.device.uuid;
			this.connection.registerStart(this.device.uuid).subscribe((data) => {
					alert('zarejestrowano');
					this.connection.login(this.device.uuid, this.device.uuid);
			},
			err => {
				alert('err w funkcji');
				this.connection.login(this.device.uuid, this.device.uuid);
			});
		});
	}
}
