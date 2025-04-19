import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddNewWorkshopAction, DeleteWorkshopAction, LoadWorkshopsActions } from '../../store/workshop.actions';
import { WorkshopService } from '../../workshop.service';
import { selectAllWorkshops } from '../../store/workshop.selectors';
import { Workshop } from 'src/app/core/interfaces/workshop';


@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.css',
  standalone: false,
})
export class WorkshopComponent implements OnInit {
  public workshops$ = this.store.select(selectAllWorkshops);

  constructor(private store: Store, private workshopService: WorkshopService) { }
  ngOnInit(): void {
    this.store.dispatch(LoadWorkshopsActions.start());
   
    this.workshops$.subscribe((workshops) => {
      console.log('Workshops:', workshops);
    });
   
  }

  openNewWorkshopModal(workshop?: Workshop) {
    this.workshopService.openNewWorkshopModal(workshop);
  }


  

  deleteWs(workshopId :number) {
    console.log(workshopId)
    this.store.dispatch(DeleteWorkshopAction.start({id :workshopId} ))
    

  }

}
