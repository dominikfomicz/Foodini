import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {
  
  message = "";

  constructor(public device: UniqueDeviceID) { 
    this.device.get()
  .then((uuid: any) => this.message = uuid)
  .catch((error: any) => this.message = error)
  }

  ngOnInit() {
  
  }
 
}
