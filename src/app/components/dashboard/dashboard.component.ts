import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddNewOrderModalComponent } from '../../modules/order/components/add-new-order-modal/add-new-order-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { XcompComponent } from '../xcomp/xcomp.component';
import { RepairOrderService } from 'src/app/service/repair-order.service';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { RepairOrderState } from 'src/app/interface/repair-order-state';
import { DataState } from 'src/app/interface/data-state';
import { RepairOrder } from 'src/app/interface/repair-order';
import { EditRepairOrderModalComponent } from '../../modules/order/components/edit-repair-order-modal/edit-repair-order-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orders: RepairOrder[] = [];
  itemsPerPage: number = 3;
  currentPage: number = 1;
  orderState$: Observable<RepairOrderState> = of({
    dataState: DataState.LOADED,
  });

  readonly DataState = DataState;

  constructor(
    private ngbModal: NgbModal,
    private orderService: RepairOrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }
  collapsed = true;

  // switch() {
  //   this.collapsed = !this.collapsed;
  // }

  addNew() {
    this.ngbModal.open(AddNewOrderModalComponent, { size: 'lg' });
  }

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

  editOrder(order: RepairOrder) {
    const modalRef = this.ngbModal.open(EditRepairOrderModalComponent, {
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
}
