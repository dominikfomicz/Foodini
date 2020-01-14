import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-managers-locals-list',
	templateUrl: './managers-locals-list.page.html',
	styleUrls: ['./managers-locals-list.page.scss'],
})
export class ManagersLocalsListPage implements OnInit {
	items: any;
	constructor(public actionSheetCtrl: ActionSheetController, public connection: ConnectionService, public alertCtrl: AlertController) { }

	ngOnInit() {
		this.getLocals();
	}

	getLocals() {
		this.connection.getDataByGet('manager/getLocalsByManager').subscribe(data => {
			this.items = data;
			console.log(data);
		});
	}

	async presentActionSheet(id_local_data_main) {
		const actionSheet = await this.actionSheetCtrl.create({
			header: 'Zarządzanie',
			buttons: [{
				text: 'Dodaj kelnera',
				icon: 'add',
				handler: () => {
					// alert(id_local_data_main);
					this.showPrompt(id_local_data_main);
					}
				},
				{
				text: 'Anuluj',
				icon: 'close',
				role: 'cancel',
				handler: () => {
				}
			}]
		});
	await actionSheet.present();
	}

	async showPrompt(id_local_data_main) {
		let prompt = this.alertCtrl.create({
			header: 'Dodawanie kelnera',
			// message: "Enter a name for this new album you're so keen on adding",
			inputs: [
			{
				name: 'uuid',
				placeholder: 'Identyfikator kelnera',
			}
			],
			buttons: [
			{
				text: 'Anuluj',
				handler: data => {
				}
			},
			{
				text: 'Dodaj',
				handler: input => {
				console.log(input.uuid);
					this.connection.getDataByPost('manager/registerWorker', {id_local_data_main: id_local_data_main, uuid: input.uuid}).subscribe(data => {
						console.log(data);
					});
				}
			}
			]
		});
		(await prompt).present();
	
	  }

	}
