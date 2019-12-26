import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-local-card',
  templateUrl: './coupon-card.page.html',
  styleUrls: ['./coupon-card.page.scss'],
})
export class CouponCardPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };

  id_coupon_data_main;
  code;
  button = true;

  public favColor = "primary";

  constructor(private modalCtrl: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.id_coupon_data_main)
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

  generateCode(){
	this.code = Math.random().toString().slice(5,11);
	this.button = false;
  }



}
