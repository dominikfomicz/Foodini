import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NoAuthService } from './no-auth.service';


@Injectable()
export class NoAuthGuard implements CanActivate {

	// add the service we need
	constructor(
		private auth: NoAuthService,
		private router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

			// handle any redirects if a user isn't authenticated
			if (!this.auth.isLoggedIn) {
				// redirect the user
				this.router.navigateByUrl('/home-results');
				return false;
			}

			return true;
	}

}
