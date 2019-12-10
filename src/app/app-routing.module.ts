import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	// { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: '', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
	{ path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
	{ path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
	{ path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
	{ path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
	{ path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
	{ path: 'local-coupons-card', loadChildren: './pages/local-coupons-card/local-coupons-card.module#LocalCouponsCardPageModule' },
	{ path: 'map-card', loadChildren: './pages/modal/filter-card/filter-card.module#FilterCardPageModule' },
	{ path: 'filter-card', loadChildren: './pages/map-card/map-card.module#MapCardPageModule' },
	{ path: 'welcome-page', loadChildren: './pages/welcome-page/welcome-page.module#WelcomePagePageModule' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}
