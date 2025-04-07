import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false,
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.errorMessage = 'Fied cannot be empty !';
      return;
    }
    this.errorMessage = '';
    const formData = registerForm.value;

    const user: User = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    this.userService.register(user).subscribe({
      next: (response: CustomHttpResponse<User>) => {
        console.log('Register successfull', response);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('register Error', error);
        this.errorMessage = error;
      },
    });

    registerForm.reset();
  }
}
