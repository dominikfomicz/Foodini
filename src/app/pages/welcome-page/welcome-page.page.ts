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


	constructor(public connection: ConnectionService, private device: Device, private platform: Platform) {
	}

	ngOnInit() {
		this.setup().catch(err => {
			this.connection.login(this.device.uuid, this.device.uuid);
		});
	}

	async setup() {
		await this.platform.ready().then(a => {
			this.connection.registerStart(this.device.uuid).subscribe((data) => {
					this.connection.login(this.device.uuid, this.device.uuid);
			},
			err => {
				this.connection.login(this.device.uuid, this.device.uuid);
			});
		});
	}
}
