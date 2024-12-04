import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderService } from 'src/app/core/services/repair-order.service';
import { CarService } from 'src/app/modules/car/car.service';
import { Car } from 'src/app/modules/car/models/car';

@Component({
  selector: 'app-add-new-order-modal',
  templateUrl: './add-new-order-modal.component.html',
  styleUrl: './add-new-order-modal.component.css'
})
export class AddNewOrderModalComponent {

  searchCarTerm: string;
  filtredCars : Car[];

 constructor( private orderService : RepairOrderService,
  private carService : CarService
 ){}



  modal =inject(NgbModal);
  today = inject(NgbCalendar).getToday();
	model: NgbDateStruct;
	date: { year: number; month: number };

  close(){
    this.modal.dismissAll();
  }

  save(orderForm : NgForm){
 this.orderService.addOrder$(orderForm.value).subscribe((data) => {
  })

}
 searchCar(){
  this.carService.getAllCars$().subscribe({
    next : (data) =>{
      this.filtredCars = data.data.cars.filter(car => car.licencePlate.includes(this.searchCarTerm)); },
    error : (error) => {console.log(error)}

    }) 
 }

}
