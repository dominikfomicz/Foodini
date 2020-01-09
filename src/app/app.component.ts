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

  user_type: any = '0';

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
        url: '/about',
        direct: 'forward',
        icon: 'information-circle'
      },
    ];
    // if(this.platform.pause){
    //   localStorage.clear();
    // }
    this.initializeApp();
  }

  initializeApp() {
    this.user_type = localStorage.getItem('user_type');
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
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
