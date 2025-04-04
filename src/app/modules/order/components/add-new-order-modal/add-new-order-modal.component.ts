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
import { BehaviorSubject, combineLatest, first, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Technician } from 'src/app/modules/technician/models/technician';
import { selectAllTechnicians } from 'src/app/modules/technician/store/technician.selectors';

import { AddNewCarComponent } from 'src/app/modules/car/components/add-new-car/add-new-car.component';
import { WorkshopService } from 'src/app/core/services/workshop.service';
import { loadTechs } from 'src/app/modules/technician/store/technician.actions';

@Component({
  selector: 'app-add-new-order-modal',
  templateUrl: './add-new-order-modal.component.html',
  styleUrl: './add-new-order-modal.component.css',
})
export class AddNewOrderModalComponent implements OnInit {
  searchCarTerm: string;
  car: Car = null;
  selectedVehicleId: number = null;
  allCars$: Observable<Car[]>;
  allTechnicians$: Observable<Technician[]> =
    this.store.select(selectAllTechnicians);
  allWorkshops$ = this.workshopService.getAllWorkshops$();
  addCar: boolean = false;
  filtredCars$: Observable<(Car | { addCar: boolean })[]>;
  private searchTermSubject$ = new BehaviorSubject<string>('');

  constructor(
    private orderService: RepairOrderService,
    private carService: CarService,
    private store: Store,
    private ngbModal: NgbModal,
    private workshopService: WorkshopService
  ) { }
  
  ensureTechnicianLoaded() {
    this.store.select(selectAllTechnicians).pipe(first())
      .subscribe(technicians => {
        if (technicians.length === 0) {
                  this.store.dispatch(loadTechs())
                }
              })
  }

  ngOnInit(): void {
    this.ensureTechnicianLoaded();
    //this is from service directly not from the store  --- need to corect it
    this.allCars$ = this.carService.getAllCarList$();
    this.filtredCars$ = combineLatest([
      this.allCars$,
      this.searchTermSubject$,
    ]).pipe(
      map(([cars, searchTerm]) => {
        if (searchTerm === '') {
          return [];
        }
        const filtredCars = cars.filter((car) =>
          car.licencePlate.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtredCars.length > 0 ? filtredCars : [{ addCar: true }];
      })
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

  searchCar() {
    this.car = null;
    this.searchTermSubject$.next(this.searchCarTerm);
  }

  openAddCarModal() {
    this.ngbModal.dismissAll();
    this.ngbModal.open(AddNewCarComponent, { size: 'lg' });
  }

  setCar(licencePLate: string) {
   
    this.allCars$.subscribe((allCars) => {
      const foundCar = allCars.find((car) => car.licencePlate === licencePLate);
     
      if (foundCar) {
        this.car = foundCar;
        this.selectedVehicleId = this.car.id;
      }

    });

    this.searchCarTerm = licencePLate;
  }

  //TODO
  //need to understand this function
  isAddCarOption(car: Car | { addCar: boolean }): car is { addCar: boolean } {
    return (car as { addCar: boolean }).addCar !== undefined;
  }
}
