import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTech, loadTechs } from '../../store/technician.actions';
import { Technician } from '../../models/technician';
import { selectAllTechnicians } from '../../store/technician.selectors';
import { TechnicianService } from '../../technician.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTechnicianComponent } from '../add-technician/add-technician.component';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrl: './technician.component.css'
})
export class TechnicianComponent implements OnInit{

  public technicians$ = this.store.select(selectAllTechnicians);

  public jde = this.service.getTechnicians$().subscribe(console.log);

  constructor(private store : Store, 
    private service : TechnicianService,
  private modal : NgbModal){}


  ngOnInit(): void {
    this.store.dispatch(loadTechs());
    this.jde;
  }

 newTech : Technician = {
  id: 3,
  isActive : true,
  workshop : 'Workshop 3',
  experience : 5,
  specialization : 'Specialization 3'
}


addNewTech(){
  this.modal.open(AddTechnicianComponent, {size : 'lg'});

}

addTech(nt : Technician){
  this.store.dispatch(addTech({content : nt}))
}
}