import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { LocalCardPage } from '../modal/local-card/local-card.page';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
	UniqueDeviceID:string;
	searchKey = '';
	yourLocation = '123 Test Street';
	themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
	public searchControl: FormControl;
	public searchTerm: string = "";
	public items: any;
	searching: any = false;

	constructor(
		public navCtrl: NavController,
		public menuCtrl: MenuController,
		public popoverCtrl: PopoverController,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public dataService: DataService,
		public connection: ConnectionService
	) {
		this.searchControl = new FormControl();
	}

	ngOnInit() {
		this.connection.getDataByGet("city/all").subscribe(data => {
			console.log(data);
		});
		this.setFilteredItems();
		this.searchControl.valueChanges
		.pipe(debounceTime(700))
		.subscribe(search => {
			this.setFilteredItems();
		});
	}


	setFilteredItems() {
		this.searching = true;
		this.items = this.dataService.filterItems(this.searchTerm);
		// this.searching = false;
	}

	onSearchInput(){
		this.searching = true;
	}

	ionViewWillEnter() {
		this.menuCtrl.enable(true);
	}

	settings() {
		this.navCtrl.navigateForward('settings');
	}

	async alertLocation() {
		const changeLocation = await this.alertCtrl.create({
		header: 'Wybierz miasto',
		message: 'Opole',
		// inputs: [
		//   {
		//     name: 'location',
		//     placeholder: 'Enter your new Location',
		//     type: 'text'
		//   },
		// ],
		buttons: [
			{
			text: 'Anuluj',
			handler: data => {
				console.log('Cancel clicked');
			}
			},
			{
			text: 'Zmień',
			handler: async (data) => {
				console.log('Change clicked', data);
				const toast = await this.toastCtrl.create({
				message: 'Zmieniono miasto',
				duration: 3000,
				position: 'top',
				closeButtonText: 'OK',
				showCloseButton: false
				});

				toast.present();
			}
			}
		]
		});
		changeLocation.present();
	}

	async openLocationCard (foo, bar) {
		const modal = await this.modalCtrl.create({
		component: LocalCardPage,
		componentProps: { 
			foo: foo,
			bar: bar
		}
		});
		return await modal.present();
	}

	async presentImage(image: any) {
		const modal = await this.modalCtrl.create({
		component: ImagePage,
		componentProps: { value: image }
		});
		return await modal.present();
	}

	async notifications(ev: any) {
		const popover = await this.popoverCtrl.create({
		component: NotificationsComponent,
		event: ev,
		animated: true,
		showBackdrop: true
		});
		return await popover.present();
	}

	async consoleLog(){
		console.log("ok");
	}

	}
