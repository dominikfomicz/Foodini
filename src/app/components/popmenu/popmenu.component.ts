import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomeResultsPage } from 'src/app/pages/home-results/home-results.page';

@Component({
  selector: 'popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss']
})
export class PopmenuComponent implements OnInit {
  openMenu: Boolean = false;

  constructor(public navCtrl: NavController, public homeCtrl: HomeResultsPage) { }

  ngOnInit() {
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

  consoleLog() {
    return 0;
  }

}
