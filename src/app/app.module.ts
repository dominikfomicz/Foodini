import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Modal Pages
import { ImagePageModule } from './pages/modal/image/image.module';

// Components
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LocalCardPageModule } from './pages/modal/local-card/local-card.module';
import { CouponCardPageModule } from './pages/modal/coupon-card/coupon-card.module';
import { FilterCardPageModule } from './pages/modal/filter-card/filter-card.module';
import { MapCardPageModule } from './pages/map-card/map-card.module';
import { MapItemCardPageModule } from './pages/modal/map-card/map-item-card.module';

@NgModule({
	declarations: [AppComponent, NotificationsComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		ImagePageModule,
		LocalCardPageModule,
		CouponCardPageModule,
		FilterCardPageModule,
		MapItemCardPageModule
	],
	entryComponents: [NotificationsComponent],
	providers: [
		StatusBar,
		SplashScreen,
		UniqueDeviceID,
		Uid,
		AndroidPermissions,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
