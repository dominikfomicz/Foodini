import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Dziękujemy!',
      subHeader: 'Twoja wiadomość została wysłana',
      buttons: ['OK']
    });

    await alert.present();
  }
}
