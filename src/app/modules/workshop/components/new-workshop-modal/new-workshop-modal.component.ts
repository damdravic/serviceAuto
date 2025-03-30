import { Component } from '@angular/core';
import { WorkshopService } from '../../workshop.service';

@Component({
  selector: 'app-new-workshop-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-workshop-modal.component.html',
  styleUrl: './new-workshop-modal.component.css'
})
export class NewWorkshopModalComponent {

 constructor(private workshopService : WorkshopService){}



  closeModal() {
    this.workshopService.closeModal();
}


}
