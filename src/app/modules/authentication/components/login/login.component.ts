import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth-actions.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private store : Store) {
  
}


  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.store.dispatch(login({ credentials: loginForm.value }))
    }
  }

 





}
