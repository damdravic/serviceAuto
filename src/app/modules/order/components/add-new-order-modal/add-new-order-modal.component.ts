import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderService } from 'src/app/core/services/repair-order.service';
import { CarService } from 'src/app/modules/car/car.service';
import { Car } from 'src/app/modules/car/models/car';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-new-order-modal',
  templateUrl: './add-new-order-modal.component.html',
  styleUrl: './add-new-order-modal.component.css',
})
export class AddNewOrderModalComponent implements OnInit {
  searchCarTerm: string;
  allCars$: Observable<Car[]>;
  filtredCars$: Observable<Car[]>;
  private searchTermSubject$ = new BehaviorSubject<string>('');

  constructor(
    private orderService: RepairOrderService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.allCars$ = this.carService.getAllCarList$();
    this.filtredCars$ = combineLatest([this.allCars$,this.searchTermSubject$]).pipe(
     map(([cars,searchTerm]) => searchTerm ?  cars.filter(car => car.licencePlate.toLowerCase()
                    .includes(searchTerm.toLowerCase())) : []
                  )
    );
  }


  modal = inject(NgbModal);
  today = inject(NgbCalendar).getToday();
  model: NgbDateStruct;
  date: { year: number; month: number };

  close() {
    this.modal.dismissAll();
  }

  save(orderForm: NgForm) {
    this.orderService.addOrder$(orderForm.value).subscribe((data) => {});
  }
  searchCar(){
    this.searchTermSubject$.next(this.searchCarTerm);
      
  }


  
}
