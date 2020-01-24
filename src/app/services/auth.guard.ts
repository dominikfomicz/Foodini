import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

	// add the service we need
	constructor(
		private auth: AuthService,
		private router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

			// handle any redirects if a user isn't authenticated
			if (!this.auth.isLoggedIn) {
				// redirect the user
				this.router.navigateByUrl('/welcome-page');
				return false;
			}

			return true;
	}

}
