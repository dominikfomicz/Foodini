import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class NoAuthGuard implements CanActivate {

	constructor(private auth: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.auth.isAuthenticated() === true) {
			return false;
		}
	}

}
