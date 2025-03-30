import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { Workshop } from 'src/app/core/interfaces/workshop';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { environment } from 'src/environments/environment';
import { NewWorkshopModalComponent } from './components/new-workshop-modal/new-workshop-modal.component';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  private readonly baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private modal: NgbModal) {}

  getAllWorkshops$(): Observable<
    CustomHttpResponse<{ workshops: Workshop[] }>
  > {
    return this.http
      .get<CustomHttpResponse<{ workshops: Workshop[] }>>(
        `${this.baseUrl}/workshop/all`
      )
      .pipe(tap((response) => console.log('API Response', response)));
  }

  addNewWorkshop$(
    workshop: Workshop
  ): Observable<CustomHttpResponse<Workshop>> {
    return this.http
      .post<CustomHttpResponse<Workshop>>(
        `${this.baseUrl}/newWorkshop`,
        workshop
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        if (error.error.reason) {
          errorMessage = error.error.reason;
        } else {
          errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
        }
      }
    } else {
      errorMessage = `en error occured - error status ${error.status} - error message ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  openNewWorkshopModal() {
    this.modal.open(NewWorkshopModalComponent,{size : 'md'})
  }
 
  closeModal() {
    this.modal.dismissAll();
  }



}




