import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
	selector: 'app-check-coupon',
	templateUrl: './check-coupon.page.html',
	styleUrls: ['./check-coupon.page.scss'],
})
export class CheckCouponPage implements OnInit {
	unique_number: any = '';
	constructor(public connection: ConnectionService) { }

	ngOnInit() {
	}

	checkCoupon(){
		this.connection.getDataByPost('coupons/checkCoupon', {unique_number: this.unique_number}).subscribe(data=>{
			if(data === 1){
				alert('Zrealizowano kupon');
			}else{
				alert('Kupon nie istnieje');
			}
			console.log(data);
		});
	}

}
