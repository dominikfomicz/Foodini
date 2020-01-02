import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user_status: any;

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.appPages = [
      // {
      //   title: 'Lokale',
      //   url: '/home-results',
      //   direct: 'root',
      //   icon: 'home'
      // },
      // {
      //   title: 'Kupony',
      //   url: '/tickets',
      //   direct: 'forward',
      //   icon: 'barcode'
      // },

      // {
      //   title: 'Ulubione',
      //   url: '/favourites',
      //   direct: 'forward',
      //   icon: 'star'
      // },

      // {
      //   title: 'Mapa',
      //   url: '/map-card',
      //   direct: 'forward',
      //   icon: 'pin'
      // },

      // {
      //   title: 'Strona powitalna',
      //   url: '/welcome-page',
      //   direct: 'forward',
      //   icon: 'pin'
      // }

      {
        title: 'Poleć aplikację',
        url: '/welcome-page',
        direct: 'forward',
        icon: 'share'
      },

      {
        title: 'Prześlij uwagi',
        url: '/welcome-page',
        direct: 'forward',
        icon: 'mail'
      },

      {
        title: 'O Foodinim',
        url: '/welcome-page',
        direct: 'forward',
        icon: 'information-circle'
      },
    ];

    this.initializeApp();
    this.user_status = localStorage.getItem('user_type');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('/');
  }
}
