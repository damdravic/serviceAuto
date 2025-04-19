import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddNewOrderModalComponent } from '../../modules/order/components/add-new-order-modal/add-new-order-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { catchError, map, Observable, of, startWith } from 'rxjs';


import { EditRepairOrderModalComponent } from '../../modules/order/components/edit-repair-order-modal/edit-repair-order-modal.component';
import { Store } from '@ngrx/store';
import { selectAllTechnicians } from '../../modules/technician/store/technician.selectors';
import { CarService } from 'src/app/modules/car/car.service';
import { Car } from 'src/app/modules/car/models/car';
import { EditInfoOrderComponent } from 'src/app/modules/order/components/edit-info-order/edit-info-order.component';
import { OrderService } from 'src/app/modules/order/order.service';
import { Order } from 'src/app/modules/order/interfaces/order';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  itemsPerPage: number = 3;
  currentPage: number = 1;


 
  public technicians$ = this.store.select(selectAllTechnicians);
  public cars$: Observable<Car[]>;
reloadPagination: any;
OrderDataState: any;

  constructor(
    private ngbModal: NgbModal,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private carsService: CarService
  ) {}

  ngOnInit(): void {
    //this.getOrders();
    this.getAllCars$();
  }
  collapsed = true;

  addNew() {
    this.ngbModal.open(AddNewOrderModalComponent, { size: 'lg' });
  }
/*
  getOrders() {
    this.orderState$ = this.orderService.getAllOrders$().pipe(
      map((response) => {
        this.orders = response.data.repairOrders;
        return {
          dataState: DataState.LOADED,
        };
      }),
      startWith({ dataState: DataState.LOADING }),
      catchError((error) => {
        return of({ dataState: DataState.ERROR, error: error });
      })
    );
  }
*/
  editOrder(order: Order) {
    const modalRef = this.ngbModal.open(EditRepairOrderModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.order = order;
  }

  editInfoOrder(order: Order) {
    const modalRef = this.ngbModal.open(EditInfoOrderComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.order = order;
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.orders.slice(start, end);
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
