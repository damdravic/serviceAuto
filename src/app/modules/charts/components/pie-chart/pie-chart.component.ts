import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { RepairOrderService } from 'src/app/core/services/repair-order.service';
import { ChartData, ChartOptions, ChartType, LabelItem } from 'chart.js';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderState } from 'src/app/interface/repair-order-state';




@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
      }
    }
  };
  public pieChartLabels: string[] = ['Orders Pending', 'Orders In Progress', 'Orders Cancelled'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  private pendingOrders = 0;
  public inProgressOrders = 0;
  private cancelledOrders = 0;
  pieChartData: {
    data: number[]; label: string; backgroundColor: string[]; // Set the colors for the chart segments
  }[];

  constructor(private orderService: RepairOrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  

  private getAllOrders(): void {
    const ordersSub = this.orderService.getAllOrders$().subscribe(
      (response: CustomHttpResponse<RepairOrderState>) => {
        if (response.data?.repairOrders) {
          this.processOrders(response.data.repairOrders);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
    
  }

  private processOrders(orders: RepairOrder[]): void {
    this.pendingOrders = 0;
    this.inProgressOrders = 0;
    this.cancelledOrders = 0;

    orders.forEach(order => {
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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] // Set the colors for the chart segments
      }
    ];
  }




  }

  

