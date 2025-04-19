import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';


import { ChartData, ChartOptions, ChartType, LabelItem } from 'chart.js';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';

import { OrderService } from 'src/app/modules/order/order.service';
import { Order } from 'src/app/modules/order/interfaces/order';
import { OrderState } from 'src/app/modules/order/interfaces/order.state';




@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  standalone: false,
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
      },
    },
  };
  public pieChartLabels: string[] = [
    'Orders Pending',
    'Orders In Progress',
    'Orders Cancelled',
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  private pendingOrders = 0;
  public inProgressOrders = 0;
  private cancelledOrders = 0;
  pieChartData: {
    data: number[];
    label: string;
    backgroundColor: string[]; // Set the colors for the chart segments
  }[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    const ordersSub = this.orderService.getAllOrders$().subscribe(
      (response: CustomHttpResponse<OrderState>) => {
        if (response.data?.orders) {
          this.processOrders(response.data.orders);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  private processOrders(orders: Order[]): void {
    this.pendingOrders = 0;
    this.inProgressOrders = 0;
    this.cancelledOrders = 0;

    orders.forEach((order) => {
      if (order.status === 'Pending') {
        this.pendingOrders++;
      } else if (order.status === 'In Progress') {
        this.inProgressOrders++;
      } else if (order.status === 'CANCELLED') {
        this.cancelledOrders++;
      }
    });

    this.pieChartData = [
      {
        data: [this.pendingOrders, this.inProgressOrders, this.cancelledOrders],
        label: 'Orders',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Set the colors for the chart segments
      },
    ];
  }
}

  

