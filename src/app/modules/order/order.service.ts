import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Key } from 'src/app/enum/key';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { Labor } from 'src/app/interface/labor';
import { Part } from 'src/app/interface/part';
import { RepairOrder } from 'src/app/interface/repair-order';
import { RepairOrderState } from 'src/app/interface/repair-order-state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private readonly server: string = environment.apiUrl;

  getAllOrders$ = () =>
    <Observable<CustomHttpResponse<RepairOrderState>>>(
      this.http
        .get<CustomHttpResponse<RepairOrderState>>(
          `${this.server}/repairOrder/all`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  addOrder$ = (order: RepairOrder) =>
    <Observable<CustomHttpResponse<RepairOrder>>>(
      this.http
        .post<CustomHttpResponse<RepairOrder>>(
          `${this.server}/repairOrder/create`,
          order
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
      } else {
        errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
      }
    }
    return throwError(() => errorMessage);
  }

  // fake data

  parts: Part[] = [
    new Part(1, 'aripa', '1234', 'aripa auto', 100),
    new Part(2, 'motor', '1235', 'motor auto', 200),
    new Part(3, 'bieleta', '1236', 'bieleta auto', 300),
    new Part(4, 'parbriz', '1237', 'parbriz auto', 400),
    new Part(5, 'bucsa', '1238', 'bucsa auto', 500),
    new Part(6, 'roata', '1239', 'roata auto', 600),
    new Part(7, 'radiator', '1240', 'radiator auto', 700),
    new Part(8, 'ventilator', '1241', 'ventilator auto', 800),
    new Part(9, 'far', '1242', 'far auto', 900),
    new Part(10, 'proiector', '1243', 'proiector auto', 1000),
  ];
  fakeLabors: Labor[] = [
    {
      id: 1,
      name: 'Schimb ulei  ',
      price: 2,
      code: 'co1 ',
      descriprion: 'schimb Ulei desc',
      time: 1,
    },
    {
      id: 2,
      name: 'Schimb filtru ulei  ',
      price: 3,
      code: 'co2 ',
      descriprion: 'schimb filtru ulei desc',
      time: 2,
    },
    {
      id: 3,
      name: 'Schimb filtru aer  ',
      price: 4,
      code: 'co3 ',
      descriprion: 'schimb filtru aer desc',
      time: 3,
    },
    {
      id: 4,
      name: 'Schimb filtru polen  ',
      price: 5,
      code: 'co4 ',
      descriprion: 'schimb filtru polen desc',
      time: 4,
    },
    {
      id: 5,
      name: 'Schimb filtru combustibil  ',
      price: 6,
      code: 'co5 ',
      descriprion: 'schimb filtru combustibil desc',
      time: 5,
    },
    {
      id: 6,
      name: 'Schimb distributie  ',
      price: 7,
      code: 'co6 ',
      descriprion: 'schimb distributie desc',
      time: 6,
    },
    {
      id: 7,
      name: 'Schimb bujii  ',
      price: 8,
      code: 'co7 ',
      descriprion: 'schimb bujii desc',
      time: 7,
    },
    {
      id: 8,
      name: 'Schimb lichid frana  ',
      price: 9,
      code: 'co8 ',
      descriprion: 'schimb lichid frana desc',
      time: 8,
    },
  ];

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem(Key.TOKEN),
  });
}
