import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
  tap,
} from 'rxjs';

import { EditRepairOrderModalComponent } from '../../modules/order/components/edit-repair-order-modal/edit-repair-order-modal.component';
import { Store } from '@ngrx/store';
import { selectAllTechnicians } from '../../modules/technician/store/technician.selectors';
import { CarService } from 'src/app/modules/car/car.service';
import { Car } from 'src/app/modules/car/models/car';
import { OrderService } from 'src/app/modules/order/order.service';
import { Order } from 'src/app/modules/order/interfaces/order';
import { selectAllOrders } from 'src/app/modules/order/store/order.selectors';
import { LoadOrderActions } from 'src/app/modules/order/store/order.actions';
import { AddEditOrderModalComponent } from 'src/app/modules/order/components/add-edit-order-modal/add-edit-order-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  //get orders from store OrderState: orders
  allOrders$ = this.store.select(selectAllOrders);

  //for pagination
  itemsPerPage: number = 3;
  currentPage: number = 1;
  paginatedOrders$: Observable<Order[]>;

  itemPerPageSubject = new BehaviorSubject<number>(this.itemsPerPage);
  currentPageSubject = new BehaviorSubject<number>(this.currentPage);

  reloadPagination() {
    setTimeout(() => {
      this.currentPage = 1;
      this.updatePaginateOrders();
    }, 10);
  }

  public technicians$ = this.store.select(selectAllTechnicians);
  public cars$: Observable<Car[]>;

  OrderDataState: any;

  constructor(
    private ngbModal: NgbModal,
    private orderService: OrderService,
    private store: Store,
    private carsService: CarService
  ) {}

  ngOnInit(): void {
 
this.allOrders$.subscribe((orders) => {
  console.log('Orders:', orders);
});

    this.store.dispatch(LoadOrderActions.start());
    this.updatePaginateOrders();

    this.getAllCars$();
  }

  collapsed = true;

  //methode to open modal
  addNew(order?: Order) {
    const modRef = this.ngbModal.open(AddEditOrderModalComponent, {
      size: 'lg',
    });
    modRef.componentInstance.order = order;
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePaginateOrders();
  }

  updatePaginateOrders() {

    this.paginatedOrders$ = this.allOrders$.pipe(
      map((orders) => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return orders.slice(start, end);
      })
    );
  }

  getAllCars$(): void {
    this.carsService.getAllCars$().subscribe({
      next: (response) => {
        this.cars$ = of(response.data.cars);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
