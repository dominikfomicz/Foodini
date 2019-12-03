import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-local-card',
  templateUrl: './local-card.page.html',
  styleUrls: ['./local-card.page.scss'],
})
export class LocalCardPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };

  foo;
  bar;
  public favColor = "secondary";

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(`${this.foo} ${this.bar}`)
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  changeFavColor(){
    if(this.favColor == "light"){
      this.favColor = "secondary"
    }else{
      this.favColor = "light";
    }
  }

}
