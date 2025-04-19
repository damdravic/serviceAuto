import { Component, inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

import { CarService } from 'src/app/modules/car/car.service';
import { Car } from 'src/app/modules/car/models/car';
import {
  BehaviorSubject,
  combineLatest,
  first,
  map,
  Observable,
  of,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { Technician } from 'src/app/modules/technician/models/technician';
import { selectAllTechnicians } from 'src/app/modules/technician/store/technician.selectors';

import { AddNewCarComponent } from 'src/app/modules/car/components/add-new-car/add-new-car.component';

import { loadTechs } from 'src/app/modules/technician/store/technician.actions';
import { WorkshopService } from 'src/app/modules/workshop/workshop.service';
import { OrderService } from '../../order.service';
import { Order } from '../../interfaces/order';
import { initialOrder } from '../../interfaces/initial-order';

@Component({
  selector: 'app-add-new-order-modal',
  templateUrl: './add-new-order-modal.component.html',
  styleUrl: './add-new-order-modal.component.css',
  standalone: false,
})
export class AddNewOrderModalComponent implements OnInit {
  @Input() order: Order;
  //editable  order
  formOrder = initialOrder;

  searchCarTerm: string;
  car: Car = null;
  selectedVehicleId: number = null;
  allCars$: Observable<Car[]>;
  allTechnicians$: Observable<Technician[]> =
    this.store.select(selectAllTechnicians);
  allWorkshops$ = this.workshopService
    .getAllWorkshops$()
    .pipe(map((response) => response.data?.workshops));
  addCar: boolean = false;
  filtredCars$: Observable<(Car | { addCar: boolean })[]>;
  private searchTermSubject$ = new BehaviorSubject<string>('');

  constructor(
    private orderService: OrderService,
    private carService: CarService,
    private store: Store,
    private ngbModal: NgbModal,
    private workshopService: WorkshopService
  ) {}

  ensureTechnicianLoaded() {
    this.store
      .select(selectAllTechnicians)
      .pipe(first())
      .subscribe((technicians) => {
        if (technicians.length === 0) {
          this.store.dispatch(loadTechs());
        }
      });
  }

  ngOnInit(): void {
    if (this.order) {
      this.formOrder = { ...this.order };
    }

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
    this.orderService.addNewOrderService(this.formOrder);
    // this.orderService.addOrder$(orderForm.value).subscribe((data) => {});
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
        this.formOrder.vehicleId = this.car.id;
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
