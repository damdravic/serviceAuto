import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderService } from 'src/app/core/services/repair-order.service';

@Component({
  selector: 'app-add-new-order-modal',

  templateUrl: './add-new-order-modal.component.html',
  styleUrl: './add-new-order-modal.component.css'
})
export class AddNewOrderModalComponent {
 constructor( private orderService : RepairOrderService){}



  modal =inject(NgbModal);

  today = inject(NgbCalendar).getToday();

	model: NgbDateStruct;
	date: { year: number; month: number };



  close(){
    this.modal.dismissAll();
  }dfvdfvere

  save(orderForm : NgForm){
    console.log( "srfsrf" , orderForm.value);
    

  this.orderService.addOrder$(orderForm.value).subscribe((data) => {
  })

}


}
