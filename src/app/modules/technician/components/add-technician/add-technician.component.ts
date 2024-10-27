import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interface/app-state';
import { User } from 'src/app/interface/user';
import { loadUsers } from 'src/app/modules/user/store/user.actions';
import { selectAllUsers } from 'src/app/modules/user/store/user.selectors';

@Component({
  selector: 'app-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrl: './add-technician.component.css'
})
export class AddTechnicianComponent implements OnInit {

  public users$ = this.store.select(selectAllUsers);



  constructor(private store :Store<AppState>){
  }



  
  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    console.log(this.users$);
  }

 





  searchUser(searchTerm : string){
    console.log(searchTerm);
  }

}
