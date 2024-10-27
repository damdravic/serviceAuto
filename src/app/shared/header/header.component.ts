import { Component, EventEmitter, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Key } from 'src/app/enum/key';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() isCollapsed = new EventEmitter<boolean>();
  private jwtHelper = new JwtHelperService();

  constructor(private userService : UserService){}
 role : string =this.getRole();

  switchSidenav(){
    this.isCollapsed.emit();
  }

  getRole():string {
    const token = localStorage.getItem(Key.TOKEN);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.role = decodedToken.authorities[0]; 
      return this.role;// Assuming the role is stored in the 'role' claim
    } else {
      this.role = 'guest'; // Default role if no token is found
      return this.role;
    }
  }

  logout(){
    this.userService.logout();
  }




}
