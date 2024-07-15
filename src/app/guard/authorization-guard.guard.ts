
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router,RouterStateSnapshot } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({providedIn:'root'})
export class AuthorizationGuard{
  constructor(private userService:UserService,private router:Router){}

  canActivate(routSnapShout: ActivatedRouteSnapshot,state : RouterStateSnapshot):boolean{
    return this.isAuthenticated();
  }
    private isAuthenticated(): boolean {

      if(this.userService.isAuthenticated){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
      
  }

}


