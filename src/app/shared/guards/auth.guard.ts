import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../../../../server/dist/interfaces/User.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }


  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {

    const user: User | null = this.authService.user;
    if (!user) {
      return this.router.navigate(['/login'])
    }
    this.router.parseUrl(`${state.url}`);
    return true;
  }
}