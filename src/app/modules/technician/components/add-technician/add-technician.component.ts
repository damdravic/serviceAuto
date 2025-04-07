import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { AppState } from 'src/app/interface/app-state';
import { User } from 'src/app/interface/user';
import { loadUsers } from 'src/app/modules/user/store/user.actions';
import { selectAllUsers } from 'src/app/modules/user/store/user.selectors';
import { selectUser } from '../../../user/store/user.selectors';
import { addTech } from '../../store/technician.actions';
import { NgForm } from '@angular/forms';
import { Technician } from '../../models/technician';

@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrl: './add-technician.component.css',
  standalone: false,
})
export class AddTechnicianComponent implements OnInit {
  searchInputv: string = '';
  private searchTerm = new Subject<string>();
  public selectedUser: User = null;

  public users$ = this.store.select(selectAllUsers);
  public usersFound$: Observable<User[]>;
  userIsConfirmed: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
    (this.usersFound$ = this.searchTerm.pipe(
      switchMap((term: string) =>
        this.users$.pipe(
          map((users) =>
            users.filter((user) =>
              user.firstName.toLowerCase().includes(term.toLowerCase())
            )
          )
        )
      )
    )),
      this.usersFound$.subscribe((users) => {
        console.log('Users Found:', users);
      });
  }

  ngOnInit(): void {
    this.selectedUser = null;
    this.userIsConfirmed = false;
    this.store.dispatch(loadUsers());

    this.users$.subscribe((users) => {
      console.log('Users:', users);
    });
  }
  resetSelectedUser() {
    this.selectedUser = null;
    this.userIsConfirmed = false;
  }

  searchUser(searchTerm: string) {
    console.log(searchTerm);
    this.searchTerm.next(searchTerm);
  }

  confirmUser() {
    this.userIsConfirmed = true;
  }

  selectUser(user: User) {
    this.selectedUser = user;
    console.log('Selected User:', user);
  }

  gotoregister() {
    console.log('go to register');
    this.router.navigate(['/register']);
  }

  addTech(form: NgForm) {
    const nt = new Technician(
      form.value.techName,
      this.selectedUser.userId,
      true,
      form.value.workshop,
      form.value.experience,
      form.value.specialization
    );
    console.log('New Tech:', nt);

    this.store.dispatch(addTech({ content: nt }));
  }
}
