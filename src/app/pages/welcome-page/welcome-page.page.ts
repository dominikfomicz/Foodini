import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.page.html',
	styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

	message = "";
	token = "";
	
	constructor(public device: UniqueDeviceID, public connection: ConnectionService) {
		this.device.get()
						.then((uuid: any) => this.message = uuid)
						.catch((error: any) => this.message = error)
		}

	ngOnInit() {
		this.connection.login("dominik@excode.eu","codex2435");
	}

}
