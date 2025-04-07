import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CarService } from '../../car.service';

@Component({
  selector: 'app-add-new-car',

  templateUrl: './add-new-car.component.html',
  styleUrl: './add-new-car.component.css',
  standalone: false,
})
export class AddNewCarComponent {
  constructor(private carService: CarService) {}

  save(form: NgForm) {
    console.log(form.value);
    this.carService.closeModal();
  }

  cancel() {
    this.carService.closeModal();
  }
}
