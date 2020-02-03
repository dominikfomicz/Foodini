import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
import { Device } from '@ionic-native/device/ngx';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { Facebook } from '@ionic-native/facebook/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { NoAuthGuard } from './services/no-auth.guard';

@NgModule({
	declarations: [AppComponent, NotificationsComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		IonicModule.forRoot({
			mode: 'md',
		}),
		IonicStorageModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		ImagePageModule,
		LocalCardPageModule,
		CouponCardPageModule,
		FilterCardPageModule
	],
	entryComponents: [NotificationsComponent],
	providers: [
		StatusBar,
		SplashScreen,
		Device,
		Facebook,
		AndroidPermissions,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AuthService, AuthGuard, NoAuthGuard
	],
	bootstrap: [AppComponent]
})

export class AppModule {}
