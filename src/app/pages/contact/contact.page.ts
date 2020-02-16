import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  message;
  name;
  button = true;

  constructor(public alertCtrl: AlertController, public connection: ConnectionService) { }

  ngOnInit() {
  }


  async presentAlert() {
    this.button = false;
    this.connection.getDataByPost('feedback/add', {message: this.message, name: this.name}).subscribe( data => {
      console.log(data);
    });
    const alert = await this.alertCtrl.create({
      header: 'Dziękujemy!',
      subHeader: 'Twoja wiadomość została wysłana',
      buttons: ['OK']
    });

    await alert.present();
  }
}
