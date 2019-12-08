import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocalCouponsCardPage } from './local-coupons-card.page';

const routes: Routes = [
  {
    path: '',
    component: LocalCouponsCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocalCouponsCardPage]
})
export class LocalCouponsCardPageModule {}
