import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagersLocalsListPage } from './managers-locals-list.page';

const routes: Routes = [
  {
    path: '',
    component: ManagersLocalsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagersLocalsListPage]
})
export class ManagersLocalsListPageModule {}
