import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { User } from 'src/app/interface/user';

import { TechnicianService } from 'src/app/modules/technician/technician.service';
import { UserService } from 'src/app/modules/user/user.service';
import { Technician } from '../../modules/technician/models/technician';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private router: Router, 
    private userService: UserService,
  private techService : TechnicianService) {}
  



  public onFocus(event) {
    event.target.classList.add('active');
  }

  public onBlur(event) {
    if (event.target.value == '') {
      event.target.classList.remove('active');
    }
  }



  register(registerForm: NgForm): void {
    this.userService.register(  registerForm.value).subscribe(
      (response : CustomHttpResponse<User>) =>{
        console.log('User registered', response);
        this.router.navigate(['/technician']).then(() => {
        
         this.techService.addNewTechModal();
      }) ;
      }
    ),(error : string) => {
      console.error('User not registered', error);
    }
    
  }

   



}
