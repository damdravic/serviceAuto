import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

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
    console.log("in guard is utthenticated")
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated())
      return true;
    } else {
      console.log("Else" + this.authService.isAuthenticated())
      this.router.navigate(['/login']);
      return false;
    }
  }
}
