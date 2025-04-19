import { Component, Input, OnInit } from '@angular/core';
import { WorkshopService } from '../../workshop.service';
import { NgForm } from '@angular/forms';
import { Workshop } from 'src/app/modules/workshop/interfaces/workshop';

@Component({
  selector: 'app-new-workshop-modal',
  templateUrl: './new-workshop-modal.component.html',
  styleUrl: './new-workshop-modal.component.css',
  standalone: false,
})
export class NewWorkshopModalComponent implements OnInit {
  @Input() workshopx?: Workshop;

  //create a editable copy
  workshopForm: Workshop = { id: 0, name: '', description: '' };

  constructor(private workshopService: WorkshopService) {}

  ngOnInit(): void {
    if (this.workshopx) {
      this.workshopForm = { ...this.workshopx };
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.workshopx) {
      // console.log('is workshopx' + this.workshopForm.description);
      this.workshopService.editWorkshopService(
        this.workshopForm.id,
        this.workshopForm
      );
    } else {
      //console.log('not workshopx' + this.workshopForm);
      this.workshopService.addNewWorkshopService(this.workshopForm);
    }
  }

  closeModal() {
    console.log('close ........');
    this.workshopService.closeModal();
  }
}
