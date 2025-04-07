import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { Workshop } from 'src/app/core/interfaces/workshop';
import { CustomHttpResponse } from 'src/app/interface/custom-http-response';
import { environment } from 'src/environments/environment';
import { NewWorkshopModalComponent } from './components/new-workshop-modal/new-workshop-modal.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WorkshopActions } from './store/workshop.actions';
import { selectAllWorkshops } from './store/workshop.selectors';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  getWsFromStore$() {
    return this.store.select(selectAllWorkshops); 
  }
  private readonly baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private modal: NgbModal,
    private store: Store
  ) {}

  getAllWorkshops$(): Observable<
    CustomHttpResponse<{ workshops: Workshop[] }>
  > {
    return this.http
      .get<CustomHttpResponse<{ workshops: Workshop[] }>>(
        `${this.baseUrl}/workshop/all`
      )
      .pipe(tap((response) => console.log('API Response', response)));
  }

  addNewWorkshopService(newWorshopForm: NgForm) {
    const newWorkshop :Workshop = this.createWorkshop(newWorshopForm);
    this.store.dispatch(WorkshopActions.actNewWorkshop({newWorkshop}));
  }

  addNewWorkshop$(
    workshop: Workshop
  ): Observable<CustomHttpResponse<Workshop>> {
    return this.http
      .post<CustomHttpResponse<Workshop>>(
        `${this.baseUrl}/workshop/newWorkshop`,
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
    this.modal.open(NewWorkshopModalComponent, { size: 'md' });
  }

  closeModal() {
    this.modal.dismissAll();
  }

  private createWorkshop(newWorkshop: NgForm): Workshop {
    const workshop: Workshop = {
      name: newWorkshop.value.workshopName,
      description: newWorkshop.value.workshopDescription,
    };

    return workshop;
  }
}
