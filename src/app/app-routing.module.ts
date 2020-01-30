import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
	// { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
	{ path: 'about', loadChildren: './pages/about/about.module#AboutPageModule', canActivate: [AuthGuard] },
	{ path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] },
	{ path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule', canActivate: [AuthGuard] },
	{ path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule', canActivate: [AuthGuard] },
	{ path: 'local-coupons-card/:id_local_data_main/:local_name/:phone_number', loadChildren: './pages/local-coupons-card/local-coupons-card.module#LocalCouponsCardPageModule', canActivate: [AuthGuard] },
	{ path: 'map-card', loadChildren: './pages/map-card/map-card.module#MapCardPageModule', canActivate: [AuthGuard] },
	{ path: 'filter-card', loadChildren: './pages/map-card/map-card.module#MapCardPageModule', canActivate: [AuthGuard] },
	{ path: 'welcome-page', loadChildren: './pages/welcome-page/welcome-page.module#WelcomePagePageModule'},
	{ path: 'filter-card', loadChildren: './pages/modal/filter-card/filter-card.module#FilterCardPageModule', canActivate: [AuthGuard] },
	{ path: 'check-coupon', loadChildren: './pages/check-coupon/check-coupon.module#CheckCouponPageModule', canActivate: [AuthGuard] },
	{ path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule', canActivate: [AuthGuard] },
	{ path: 'managers-locals-list', loadChildren: './pages/manager/managers-locals-list/managers-locals-list.module#ManagersLocalsListPageModule', canActivate: [AuthGuard] }



];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
