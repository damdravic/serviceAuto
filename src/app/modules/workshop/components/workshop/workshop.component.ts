import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WorkshopActions } from '../../store/workshop.actions';
import { WorkshopService } from '../../workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.css'
})
export class WorkshopComponent {

  constructor(private store: Store,
    private workshopService : WorkshopService
  ) {
    
  }

  openNewWorkshopModal() {
    this.workshopService.openNewWorkshopModal();
  }


  addWorkshop(form: NgForm) {
    this.store.dispatch(WorkshopActions.actWorkshops())
}

}
