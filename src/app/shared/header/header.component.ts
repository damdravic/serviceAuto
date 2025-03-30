import { Component, EventEmitter, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Key } from 'src/app/enum/key';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() isCollapsed = new EventEmitter<boolean>();
  private jwtHelper = new JwtHelperService();
  public dropdownOpen = false;


  constructor(private userService: UserService) {}
  role: string = this.getRole();

  switchSidenav() {
    this.isCollapsed.emit();
  }

  getUsername() : string {
    const token : string = localStorage.getItem(Key.TOKEN)
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    } else {
      return 'Guest';
    }
  }

  getName() : string{
    const token : string = localStorage.getItem(Key.TOKEN)
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username =  decodedToken.names;
      return username;
    }else{
      return 'Guest';
    }
  }

  getRole(): string {
    const token = localStorage.getItem(Key.TOKEN);
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.role = decodedToken.authorities[0];
      return this.role; // Assuming the role is stored in the 'role' claim
    } else {
      this.role = 'guest'; // Default role if no token is found
      return this.role;
    }
  }

  logout() {
    this.userService.logout();
  }



  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }

}
