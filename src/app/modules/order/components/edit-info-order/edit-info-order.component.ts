import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, first, map, Observable } from 'rxjs';
import { Car } from 'src/app/modules/car/models/car';
import { WorkshopService } from '../../../../core/services/workshop.service';
import { CarService } from 'src/app/modules/car/car.service';
import { selectAllTechnicians } from 'src/app/modules/technician/store/technician.selectors';
import { loadTechs } from 'src/app/modules/technician/store/technician.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepairOrder } from 'src/app/interface/repair-order';

@Component({
  selector: 'app-edit-info-order',
  templateUrl: './edit-info-order.component.html',
  styleUrl: './edit-info-order.component.css',
})
export class EditInfoOrderComponent implements OnInit {
  @Input() order: RepairOrder;


  description: string = '';
  workshopId: number;

  allWorkshops$ = this.workshopService.getAllWorkshops$();
  allTechnicians$ = this.store.select(selectAllTechnicians);
  selectedVehicleId: Car;
  car: Car;
  allCars$: Observable<Car[]> = this.carService.getAllCarList$();
  searchCarTerm: string;
  searchTermSubject$ = new BehaviorSubject<string>('');
  privatesearchTemSubject$ = new BehaviorSubject<string>('');

  filtredCars$: Observable<(Car | { addCar: boolean })[]> = combineLatest([
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

  constructor(
    private store: Store,
    private workshopService: WorkshopService,
    private NgbModal: NgbModal,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.description = this.order.description;
    this.workshopId = this.order.workshopId;


    this.ensureTechniciaonLoaded();
  }
  ensureTechniciaonLoaded() {
    this.store
      .select(selectAllTechnicians)
      .pipe(first())
      .subscribe((technicians) => {
        if (technicians.length === 0) {
          this.store.dispatch(loadTechs());
        }
      });
  }

  searchCar() {
    this.car = null;
    this.searchTermSubject$.next(this.searchCarTerm);
  }

  close() {
    this.NgbModal.dismissAll();
  }

  save(order: RepairOrder) {}
}
