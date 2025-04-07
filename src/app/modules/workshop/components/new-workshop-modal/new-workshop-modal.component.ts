import { Component } from '@angular/core';
import { WorkshopService } from '../../workshop.service';
import { NgForm } from '@angular/forms';
import { Workshop } from 'src/app/core/interfaces/workshop';

@Component({
  selector: 'app-new-workshop-modal',
  templateUrl: './new-workshop-modal.component.html',
  styleUrl: './new-workshop-modal.component.css'
})
export class NewWorkshopModalComponent {

 constructor(private workshopService : WorkshopService){}


  
  addNewWs(newWorkshop : NgForm){
    this.workshopService.addNewWorkshopService(newWorkshop)

  }

  closeModal() {
    this.workshopService.closeModal();
}


}
