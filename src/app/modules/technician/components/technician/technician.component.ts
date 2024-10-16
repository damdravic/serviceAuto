import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTech, loadTechs } from '../../store/technician.actions';
import { Technician } from '../../models/technician';
import { selectAllTechnicians } from '../../store/technician.selectors';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrl: './technician.component.css'
})
export class TechnicianComponent implements OnInit{

  public technicians$ = this.store.select(selectAllTechnicians);


  constructor(private store : Store){}


  ngOnInit(): void {
    this.store.dispatch(loadTechs());
  }

 newTech : Technician = {
  id: 3,
  isActive : true,
  workshop : 'Workshop 3',
  technicianExperience : 5,
  techicianSpecialization : 'Specialization 3'
}

addTech(nt : Technician){
  this.store.dispatch(addTech({content : nt}))
}
}