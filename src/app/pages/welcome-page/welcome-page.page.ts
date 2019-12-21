import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.page.html',
	styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

	message = "";
	
	constructor(public connection: ConnectionService, private device: Device, private platform: Platform) {
		}

	ngOnInit() {
		this.setup();
	}

	async setup() {
		await this.platform.ready();
		this.message = this.device.uuid;
		this.connection.login("dominik@excode.eu","codex2435");
	}
}
