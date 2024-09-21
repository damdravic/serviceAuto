import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard {
  constructor(private authService: UserService, private router: Router) {}

  canActivate(
    routeSnapShot: AuthenticationGuard,
    state: RouterStateSnapshot
  ): boolean {
   
    return this.isAuthenticated();
    

  }

  private isAuthenticated(): boolean {
  
   
    if (this.authService.getAuth()) {

      return true;
    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }
}
