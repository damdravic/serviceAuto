import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTech, loadTechs } from '../../store/technician.actions';
import { Technician } from '../../models/technician';
import { selectAllTechnicians } from '../../store/technician.selectors';
import { selectAllUsers } from '../../../user/store/user.selectors';
import { TechnicianService } from '../../technician.service';
import { loadUsers } from 'src/app/modules/user/store/user.actions';
import { User } from 'src/app/interface/user';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrl: './technician.component.css',
  standalone: false,
})
export class TechnicianComponent implements OnInit {
  deleteTech(arg0: Technician) {
    throw new Error('Method not implemented.');
  }
  editTech(arg0: Technician) {
    throw new Error('Method not implemented.');
  }

  public users$ = this.store.select(selectAllUsers);
  public technicians$ = this.store.select(selectAllTechnicians);
  public selectedTech: Technician | null = null;
  public selectedTechUser$: Observable<User> | null = null;

  public jde = this.service.getTechnicians$().subscribe(console.log);

  constructor(private store: Store, private service: TechnicianService) {}

  ngOnInit(): void {
    this.store.dispatch(loadTechs());
    this.store.dispatch(loadUsers());
    this.jde;
  }

  addNewTech() {
    this.service.addNewTechModal();
  }

  addTech(nt: Technician) {
    this.store.dispatch(addTech({ content: nt }));
  }

  selectTech(tech: Technician) {
    this.selectedTech = tech;

    this.selectedTechUser$ = this.users$.pipe(
      map((users) => users.find((user) => user.userId === tech.userId))
    );
  }
}


